
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import api from '../api';

function Update_Teacher() {
    const { teacher_id } = useParams();

    const navigate = useNavigate();
    const [values, setValues] = useState({
        teacher_id: teacher_id || '',
        emp_id: '',
        last_name: '',
        other_names: '',
        address: '',
        email: '',
        date_of_birth: '',
        personal_title: '',
        role: '',
        contact_number: '',
        user_name: '',
        nic_number: '',
        resetPassword: false, // Initialize resetPassword state
    });

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await api.get(`/teachers/${teacher_id}`);
                setValues({
                    teacher_id: response.data.teacher_id,
                    emp_id:response.data.emp_id,
                    last_name: response.data.last_name,
                    other_names: response.data.other_names,
                    address: response.data.address,
                    email: response.data.email,
                    date_of_birth: response.data.date_of_birth ? response.data.date_of_birth.substring(0, 10) : '',
                    personal_title: response.data.personal_title,
                    role: response.data.role,
                    contact_number: response.data.contact_number,  
                    user_name: response.data.user_name,
                    nic_number: response.data.nic_number,
                    resetPassword: false, // Reset checkbox state when fetching employee
                });
            } catch (error) {
                console.error('Error fetching teacher:', error);
                alert('Could not find teacher with this ID.');
            }
        };

        fetchTeacher();
    }, [teacher_id]);

    const handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const dataToUpdate = {
                emp_id :values.emp_id,
                last_name: values.last_name,
                other_names: values.other_names,
                address: values.address,
                email: values.email,
                date_of_birth: values.date_of_birth,
                personal_title: values.personal_title,
                role: values.role,
                contact_number: values.contact_number,
                user_name: values.user_name,
                nic_number: values.nic_number,
                
            };

            if (values.resetPassword) {
                dataToUpdate.password = values.nic_number;
            }
            await api.put(`/teachers/${values.teacher_id}`, dataToUpdate);

            alert('Teacher updated successfully!');
            navigate('/TeacherManagement');
        } catch (error) {
            console.error('Error updating teacher:', error);
            alert('Error updating teacher.');
        }
    };

    return (
        <div>
            <h1>Update Teacher</h1>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-4 mt-4">
                    <Form.Group as={Col} md="12">
                        <Form.Label>Teacher ID = {values.teacher_id}</Form.Label>
                    </Form.Group>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={values.last_name}
                                onChange={handleChange}
                                required
                                placeholder="Enter last name"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Other Names</Form.Label>
                            <Form.Control
                                type="text"
                                name="other_names"
                                value={values.other_names}
                                onChange={handleChange}
                                required
                                placeholder="Enter other names"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={values.address}
                                onChange={handleChange}
                                required
                                placeholder="Enter address"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter email"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="date_of_birth"
                                value={values.date_of_birth}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="contact_number"
                                value={values.contact_number}
                                onChange={handleChange}
                                required
                                placeholder="Enter contact number"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>NIC_number</Form.Label>
                            <Form.Control
                                type="text"
                                name="nic_number"
                                value={values.nic_number}
                                onChange={handleChange}
                                required
                                placeholder="Enter  NIC"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select name="role" value={values.role} onChange={handleChange} required>
                                    <option value="">Select role</option>
                                    <option value="teacher">teacher</option>
                                    <option value="principal">principal</option>
                                    <option value="admin female">admin</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                </Row>
                <Row>
                     <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="user_name"
                                value={values.user_name}
                                onChange={handleChange}
                                required
                                placeholder="Enter user name"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Emp ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="emp_id"
                                value={values.emp_id}
                                onChange={handleChange}
                                required
                                placeholder="Enter emp Id"
                            />
                        </Form.Group>
                    </Col>
 <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Personal title</Form.Label>
                                <Form.Select name="personal_title" value={values.personal_title} onChange={handleChange} required>
                                    <option value="">Select personal title</option>
                                    <option value="male">Mr.</option>
                                    <option value="married female">Mrs.</option>
                                    <option value="unmarried female">Miss.</option>
                                    <option value="other">Other</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                </Row>

                <Row className="mb-3 mt-4">
                    <Form.Group as={Col} md="6">
                        <Form.Check type="checkbox" id="reset-password-checkbox" label="Reset Password" name="resetPassword"
                            checked={values.resetPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Update Teacher
                </Button>
            </Form>
        </div>
    );
}

export default Update_Teacher;

