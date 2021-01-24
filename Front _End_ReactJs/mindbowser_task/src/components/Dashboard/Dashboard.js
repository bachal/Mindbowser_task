import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Viewdata from '../Viewdata/Viewdata.jsx'
import ReactDOM from 'react-dom';
import Header from '../Header/Header.js'
import $ from 'jquery';


const Dashboard = () => {
    const myelement = <Header a="Dashboard" />;

    //------------------------ this state for new employee ----------------------------------
    const [new_employee, setnew_employee] = useState({
        email: "",
        first_names: "",
        last_name: "",
        address: "",
        company: "",
        city: "",
        dob: "",
        password: "",
        mobile: "",
        successMessage: null,
        email_errorMessage: "",
        first_names_errorMessage: "",
        last_name_errorMessage: "",
        address_errorMessage: "",
        company_errorMessage: "",
        city_errorMessage: "",
        dob_errorMessage: "",
        pass_errorMessage: "",
        mob_errorMessage: "",
    })

    // -------------------------this state for update employee  data----------------------------------
    const [updatestate, setupdatestate] = useState({
        id: "",
        email_update: "",
        first_name_update: "",
        last_name_update: "",
        address_update: "",
        company_update: "",
        city_update: "",
        dob_update: "",
        password_update: "",
        mobile_update: ""

    })

    const [updatepagenumber, setupdatepagenumber] = useState({
        page_number: 1
    })

    const [updatenextpage, setupdatenextpage] = useState({
        next_page: true
    })
    
    const prevbtndisabled=()=>{
        
     if(updatepagenumber.page_number<2){
       
         var btn = document.getElementById("pbtn");
         btn.disabled = true;
     }
     else{
        var btn = document.getElementById("pbtn");
        btn.disabled = false;


     }
     
    }

    

    document.addEventListener("DOMContentLoaded", function(e) {
        prevbtndisabled()
    });

    
    const prevChange = (e) => {
        if(updatepagenumber.page_number==1){
            updatepagenumber.page_number=1;
        }
        else{
            updatepagenumber.page_number=updatepagenumber.page_number-1;
        }
        getData()
        prevbtndisabled()

       
    }
    
    const nextChange = (e) => {
        
        if(updatenextpage.next_page==true){
        updatepagenumber.page_number=updatepagenumber.page_number+1;
        
        getData()
        }

        prevbtndisabled()
     }


    //-----------------this function use for add new employee------------------------------- 
    const handleChanges = (e) => {
        const { id, value } = e.target
        setnew_employee(new_employeeState => ({
            ...new_employeeState,
            [id]: value
        }))
    }

    //-----------------this function use for update employee------------------------------- 

    const handleChanged = (e) => {
        const { id, value } = e.target
        setupdatestate(updateState => ({
            ...updateState,
            [id]: value
        }))

    }
    //-----------------------this function used for validation ------------------------
    const valid = (e) => {
        e.preventDefault();
        if (new_employee.first_names.length < 3) {
            document.getElementById("fn").innerText = "Not valid Atleast 3 letters";
            { new_employee.first_names_errorMessage = "Not Valid" }
        }
        else {
            document.getElementById("fn").innerText = "";
            { new_employee.first_names_errorMessage = "Valid" }
        }

        if (new_employee.last_name.length < 3) {

            document.getElementById("ln").innerText = "Not valid Atleast 3 letters";
            { new_employee.last_name_errorMessage = "Not Valid" }
        }
        else {
            document.getElementById("ln").innerText = "";
            { new_employee.last_name_errorMessage = "Valid" }
        }

        if (new_employee.address < 3) {
            document.getElementById("ad").innerText = "Not valid Atleast 3 letters";
            { new_employee.address_errorMessage = "Not Valid" }
        }
        else {
            document.getElementById("ad").innerText = "";
            { new_employee.address_errorMessage = "Valid" }
        }

        if (new_employee.email == "" || !(new_employee.email.includes("@"))) {
            document.getElementById("em").innerText = "Not valid email";
            { new_employee.email_errorMessage = "Not Valid" }

        }
        else {
            document.getElementById("em").innerText = "";
            { new_employee.email_errorMessage = "Valid" }

        }
        if (new_employee.company == "") {

            document.getElementById("comp").innerText = "Not valid Atleast 3 letters";
            { new_employee.company_errorMessage = "Not Valid" }
        }
        else {
            document.getElementById("comp").innerText = "";
            { new_employee.company_errorMessage = "Valid" }
        }


        if (new_employee.city == "") {
            document.getElementById("ct").innerText = "Not valid Atleast 3 letters";
            { new_employee.city_errorMessage = "Not Valid" }
        }
        else {
            document.getElementById("ct").innerText = "";
            { new_employee.city_errorMessage = "Valid" }

        }

        if (new_employee.dob == "") {

            document.getElementById("bd").innerText = "Not valid";
            { new_employee.dob_errorMessage = "Not Valid" }
        }

        else {
            document.getElementById("bd").innerText = "";
            { new_employee.dob_errorMessage = "Valid" }

        }
        if (new_employee.password.length < 5) {

            document.getElementById("pas").innerText = "Not valid Atleast 3 letters";
            { new_employee.pass_errorMessage = "Not Valid" }
        }

        else {
            document.getElementById("pas").innerText = "";
            { new_employee.pass_errorMessage = "Valid" }

        }

        if (new_employee.mobile.length == 10) {
            if (new_employee.mobile[0] == '7' || new_employee.mobile[0] == '8' || new_employee.mobile[0] == '9') {

                document.getElementById("mob").innerText = "";
                { new_employee.mob_errorMessage = "Valid" }
            }
        }

        else {

            document.getElementById("mob").innerText = "Not valid";
            { new_employee.mob_errorMessage = "Not Valid" }

        }


    }


    //------------------------this function used for sending updated data for requsted employee-----------
    const sendupdateDetailsToServer = (id) => {
         
        let  updated_data={
         
         "email": updatestate.email_update,
         "first_name": updatestate.first_name_update,
         "last_name": updatestate.last_name_update,
         "address": updatestate.address_update,
         "company": updatestate.company_update,
         "city": updatestate.city_update,
         "dob": updatestate.dob_update,
         "password": updatestate.password_update,
         "mobile": updatestate.mobile_update


         }
        fetch('http://127.0.0.1:8000/all_employee/' + id + '/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(updated_data)
        }).then(res => res.json())
            .then(json => {
                
                // setEmployees(json)
                if (json.msg = "Employee record update done") {
                   
                   // locModal.className="modal fade";
                  
                    getData()
                   

                }

            });

    }


    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getData()
    }, [])




    //----------------------------Get data from backend server------------------------
    const getData = () => {
        
        
        fetch('http://127.0.0.1:8000/get_all_employee/'+updatepagenumber.page_number, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem('token')
            },
            //body: JSON.stringify(signup_data)
        }).then(res => res.json())
            .then(json => {
                
                setEmployees(json)
                if(json.length==1){
                    updatenextpage.next_page=false

                }
                else{
                    updatenextpage.next_page=true

                }
            });
        
    }
    //----------------------------Get data for requsted employee from backend server------------------------

    const getsingleData = (id) => {

        fetch('http://127.0.0.1:8000/all_employee/' + id + '/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem('token')
            },
            //body: JSON.stringify()
        }).then(res => res.json())
            .then(json => {
                
                ReactDOM.render(<Viewdata first_name={json.first_name} last_name={json.last_name} email={json.email} mobile={json.mobile} address={json.address} city={json.city} company={json.company} dob={json.dob} mobile={json.mobile} />, document.getElementById('aa_data'))


            });
    }






    const updateData = (id) => {

        
        fetch('http://127.0.0.1:8000/all_employee/' + id + '/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem('token')
            },
            
        }).then(res => res.json())
            .then(json => {
                

                setupdatestate(json);
                setupdatestate(
                    {id: json.id,
                    email_update: json.email,
                    first_name_update: json.first_name,
                    last_name_update: json.last_name,
                    address_update: json.address,
                    company_update: json.company,
                    city_update: json.city,
                    dob_update: json.dob,
                    password_update: json.password,
                    mobile_update: json.mobile}


                )


            });

    }




    const removeData = (id) => {
       

        fetch('http://127.0.0.1:8000/all_employee/' + id + '/', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem('token')
            },
           
        }).then(res => res.json())
            .then(json => {
                
                setEmployees(json)

            });

    }


    const Add_new_employee = (e) => {
        
        valid(e);
        cleardata();

        if (new_employee.first_names_errorMessage == "Valid" && new_employee.email_errorMessage == "Valid" && new_employee.last_name_errorMessage == "Valid" && new_employee.address_errorMessage == "Valid" && new_employee.company_errorMessage == "Valid" && new_employee.city_errorMessage == "Valid" && new_employee.dob_errorMessage == "Valid" && new_employee.pass_errorMessage == "Valid" && new_employee.mob_errorMessage == "Valid") {

            let add_data = {
                email: new_employee.email,
                first_name: new_employee.first_names,
                last_name: new_employee.last_name,
                address: new_employee.address,
                company: new_employee.company,
                city: new_employee.city,
                dob: new_employee.dob,
                password: new_employee.password,
                mobile: new_employee.mobile
            }
            fetch('http://127.0.0.1:8000/all_employee/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem('token')
                },
                body: JSON.stringify(add_data)
            }).then(res => res.json())
                .then(json => {
                   
                    if(json.message="Employee is added"){
                       
                        cleardata()
                        getData()
                    }
                    if(json.message="Employee is not added"){
                        document.getElementById("error_msg").innerText=json.message+" "+"Please try again"
                    }
                    


                });
        }
    }

    const cleardata = () => {


        document.getElementById("first_names").value = "";
        document.getElementById("last_name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("address").value = "";
        document.getElementById("company").value = "";
        document.getElementById("city").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("password").value = "";





    }




    const renderHeader = () => {
        let headerElement = ['FIRST NAME', 'LAST NAME', 'EMAIL', 'OPERATIONS']

        return headerElement.map((key, index) => {
            return <th key={index} className="text-info text-center text-30">{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return employees && employees.map(({ id, first_name, last_name, email }) => {
            return (
                <tr key={id}>

                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{email}</td>

                    <td className='opration'>
                        <div class="btn-group btn-group-sm">
                            <button type="button" class="btn btn-primary" onClick={() => getsingleData(id)} data-toggle="modal" data-target="#viewModal">VIEW</button>
                            <button type="button" class="btn btn-warning" onClick={() => updateData(id)} data-toggle="modal" data-target="#updateModal">UPDATE</button>
                            <button type="button" class="btn btn-danger" onClick={() => removeData(id)}>DELETE</button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>


            <h1 id='title'>EMPLOYEES</h1>

            <div className="card border border-white col-12 col-md-12 col-lg-12 bg-white">
                <div className="row justify-content-end">
                    <button type="button" class="btn btn-primary btn-sm btn-success col-1 col-md-1 col-lg-1 justify-content-center" data-toggle="modal" data-target="#addModal" onClick={cleardata}>ADD NEW</button>
                </div>

                <table id='employee' className="table-bordered text-center mt-5 table-striped ">
                    <thead>
                        <tr>{renderHeader()}</tr>
                    </thead>
                    <tbody>
                        {renderBody()}
                    </tbody>
                </table>
            </div>

            <div class="btn-group btn-group-sm mt-5">
                            <button type="button" class="btn btn-info" onClick={() => prevChange()} id="pbtn">PREV</button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="button" class="btn btn-info" onClick={() => nextChange()} id="nbtn">NEXT</button>
            </div>


            <div class="modal fade " id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog  modal-lg ">
                    <div class="modal-content">
                        <div class="modal-header modelheaderbg">
                            <h3 class="modal-title w-100 text-center " ><b>UPDATE EMPLOYEE DETAILS </b></h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body " id="update_data">

                            <form>
                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">FIRST NAME</label>
                                    <input type="text"
                                        className="form-control"
                                        id="first_name_update"
                                        placeholder={updatestate.first_name_update}
                                        onChange={handleChanged}
                                        defaultValue={updatestate.first_name_update} />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">LAST NAME</label>
                                    <input type="text"
                                        className="form-control"
                                        id="last_name_update"
                                        placeholder={updatestate.last_name_update}
                                        onChange={handleChanged}
                                        defaultValue={updatestate.last_name_update}
                                    />


                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">ADDRESS</label>
                                    <input type="text"
                                        className="form-control"
                                        id="address_update"
                                        placeholder={updatestate.address_update}
                                        onChange={handleChanged}
                                        defaultValue={updatestate.address_update} />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">EMAIL ADDRESS</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email_update"
                                        placeholder={updatestate.email_update}
                                        onChange={handleChanged}
                                        defaultValue={updatestate.email_update} />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">COMPANY</label>
                                    <input type="text"
                                        className="form-control"
                                        id="company_update"
                                        placeholder={updatestate.company_update}
                                        onChange={handleChanged}
                                        defaultValue={updatestate.company_update} />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">CITY</label>
                                    <input type="text"
                                        className="form-control"
                                        id="city_update"
                                        placeholder={updatestate.city_update}
                                        onChange={handleChanged}
                                        defaultValue={updatestate.city_update} />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">DOB</label>
                                    <input type="date"
                                        className="form-control"
                                        id="dob_update"
                                        placeholder={updatestate.dob_update}
                                        onChange={handleChanged}
                                        defaultValue={updatestate.dob_update} />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">MOBILE</label>
                                    <input type="text"
                                        className="form-control"
                                        id="mobile_update"
                                        placeholder={updatestate.mobile_update}
                                        onChange={handleChanged}
                                        defaultValue={updatestate.mobile_update} />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">PASSWORD</label>
                                    <input type="password"
                                        className="form-control"
                                        id="password_update"
                                        placeholder={updatestate.password_update}
                                        onChange={handleChanged}
                                        defaultValue={updatestate.password_update} />
                                </div>

                                <button type="button" class="btn btn-primary btn-sm btn-success col-1 col-md-1 col-lg-1 d-flex justify-content-center" onClick={() => sendupdateDetailsToServer(updatestate.id)} data-dismiss="modal">UPDATE</button>


                            </form>







                        </div>
                        <div class="modal-footer bg-dark">
                            <button type="button" class="btn btn-sm btn-danger m-auto" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade " id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog  modal-lg ">
                    <div class="modal-content">
                        <div class="modal-header modelheaderbg">
                            <h3 class="modal-title w-100 text-center " ><b>ADD NEW EMPLOYEE </b></h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body " id="at">
                        <p className="text-danger text-20" id="error_msg"></p>

                            <form>
                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">FIRST NAME</label>
                                    <input type="text"
                                        className="form-control"
                                        id="first_names"
                                        placeholder="Enter first name"
                                        onChange={handleChanges}
                                        value={new_employee.first_names} />
                                    <p className="text-danger text-20" id="fn"></p>

                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">LAST NAME</label>
                                    <input type="text"
                                        className="form-control"
                                        id="last_name"
                                        placeholder="Enter last name"
                                        onChange={handleChanges}
                                        value={new_employee.last_name} />
                                    <p className="text-danger text-20" id="ln"></p>



                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">ADDRESS</label>
                                    <input type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="Enter address"
                                        onChange={handleChanges}
                                        value={new_employee.address} />
                                    <p className="text-danger text-20" id="ad"></p>

                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">EMAIL ADDRESS</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter email"
                                        onChange={handleChanges}
                                        value={new_employee.email} />
                                    <p className="text-danger text-20" id="em"></p>

                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">COMPANY</label>
                                    <input type="text"
                                        className="form-control"
                                        id="company"
                                        placeholder="Enter  company"
                                        onChange={handleChanges}
                                        value={new_employee.company} />
                                    <p className="text-danger text-20" id="comp"></p>

                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">CITY</label>
                                    <input type="text"
                                        className="form-control"
                                        id="city"
                                        placeholder="Enter city"
                                        onChange={handleChanges}
                                        value={new_employee.city} />
                                    <p className="text-danger text-20" id="ct"></p>

                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">DOB</label>
                                    <input type="date"
                                        className="form-control"
                                        id="dob"
                                        placeholder="Enter dob"
                                        onChange={handleChanges}
                                        value={new_employee.dob} />
                                    <p className="text-danger text-20" id="bd"></p>

                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">MOBILE</label>
                                    <input type="text"
                                        className="form-control"
                                        id="mobile"
                                        placeholder="Enter mobile"
                                        onChange={handleChanges}
                                        value={new_employee.mobile} />
                                    <p className="text-danger text-20" id="mob"></p>
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">PASSWORD</label>
                                    <input type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter  password"
                                        onChange={handleChanges}
                                        value={new_employee.password} />
                                    <p className="text-danger text-20" id="pas"></p>
                                </div>



                            </form>

                            <button type="button" class="btn btn-primary btn-sm btn-success col-2 col-md-2 col-lg-2 justify-content-center" onClick={Add_new_employee} data-dismiss="modal">ADD NEW</button>


                        </div>
                        <div class="modal-footer bg-dark">
                            <button type="button" class="btn btn-sm btn-danger m-auto" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>





            <div class="modal fade " id="viewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog  modal-lg ">
                    <div class="modal-content">
                        <div class="modal-header modelheaderbg">
                            <h3 class="modal-title w-100 text-center " ><b>EMPLOYEE </b></h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body " id="aa_data">






                        </div>
                        <div class="modal-footer bg-dark">
                            <button type="button" class="btn btn-sm btn-danger m-auto" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            

            
        </>


    )
}


export default Dashboard;
