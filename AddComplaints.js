import React, { useState } from 'react';

function AddComplaints() {
  const [formData, setFormData] = useState({
    Complaint_ID: '',
    Description: '',
    Date: '',
    Status: 'Open',
    Officer_ID: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [complaints, setComplaints] = useState([]); // Store the added complaints
  const [editingIndex, setEditingIndex] = useState(null); // Track which complaint is being edited

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // If editing, update the complaint in the array
      const updatedComplaints = [...complaints];
      updatedComplaints[editingIndex] = formData;
      setComplaints(updatedComplaints);
      setEditingIndex(null); // Reset editing state
    } else {
      // If adding new complaint, add to the array
      setComplaints((prevComplaints) => [...prevComplaints, formData]);
    }

    // Reset form data
    setFormData({
      Complaint_ID: '',
      Description: '',
      Date: '',
      Status: 'Open',
      Officer_ID: '',
    });

    // Optionally hide the form after submission
    setShowForm(false);
  };

  const handleEdit = (index) => {
    // When edit button is clicked, load the complaint data into the form and track the index
    setEditingIndex(index);
    setFormData(complaints[index]);
    setShowForm(true); // Ensure the form is shown for editing
  };

  const handleDelete = (index) => {
    // Delete the complaint from the list
    const updatedComplaints = complaints.filter((_, i) => i !== index);
    setComplaints(updatedComplaints);
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
    complaintList: {
      marginTop: '20px',
      textAlign: 'left',
    },
    complaintItem: {
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
          Add New Complaint
        </button>
      )}

      {/* Form that appears when showForm is true */}
      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.formTitle}>{editingIndex !== null ? 'Edit Complaint' : 'Add New Complaint'}</h3>

          <div style={styles.formGroup}>
            <label htmlFor="Complaint_ID" style={styles.label}>Complaint ID:</label>
            <input
              type="text"
              id="Complaint_ID"
              name="Complaint_ID"
              value={formData.Complaint_ID}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="Description" style={styles.label}>Description:</label>
            <textarea
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="Date" style={styles.label}>Date:</label>
            <input
              type="date"
              id="Date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="Status" style={styles.label}>Status:</label>
            <select
              id="Status"
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

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

          <button
            type="submit"
            style={styles.submitButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.submitButton.backgroundColor)}
          >
            {editingIndex !== null ? 'Update Complaint' : 'Add Complaint'}
          </button>
        </form>
      )}

      {/* Display the added complaints */}
      {complaints.length > 0 && (
        <div style={styles.complaintList}>
          <h4>Added Complaints</h4>
          {complaints.map((complaint, index) => (
            <div key={index} style={styles.complaintItem}>
              <p><strong>Complaint ID:</strong> {complaint.Complaint_ID}</p>
              <p><strong>Description:</strong> {complaint.Description}</p>
              <p><strong>Date:</strong> {complaint.Date}</p>
              <p><strong>Status:</strong> {complaint.Status}</p>
              <p><strong>Officer ID:</strong> {complaint.Officer_ID}</p>
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

export default AddComplaints;
