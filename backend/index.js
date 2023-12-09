// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT } from "./config.js";
import { Sector, User, mongoDBURL } from "./model/model.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", cors(), (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

app.get("/sectors", async (req, res) => {
  try {
    const sectors = await Sector.find();
    res.status(200).json(sectors);
  } catch (error) {
    console.error("Error fetching sectors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/:id", async (req, res) => {
  const { name, sectors, agreeToTerms } = req.body;

  // Validate data
  if (!name || !sectors || !Array.isArray(sectors) || sectors.length === 0) {
    return res.status(400).json({
      error:
        "Invalid data. Please provide a name and select at least one sector.",
    });
  }

  try {
    // Find or create sectors based on IDs
    const sectorObjects = await Promise.all(
      sectors.map(async (sectorId) => {
        const sector = await Sector.findById(sectorId);
        if (sector) {
          return sector._id;
        }
      })
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        sectors: sectorObjects,
        agreeToTerms,
      },
      { new: true }
    );

    console.log("User updated:", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/", async (req, res) => {
  const { name, selectedSectors, agreeToTerms } = req.body;

  // Validate data
  if (
    !name ||
    !selectedSectors ||
    !Array.isArray(selectedSectors) ||
    selectedSectors.length === 0
  ) {
    return res.status(400).json({
      error:
        "Invalid data. Please provide a name and select at least one sector.",
    });
  }

  try {
    // Find or create sectors based on names
    const sectorObjects = await Promise.all(
      selectedSectors.map(async (sectorName) => {
        const sector = await Sector.findOne({ name: sectorName });
        if (sector) {
          return sector._id;
        } else {
          const newSector = new Sector({ name: sectorName });
          const savedSector = await newSector.save();
          return savedSector._id;
        }
      })
    );

    const newUser = new User({
      name,
      sectors: sectorObjects,
      agreeToTerms,
    });

    const savedUser = await newUser.save();
    console.log("User saved:", savedUser);
    res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("App is connected to DATABASE");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
