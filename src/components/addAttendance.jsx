import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Table, ToggleButton } from 'react-bootstrap';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

function Add_Attendance() {
    const [sdetails, setSdetails] = useState([]);
    const [isPresent, setIsPresent] = useState(false); // Initialize as absent (unchecked)

    const handleAttendance = (event) => {
        // event.currentTarget.checked gives the boolean checked status of the checkbox
        setIsPresent(event.currentTarget.checked);
        //console.log(`Toggle button is now: ${event.currentTarget.checked ? 'Present' : 'Absent'}`);
    };

    //const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch student data
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/students/class/1');
                setSdetails(response.data);
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
            <div className="d-flex gap-2 mb-2">
                <Button variant="primary" size="lg" >
                    Class Name -
                </Button>
                <Button variant="primary" size="lg" >
                    Teacher's Name -
                </Button>
                <Button variant="primary" size="lg" >
                    Date -
                </Button>
            </div>
            <Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Index Number</th>
                            <th>Last Name</th>
                            <th>Other Names</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sdetails.map((details) => (
                            // Add the key prop here, using record.student_id as the unique key
                            <tr key={details.student_id}>
                                <td>{details.index_number}</td>
                                <td>{details.last_name}</td>
                                <td>{details.other_names}</td>
                                <td><ToggleButton
                                    className="mb-2"
                                    id="toggle-check"
                                    type="checkbox"
                                    variant={isPresent ? 'success' : 'danger'}
                                    checked={isPresent}
                                    value="1"
                                    onChange={handleAttendance}
                                >
                                    {isPresent ? 'Present' : 'Absent'}
                                </ToggleButton> </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default Add_Attendance;
