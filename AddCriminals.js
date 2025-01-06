import React, { useState } from 'react';

function AddCriminals() {
  const [formData, setFormData] = useState({
    criminalID: '',
    firstName: '',
    lastName: '',
    knownAliases: '',
    arrestHistory: '',
    convictionHistory: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [criminals, setCriminals] = useState([]); // Store the added criminals
  const [editingIndex, setEditingIndex] = useState(null); // Track which criminal is being edited

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // If editing, update the criminal in the array
      const updatedCriminals = [...criminals];
      updatedCriminals[editingIndex] = formData;
      setCriminals(updatedCriminals);
      setEditingIndex(null); // Reset editing state
    } else {
      // If adding new criminal, add to the array
      setCriminals((prevCriminals) => [...prevCriminals, formData]);
    }

    // Reset form data
    setFormData({
      criminalID: '',
      firstName: '',
      lastName: '',
      knownAliases: '',
      arrestHistory: '',
      convictionHistory: '',
    });

    // Optionally hide the form after submission
    setShowForm(false);

    // Log the criminal data (for debugging)
    console.log('Form submitted:', formData);
  };

  const handleEdit = (index) => {
    // When edit button is clicked, load the criminal data into the form and track the index
    setEditingIndex(index);
    setFormData(criminals[index]);
    setShowForm(true); // Ensure the form is shown for editing
  };

  const handleDelete = (index) => {
    // Delete the criminal from the list
    const updatedCriminals = criminals.filter((_, i) => i !== index);
    setCriminals(updatedCriminals);
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
    textarea: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      height: '100px',
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
    criminalList: {
      marginTop: '20px',
      textAlign: 'left',
    },
    criminalItem: {
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
          Add New Criminal
        </button>
      )}

      {/* Form that appears when showForm is true */}
      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.formTitle}>{editingIndex !== null ? 'Edit Criminal' : 'Add New Criminal'}</h3>

          <div style={styles.formGroup}>
            <label htmlFor="criminalID" style={styles.label}>Criminal ID:</label>
            <input
              type="text"
              id="criminalID"
              name="criminalID"
              value={formData.criminalID}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="firstName" style={styles.label}>First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="lastName" style={styles.label}>Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="knownAliases" style={styles.label}>Known Aliases:</label>
            <textarea
              id="knownAliases"
              name="knownAliases"
              value={formData.knownAliases}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="arrestHistory" style={styles.label}>Arrest History:</label>
            <textarea
              id="arrestHistory"
              name="arrestHistory"
              value={formData.arrestHistory}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="convictionHistory" style={styles.label}>Conviction History:</label>
            <textarea
              id="convictionHistory"
              name="convictionHistory"
              value={formData.convictionHistory}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>

          <button
            type="submit"
            style={styles.submitButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.submitButton.backgroundColor)}
          >
            {editingIndex !== null ? 'Update Criminal' : 'Add Criminal'}
          </button>
        </form>
      )}

      {/* Display the added criminals */}
      {criminals.length > 0 && (
        <div style={styles.criminalList}>
          <h4>Added Criminals</h4>
          {criminals.map((criminal, index) => (
            <div key={index} style={styles.criminalItem}>
              <p><strong>Criminal ID:</strong> {criminal.criminalID}</p>
              <p><strong>First Name:</strong> {criminal.firstName}</p>
              <p><strong>Last Name:</strong> {criminal.lastName}</p>
              <p><strong>Known Aliases:</strong> {criminal.knownAliases}</p>
              <p><strong>Arrest History:</strong> {criminal.arrestHistory}</p>
              <p><strong>Conviction History:</strong> {criminal.convictionHistory}</p>
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

export default AddCriminals;
