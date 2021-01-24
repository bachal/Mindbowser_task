import React from 'react';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import { withRouter } from "react-router-dom";
function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    let title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    if(props.location.pathname === '/') {
        title = 'Signup'
    }
    if(props.location.pathname === '/login') {
        title = 'Login'
    }

    if(props.location.pathname === '/dashboard') {
        title = 'Dashboard'
    }
    
    
    return(
        <nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">{props.title || title}</span>
                
            </div>
        </nav>
    )
}
export default withRouter(Header);
