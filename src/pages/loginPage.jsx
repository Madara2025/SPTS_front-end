import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/loginPage.css'
import tokenVerify from '../components/tokenVerify';


function Login() {
  const [user_name, setUser_name] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post('http://localhost:5000/login', {
        user_name: user_name,
        password: password,
      });

      setSuccess(response.data.message);

      localStorage.setItem('token', response.data.token);
      // console.log(response.data);
      await tokenVerify();


      // Check for admin role and redirect accordingly
      if (response.data.user && response.data.user.permission == "TRUE" && response.data.user.role == "Administrator") {
        navigate('/studentManagement');
      }
      else if (response.data.user && response.data.user.permission == "TRUE" && response.data.user.role == "teacher") {
        navigate('/studentManagement');
      } else {
        console.log("Permission Removed")
        alert('Permission denied. Please contact your administrator')
      }

    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error('Login error:', err); // Log the error
      console.error(err.response.data.error);
      alert('Login error: ' + err.response.data.error);
    }
  };

  return (

    <Card style={{ width: '36rem' }} className="text-start">
      <Card.Body>
        <Card.Title style={{ color: '#1A0585' }} className="text-center">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail"  >
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="user_name"
              placeholder="Enter User Name"
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" >
              Login
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>


  );
}

export default Login;