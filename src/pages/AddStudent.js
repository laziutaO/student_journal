import React, { Component } from 'react';

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surname: '',
      birth_year: '',
      gender: '',
      group: '',
      faculty: '',
      score: '',
      workplace: '',
      city: ''
    };
  }

  API_URL = "http://localhost:5038/";

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleAddStudent = (event) => {
    event.preventDefault();

    const { surname, birth_year, gender, group, faculty, score, workplace, city } = this.state;

    fetch(this.API_URL + "api/students/newAddStudents", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ surname, birth_year, gender, group, faculty, score, workplace, city })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Added Successfully:', data);
      this.setState({ surname: '', birth_year: '', gender: '', group: '', faculty: '', score: '', workplace: '', city: '' });
    })
    .catch(error => console.error('Error adding student:', error));
  }

  render() {
    const { surname, birth_year, gender, group, faculty, score, workplace, city } = this.state;

    return (
      <div>
        <h2>Add New Student</h2>
        <form onSubmit={this.handleAddStudent}>
          <input type="text" name="surname" placeholder="Surname" value={surname} onChange={this.handleChange} required />
          <input type="text" name="birth_year" placeholder="Birth Year" value={birth_year} onChange={this.handleChange} required />
          <input type="text" name="gender" placeholder="Gender" value={gender} onChange={this.handleChange} required />
          <input type="text" name="group" placeholder="Group" value={group} onChange={this.handleChange} required />
          <input type="text" name="faculty" placeholder="Faculty" value={faculty} onChange={this.handleChange} required />
          <input type="text" name="score" placeholder="Score" value={score} onChange={this.handleChange} required />
          <input type="text" name="workplace" placeholder="Workplace" value={workplace} onChange={this.handleChange} required />
          <input type="text" name="city" placeholder="City" value={city} onChange={this.handleChange} required />
          <button type="submit">Add Student</button>
        </form>
      </div>
    );
  }
}

export default AddStudent;
