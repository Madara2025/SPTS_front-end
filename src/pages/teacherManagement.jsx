import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function TeacherTable() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch teacher data
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/teachers');
        setTeachers(response.data);
        console.log(response.data);
      } catch (error) {

        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []); // Empty dependency array 

  // Redirect to Add Teacher Page
  const handleAddTeacher = () => {
    navigate(`/teacherManagement/addTeacher`);
  };

  // Redirect to Teacher Update Page
  const handleUpdate = (emp_id) => {
    navigate(`/teacherManagement/updateTeacher/${emp_id}`);
  };

  //Remove Teacher Access
  const handleRemovePermission = async (emp_id) => {
    try {
      await axios.put(`http://127.0.0.1:5000/teachers/remove/${emp_id}`, { permission: "FALSE" });
      navigate(`/teacherManagement`);
      alert("Successfully removed teacher" + emp_id)

      // After removing permission, refresh the teacher list
      const response = await axios.get(`http://127.0.0.1:5000/teachers`);
      setTeachers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error removing teacher permission:', error);
    }
  };

  //Give Student Access
  const handleGivePermission = async (emp_id) => {
    try {
      await axios.put(`http://127.0.0.1:5000/teachers/remove/${emp_id}`, { permission: "TRUE" });
      navigate(`/teacherManagement`);

      const response = await axios.get(`http://127.0.0.1:5000/teachers`);
      setTeachers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error giveing permission:', error);
    }
  };

  return (
    <Container fluid>
      <Row className="mb-5">
        <Col className="d-flex justify-content-end">
          <h4>Click to add new Teacher</h4>
        </Col>
        <Col className="d-flex justify-content">
          <Button onClick={handleAddTeacher} variant="primary">
            Add New Teacher
          </Button>
        </Col>
      </Row>
      <Row>
        <h2 style={{ textDecoration: 'underline' }}>Teacher Details</h2>

        <Table striped bordered hover responsive="lg">
          <thead>
            <tr>
              <th>teacher ID</th>
              <th>Last Name</th>
              <th>Other Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Date of birth</th>
              <th>Personal_Title</th>
              <th>Role</th>
              <th>Contact Number</th>
              <th>User Name</th>
              <th>Nic Number</th>
              <th>Emp ID</th>
              <th>Update Student</th>
              <th>Change Access</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.teacher_id}>
                <td>{teacher.teacher_id}</td>
                <td>{teacher.last_name}</td>
                <td>{teacher.other_names}</td>
                <td>{teacher.address}</td>
                <td>{teacher.email}</td>
                <td>{new Date(teacher.date_of_birth).toLocaleDateString()}</td>
                <td>{teacher.personal_title}</td>
                <td>{teacher.role}</td>
                <td>{teacher.contact_number}</td>
                <td>{teacher.user_name}</td>
                <td>{teacher.nic_number}</td>
                <td>{teacher.emp_id}</td>
                <td>
                  <Button onClick={() => handleUpdate(teacher.emp_id)} variant="outline-success" size="sm">
                    Update
                  </Button>
                </td>
                <td>
                  {teacher.permission === "TRUE" ? (
                    <Button
                      onClick={() => handleRemovePermission(teacher.emp_id)}
                      variant="outline-secondary" size="sm">
                      Active
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleGivePermission(teacher.emp_id)}
                      variant="outline-danger" size="sm" >
                      Removed
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>

    </Container >
  );
}

export default TeacherTable;