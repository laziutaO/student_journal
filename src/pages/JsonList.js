import React, { useState, useEffect } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5038/api/students/getStudentsJSON')
      .then(response => response.json())
      .then(data => {
        setStudents(data);
      })
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  return (
    <div>
      <h2>Student List (JSON)</h2>
      <pre>{JSON.stringify(students, null, 2)}</pre>
    </div>
  );
}

export default StudentList;
