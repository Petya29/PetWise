import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import M from 'materialize-css';

export default function AppNavbar() {

  const location = useLocation();

  useEffect(() => {
    M.AutoInit();

    const elemsDropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elemsDropdown, { coverTrigger: false });
  }, []);

  return (
    <div className="app-navbar">
      {/* Dropdown Structure */}
      <ul id="dropdown-langs" className="dropdown-content">
        <li><a href="#!">English</a></li>
        <li><a href="#!">Polish</a></li>
        <li><a href="#!">Russian</a></li>
      </ul>
      <nav>
        <div className="nav-wrapper">
          <div className="brand-logo"><Link to="/">PetWise</Link></div>
          <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/login">Register</Link></li>
            {/* Dropdown Trigger */}
            <li><a className="dropdown-trigger" href="#!" data-target="dropdown-langs">English<i className="material-icons right">arrow_drop_down</i></a></li>
          </ul>
        </div>
      </nav>

      {/* Dropdown Structure */}
      <ul id="dropdown-langs-side" className="dropdown-content">
        <li><a href="#!">English</a></li>
        <li><a href="#!">Polish</a></li>
        <li><a href="#!">Russian</a></li>
      </ul>
      <ul className="sidenav" id="mobile-demo">
        <li className={location.pathname === '/' ? "active" : ''}><Link to="/" className="sidenav-close">Home</Link></li>
        <li className={location.pathname === '/login' ? "active" : ''}><Link to="/login" className="sidenav-close">Login</Link></li>
        <li className={location.pathname === '/register' ? "active" : ''}><Link to="/login" className="sidenav-close">Register</Link></li>
        {/* Dropdown Trigger */}
        <li><a className="dropdown-trigger" href="#!" data-target="dropdown-langs-side">English<i className="material-icons right">arrow_drop_down</i></a></li>
      </ul>
    </div>
  )
}
