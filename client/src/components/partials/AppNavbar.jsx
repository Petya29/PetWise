import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setAuth } from '../../store/reducers/authSlice';
import { setLang } from '../../store/reducers/globalSlice';
import M from 'materialize-css';
import i18n from 'i18next';
import AuthService from '../../services/AuthService';
import { formatLangTitle } from '../../helpers/langs';
import { useTranslation } from 'react-i18next';

export default function AppNavbar() {

  const { t } = useTranslation();

  const isAuth = useSelector(state => state.auth.isAuth);
  const currLang = useSelector(state => state.global.lang);

  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  const [langTitle, setLangTitle] = useState('English');

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

  const changeLanguage = (lang) => {
    dispatch(setLang(lang));
    i18n.changeLanguage(lang);
  }

  useEffect(() => {
    M.AutoInit();

    setLangTitle(formatLangTitle(currLang));

    const elemsDropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elemsDropdown, { coverTrigger: false });
  }, [currLang]);

  return (
    <div className="app-navbar">
      {/* Dropdown Structure */}
      <ul id="dropdown-langs" className="dropdown-content">
        <li><a href="#!" onClick={() => { changeLanguage('en') }}>English</a></li>
        <li><a href="#!" onClick={() => { changeLanguage('pl') }}>Polish</a></li>
        <li><a href="#!" onClick={() => { changeLanguage('ru') }}>Russian</a></li>
      </ul>
      <nav>
        <div className="nav-wrapper">
          <div className="brand-logo"><Link to="/">PetWise</Link></div>
          <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            {isAuth
              ?
              <Fragment>
                <li><Link to="/profile">{t('Profile')}</Link></li>
                <li><a href="/" onClick={e => logout(e)}>{t('Logout')}</a></li>
              </Fragment>
              :
              <Fragment>
                <li><Link to="/login">{t('Login')}</Link></li>
                <li><Link to="/register">{t('Register')}</Link></li>
              </Fragment>
            }
            {/* Dropdown Trigger */}
            <li><a className="dropdown-trigger" href="#!" data-target="dropdown-langs">{langTitle}<i className="material-icons right">arrow_drop_down</i></a></li>
          </ul>
        </div>
      </nav>

      {/* Dropdown Structure */}
      <ul id="dropdown-langs-side" className="dropdown-content">
        <li><a href="#!" onClick={() => { changeLanguage('en') }}>English</a></li>
        <li><a href="#!" onClick={() => { changeLanguage('pl') }}>Polish</a></li>
        <li><a href="#!" onClick={() => { changeLanguage('ru') }}>Russian</a></li>
      </ul>
      <ul className="sidenav" id="mobile-demo">
        {isAuth
          ?
          <Fragment>
            <li className={location.pathname === '/' ? "active" : ''}><Link to="/" className="sidenav-close">{t('Home')}</Link></li>
            <li className={location.pathname === '/profile' ? "active" : ''}><Link to="/profile" className="sidenav-close">{t('Profile')}</Link></li>
            <li><a href="/" className="sidenav-close" onClick={e => logout(e)}>{t('Logout')}</a></li>
          </Fragment>
          :
          <Fragment>
            <li className={location.pathname === '/' ? "active" : ''}><Link to="/" className="sidenav-close">{t('Home')}</Link></li>
            <li className={location.pathname === '/login' ? "active" : ''}><Link to="/login" className="sidenav-close">{t('Login')}</Link></li>
            <li className={location.pathname === '/register' ? "active" : ''}><Link to="/register" className="sidenav-close">{t('Register')}</Link></li>
          </Fragment>
        }
        {/* Dropdown Trigger */}
        <li><a className="dropdown-trigger" href="#!" data-target="dropdown-langs-side">{langTitle}<i className="material-icons right">arrow_drop_down</i></a></li>
      </ul>
    </div>
  )
}
