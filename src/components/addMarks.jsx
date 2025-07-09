import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

function Add_Marks() {
    const [sdetails, setSdetails] = useState([]);
    const [marksData, setMarksData] = useState({});
    const [subjectId, setSubjectId] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [termYear, setTermYear] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/students/class/1');
                setSdetails(response.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, []);

    const handleMarksChange = (studentId, value) => {
        // Frontend validation - only allow numbers
        if (value === '' || /^\d+$/.test(value)) {
            setMarksData(prev => ({ ...prev, [studentId]: value }));
        }
    };

    const validateForm = () => {
        if (!subjectId || !teacherId || !termYear) {
            setError('All fields are required');
            return false;
        }
        
        if (Object.values(marksData).some(mark => mark === '')) {
            setError('Please enter marks for all students');
            return false;
        }
        
        if (Object.values(marksData).some(mark => isNaN(mark) || mark < 0)) {
            setError('Marks must be positive numbers');
            return false;
        }
        
        setError(null);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            const marksEntries = sdetails.map(student => ({
                student_id: student.student_id,
                subject_id: subjectId,
                teacher_id: teacherId,
                marks: parseInt(marksData[student.student_id] || 0),
                Term_year: termYear
            }));

            await Promise.all(marksEntries.map(entry => 
                axios.post('http://127.0.0.1:5000/marks', entry)
            ));
            
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save marks');
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Add Marks</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Marks saved successfully!</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Subject ID</Form.Label>
                    <Form.Control
                        type="number"
                        min="1"
                        value={subjectId}
                        onChange={(e) => setSubjectId(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Teacher ID</Form.Label>
                    <Form.Control
                        type="number"
                        min="1"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Term Year</Form.Label>
                    <Form.Control
                        value={termYear}
                        onChange={(e) => setTermYear(e.target.value)}
                        placeholder="E.g., 2025 Term 2"
                        required
                    />
                </Form.Group>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Marks (0-100)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sdetails.map(student => (
                            <tr key={student.student_id}>
                                <td>{student.index_number}</td>
                                <td>{student.last_name}, {student.other_names}</td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={marksData[student.student_id] || ''}
                                        onChange={(e) => handleMarksChange(student.student_id, e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Button variant="primary" type="submit" className="mt-3">
                    Save All Marks
                </Button>
            </Form>
        </Container>
    );
}

export default Add_Marks;
