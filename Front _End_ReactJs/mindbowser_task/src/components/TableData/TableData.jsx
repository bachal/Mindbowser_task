import React, { useState } from 'react';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter, Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import Dashboard from '../Dashboard/Dashboard.js'



function TableData(props) {



    return (

        

            <table class="table">
                <thead>
                    <tr>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>EMAIL</th>
                        <th>COMPANY</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody id="table_fill">

                     <tr>
                         <td>{props.f_name}</td>
                         <td>{props.l_name}</td>
                         <td>{props.email}</td>
                         <td></td>
                    </tr>
                </tbody>
            </table>
       


    )
}



export default  TableData;