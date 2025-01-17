import React, { useState } from 'react';
import axios from "axios";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  
  const handleLogin =async(e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    const payload = {
      email: email,
      password: password,
    };
    console.log('Payload:', payload);
    console.log("after patload");
    try {
      const res = await axios.post("http://localhost:5000/auth", payload);
      console.log('Response:', res); // Log the entire response to check the structure
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/"); // Ensure navigate is defined
      } else {
        console.error('Token not found in response');
      }
    } catch (err) {
      console.error('Error during login:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <MDBContainer>
        <MDBCard style={{ maxWidth: '400px', borderRadius: '15px', overflow: 'hidden' ,marginLeft:"30%"}}>
          <MDBCardBody className="text-center" style={{ padding: '30px', backgroundColor: '#fbc2eb ', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
            <h3 style={{ color: 'white', marginBottom: '10px' }}>Welcome Back</h3>
            <p style={{ color: 'white', marginBottom: '20px' }}>Please sign-in to continue!</p>
          </MDBCardBody>
          <MDBCardBody style={{ padding: '30px' }}>
            <form onSubmit={handleLogin}>
              <MDBInput
                wrapperClass='mb-4'
                label='Email'
                id='formControlLg'
                type='email'
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass='mb-4'
                label='Password'
                id='formControlLg'
                type='password'
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-center">
                <Link to="/" className="small text-muted" href="#!">Forget your password?</Link>
              </div>
              <MDBBtn className="w-100 mb-4" color='warning' size='lg' type="submit"style={{ backgroundColor: '#fbc2eb '  }} onClick={handleLogin}>Signin</MDBBtn>
            </form>
            <p className="text-center" style={{ color: '#888' }}>Don't have an account? <Link to="/register" style={{ color: '#e965e9' }}>Signup</Link></p>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Login;
