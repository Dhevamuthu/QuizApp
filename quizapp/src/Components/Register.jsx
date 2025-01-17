import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
  MDBFile,
  MDBValidation,
  MDBValidationItem
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [thumbnail, setThumbnail] = useState('');
  const navigate = useNavigate(); // for navigation after registration

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Simulate saving to a database or an API call
    const userData = {
      username,
      email,
      password,
      role,
      thumbnail
    };

    console.log('User Details:', userData);

    // Redirect to Profile page after successful registration
    navigate('/profile', { state: userData });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64URL = await convertToBase64(file);
    setThumbnail(base64URL);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <MDBContainer fluid className='bg-light' style={{ marginTop:"3%",height:"800px"}}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol md='6' className='d-flex justify-content-center'>
          <MDBCard className='my-4' style={{ width: '1200px'}}>
            <MDBRow className='g-0'>
              <MDBCol md='6' className="d-none d-md-block">
                <MDBCardImage
                  src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp' 
                  alt="Sample photo" 
                  className="rounded-start" 
                  fluid 
                  style={{ height: '650px' }}
                />
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <h3 className="mb-5 text-uppercase fw-bold">Register</h3>

                  <MDBValidation onSubmit={handleSubmit}>
                  <MDBValidationItem feedback="Please enter a username." invalid>
                      <MDBInput
                        wrapperClass='mb-4'
                        label='Username'
                        size='lg'
                        id='username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </MDBValidationItem>

                    <MDBValidationItem feedback="Please enter a valid email." invalid>
                      <MDBInput
                        wrapperClass='mb-4'
                        label='Email'
                        size='lg'
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </MDBValidationItem>

                    <MDBValidationItem feedback="Please enter a password." invalid>
                      <MDBInput
                        wrapperClass='mb-4'
                        label='Password'
                        size='lg'
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </MDBValidationItem>

                    <MDBValidationItem feedback="Please confirm your password." invalid>
                      <MDBInput
                        wrapperClass='mb-4'
                        label='Confirm Password'
                        size='lg'
                        id='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </MDBValidationItem>

                    <div className='d-md-flex justify-content-start align-items-center mb-4'>
                      <h6 className="fw-bold mb-0 me-4">Role:</h6>
                      <MDBRadio 
                        name='role' 
                        id='student' 
                        value='student' 
                        label='Student' 
                        inline 
                        checked={role === 'student'} 
                        onChange={() => setRole('student')} 
                      />
                      <MDBRadio 
                        name='role' 
                        id='teacher' 
                        value='teacher' 
                        label='Teacher' 
                        inline 
                        checked={role === 'teacher'} 
                        onChange={() => setRole('teacher')} 
                      />
                    </div>

                    <MDBValidationItem feedback="Please upload a profile picture." invalid>
                      <MDBFile
                        wrapperClass='mb-4'
                        size='lg'
                        id='profilePicture'
                        label='Profile Picture'
                        accept=".png,.jpg,.jpeg,.jfif,.pjpeg,.pjp,.svg"
                        onChange={handleImageChange}
                        required
                      />
                    </MDBValidationItem>

                    <div className="d-flex justify-content-between pt-3">
                      <MDBBtn color='light' size='lg'>Reset</MDBBtn>
                      <MDBBtn type="submit" className='ms-2' color='warning' size='lg'>Register</MDBBtn>
                    </div>

                    <div className="text-center mt-3">
                      <p>
                        Already a user? <Link to="/login">Login</Link>
                      </p>
                    </div>
                  </MDBValidation>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
