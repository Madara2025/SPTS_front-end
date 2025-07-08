import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function StudentTable() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [alerts, setAlert] = useState({ show: false, message: '', variant: '' });


  // Function to fetch student data
  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {

      console.error("Error fetching students:", error);
    }
  };
  //fetch student details from backend
  useEffect(() => {
    fetchStudents();
  }, []); // Empty dependency array 

  // Redirect to Add Student Page
  const handleAddStudent = () => {
    navigate(`/studentManagement/addStudent`);
  };

  // Redirect to Student Update Page
  const handleUpdate = (index_number) => {
    navigate(`/studentManagement/updateStudent/${index_number}`);
  };

  //Remove Student Access
  const handleRemovePermission = async (index_number) => {
    try {
      await api.put(`/students/remove/${index_number}`, { permission: "FALSE" });
      navigate(`/studentManagement`);
      alert("Successfully removed" + index_number)

      // After removing permission, refresh the employee list
      const response = await api.get(`/students`);
      setStudents(response.data);
      console.log(response.data)

    } catch (error) {
      console.error('Error removing permission:', error);
    }
  };


  //Give Student Access
  const handleGivePermission = async (index_number) => {
    try {
      await api.put(`/students/remove/${index_number}`, { permission: "TRUE" });
      navigate(`/studentManagement`);
      alert("Successfully Actived" + index_number)

      const response = await api.get(`/students`);
      setStudents(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error giveing permission:', error);
    }
  };

  return (
    <Container fluid>
      <Row className="mb-5">
        <Col className="d-flex justify-content-end">
          <h4>Click to add new student</h4>
        </Col>
        <Col className="d-flex justify-content">
          <Button onClick={handleAddStudent} variant="primary">
            Add New Student
          </Button>
        </Col>
      </Row>
      <Row>
        <h2 style={{ textDecoration: 'underline' }}>Student Details</h2>

        <Table striped bordered hover responsive="lg">
          <thead>
            <tr>
              <th>Student_ID</th>
              <th>Last Name</th>
              <th>Other Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Date_of_birth</th>
              <th>Parent Name</th>
              <th>Gender </th>
              <th>Contact Number</th>
              <th>Parent NIC</th>
              <th>User Name</th>
              <th>Index Number</th>
              <th>Class_ID</th>
              <th>Update Student</th>
              <th>Change Access</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.last_name}</td>
                <td>{student.other_names}</td>
                <td>{student.address}</td>
                <td>{student.email}</td>
                <td>{new Date(student.date_of_birth).toLocaleDateString()}</td>
                <td>{student.parent_name}</td>
                <td>{student.gender}</td>
                <td>{student.contact_number}</td>
                <td>{student.parent_nic}</td>
                <td>{student.user_name}</td>
                <td>{student.index_number}</td>
                <td>{student.class_id}</td>
                <td>
                  <Button onClick={() => handleUpdate(student.index_number)} variant="outline-success" size="sm">
                    Update
                  </Button>
                </td>
                <td>
                  {student.permission === "TRUE" ? (
                    <Button
                      onClick={() => handleRemovePermission(student.index_number)}
                      variant="outline-secondary" size="sm"
                    > Active
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleGivePermission(student.index_number)}
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

export default StudentTable;