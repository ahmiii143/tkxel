import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sector.css';
import tkxel from './assests/1.png';

const SectorForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [sectors, setSectors] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get('http://localhost:5555/sectors');
        setSectors(response.data);
      } catch (error) {
        console.error('Error fetching sectors:', error.message);
      }
    };

    fetchSectors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5555/', {
        name,
        selectedSectors,
        agreeToTerms,
      });

      if (response.status === 200) {
        console.log('Data saved successfully:', response.data);
        navigate("/Showdata", { state: { userData: [response.data] } });
      } else {
        console.error('Failed to save data. Status:', response.status);
      }
    } catch (error) {
      console.error('Error saving data:', error.message);
    }

    setName('');
    setSelectedSectors([]);
    setAgreeToTerms(false);
  };

  return (
    <form onSubmit={handleSubmit}>
        <img  src={tkxel} alt='logo'/>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <br />
      <label>
        Sectors:
        <select
          multiple
          size="5"
          value={selectedSectors}
          onChange={(e) => setSelectedSectors(Array.from(e.target.selectedOptions, (option) => option.value))}
        >   
      
          <option value="1">Manufacturing</option>
      <option value="19">Construction materials</option>
      <option value="18">Electronics and Optics</option>
      <option value="6">Food and Beverage</option>
      <option value="342">Bakery &amp; confectionery products</option>
      <option value="43">Beverages</option>
      <option value="42">Fish &amp; fish products</option>
      <option value="40">Meat &amp; meat products</option>
      <option value="39">Milk &amp; dairy products</option>
      <option value="437">Other</option>
      <option value="378">Sweets &amp; snack food</option>
      <option value="13">Furniture</option>
      <option value="389">Bathroom/sauna</option>
      <option value="385">Bedroom</option>
      <option value="390">Childrenâ€™s room</option>
      <option value="98">Kitchen</option>
      <option value="101">Living room</option>
      <option value="392">Office</option>
      <option value="394">Other (Furniture)</option>
      <option value="341">Outdoor</option>
      <option value="99">Project furniture</option>
      <option value="12">Machinery</option>
      <option value="94">Machinery components</option>
      <option value="91">Machinery equipment/tools</option>
      <option value="224">Manufacture of machinery</option>
      <option value="97">Maritime</option>
      <option value="271">Aluminium and steel workboats</option>
      <option value="269">Boat/Yacht building</option>
      <option value="230">Ship repair and conversion</option>
      <option value="93">Metal structures</option>
      <option value="508">Other</option>
      <option value="227">Repair and maintenance service</option>
      <option value="11">Metalworking</option>
      <option value="67">Construction of metal structures</option>
      <option value="263">Houses and buildings</option>
      <option value="267">Metal products</option>
      <option value="542">Metal works</option>
      <option value="75">CNC-machining</option>
      <option value="62">Forgings, Fasteners</option>
      <option value="69">Gas, Plasma, Laser cutting</option>
      <option value="66">MIG, TIG, Aluminum welding</option>
      <option value="9">Plastic and Rubber</option>
      <option value="54">Packaging</option>
      <option value="556">Plastic goods</option>
      <option value="559">Plastic processing technology</option>
      <option value="55">Blowing</option>
      <option value="57">Moulding</option>
      <option value="53">Plastics welding and processing</option>
      <option value="560">Plastic profiles</option>
      <option value="5">Printing</option>
      <option value="148">Advertising</option>
      <option value="150">Book/Periodicals printing</option>
      <option value="145">Labelling and packaging printing</option>
      <option value="7">Textile and Clothing</option>
      <option value="44">Clothing</option>
      <option value="45">Textile</option>
      <option value="8">Wood</option>
      <option value="337">Other (Wood)</option>
      <option value="51">Wooden building materials</option>
      <option value="47">Wooden houses</option>
      <option value="3">Other</option>
      <option value="37">Creative industries</option>
      <option value="29">Energy technology</option>
      <option value="33">Environment</option>
      <option value="2">Service</option>
      <option value="25">Business services</option>
      <option value="35">Engineering</option>
      <option value="28">Information Technology and Telecommunications</option>
      <option value="581">Data processing, Web portals, E-marketing</option>
      <option value="576">Programming, Consultancy</option>
      <option value="121">Software, Hardware</option>
      <option value="122">Telecommunications</option>
      <option value="22">Tourism</option>
      <option value="141">Translation services</option>
      <option value="21">Transport and Logistics</option>
      <option value="111">Air</option>
      <option value="114">Rail</option>
      <option value="112">Road</option>
      <option value="113">Water</option>
        </select>
      </label>
      <br />
      <br />
      <label>
        <input type="checkbox" checked={agreeToTerms} onChange={() => setAgreeToTerms(!agreeToTerms)} /> Agree to terms
      </label>
      <br />
      <br />
      <input type="submit" value="Save"     />
    </form>
  );
};

export default SectorForm;
