import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

function Heading(props) {
    const { handleFind } = props;
    return(
        <div className="wrapper-heading">
            <div className="heading container">
                <div className="row">
                    <div className="left col-md-3">
                        <Link to='/'><img src='/images/logo.jpg'/></Link>
                    </div>
                    <div className="center col-md-6">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleFind}/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="right col-md-3">
                        {(cookies.get('username') != null) ? (<div><Link to='/detail'>Hello {cookies.get('username')}</Link></div>) : (<div><Link to='/sign_up'>Sign Up</Link></div>)}
                        {(cookies.get('username') != null) ? (<div><Link to='/sign_out'>Sign Out</Link></div>) : (<div><Link to='/login'>Login</Link></div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Heading;