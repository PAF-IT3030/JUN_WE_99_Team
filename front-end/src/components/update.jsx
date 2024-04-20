import axios from 'axios';
import { useState, useEffect } from "react";
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api/v1/member';

function UpdatePlan() {
  const [rotine, setRotine] = useState('');
  const [exercise, setExercise] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Create a useNavigate instance
  const { memberId } = useParams(); // Get member ID from URL parameter

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`${API_URL}/search/${memberId}`);
        setRotine(response.data.rotine);
        setExercise(response.data.exercise);
        setRepetitions(response.data.repetitions);
      } catch (error) {
        setError('Error fetching details');
      }
    };

    fetchMember();
  }, [memberId]); // Run effect only when memberId changes

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`${API_URL}/edit/${memberId}`, {
        rotine,
        exercise,
        repetitions,
      });
      alert('Successfully Updated!');
      navigate('/'); // Redirect to the member list page after successful update
    } catch (error) {
      setError('Error updating details');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Update Workout Details</h1> {/* Corrected title */}
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
              <label for="exercise">Exercise</label> {/* Corrected label name */}
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
              Update
            </button>
          </form>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default UpdatePlan;
