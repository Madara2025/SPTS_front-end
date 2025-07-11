import { Form, Table, Container, Button,Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../api';


function AddStudentMarks() {
    const { class_id, teacher_id: param_teacher_id, subject_id: param_subject_id } = useParams();

    const navigate = useNavigate();

    const [student, setstudent] = useState([]);
    const [marksData, setMarksData] = useState({});
    const [subjectId, setSubjectId] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [termYear, setTermYear] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Function to fetch class name  and student data

    const fetchStudent = async () => {
        try {
            const response = await api.get(`/teacher/subject/${class_id}/${param_teacher_id}/${param_subject_id}`);
            setstudent(response.data);
            console.log(response.data);
        } catch (error) {

            console.error("Error fetching students:", error);
        }
    };
    //fetch student details from backend

    useEffect(() => {
        setTeacherId(param_teacher_id);
        setSubjectId(param_subject_id);
        fetchStudent();
    }, [class_id, param_teacher_id, param_subject_id]); // dependency array 

    const handleMarksChange = (studentId, value) => {
        // Frontend validation - only allow numbers
        if (value === '' || /^\d+$/.test(value)) {
            setMarksData(prev => ({ ...prev, [studentId]: value }));
        }
    };

    const validateForm = () => {
        if (!termYear.trim()) { // Trim to check for empty string after whitespace
            setError('Term Year is required.');
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
            const marks_submit = student.map(sdetails => ({

                student_id: sdetails.student_id,
                subject_id: subjectId, // Use the state variable
                teacher_id: teacherId,
                marks: parseInt(marksData[sdetails.student_id] || 0),
                Term_year: termYear
            }));
            const response = await api.post(`/marks`, marks_submit);

            console.log('Marks addedd successfully: ', response.data);
            setSuccess(true);
            
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save marks');
            console.error('Error adding marks:', err);

        }
    };

    return (
        <Container className="mt-4">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Marks saved successfully!</Alert>}

            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>Subject ID: </Form.Label>
                    <Form.Control
                        type="text"
                        value={subjectId} // Display subjectId from state (initialized from params)
                        readOnly
                        disabled
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Teacher ID:</Form.Label>
                    <Form.Control
                        type="text" // Can be 'text' since it's read-only
                        value={teacherId} // Display teacherId from state (initialized from params)
                        readOnly
                        disabled
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
                            <th>Student ID</th>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Marks (0-100)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {student.map(sdetails => (
                            <tr key={sdetails.student_id}>
                                <td>{sdetails.student_id}</td>
                                <td>{sdetails.index_number}</td>
                                <td>{sdetails.last_name}, {sdetails.other_names}</td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={marksData[sdetails.student_id] || ''}
                                        onChange={(e) => handleMarksChange(sdetails.student_id, e.target.value)}
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
export default AddStudentMarks;
