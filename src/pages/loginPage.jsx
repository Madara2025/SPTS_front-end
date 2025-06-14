import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios, { Axios, AxiosError } from 'axios';
import { useState } from 'react';
import '../pages/loginPage.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setErr] = useState('');
  //const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); //sending data via AJAX without a page reload..
    setErr('');
    //setSuccess('');


    //send email and password to back_end then check and give respon to browser
    try {

      const response = await axios.post('http://127.0.0.1:5000/login', { email: email, password: password });

      
      localStorage.setItem('token', response.data.token);// token store
      console.log(response.data);

      window.location.href ='/student';
    }



    catch (er) { 
      if(er.response && er.response.data && er.response.data.error){
        setErr(er.response.data.error);
      }else{
        setErr('An error occurred.Please try again');
      }
      console.error('Loging error:', er);
      alert('Loging error:' + er.response.data.message);
    }

  };

  return (

    <Card style={{ width: '36rem' }} className="text-start">
      <Card.Body>
        <Card.Title style={{ color: '#1A0585' }} className="text-center">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail"  >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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