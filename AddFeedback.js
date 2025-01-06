import React, { useState } from 'react';

function AddFeedback() {
  const [formData, setFormData] = useState({
    feedbackID: '',
    citizenID: '',
    feedbackText: '',
    feedbackDate: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedFeedbackList = [...feedbackList];
      updatedFeedbackList[editingIndex] = formData;
      setFeedbackList(updatedFeedbackList);
      setEditingIndex(null);
    } else {
      setFeedbackList((prevFeedbackList) => [...prevFeedbackList, formData]);
    }

    setFormData({
      feedbackID: '',
      citizenID: '',
      feedbackText: '',
      feedbackDate: '',
    });

    setShowForm(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(feedbackList[index]);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedFeedbackList = feedbackList.filter((_, i) => i !== index);
    setFeedbackList(updatedFeedbackList);
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
    },
    form: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '10px',
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
      width: '100%',
    },
    feedbackList: {
      marginTop: '20px',
      textAlign: 'left',
    },
    feedbackItem: {
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
    },
    button: {
      margin: '5px',
      padding: '5px 10px',
      borderRadius: '5px',
      backgroundColor: '#f0ad4e',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: '#d9534f',
      color: 'white',
    },
  };

  return (
    <div style={styles.container}>
      {!showForm && (
        <button onClick={toggleFormVisibility} style={styles.toggleButton}>
          Add Feedback
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.formTitle}>
            {editingIndex !== null ? 'Edit Feedback' : 'Add Feedback'}
          </h3>
          <div style={styles.formGroup}>
            <label htmlFor="feedbackID" style={styles.label}>Feedback ID:</label>
            <input
              type="text"
              id="feedbackID"
              name="feedbackID"
              value={formData.feedbackID}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="citizenID" style={styles.label}>Citizen ID:</label>
            <input
              type="text"
              id="citizenID"
              name="citizenID"
              value={formData.citizenID}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="feedbackText" style={styles.label}>Feedback Text:</label>
            <textarea
              id="feedbackText"
              name="feedbackText"
              value={formData.feedbackText}
              onChange={handleChange}
              style={styles.textarea}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="feedbackDate" style={styles.label}>Feedback Date:</label>
            <input
              type="date"
              id="feedbackDate"
              name="feedbackDate"
              value={formData.feedbackDate}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            {editingIndex !== null ? 'Update Feedback' : 'Add Feedback'}
          </button>
        </form>
      )}

      {feedbackList.length > 0 && (
        <div style={styles.feedbackList}>
          <h4>Feedback List</h4>
          {feedbackList.map((feedback, index) => (
            <div key={index} style={styles.feedbackItem}>
              <p><strong>Feedback ID:</strong> {feedback.feedbackID}</p>
              <p><strong>Citizen ID:</strong> {feedback.citizenID}</p>
              <p><strong>Feedback Text:</strong> {feedback.feedbackText}</p>
              <p><strong>Date:</strong> {feedback.feedbackDate}</p>
              <button
                onClick={() => handleEdit(index)}
                style={styles.button}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                style={{ ...styles.button, ...styles.deleteButton }}
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

export default AddFeedback;
