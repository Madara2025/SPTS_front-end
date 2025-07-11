import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import api from '../api';


function StudentMarksView() {
    const { student_id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        student_id: student_id,
        last_name: '',
        other_names: '',
        gender: '',
        index_number: '',
        class_name: '',     // From API (c.Class_name)
        grade: '',
        marks: [],
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get(`/student/${student_id}`);
                setValues({
                    student_id: response.data.student_id,
                    last_name: response.data.last_name,
                    other_names: response.data.other_names,
                    gender: response.data.gender,
                    index_number: response.data.index_number,
                    class_name: response.data.class_name,
                    grade: response.data.grade,
                    marks: response.data.marks,

                });
            } catch (error) {
                console.error('Error fetching employee:', error);
                alert('Could not find employee with this ID.');
            }
        };

        fetchEmployee();
    }, [student_id]);

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Student Details and Marks</h2>
            <div>
                {/* Student Details - Outside Table */}
                <Form className="mb-5 p-4 border rounded shadow-sm bg-light">
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm="4" className="fw-bold">Student ID:</Form.Label>
                                <Col sm="8"><Form.Control plaintext readOnly value={values.student_id} /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm="4" className="fw-bold">Name:</Form.Label>
                                <Col sm="8"><Form.Control plaintext readOnly value={`${values.other_names} ${values.last_name}`} /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm="4" className="fw-bold">Index No:</Form.Label>
                                <Col sm="8"><Form.Control plaintext readOnly value={values.index_number} /></Col>
                            </Form.Group>

                        </Col>
                        <Col md={6}>


                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm="4" className="fw-bold">Gender:</Form.Label>
                                <Col sm="8"><Form.Control plaintext readOnly value={values.gender} /></Col>
                            </Form.Group>


                        </Col>
                    </Row>
                </Form>

                {/* Class Details */}
                <Form className="mb-5 p-4 border rounded shadow-sm bg-light">
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label column sm="4" className="fw-bold">Class:</Form.Label>
                                <Col sm="8"><Form.Control plaintext readOnly value={`${values.class_name_names} ${values.grade}`} /></Col>
                            </Form.Group>
                        </Col>

                    </Row>
                </Form>

                {/* Marks Table */}
                <div className="p-4 border rounded shadow-sm bg-light">
                    <h3 className="mb-3">Marks</h3>
                    {values.marks && values.marks.length > 0 ? (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Subject ID</th>
                                    <th>Term/Year</th>
                                    <th>Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {values.marks.map((mark, index) => (
                                    <tr key={index}>
                                        
                                        <td>{mark.subject_id}</td>
                                        <td>{mark.term_year}</td>
                                        <td>{mark.marks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p className="text-center text-muted">No marks data available for this student.</p>
                    )}
                    
                </div>
            </div>

        </div>

    );




}
export default StudentMarksView;