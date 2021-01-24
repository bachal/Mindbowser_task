import React, { useState } from 'react';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter, Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import RegistrationForm from '../RegistrationForm/RegistrationForm.js'
import TableData from '../TableData/TableData.jsx'



function Dashboards(props) {
    let datas;
   let chk;
    const [state , setState] = useState({
        primary_key:""
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    
    

    fetch('http://127.0.0.1:8000/all_employee/', {
        method: "GET",

        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem('token')
        },
        //body: JSON.stringify(signup_data)
    }).then(res => res.json())
        .then(json => { console.log(json) 

            
        let all_employee_data=json;
        let str="";
        for(let i=0;i<all_employee_data.length;i++){
        str+='<tr><td>'+all_employee_data[i]['first_name'] +'</td><td> '+all_employee_data[i]['last_name']+'</td><td>'+all_employee_data[i]['email']+'</td><td>'+all_employee_data[i]['company']+'</td><td><div class="btn-group btn-group-sm"><button type="button" class="btn btn-primary "  onClick={ck} >VIEW</button><button type="button" class="btn btn-warning">UPDATE</button><button type="button" class="btn btn-danger">DELETE</button></div></td></tr>';
        }
        //document.getElementById("table_fill").innerHTML=str;
       
        let all_items=json
         chk = all_items.map((id,i) => {
            return <TableData f_name={all_items[i].first_name} l_name={all_items[i].last_name} email={all_items[i].email}/>
         })
        console.log(chk);
    
        });

        



        
        
    return (

        <div class="container">

           {chk}
           
        </div>


    )

}


export default Dashboards;