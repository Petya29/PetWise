import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser, setAuth } from '../../store/reducers/authSlice';
import MyButton from '../UI/MyButton/MyButton';
import AuthService from '../../services/AuthService';
import AppLoader from '../UI/AppLoader/AppLoader';

export default function LoginForm() {

  const dispatch = useDispatch();

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      dispatch(setUser(response.data.user));
      dispatch(setAuth(true));

      setLoading(false);
      history.push('/');
    } catch (e) {
      setLoading(false);
      console.log(e.response?.data);
      if (e.response?.data?.errors?.param) {
        const field = document.getElementById(e.response.data.errors.param);
        field.classList.add('invalid');
        const dangerText = document.querySelector(`.danger-${e.response.data.errors.param}`);
        dangerText.classList.remove('hide');
      }
    }

  }

  return (
    <div className="login-form">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input id="email" type="email" className="validate" onChange={e => setEmail(e.target.value)} />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" className="validate" onChange={e => setPassword(e.target.value)} />
            <label htmlFor="password">Password</label>
            <small className="danger-password red-text hide">Password does not match</small>
          </div>
        </div>
        <MyButton onClick={e => submitForm(e)} style={{ float: 'right' }} disabled={loading}>
          Login
          {loading
            ?
            <AppLoader style={{ width: "14px", height: "14px" }} />
            :
            ''
          }
        </MyButton>
      </form>
    </div>
  )
}
