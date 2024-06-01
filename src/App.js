import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import JsonList from './pages/JsonList'
import Home from './pages/Home';
import './App.css';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/json-list" element={<JsonList />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={ <EditStudent />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
