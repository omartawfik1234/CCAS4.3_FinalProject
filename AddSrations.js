import React, { useState } from 'react';

function AddStation() {
  const [formData, setFormData] = useState({
    Station_ID: '',
    Station_Name: '',
    Location: '',
    Contact_Number: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [stations, setStations] = useState([]); // Store the added stations
  const [editingIndex, setEditingIndex] = useState(null); // Track which station is being edited

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedStations = [...stations];
      updatedStations[editingIndex] = formData;
      setStations(updatedStations);
      setEditingIndex(null); // Reset editing state
    } else {
      setStations((prevStations) => [...prevStations, formData]);
    }

    setFormData({
      Station_ID: '',
      Station_Name: '',
      Location: '',
      Contact_Number: '',
    });

    setShowForm(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(stations[index]);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedStations = stations.filter((_, i) => i !== index);
    setStations(updatedStations);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const styles = {
    container: {
      padding: '20px',
      marginTop: '20px',
      textAlign: 'center',
    },
    toggleButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    },
    form: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: '20px auto',
      textAlign: 'left',
    },
    formTitle: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      fontSize: '16px',
      color: '#333',
      marginBottom: '5px',
      display: 'block',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    submitButton: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      width: '100%',
    },
    stationList: {
      marginTop: '20px',
      textAlign: 'left',
    },
    stationItem: {
      border: '1px solid #ccc',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
    },
    button: {
      backgroundColor: '#f0ad4e',
      color: '#fff',
      padding: '5px 10px',
      borderRadius: '5px',
      marginLeft: '10px',
      cursor: 'pointer',
    },
    deleteButton: {
      backgroundColor: '#d9534f',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      {!showForm && (
        <button
          onClick={toggleFormVisibility}
          style={styles.toggleButton}
        >
          Add New Station
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.formTitle}>{editingIndex !== null ? 'Edit Station' : 'Add New Station'}</h3>

          <div style={styles.formGroup}>
            <label style={styles.label}>Station ID:</label>
            <input
              type="text"
              name="Station_ID"
              value={formData.Station_ID}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Station Name:</label>
            <input
              type="text"
              name="Station_Name"
              value={formData.Station_Name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Location:</label>
            <input
              type="text"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contact Number:</label>
            <input
              type="text"
              name="Contact_Number"
              value={formData.Contact_Number}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            {editingIndex !== null ? 'Update Station' : 'Add Station'}
          </button>
        </form>
      )}

      {stations.length > 0 && (
        <div style={styles.stationList}>
          <h4>Added Stations</h4>
          {stations.map((station, index) => (
            <div key={index} style={styles.stationItem}>
              <p><strong>Station ID:</strong> {station.Station_ID}</p>
              <p><strong>Station Name:</strong> {station.Station_Name}</p>
              <p><strong>Location:</strong> {station.Location}</p>
              <p><strong>Contact Number:</strong> {station.Contact_Number}</p>
              <button
                onClick={() => handleEdit(index)}
                style={styles.button}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddStation;
