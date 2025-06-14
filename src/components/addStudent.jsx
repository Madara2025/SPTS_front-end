
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router';


function Add_Student() {
    const [values, setValues] = useState({
        last_name: '',
        other_names: '',
        address: '',
        email: '',
        date_of_birth: '',
        parent_name: '',
        gender: '',
        contact_number: '',
        parent_nic: '',
        user_name: '',
        index_number: '',
        class_id: '',
       
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
            const response = await axios.post(`${backendURL}/students`, {
                last_name: values.last_name,
                other_names: values.other_names,
                address: values.address,
                email: values.email,
                date_of_birth: values.date_of_birth,
                parent_name: values.parent_name,
                gender: values.gender,
                contact_number: values.contact_number,
                parent_nic: values.parent_nic,
                user_name: values.user_name,
                index_number: values.index_number,
                class_id: values.class_id,
                permission: 'TRUE'

            });

            console.log('Student addedd successfully: ', response.data);

        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Add Student</h2>
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
                            <Form.Label>Date_of_birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="birth_day"
                                value={values.date_of_birth}
                                onChange={handleChange}
                            
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Parent Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="parent_name"
                        value={values.parent_name}
                        onChange={handleChange}
                        required
                        placeholder="Enter parent name"
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select name="gender" value={values.gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
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
                    <Form.Label>Parent NIC</Form.Label>
                    <Form.Control
                        type="text"
                        name="parent_nic"
                        value={values.parent_nic}
                        onChange={handleChange}
                        required
                        placeholder="Enter parent NIC"
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
                            <Form.Label>Index Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="index_number"
                                value={values.index_number}
                                onChange={handleChange}
                                required
                                placeholder="Enter index number"
                            />
                        </Form.Group>
                    </Col>
                </Row>  
                <Row>  
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Class_ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="class_id"
                                value={values.class_id}
                                onChange={handleChange}
                                required
                                placeholder="Enter Class_Id"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Add Student
                </Button>
            </Form>
        </Container>
    );
};

export default Add_Student;
