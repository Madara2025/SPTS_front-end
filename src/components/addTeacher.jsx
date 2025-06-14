    import React, { useState } from 'react';
    import { Form, Button, Container, Row, Col } from 'react-bootstrap';
    import axios from 'axios';
    import { useNavigate } from 'react-router';
    
    
    function Add_Teacher() {
        const [values, setValues] = useState({
            emp_id: '',
            last_name: '',
            other_names: '',
            address: '',
            email: '',
            birth_day: '',
            personal_title: '',
            role: '',
            contact_number: '',
            user_name: '',
            nic_number: '',
           
        });
    
        
        const handleChange = (event) => {
            const { name, value } = event.target;
            setValues((preValues) => ({
                ...preValues,
                [name]: value,
            }));
        };
    
        const handleSubmit = async (event) => {
            event.preventDefault();
            const backendURL = 'http://127.0.0.1:5000';
    
            try {
                const response = await axios.post(`${backendURL}/teachers`, {
                    emp_id: values.emp_id,
                    last_name: values.last_name,
                    other_names: values.other_names,
                    address: values.address,
                    email: values.email,
                    birth_day: values.birth_day,
                    personal_title: values.personal_title,
                    role: values.role,
                    contact_number: values.contact_number,
                    user_name: values.user_name,
                    nic_number: values.nic_number,
                    permission: 'TRUE'
    
                });
    
                console.log('Teacher addedd successfully: ', response.data);
    
            } catch (error) {
                console.error('Error adding teacher:', error);
            }
        };
    
        return (
            <Container className="mt-4">
                <h2 className="mb-4">Add Teacher</h2>
                <Form onSubmit={handleSubmit}>
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
    
                    <Row>
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
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Birth Day</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="birth_day"
                                    value={values.birth_day}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
    
                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            type="text"
                            name="role"
                            value={values.role}
                            onChange={handleChange}
                            required
                            placeholder="Enter role - teacher/principal"
                        />
                    </Form.Group>
    
                    <Row>
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
    
                    <Form.Group className="mb-3">
                        <Form.Label>Emp id</Form.Label>
                        <Form.Control
                            type="text"
                            name="emp_id"
                            value={values.emp_id}
                            onChange={handleChange}
                            required
                            placeholder="Enter emp id"
                        />
                    </Form.Group>
    
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
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>NIC Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nic_number"
                                    value={values.nic_number}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter nic number"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
    
                    <Button variant="primary" type="submit">
                        Add Teacher
                    </Button>
                </Form>
            </Container>
        );
    };
    
    export default Add_Teacher;
