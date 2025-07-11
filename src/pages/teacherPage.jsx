import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../api';


function TeacherPage() {
    const { teacher_id } = useParams();
    const navigate = useNavigate();

    const [sclass, setSclass] = useState([]);

    // Function to fetch class name data
    const fetchSclass = async () => {
        try {
            const response = await api.get(`/teacher/${teacher_id}`);
            setSclass(response.data);
            console.log(response.data);
        } catch (error) {

            console.error("Error fetching classes:", error);
        }
    };
    //fetch student details from backend

    useEffect(() => {
        fetchSclass();
    }, [teacher_id]); // dependency array 

    // Redirect to add marks Page
  const handleAdd = (class_id,teacher_id,subject_id) => {
    navigate(`/teacherPage/${class_id}/${teacher_id}/${subject_id}`);
  };



    return (
        <Container fluid>
            <Row>

                <Table striped bordered hover responsive="lg">
                    <thead>
                        <tr>
                            <th>Add Student Marks</th>
                            <th>View Student Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sclass.map((sclasss) => (
                            <tr key={sclasss.assignment_id}>
                                <td>
                                    <Button onClick={() => handleAdd(sclasss.class_id,sclasss.teacher_id, sclasss.subject_id)} variant="outline-success" size="lg">
                                        {sclasss.grade}-{sclasss.Class_name} {sclasss.subject_name}({sclasss.Medium})
                                    </Button>
                                </td>
                                <td>
                                    <Button onClick={() => handleUpdate(sclasss.class_id)} variant="outline-success" size="lg">
                                        {sclasss.grade} {sclasss.Class_name} {sclasss.subject_id}({sclasss.Medium})
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>

        </Container >
    );

}

export default TeacherPage;
