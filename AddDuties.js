import React, { useState } from 'react';

const AddDuties = () => {
  const [duties, setDuties] = useState([]);
  const [newDuty, setNewDuty] = useState({
    officerId: '',
    shiftStart: '',
    shiftEnd: '',
    location: '',
  });

  // Function to handle adding a new duty
  const handleAddDuty = () => {
    if (newDuty.officerId && newDuty.shiftStart && newDuty.shiftEnd && newDuty.location) {
      const newDutySchedule = {
        scheduleId: `SCH-${new Date().getTime()}`, // Unique Schedule ID
        ...newDuty,
      };
      setDuties((prevDuties) => [...prevDuties, newDutySchedule]);
      setNewDuty({
        officerId: '',
        shiftStart: '',
        shiftEnd: '',
        location: '',
      }); // Clear the form after adding duty
    } else {
      alert("Please fill all the fields!");
    }
  };

  // Function to handle editing an existing duty
  const handleEditDuty = (scheduleId) => {
    const dutyToEdit = duties.find((duty) => duty.scheduleId === scheduleId);
    setNewDuty(dutyToEdit); // Set the form with the duty data to edit
    setDuties(duties.filter((duty) => duty.scheduleId !== scheduleId)); // Remove the duty from list before editing
  };

  // Function to handle deleting a duty
  const handleDeleteDuty = (scheduleId) => {
    setDuties(duties.filter((duty) => duty.scheduleId !== scheduleId)); // Remove the duty from list
  };

  return (
    <div className="duties-content">
      <h2>Duty Schedule</h2>

      {/* Add Duty Form */}
      <div className="add-duty-form">
        <input
          type="text"
          value={newDuty.officerId}
          onChange={(e) => setNewDuty({ ...newDuty, officerId: e.target.value })}
          placeholder="Enter Officer ID"
        />
        <input
          type="datetime-local"
          value={newDuty.shiftStart}
          onChange={(e) => setNewDuty({ ...newDuty, shiftStart: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newDuty.shiftEnd}
          onChange={(e) => setNewDuty({ ...newDuty, shiftEnd: e.target.value })}
        />
        <input
          type="text"
          value={newDuty.location}
          onChange={(e) => setNewDuty({ ...newDuty, location: e.target.value })}
          placeholder="Enter Assigned Location"
        />
        <button onClick={handleAddDuty}>Add Duty</button>
      </div>

      {/* Display Duty Schedule List */}
      <div className="duty-list">
        {duties.map((duty, index) => (
          <div
            className={`duty-item ${duty.shiftStart ? 'filled' : 'empty'}`}
            key={index}
          >
            <span>{duty.shiftStart} - {duty.shiftEnd}</span>
            <span>{duty.officerId}</span>
            <span>{duty.location}</span>
            <div className="duty-actions">
              <button onClick={() => handleEditDuty(duty.scheduleId)}>Edit</button>
              <button onClick={() => handleDeleteDuty(duty.scheduleId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* General Styles */
        .duties-content {
          padding: 2rem;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        .add-duty-form {
          margin-bottom: 2rem;
        }

        .add-duty-form input {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-right: 1rem;
          width: 200px;
        }

        .add-duty-form button {
          padding: 0.5rem 1rem;
          background-color: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .filter-controls {
          margin-bottom: 2rem;
        }

        .filter-controls button {
          padding: 0.5rem 1rem;
          margin-right: 1rem;
          background-color: #f0f2f5;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .duty-list {
          margin-top: 1rem;
        }

        .duty-item {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
          margin-bottom: 0.5rem;
          background-color: #fafafa;
          border-radius: 4px;
        }

        .duty-item.filled {
          background-color: #e3f7e0;
        }

        .duty-item.empty {
          background-color: #f8d7da;
        }

        .duty-actions button {
          padding: 0.3rem 0.6rem;
          background-color: #f1f1f1;
          border: none;
          margin-left: 0.5rem;
          cursor: pointer;
        }

        .duty-actions button:hover {
          background-color: #ddd;
        }
      `}</style>
    </div>
  );
};

export default AddDuties;
