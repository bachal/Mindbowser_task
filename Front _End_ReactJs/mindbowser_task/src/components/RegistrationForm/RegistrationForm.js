import React, { useState } from 'react';
import './RegistrationForm.css';
import LoginForm from '../LoginForm/LoginForm.js'
import { withRouter, Route, Redirect, Switch, Link } from "react-router-dom";


function RegistrationForm(props) {
    const [state, setState] = useState({
        email: "",
        first_name: "",
        last_name: "",
        address: "",
        company: "",
        city: "",
        dob: "",
        password: "",
        successMessage: null,
        email_errorMessage: "",
        first_name_errorMessage: "",
        last_name_errorMessage: "",
        address_errorMessage: "",
        company_errorMessage: "",
        city_errorMessage: "",
        dob_errorMessage: "",
        pass_errorMessage: "",
    })
    const [userErr, setUserErr] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))



    }

    const valid = (e) => {


        e.preventDefault();

        if (state.first_name.length < 3) {
            document.getElementById("fn").innerText = "Not valid Atleast 3 letters";
            { state.first_name_errorMessage = "Not Valid" }
        }
        else {
            document.getElementById("fn").innerText = "";
            { state.first_name_errorMessage = "Valid" }
        }

        if (state.last_name.length < 3) {

            document.getElementById("ln").innerText = "Not valid Atleast 3 letters";
            { state.last_name_errorMessage = "Not Valid" }
        }
        else {
            document.getElementById("ln").innerText = "";
            { state.last_name_errorMessage = "Valid" }
        }

        if (state.address < 3) {
            document.getElementById("ad").innerText = "Not valid Atleast 3 letters";
            { state.address_errorMessage = "Not Valid" }
        }
        else {
            document.getElementById("ad").innerText = "";
            { state.address_errorMessage = "Valid" }
        }

        if (state.email == "" || !(state.email.includes("@"))) {
            document.getElementById("em").innerText = "Not valid email";
            { state.email_errorMessage = "Not Valid" }

        }
        else {
            document.getElementById("em").innerText = "";
            { state.email_errorMessage = "Valid" }

        }
        if (state.company == "") {

            document.getElementById("comp").innerText = "Not valid Atleast 3 letters";
            { state.company_errorMessage = "Not Valid" }
        }
        else {
            document.getElementById("comp").innerText = "";
            { state.company_errorMessage = "Valid" }
        }


        if (state.city == "") {
            document.getElementById("ct").innerText = "Not valid Atleast 3 letters";
            { state.city_errorMessage = "Not Valid" }
        }
        else {
            document.getElementById("ct").innerText = "";
            { state.city_errorMessage = "Valid" }

        }

        if (state.dob == "") {

            document.getElementById("bd").innerText = "Not valid";
            { state.dob_errorMessage = "Not Valid" }
        }

        else {
            document.getElementById("bd").innerText = "";
            { state.dob_errorMessage = "Valid" }

        }
        if (state.password.length < 5) {

            document.getElementById("pas").innerText = "Not valid Atleast 3 letters";
            { state.pass_errorMessage = "Not Valid" }
        }

        else {
            document.getElementById("pas").innerText = "";
            { state.pass_errorMessage = "Valid" }

        }








    }

    const sendDetailsToServer = () => {
        const URL = 'http://127.0.0.1:8000/signup/'
        const signup_data = {
            "user": {
                "username": state.email,
                "email": state.email,
                "first_name": state.first_name,
                "last_name": state.last_name,
                "password": state.password
            },
            "address": state.address,
            "company": state.company,
            "dob": state.dob
        }
        fetch('http://127.0.0.1:8000/signup/', {
            method: "Post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signup_data)
        }).then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.message === "User sign up Successfully!!") {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Registration successful. Redirecting to home page..'
                    }))

                    redirectToLogin();

                } else {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Registration not successful.Try Again'
                    }))
                }

            });








    }

    

    const redirectToLogin = () => {
        
        props.history.push('/login');
    }



    const handleSubmitClick = (e) => {
        e.preventDefault();
        valid(e);
        if (state.first_name_errorMessage == "Valid" && state.email_errorMessage == "Valid" && state.last_name_errorMessage == "Valid" && state.address_errorMessage == "Valid" && state.company_errorMessage == "Valid" && state.city_errorMessage == "Valid" && state.dob_errorMessage == "Valid" && state.pass_errorMessage == "Valid") {
            sendDetailsToServer()
        }


    }


    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">FIRST NAME</label>
                    <input type="text"
                        className="form-control"
                        id="first_name"
                        placeholder="Enter First name"
                        value={state.first_name}
                        onChange={handleChange}

                    />
                    <p className="text-danger text-20" id="fn"></p>


                </div>

                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">LAST NAME</label>
                    <input type="text"
                        className="form-control"
                        id="last_name"
                        placeholder="Enter Last Name"
                        value={state.last_name}
                        onChange={handleChange}
                    />
                    <p className="text-danger text-20" id="ln"></p>


                </div>

                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">ADDRESS</label>
                    <input type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter Address"
                        value={state.address}
                        onChange={handleChange}
                    />
                    <p className="text-danger text-20" id="ad"></p>

                </div>

                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">EMAIL ADDRESS</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange}
                    />
                    <p className="text-danger text-20" id="em"></p>

                </div>

                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">COMPANY</label>
                    <input type="text"
                        className="form-control"
                        id="company"
                        placeholder="Enter Company"
                        value={state.company || ''}
                        onChange={handleChange}
                    />
                    <p className="text-danger text-20" id="comp"></p>

                </div>

                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">CITY</label>
                    <input type="text"
                        className="form-control"
                        id="city"
                        placeholder="Enter City"
                        value={state.city}
                        onChange={handleChange}
                    />
                    <p className="text-danger text-20" id="ct"></p>

                </div>

                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">DOB</label>
                    <input type="date"
                        className="form-control"
                        id="dob"
                        placeholder="Enter DOB"
                        value={state.dob}
                        onChange={handleChange}
                    />
                    <p className="text-danger text-20" id="bd"></p>

                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                    <p className="text-danger text-20" id="pas"></p>

                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>

                <span className="loginText" >

                    <Link to="/login">Login</Link>
                </span>

            </div>

        </div>
    )
}

export default withRouter(RegistrationForm);