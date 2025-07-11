import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../pages/adminPage.css';

function AdminPage() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        
        <div className="admin-page-container">
            <Container className="text-center p-4">
                <Card className="admin-card">
                    <Card.Body>
                        <Card.Title className="admin-card-title">
                            Welcome, Administrator!
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
                                <Button
                                    variant="primary"
                                    onClick={() => handleNavigation('/addMarks')}
                                    className="admin-button hover-effect" >
                                    Add Student Marks
                                </Button>
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

export default AdminPage;
