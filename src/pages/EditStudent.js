import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditStudent.css';

const EditStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;

  const [student, setStudent] = useState({
    id: '',
    surname: '',
    birth_year: '',
    gender: '',
    group: '',
    faculty: '',
    score: '',
    workplace: '',
    city: ''
  });

  const API_URL = "http://localhost:5038/";

  useEffect(() => {
    fetch(`${API_URL}api/students/getStudent?id=${id}`)
      .then(response => response.json())
      .then(data => {
        setStudent({ ...data });
      })
      .catch(error => console.error('Error fetching student:', error));
  }, [id, API_URL]);

  const handleChange = (event) => {
    setStudent({
      ...student,
      [event.target.name]: event.target.value
    });
  };

  const handleEditStudent = (event) => {
    event.preventDefault();
    fetch(`${API_URL}api/students/updateStudent`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Updated Successfully:', data);
      navigate('/student-list');
    })
    .catch(error => console.error('Error updating student:', error));
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleEditStudent}>
        <input type="text" name="surname" placeholder="Surname" value={student.surname} onChange={handleChange} required />
        <input type="text" name="birth_year" placeholder="Birth Year" value={student.birth_year} onChange={handleChange} required />
        <input type="text" name="gender" placeholder="Gender" value={student.gender} onChange={handleChange} required />
        <input type="text" name="group" placeholder="Group" value={student.group} onChange={handleChange} required />
        <input type="text" name="faculty" placeholder="Faculty" value={student.faculty} onChange={handleChange} required />
        <input type="text" name="score" placeholder="Score" value={student.score} onChange={handleChange} required />
        <input type="text" name="workplace" placeholder="Workplace" value={student.workplace} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={student.city} onChange={handleChange} required />
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}

export default EditStudent;
