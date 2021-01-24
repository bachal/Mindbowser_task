import React, { useState } from 'react';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter, Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import RegistrationForm from '../RegistrationForm/RegistrationForm.js'
import TableData from '../TableData/TableData.jsx'



function Viewdata(props) {


    let first_name=props.first_name;

    return(

        <form>
                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">FIRST NAME</label>
                                    <input type="text"
                                        className="form-control"
                                        id="first_name"
                                        placeholder="Enter First name"
                                        value={props.first_name}
                                     disabled/>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">LAST NAME</label>
                                    <input type="text"
                                        className="form-control"
                                        id="last_name"
                                        placeholder="Enter Last Name"
                                        value={props.last_name}
                                       
                                        disabled/>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">ADDRESS</label>
                                    <input type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="Enter Address"
                                        value={props.address}
                                       
                                        disabled/>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">EMAIL ADDRESS</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter email"
                                        value={props.email}
                                        disabled/>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">COMPANY</label>
                                    <input type="text"
                                        className="form-control"
                                        id="company"
                                        placeholder="Enter Company"
                                        value={props.company}
                                        disabled/>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">CITY</label>
                                    <input type="text"
                                        className="form-control"
                                        id="city"
                                        placeholder="Enter City"
                                        value={props.city}
                                        disabled/>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">DOB</label>
                                    <input type="date"
                                        className="form-control"
                                        id="dob"
                                        placeholder="Enter DOB"
                                        value={props.dob}
                                        disabled/>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">MOBILE</label>
                                    <input type="text"
                                        className="form-control"
                                        id="mobile"
                                        placeholder=""
                                        value={props.mobile}
                                        disabled/>
                                </div>
                                

                                
                            </form>





    )
}


export default Viewdata