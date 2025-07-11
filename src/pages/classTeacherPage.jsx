import { Card, Button, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../pages/adminPage.css';

function Class_TeacherPage() {
    const navigate = useNavigate();
    const [selectedClass, setSelectedClass] = useState(null);

    const handleNavigation = (path) => {
        navigate(path);
    };
    const handleClassSelection = (classId) => {
        setSelectedClass(classId); // Update the state with the selected class ID
        navigate(`/addMarks/${classId}`); // Navigate to marks page with class ID
    };

    return (

        <div className="admin-page-container">
            <Container className="text-center p-4">
                <Card className="admin-card">
                    <Card.Body>
                        <Card.Title className="admin-card-title">
                            Welcome to D. B. Wijethunga National School
                        </Card.Title>
                        <Row className="justify-content-center g-4">
                            <Col xs={12} md={6}>
                                <Button
                                    variant="primary"
                                    onClick={() => handleNavigation('/teacherManagement')}
                                    className="admin-button hover-effect" >
                                    Teacher Management
                                </Button>
                            </Col>
                            <Col xs={12} md={6}>
                                <Button
                                    variant="primary"
                                    onClick={() => handleNavigation('/studentManagement')}
                                    className="admin-button hover-effect" >
                                    Student Management
                                </Button>
                            </Col>
                            <Col xs={12} md={6}>
                                <DropdownButton
                                    id="dropdown-marks-button" // Changed ID for clarity
                                    title={selectedClass ? `Marks for ${selectedClass}` : "Add Student Marks"}
                                    variant="primary"
                                    className="admin-button hover-effect"
                                >
                                    <Dropdown.Item onClick={() => handleClassSelection('Class1A')}>Class 1A</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleClassSelection('Class1B')}>Class 1B</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleClassSelection('Class2A')}>Class 2A</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleClassSelection('Class2B')}>Class 2B</Dropdown.Item>
                                    {/* Add more classes as needed */}
                                </DropdownButton>
                            </Col>
                            <Col xs={12} md={6}>
                                <Button
                                    variant="primary"
                                    onClick={() => handleNavigation('/addAttendance')}
                                    className="admin-button hover-effect" >
                                    Add Student Attendance
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Class_TeacherPage;
