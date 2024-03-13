import React, { useState } from 'react';
import UserService from './UserService'; // Assuming you have a UserService for backend connection
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"
import { IoMdLogIn } from "react-icons/io";
import Home from './Home';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    pazz: ''
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call UserService to authenticate user
      const response = await UserService.userLogin(formData);
      // Handle successful login
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        const res = response.data;
        setFormData({
          email: '',
          pazz: ''
        })
        sessionStorage.setItem("userId", res.id);
        toast.success("Login successful..", res.userName);
        setTimeout(() => {
          navigate("/dashboard", { state: { res } });
        }, 2000);
      }
    } catch (error) {
      // Handle login error
      setFormData({
        email: '',
        pazz: ''
      })
      console.error('Login error:', error);
      toast.error("Invalid username or password");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <>
    <Home/>
      <div className="d-flex justify-content-center mt-5 h-50 ">
        <div className="form-container">
          <p className="title">Login {""}<IoMdLogIn /></p>
          <form className="form login-form" onSubmit={handleSubmit}>
            <div className="input-group login-form-group">
              <label htmlFor="username">Username / Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your username or email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group login-form-group mb-2">
              <label htmlFor="password">Password</label>

              <input
                type={showPassword ? 'text' : 'password'}
                name="pazz"
                id="pazz"
                placeholder="Enter your password"
                value={formData.pazz}
                onChange={handleChange}
                required
              />
              <span className='password-toggle'><i
                className={`password-toggle-icon ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                onClick={togglePasswordVisibility}
              /></span>

            </div>
            <div>
              <p className="forgot">
                <Link to="/register">Forgot Password</Link>
              </p>
            </div>
            <button className="sign">Sign in</button>
          </form>
          <div className="social-message">
            <div className="line" />
            <p className="message">Login with social accounts</p>
            <div className="line" />
          </div>
          <div className="social-icons">
            {/* Social icons */}
          </div>
          <p className="signup">
            Don't have an account?{" "}
            <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default Login;
