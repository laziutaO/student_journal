import React, { Component } from 'react';
import withNavigate from './withNavigate'; 

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }

  API_URL = "http://localhost:5038/";

  componentDidMount() {
    this.refreshStudents();
  }

  refreshStudents = () => {
    fetch(this.API_URL + "api/students/getStudentsJSON")
      .then(response => response.json())
      .then(data => {
        this.setState({ students: data });
      })
      .catch(error => console.error('Error fetching students:', error));
  }

  handleEditStudent = (id) => {
    this.props.navigate(`/edit-student/${id}`, { state: { id } });
  }

  handleDeleteStudent = (id) => {
    fetch(`${this.API_URL}api/students/deleteStudents?id=${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Deleted Successfully:', data);
      this.refreshStudents();
    })
    .catch(error => console.error('Error deleting student:', error));
  }

  render() {
    const { students } = this.state;
  
    return (
      <div>
        <h2>Students List</h2>
        <table style={{ width: '80%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Surname</th>
              <th>Birth Year</th>
              <th>Gender</th>
              <th>Group</th>
              <th>Faculty</th>
              <th>Score</th>
              <th>Workplace</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.surname}</td>
                <td>{student.birth_year}</td>
                <td>{student.gender}</td>
                <td>{student.group}</td>
                <td>{student.faculty}</td>
                <td>{student.score}</td>
                <td>{student.workplace}</td>
                <td>{student.city}</td>
                <td>
                  <button onClick={() => this.handleDeleteStudent(student.id)}>Delete</button>
                  <button onClick={() => this.handleEditStudent(student.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withNavigate(StudentList);
