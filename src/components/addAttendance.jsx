import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Table, Dropdown } from 'react-bootstrap';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

function Add_Attendance() {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    //const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch student data
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/students/class/1');
                setAttendanceRecords(response.data);
                console.log(response.data);
            } catch (error) {

                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <Container className="mt-4">
            
            <h2 className="mb-4">Add Attendance</h2>
            <Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Index Number</th>
                            <th>Last Name</th>
                            <th>Other Names</th>
                            <th>Grade</th>
                            <th>Class Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                   <tbody>
                        {attendanceRecords.map((record) => (
                            // Add the key prop here, using record.student_id as the unique key
                            <tr key={record.student_id}>
                                <td>{record.student_id}</td>
                                <td>{record.index_number}</td>
                                <td>{record.student_last_name}</td>
                                <td>{record.student_other_names}</td>
                                <td>{record.grade}</td>
                                <td>{record.class_name}</td>
                                <td> </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Form>
        </Container>
    );
}

export default Add_Attendance;
