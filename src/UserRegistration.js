// UserRegistration.js
import React, { useState } from "react";
import UserService from "./UserService";
import "./UserRegistration.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { SiGnuprivacyguard } from "react-icons/si";
import Home from "./Home";



const UserRegistration = () => {
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        mobile: "",
        pazz: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.userCreate(userData)
            .then(response => {
                if (response.status === 201) {
                    toast.success("User created successfully");
                    setUserData({
                        userName: "",
                        email: "",
                        mobile: "",
                        pazz: ""
                    });
                }
            })
            .catch(error => {
                toast.error("Error creating user");
            });
    };

    return (
        <>
        <Home/>
            <div className="d-flex justify-content-center  mt-5 h-50 ">
                <div className="form-container col-md-4 col-sm-4 mb-4">
                    <p className="title">Sign up {""} <SiGnuprivacyguard/></p>
                    <form className="form login-form" onSubmit={handleSubmit}>
                        <div className="input-group login-form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="userName" id="userName" value={userData.userName} onChange={handleChange} required/>
                        </div>
                        <div className="input-group login-form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={userData.email} onChange={handleChange} required/>
                        </div>
                        <div className="input-group login-form-group">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="text" name="mobile" id="mobile" value={userData.mobile} onChange={handleChange} required/>
                        </div>
                        <div className="input-group login-form-group mb-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="pazz" id="pazz" value={userData.pazz} onChange={handleChange} required/>
                        </div>
                        <button type="submit" className="sign">Sign up</button>
                    </form>
                    <div className="social-message">
                        <div className="line" />
                        <span className="message fs-4"><FontAwesomeIcon icon={faFaceSmile} className="fs-3" /></span>
                        <div className="line" />
                    </div>
                    <div className="social-icons">
                        {/* Social icons */}
                    </div>
                    <p className="signup">
                        Do you have an account?{" "}
                        <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
};

export default UserRegistration;
