import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api/v1/member';

function Member() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleNavigateToAddMember = () => {
    navigate('/plan'); // Corrected route path for adding students
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${API_URL}/getall`);
      setMembers(response.data);
    } catch (error) {
      setError('Error fetching member details. Please check your API endpoint.'); // More informative error message
    }
  };

  const handleEditMember = (memberId) => {
    navigate(`/editplan/${memberId}`); // Corrected route path for editing students
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await axios.delete(`${API_URL}/delete/${memberId}`);
      alert('Successfully Deleted');
      fetchMembers(); // Refetch data after deletion
    } catch (error) {
      setError('Error deleting member details. Please check your API functionality.'); // More informative error message
    }
  };

  return (
    <div>
      <h1>Workout Plans</h1> {/* Corrected title */}
      <button className="btn btn-primary mt-4" onClick={handleNavigateToAddMember}>
        Add
      </button>

      {error && <div className="alert alert-danger">{error}</div>}

      <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Inline styling */}
        <table className="table table-dark table-striped"> {/* Improved table styling */}
          <thead>
            <tr>
              <th scope="col">Routine</th>
              <th scope="col">Exercises</th>
              <th scope="col">Repetitions</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td>{member.rotine}</td>
                <td>{member.exercise}</td>
                <td>{member.repetitions}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-warning mr-2"
                    onClick={() => handleEditMember(member._id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteMember(member._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Member;
