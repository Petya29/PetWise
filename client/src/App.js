import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser, setAuth } from './store/reducers/authSlice';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import AppRouter from './components/utilities/AppRouter';
import AppNavbar from './components/partials/AppNavbar';
import './styles/App.css';
import AuthService from './services/AuthService';

function App() {

  const dispatch = useDispatch();

  let checkAuth = useRef(() => { });

  checkAuth = async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const response = await AuthService.checkAuth();
      localStorage.setItem('token', response.data.accessToken);
      dispatch(setUser(response.data.user));
      dispatch(setAuth(true));
    } catch (e) {
      if (e.response.data.errors.length) console.log(e.response.data.errors[0].msg);
      localStorage.removeItem('token');
    }
  }

  useEffect(() => {
    //Materialize config
    M.AutoInit();

    const elemsDropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elemsDropdown, { coverTrigger: false });

    checkAuth();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div className='bg-wrapper'>
          <AppNavbar />
          <AppRouter />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
