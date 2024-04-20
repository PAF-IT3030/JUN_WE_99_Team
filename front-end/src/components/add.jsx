import axios from 'axios';
import { useState } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api/v1/member';

function AddPlan() {
  const [rotine, setRotine] = useState('');
  const [exercise, setExercise] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Create a useNavigate instance

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${API_URL}/save`, {
        rotine,
        exercise,
        repetitions,
      });
      alert('Content Added Successfully!');
      setRotine('');
      setExercise('');
      setRepetitions('');
      navigate('/'); // Redirect to the home page after successful submission
    } catch (error) {
      setError('Error saving details');
    }
  };

  return (
    <div className="container">  {/* Wrap the content in a container */}
      <div className="row justify-content-center"> {/* Center the form horizontally */}
        <div className="col-md-6">  {/* Define form width (optional) */}
          <h1>Add Workout Plan</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="rotine">Rotine</label>
              <input
                type="text"
                className="form-control"
                id="rotine"
                value={rotine}
                onChange={(event) => setRotine(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label for="exercise">Exercise</label>
              <input
                type="text"
                className="form-control"
                id="exercise"
                value={exercise}
                onChange={(event) => setExercise(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label for="repetitions">Repetitions</label>
              <input
                type="text"
                className="form-control"
                id="repetitions"
                value={repetitions}
                onChange={(event) => setRepetitions(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Add Workout Plan
            </button>
          </form>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default AddPlan;
