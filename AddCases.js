import React, { useState } from 'react';

function AddCase() {
  const [formData, setFormData] = useState({
    caseID: '',
    caseTitle: '',
    caseDescription: '',
    status: 'Open',
    dateOpened: '',
    dateClosed: '',
    assignedOfficerID: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [cases, setCases] = useState([]); // Store the added cases
  const [editingIndex, setEditingIndex] = useState(null); // Track which case is being edited

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // If editing, update the case in the array
      const updatedCases = [...cases];
      updatedCases[editingIndex] = formData;
      setCases(updatedCases);
      setEditingIndex(null); // Reset editing state
    } else {
      // If adding new case, add to the array
      setCases((prevCases) => [...prevCases, formData]);
    }

    // Reset form data
    setFormData({
      caseID: '',
      caseTitle: '',
      caseDescription: '',
      status: 'Open',
      dateOpened: '',
      dateClosed: '',
      assignedOfficerID: '',
    });

    // Optionally hide the form after submission
    setShowForm(false);

    // Log the case data (for debugging)
    console.log('Form submitted:', formData);
  };

  const handleEdit = (index) => {
    // When edit button is clicked, load the case data into the form and track the index
    setEditingIndex(index);
    setFormData(cases[index]);
    setShowForm(true); // Ensure the form is shown for editing
  };

  const handleDelete = (index) => {
    // Delete the case from the list
    const updatedCases = cases.filter((_, i) => i !== index);
    setCases(updatedCases);
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
    caseList: {
      marginTop: '20px',
      textAlign: 'left',
    },
    caseItem: {
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
          Add New Case
        </button>
      )}

      {/* Form that appears when showForm is true */}
      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.formTitle}>{editingIndex !== null ? 'Edit Case' : 'Add New Case'}</h3>

          <div style={styles.formGroup}>
            <label htmlFor="caseID" style={styles.label}>Case ID:</label>
            <input
              type="text"
              id="caseID"
              name="caseID"
              value={formData.caseID}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="caseTitle" style={styles.label}>Case Title:</label>
            <input
              type="text"
              id="caseTitle"
              name="caseTitle"
              value={formData.caseTitle}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="caseDescription" style={styles.label}>Case Description:</label>
            <textarea
              id="caseDescription"
              name="caseDescription"
              value={formData.caseDescription}
              onChange={handleChange}
              required
              style={styles.textarea}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="status" style={styles.label}>Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="dateOpened" style={styles.label}>Date Opened:</label>
            <input
              type="date"
              id="dateOpened"
              name="dateOpened"
              value={formData.dateOpened}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="dateClosed" style={styles.label}>Date Closed:</label>
            <input
              type="date"
              id="dateClosed"
              name="dateClosed"
              value={formData.dateClosed}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="assignedOfficerID" style={styles.label}>Assigned Officer ID:</label>
            <input
              type="text"
              id="assignedOfficerID"
              name="assignedOfficerID"
              value={formData.assignedOfficerID}
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
            {editingIndex !== null ? 'Update Case' : 'Add Case'}
          </button>
        </form>
      )}

      {/* Display the added cases */}
      {cases.length > 0 && (
        <div style={styles.caseList}>
          <h4>Added Cases</h4>
          {cases.map((caseItem, index) => (
            <div key={index} style={styles.caseItem}>
              <p><strong>Case ID:</strong> {caseItem.caseID}</p>
              <p><strong>Case Title:</strong> {caseItem.caseTitle}</p>
              <p><strong>Description:</strong> {caseItem.caseDescription}</p>
              <p><strong>Status:</strong> {caseItem.status}</p>
              <p><strong>Date Opened:</strong> {caseItem.dateOpened}</p>
              <p><strong>Date Closed:</strong> {caseItem.dateClosed}</p>
              <p><strong>Assigned Officer ID:</strong> {caseItem.assignedOfficerID}</p>
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

export default AddCase;
