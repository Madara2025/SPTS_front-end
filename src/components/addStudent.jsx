import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import api from '../api';
import { useNavigate } from 'react-router';


function Add_Student() {

    const navigate = useNavigate()//why this serch

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
        subjects_category: {},
    });

    const [groupedSubjects, setGroupedSubjects] = useState({}); // New state to store fetched subjects


    // Fetch subjects when the component mounts
    useEffect(() => {
        const fetchSubjects = async () => {

            try {
                const response = await api.get('/subjects');

                setGroupedSubjects(response.data); // Store the grouped data directly
                console.log('Grouped subjects fetched successfully:', response.data);

            } catch (error) {
                console.error('Error fetching grouped subjects:', error);

                if (error.response && error.response.data && error.response.data.error) {
                    alert('Error fetching subjects: ' + error.response.data.error);

                } else {
                    alert('An unexpected error occurred while fetching subjects.');
                }
            }
        };
        fetchSubjects();
    }, []); // Empty dependency array means this effect runs once after the initial render


    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((preValues) => ({
            ...preValues,
            [name]: value,
        }));
    };

    // Handler for radio button change for multiple categories
    const handleSubjectSelection = (event) => {
        const { name, value } = event.target;

        // Extract the original category name from the radio button's 'name'
        // Assuming name is like 'CATEGORY_subjects' (e.g., 'C1_subjects')
        const category = name.replace('_subjects', '');

        setValues((prevValues) => ({
            ...prevValues,
            subjects_category: {
                ...prevValues.subjects_category,
                [category]: value, // Store the selected subject_id for this category
            },
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const selectedSubjectsArray = Object.values(values.subjects_category);

        try {
            
            const response = await api.post('/students',{
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
                permission: 'TRUE',
                selected_subjects: selectedSubjectsArray,


            });

            console.log('Student added successfully: ', response.data);
            alert('Student added successfully');


        } catch (error) {
            console.error('Error adding student:', error);
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('An unexpected error occurred.');
            }


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
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Select Subjects</Form.Label>
                            {Object.keys(groupedSubjects).length > 0 ? (
                                <div className="border p-3" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                    {/* Iterate over each category */}
                                    {Object.entries(groupedSubjects).map(([category, subjectsArray]) => (
                                        <div key={category} className="mb-3">
                                            <h5>{category}</h5> {/* Display category name as a heading */}
                                            {subjectsArray.map((subject) => (
                                                <Form.Check
                                                    key={subject.subject_id}
                                                    type="radio"
                                                    id={`subject-${category}-${subject.subject_id}`} // Unique ID
                                                    name={`${category}_subjects`} // Unique name for each category's radio group
                                                    label={`${subject.subject_name} (${subject.medium})`}
                                                    value={subject.subject_id}
                                                    checked={values.subjects_category[category] === subject.subject_id.toString()}
                                                    onChange={handleSubjectSelection}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No subjects available.</p>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Add Student
                </Button>
            </Form>
        </Container>
    );
}
export default Add_Student;

// // export default Add_Student;
// import React, { useState, useEffect } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router';

// function Add_Student() {
//     const navigate = useNavigate();

//     const [values, setValues] = useState({
//         last_name: '',
//         other_names: '',
//         address: '',
//         email: '',
//         date_of_birth: '',
//         parent_name: '',
//         gender: '',
//         contact_number: '',
//         parent_nic: '',
//         user_name: '',
//         index_number: '',
//         class_id: '',
//         // Initialize with subject IDs you want to be selected by default
//         // For example, if subject_id '1' and '3' should be default:
//         selected_subjects: [],
//     });

//     const [subjects, setSubjects] = useState([]); // State to store fetched subjects
//     const backendURL = 'http://127.0.0.1:5000';

//     // Fetch subjects when the component mounts
//     useEffect(() => {
//         const fetchSubjects = async () => {
//             try {
//                 const response = await axios.get(`${backendURL}/subjects`);
//                 setSubjects(response.data);
//                 console.log('Subjects fetched successfully:', response.data);

//                 // --- Set default selected subjects after subjects are fetched ---
//                 // Example: Automatically select subjects with IDs 1 and 3 if they exist
//                 const defaultSubjectIds = ['1', '3']; // Array of subject_ids you want to be pre-selected (as strings)
//                 const preSelected = response.data
//                     .filter(subject => defaultSubjectIds.includes(subject.subject_id.toString()))
//                     .map(subject => subject.subject_id.toString());

//                 setValues(prevValues => ({
//                     ...prevValues,
//                     selected_subjects: preSelected
//                 }));
//                 // --- End default selected subjects logic ---

//             } catch (error) {
//                 console.error('Error fetching subjects:', error);
//                 if (error.response && error.response.data && error.response.data.error) {
//                     alert('Error fetching subjects: ' + error.response.data.error);
//                 } else {
//                     alert('An unexpected error occurred while fetching subjects.');
//                 }
//             }
//         };
//         fetchSubjects();
//     }, []); // Empty dependency array means this effect runs once after the initial render

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setValues((prevValues) => ({
//             ...prevValues,
//             [name]: value,
//         }));
//     };

//     const handleSubjectChange = (event) => {
//         const subjectId = event.target.value;
//         const isChecked = event.target.checked;

//         setValues((prevValues) => {
//             if (isChecked) {
//                 // Add the subject ID if checked
//                 return {
//                     ...prevValues,
//                     selected_subjects: [...prevValues.selected_subjects, subjectId],
//                 };
//             } else {
//                 // Remove the subject ID if unchecked
//                 return {
//                     ...prevValues,
//                     selected_subjects: prevValues.selected_subjects.filter((id) => id !== subjectId),
//                 };
//             }
//         });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await axios.post(`${backendURL}/students`, {
//                 last_name: values.last_name,
//                 other_names: values.other_names,
//                 address: values.address,
//                 email: values.email,
//                 date_of_birth: values.date_of_birth,
//                 parent_name: values.parent_name,
//                 gender: values.gender,
//                 contact_number: values.contact_number,
//                 parent_nic: values.parent_nic,
//                 user_name: values.user_name,
//                 index_number: values.index_number,
//                 class_id: values.class_id,
//                 permission: 'TRUE',
//                 selected_subjects: values.selected_subjects,
//             });

//             console.log('Student added successfully: ', response.data);
//             alert('Student added successfully');
//             // Optionally navigate after successful submission
//             // navigate('/students-list');

//         } catch (error) {
//             console.error('Error adding student:', error);
//             if (error.response && error.response.data && error.response.data.error) {
//                 alert(error.response.data.error);
//             } else {
//                 alert('An unexpected error occurred.');
//             }
//         }
//     };

//     return (
//         <Container className="mt-4">
//             <h2 className="mb-4">Add Student</h2>
//             <Form onSubmit={handleSubmit}>
//                 <Row>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Last Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="last_name"
//                                 value={values.last_name}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Enter last name"
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Other Names</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="other_names"
//                                 value={values.other_names}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Enter other names"
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Address</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="address"
//                                 value={values.address}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Enter address"
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 name="email"
//                                 value={values.email}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Enter email"
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Date of birth</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 name="date_of_birth"
//                                 value={values.date_of_birth}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Contact Number</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="contact_number"
//                                 value={values.contact_number}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Enter contact number"
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Parent NIC</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="parent_nic"
//                                 value={values.parent_nic}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Enter parent NIC"
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Parent Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="parent_name"
//                                 value={values.parent_name}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Enter parent name"
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Gender</Form.Label>
//                             <Form.Select name="gender" value={values.gender} onChange={handleChange} required>
//                                 <option value="">Select Gender</option>
//                                 <option value="male">Male</option>
//                                 <option value="female">Female</option>
//                                 <option value="other">Other</option>
//                             </Form.Select>
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>User Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="user_name"
//                                 value={values.user_name}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Enter user name"
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Index Number</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="index_number"
//                                 value={values.index_number}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Enter index number"
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Class_ID</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="class_id"
//                                 value={values.class_id}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Enter Class_Id"
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 {/* --- Subject Selection --- */}
//                 <Row className="mb-3">
//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label>Select Subjects</Form.Label>
//                             {subjects.length > 0 ? (
//                                 <div className="border p-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
//                                     {subjects.map((subject) => (
//                                         <Form.Check
//                                             key={subject.subject_id}
//                                             type="checkbox"
//                                             id={`subject-${subject.subject_id}`}
//                                             label={`${subject.subject_name} (${subject.medium})`}
//                                             value={subject.subject_id.toString()} // Ensure value is string
//                                             checked={values.selected_subjects.includes(subject.subject_id.toString())} // Ensure consistent type for comparison
//                                             onChange={handleSubjectChange}
//                                         />
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <p>No subjects available.</p>
//                             )}
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 {/* --- End Subject Selection --- */}

//                 <Button variant="primary" type="submit">
//                     Add Student
//                 </Button>
//             </Form>
//         </Container>
//     );
// }

