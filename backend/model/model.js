import mongoose from "mongoose";

const mongoDBURL =
  "mongodb+srv://tkxelproject:rNyngRpTGvcUG5GR@tkxel.wcr5xzo.mongodb.net/tkxel?retryWrites=true&w=majority";

const sectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sectors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sector",
    },
  ],
  agreeToTerms: {
    type: Boolean,
    required: true,
  },
});

const Sector = mongoose.model("Sector", sectorSchema);

const User = mongoose.model("User", userSchema);

export { Sector, User, mongoDBURL };
