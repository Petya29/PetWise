import React, { useEffect, Fragment } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setAuth } from '../../store/reducers/authSlice';
import M from 'materialize-css';
import AuthService from '../../services/AuthService';

export default function AppNavbar() {

  const isAuth = useSelector(state => state.auth.isAuth);

  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  const logout = async (e) => {
    e.preventDefault();

    try {
      await AuthService.logout();

      localStorage.removeItem('token');
      dispatch(setAuth(false));
      dispatch(setUser({}));

      history.push('/');
    } catch (e) {
      console.log(e.response?.data?.errors);
    }
  }

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
            {isAuth
              ?
              <Fragment>
                <li><Link to="/profile">Profile</Link></li>
                <li><a href="/" onClick={e => logout(e)}>Logout</a></li>
              </Fragment>
              :
              <Fragment>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </Fragment>
            }
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
        {isAuth
          ?
          <Fragment>
            <li className={location.pathname === '/' ? "active" : ''}><Link to="/" className="sidenav-close">Home</Link></li>
            <li className={location.pathname === '/profile' ? "active" : ''}><Link to="/profile" className="sidenav-close">Profile</Link></li>
            <li><a href="/" className="sidenav-close" onClick={e => logout(e)}>Logout</a></li>
          </Fragment>
          :
          <Fragment>
            <li className={location.pathname === '/' ? "active" : ''}><Link to="/" className="sidenav-close">Home</Link></li>
            <li className={location.pathname === '/login' ? "active" : ''}><Link to="/login" className="sidenav-close">Login</Link></li>
            <li className={location.pathname === '/register' ? "active" : ''}><Link to="/register" className="sidenav-close">Register</Link></li>
          </Fragment>
        }
        {/* Dropdown Trigger */}
        <li><a className="dropdown-trigger" href="#!" data-target="dropdown-langs-side">English<i className="material-icons right">arrow_drop_down</i></a></li>
      </ul>
    </div>
  )
}
