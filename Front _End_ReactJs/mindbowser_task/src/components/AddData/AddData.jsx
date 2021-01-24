import React, { useState } from 'react';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter, Link, Redirect, Route, Switch, useHistory } from "react-router-dom";



function AddData() {
    
        const [state, setState] = useState({
            email: "",
            first_name: "",
            last_name:"",
            address: "",
            company: "",
            city: "",
            dob: "",
            password: "",
            successMessage: null
        })

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
        
    }
    


    const sendDetailsToServer=()=>{


        console.log(state);
    }

    return(

        <form>
                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">FIRST NAME</label>
                                    <input type="text"
                                        className="form-control"
                                        id="first_names"
                                        placeholder="Enter first name"
                                        onChange={handleChange}
                                        value={state.first_name}/>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">LAST NAME</label>
                                    <input type="text"
                                        className="form-control"
                                        id="last_name"
                                        placeholder="Enter last name"
                                        onChange={handleChange}
                                        value={state.last_name}/>
                                       
                                        
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">ADDRESS</label>
                                    <input type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="Enter address"
                                        onChange={handleChange}
                                        value={state.address}/>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">EMAIL ADDRESS</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter email"
                                        onChange={handleChange}
                                        value={state.email}/>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">COMPANY</label>
                                    <input type="text"
                                        className="form-control"
                                        id="company"
                                        placeholder="Enter  company"
                                        onChange={handleChange}
                                        value={state.company}/>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">CITY</label>
                                    <input type="text"
                                        className="form-control"
                                        id="city"
                                        placeholder="Enter city"
                                        onChange={handleChange}
                                        value={state.city}/>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">DOB</label>
                                    <input type="date"
                                        className="form-control"
                                        id="dob"
                                        placeholder="Enter dob"
                                        onChange={handleChange}
                                        value={state.dob}/>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">PASSWORD</label>
                                    <input type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter  password"
                                        onChange={handleChange}
                                        value={state.password}/>
                                </div>
                                
                                <button type="button" class="btn btn-primary btn-sm btn-success col-1 col-md-1 col-lg-1 d-flex justify-content-center" onClick={sendDetailsToServer}>ADD</button>

                                
                            </form>





    )
}


export default AddData;