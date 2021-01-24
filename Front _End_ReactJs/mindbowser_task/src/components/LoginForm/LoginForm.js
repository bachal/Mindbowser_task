import React, { useState } from 'react';
import './LoginForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter, Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import RegistrationForm from '../RegistrationForm/RegistrationForm.js'


function LoginForm(props) {
    let history = useHistory();
    const [state, setState] = useState({
        username: "",
        password: "",
        successMessage: null,
        usernameErrormessage: "",
        passwordErrormessage: "",

    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }




    const valid = (e) => {


        e.preventDefault();

        if (state.username.length < 3 || !(state.username.includes("@"))) {
            document.getElementById("un").innerText = "Not valid ";
            { state.usernameErrormessage = "Not Valid" }
        }
        else {
            document.getElementById("un").innerText = "";
            { state.usernameErrormessage = "Valid" }
        }

        if (state.password.length < 3) {

            document.getElementById("pass").innerText = "Not valid ";
            { state.passwordErrormessage = "Not Valid" }
        }
        else {
            document.getElementById("pass").innerText = "";
            { state.passwordErrormessage = "Valid" }
        }

    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        valid(e)
        if (state.usernameErrormessage == "Valid" && state.passwordErrormessage == "Valid") {
            const payload = {
                "username": state.username,
                "password": state.password,
            }


            fetch('http://127.0.0.1:8000/api/token/', {
                method: "Post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).then(res => res.json())
                .then(json => {
                   
                    if ("access" in json) { /** will return true if exist */

                        localStorage.setItem('token', json.access);
                        history.push("/dashboard");
                    }
                    else {
                        setState({ successMessage: "Please enter valid username and password" })

                    }
                });
        }
    }


    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                        className="form-control"
                        id="username"

                        placeholder="Enter email"
                        value={state.username}
                        onChange={handleChange}
                    />
                    <p className="text-danger text-20" id="un"></p>
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
                    <p className="text-danger text-20" id="pass"></p>
                </div>
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="mt-2 text-danger text-20">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" >

                    <Link to="/">Register</Link>
                </span>
            </div>
        </div>
    )
}

export default LoginForm;