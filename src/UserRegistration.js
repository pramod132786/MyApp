import React, { useState } from "react";
import UserService from "./UserService"; 
import "./UserRegistration.css" 
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';



const UserRegistration = () => {
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        pazz: ""
    });

    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Entered")
        UserService.userCreate(userData)
            .then(response => {
                if (response.status===201) {
                    console.log("User created successfully:", response.data);
                    // Optionally, you can redirect the user or show a success message here
                    setSuccess("User created successfully");
                }

            })
            .catch(error => {
                setSuccess("");
                console.error("Error creating user:", error);
                // Optionally, you can show an error message to the user
            });
    };

    return (
        <div className="container h-100 mt-1">
            <div className="d-flex justify-content-end">
                <Link to={"/"}><button className="btn btn-secondary"><i class="bi bi-backspace"></i></button></Link>
            </div>
            <div className="row align-items-center justify-content-center h-100 mt-5">
                <div className="col-md-5 col-sm-6">
                    <div className="card rounded-4 shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center">User Registration</h3>
                            {success && (
                                <p className="text-success text-center fs-5 fw-semibold">{success}</p>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Username"
                                        name="userName"
                                        value={userData.userName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        name="pazz"
                                        value={userData.pazz}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary col-6">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRegistration;
