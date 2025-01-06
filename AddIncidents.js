import React, { useState } from 'react';

function AddIncident() {
  const [formData, setFormData] = useState({
    Incident_ID: '',
    Description: '',
    Date: '',
    Location: '',
    Status: 'Open',
  });

  const [showForm, setShowForm] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedIncidents = [...incidents];
      updatedIncidents[editingIndex] = formData;
      setIncidents(updatedIncidents);
      setEditingIndex(null);
    } else {
      setIncidents((prevIncidents) => [...prevIncidents, formData]);
    }

    setFormData({
      Incident_ID: '',
      Description: '',
      Date: '',
      Location: '',
      Status: 'Open',
    });

    setShowForm(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(incidents[index]);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedIncidents = incidents.filter((_, i) => i !== index);
    setIncidents(updatedIncidents);
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
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    form: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '600px',
      margin: '20px auto',
      textAlign: 'left',
    },
    submitButton: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '100%',
    },
    incidentList: {
      marginTop: '20px',
      textAlign: 'left',
    },
    incidentItem: {
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
    },
    button: {
      margin: '5px',
      padding: '5px 10px',
      borderRadius: '5px',
    },
  };

  return (
    <div style={styles.container}>
      {!showForm && (
        <button onClick={toggleFormVisibility} style={styles.toggleButton}>
          Add New Incident
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label>Incident ID:</label>
            <input
              type="text"
              name="Incident_ID"
              value={formData.Incident_ID}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              name="Status"
              value={formData.Status}
              onChange={handleChange}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <button type="submit" style={styles.submitButton}>
            {editingIndex !== null ? 'Update Incident' : 'Add Incident'}
          </button>
        </form>
      )}

      {incidents.length > 0 && (
        <div style={styles.incidentList}>
          <h4>Added Incidents</h4>
          {incidents.map((incident, index) => (
            <div key={index} style={styles.incidentItem}>
              <p><strong>ID:</strong> {incident.Incident_ID}</p>
              <p><strong>Description:</strong> {incident.Description}</p>
              <p><strong>Date:</strong> {incident.Date}</p>
              <p><strong>Location:</strong> {incident.Location}</p>
              <p><strong>Status:</strong> {incident.Status}</p>
              <button onClick={() => handleEdit(index)} style={styles.button}>
                Edit
              </button>
              <button onClick={() => handleDelete(index)} style={styles.button}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddIncident;
