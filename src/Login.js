import React, { useState } from 'react';
import UserService from './UserService'; // Assuming you have a UserService for backend connection
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    email: '',
    pazz: ''
  });
  const navigate = useNavigate();

  // State to manage error messages
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // Call UserService to authenticate user
      const response = await UserService.userLogin(formData);
      // Handle successful login
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        const res = response.data;
        sessionStorage.setItem("userId", res.id);
        navigate("/dashboard",{ state : {res} });
      }

    } catch (error) {
      // Handle login error
      setError('Invalid username or password');
      console.error('Login error:', error);
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <div className='user-login-form'>


        <div className="d-flex justify-content-end mt-1 ">
          <Link to={"/"}><button className="btn btn-secondary me-4"><i class="bi bi-backspace"></i></button></Link>
        </div>
        <div className="login-container">

          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Welcome Back..!</h1>
            <p>Please login to your account</p>
            <div className="input-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="pazz"
                name="pazz"
                placeholder="Password"
                value={formData.pazz}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit " className='login-button rounded-5 shadow'><strong>Login</strong></button>
            <div className="bottom-text">
              <p>Don't have an account? <a href="/register">Sign Up</a></p>

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
