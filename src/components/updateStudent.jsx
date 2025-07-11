
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import api from '../api';

function UpdateStudent() {
    const { student_id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        student_id: student_id || '',
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
        resetPassword: false, // Initialize resetPassword state
    });

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await api.get(`/students/${student_id}`);
                setValues({
                    student_id: response.data.student_id,
                    last_name: response.data.last_name,
                    other_names: response.data.other_names,
                    address: response.data.address,
                    email: response.data.email,
                    date_of_birth: response.data.date_of_birth? response.data.date_of_birth.substring(0, 10) : '',
                    parent_name: response.data.parent_name,
                    gender: response.data.gender,
                    contact_number: response.data.contact_number,
                    parent_nic: response.data.parent_nic,
                    user_name: response.data.user_name,
                    index_number: response.data.index_number,
                    class_id: response.data.class_id,
                    resetPassword: false, // Reset checkbox state when fetching employee
                });
            } catch (error) {
                console.error('Error fetching student:', error);
                alert('Could not find student with this ID.');
            }
        };

        fetchStudent();
    }, [student_id]);

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
            };

            if (values.resetPassword) {
                dataToUpdate.password = values.nic;
            }

            await api.put(`/employees/${values.empId}`, dataToUpdate);
            alert('Employee updated successfully!');
            navigate('/employeeManagement');
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Error updating employee.');
        }
    };

    return (
        <div>
            <h1>Update Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-4 mt-4">
                    <Form.Group as={Col} md="12">
                        <Form.Label>Employee ID = {values.empId}</Form.Label>
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
                    </Col>
                    <Col md={6}>
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
                    </Col>
                </Row>
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

                <Row className="mb-3 mt-4">
                    <Form.Group as={Col} md="6">
                        <Form.Check type="checkbox" id="reset-password-checkbox" label="Reset Password" name="resetPassword"
                            checked={values.resetPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Update Employee
                </Button>
            </Form>
        </div>
    );
}

export default UpdateStudent;
