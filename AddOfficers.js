import React, { useState } from 'react';

function AddOfficer() {
  const [formData, setFormData] = useState({
    Officer_ID: '',
    Rank: '',
    Badge_Number: '',
    Availability_Status: 'Available',
    User_ID: '', // Assuming you want to associate it with a user
  });

  const [showForm, setShowForm] = useState(false);
  const [officers, setOfficers] = useState([]); // Store the added officers
  const [editingIndex, setEditingIndex] = useState(null); // Track which officer is being edited

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // If editing, update the officer in the array
      const updatedOfficers = [...officers];
      updatedOfficers[editingIndex] = formData;
      setOfficers(updatedOfficers);
      setEditingIndex(null); // Reset editing state
    } else {
      // If adding new officer, add to the array
      setOfficers((prevOfficers) => [...prevOfficers, formData]);
    }

    // Reset form data
    setFormData({
      Officer_ID: '',
      Rank: '',
      Badge_Number: '',
      Availability_Status: 'Available',
      User_ID: '',
    });

    // Optionally hide the form after submission
    setShowForm(false);
  };

  const handleEdit = (index) => {
    // When edit button is clicked, load the officer data into the form and track the index
    setEditingIndex(index);
    setFormData(officers[index]);
    setShowForm(true); // Ensure the form is shown for editing
  };

  const handleDelete = (index) => {
    // Delete the officer from the list
    const updatedOfficers = officers.filter((_, i) => i !== index);
    setOfficers(updatedOfficers);
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
    toggleButtonHover: {
      backgroundColor: '#0056b3',
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
    submitButtonHover: {
      backgroundColor: '#218838',
    },
    officerList: {
      marginTop: '20px',
      textAlign: 'left',
    },
    officerItem: {
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
      {/* Button to toggle form visibility */}
      {!showForm && (
        <button
          onClick={toggleFormVisibility}
          style={styles.toggleButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.toggleButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.toggleButton.backgroundColor)}
        >
          Add New Officer
        </button>
      )}

      {/* Form that appears when showForm is true */}
      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.formTitle}>{editingIndex !== null ? 'Edit Officer' : 'Add New Officer'}</h3>

          <div style={styles.formGroup}>
            <label htmlFor="Officer_ID" style={styles.label}>Officer ID:</label>
            <input
              type="text"
              id="Officer_ID"
              name="Officer_ID"
              value={formData.Officer_ID}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="Rank" style={styles.label}>Rank:</label>
            <input
              type="text"
              id="Rank"
              name="Rank"
              value={formData.Rank}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="Badge_Number" style={styles.label}>Badge Number:</label>
            <input
              type="text"
              id="Badge_Number"
              name="Badge_Number"
              value={formData.Badge_Number}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="Availability_Status" style={styles.label}>Availability Status:</label>
            <select
              id="Availability_Status"
              name="Availability_Status"
              value={formData.Availability_Status}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="User_ID" style={styles.label}>User ID:</label>
            <input
              type="text"
              id="User_ID"
              name="User_ID"
              value={formData.User_ID}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            style={styles.submitButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.submitButton.backgroundColor)}
          >
            {editingIndex !== null ? 'Update Officer' : 'Add Officer'}
          </button>
        </form>
      )}

      {/* Display the added officers */}
      {officers.length > 0 && (
        <div style={styles.officerList}>
          <h4>Added Officers</h4>
          {officers.map((officer, index) => (
            <div key={index} style={styles.officerItem}>
              <p><strong>Officer ID:</strong> {officer.Officer_ID}</p>
              <p><strong>Rank:</strong> {officer.Rank}</p>
              <p><strong>Badge Number:</strong> {officer.Badge_Number}</p>
              <p><strong>Availability Status:</strong> {officer.Availability_Status}</p>
              <p><strong>User ID:</strong> {officer.User_ID}</p>
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

export default AddOfficer;
