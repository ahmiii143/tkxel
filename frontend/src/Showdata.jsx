import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './sector.css';

const ShowData = ({ sectors }) => {
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5555/');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      if (location.state && location.state.userData) {
        setUserData(location.state.userData);
      } else {
        await fetchData();
      }
    };

    fetchDataAndUpdateState();
  }, [location.state]);

  const handleEdit = (user) => {
    setEditData(user);
  };

  const handleCancelEdit = () => {
    setEditData(null);
  };

 const handleSaveEdit = async () => {
  try {
    const response = await axios.put(`http://localhost:5555/${editData._id}`, {
      name: editData.name,
      sectors: (editData.sectors || []).map((sector) => sector._id),
      agreeToTerms: editData.agreeToTerms,
    });

    if (response.status === 200) {
      console.log('Data updated successfully:', response.data);
      setEditData(null);
      await fetchData(); // Refetch data after updating
    } else {
      console.error('Failed to update data. Status:', response.status);
    }
  } catch (error) {
    console.error('Error updating data:', error.message);
  }
};

  return (
    <div>
      <h2>User Data</h2>
      <ul>
        {Array.isArray(userData) ? (
          userData.map((user) => (
            <li key={user._id}>
              {editData && editData._id === user._id ? (
  <div>
    <strong>Name:</strong>
    <input
      type="text"
      value={editData.name}
      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
    />
    <br />
    <strong>Sectors:</strong>
    <select
      multiple
checked={editData?.agreeToTerms || false}

      onChange={(e) =>
        setEditData({
          ...editData,
          sectors: Array.from(e.target.selectedOptions, (option) => ({ _id: option.value })),
        })
      }
    >
      {sectors.map((sector) => (
        <option key={sector._id} value={sector._id}>
          {sector.name}
        </option>
      ))}
    </select>
    <br />
    <strong>Agree to Terms:</strong>
    <input
      type="checkbox"
      checked={editData.agreeToTerms}
      onChange={(e) => setEditData({ ...editData, agreeToTerms: e.target.checked })}
    />
    <br />
    <button onClick={handleSaveEdit}>Save</button>
    <button onClick={handleCancelEdit}>Cancel</button>
  </div>
              ) : (
                <div>
                  <strong>Name:</strong> {user.name},{' '}
                  <strong>Sectors:</strong> {user.sectors.map((sector) => sector.name).join(', ')},{' '}
                  <strong>Agree to Terms:</strong> {user.agreeToTerms.toString()}
                  <br />
                  <button onClick={() => handleEdit(user)}>Edit</button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No user data available.</p>
        )}
      </ul>
    </div>
  );
};

export default ShowData;
