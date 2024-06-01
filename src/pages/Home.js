import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const goToStudentList = () => navigate('/student-list');
  const goToAddStudent = () => navigate('/add-student');
  const goToJson = () => navigate('/json-list');

  return (
    <div>
      <h1>Student journal</h1>
      <button onClick={goToStudentList}>Student List</button>
      <button onClick={goToAddStudent}>Add Student</button>
      <button onClick={goToJson}>Json student list</button>
    </div>
  );
};

export default Home;
