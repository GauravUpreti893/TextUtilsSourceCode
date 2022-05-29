import React, { useState } from 'react';
import './Navbar.css'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export default function Navbar(props) {    ///rfc
  function togglefunction() {
    if (props.mode === 'Light Mode') {
      setmystyle({
        backgroundColor: '#F8F9FA',
        color: 'black'
      });
      document.getElementById('navc').classList.remove('addtonav');
    }
    else {
      setmystyle({
        backgroundColor: '#1F1F1F',
        color: 'white'
      });
      document.getElementById('navc').classList.add('addtonav');
    }
    props.togglemode();
  }
  function toggle(param)
  {
      if (param === 'home')
      {
        document.getElementById('homelink').classList.add('active');
        document.getElementById('aboutlink').classList.remove('active');
        document.title = "TextUtils- Home";
      }
      else
      {
        document.getElementById('homelink').classList.remove('active');
        document.getElementById('aboutlink').classList.add('active');
        document.title = "TextUtils- About";
      }
  }
  const [mystyle, setmystyle] = useState({ 
    backgroundColor: '#F8F9FA',
    color: 'black'
  });
  return (
    <nav id = "navc" className="navbar navbar-expand-lg navbar-light text-danger" style={mystyle}> 
      <div className="container-fluid mx-1">
        <span className="navbar-brand active" >{props.title}</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className={`navbar-toggler-icon ${props.mode == 'Dark Mode'?"":"active"}`}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link id = "homelink" className={`nav-link ${props.titlevalue === 'TextUtils- Home'?"active":""}`} aria-current="page" to="/" onClick = {()=>toggle("home")}>Home</Link>
            </li>
            <li className="nav-item">
              <Link id = "aboutlink" className={`nav-link ${props.titlevalue === 'TextUtils- Home'?"":"active"}`} to="/about" onClick = {()=>toggle("about")}>{props.abouttext}</Link>
            </li>
          </ul>
          <div className="form-check form-switch form-check-reverse mx-2">
            <label className={`form-check-label text-${(props.mode === 'Dark Mode')? 'black':'white'}`} htmlFor="flexSwitchCheckReverse">{props.mode}</label>
            <input className="form-check-input" role = "button" type="checkbox" id="flexSwitchCheckReverse" onClick={togglefunction} />
          </div>
        </div>
      </div>
    </nav>
    
  )
}
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  abouttext: PropTypes.string
}
Navbar.defaultProps = {
  title: "Your Title here",
  abouttext: "Your About Text here"
}