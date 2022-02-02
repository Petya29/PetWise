import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser, setAuth } from '../../store/reducers/authSlice';
import { useTranslation } from 'react-i18next';
import { hideErrors, showErrors } from '../../helpers/form';
import MyButton from '../UI/MyButton/MyButton';
import AuthService from '../../services/AuthService';
import AppLoader from '../UI/AppLoader/AppLoader';

export default function LoginForm() {

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    hideErrors();

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
      if (e.response?.data?.errors[0]) {
        showErrors(e.response.data.errors[0]);
      }
    }

  }

  return (
    <div className="login-form">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input id="email" type="email" className="validate" onChange={e => setEmail(e.target.value)} />
            <label htmlFor="email">{t('Email')}</label>
            <small className="danger-text danger-email red-text hide">User with this email doesn't exist</small>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" className="validate" onChange={e => setPassword(e.target.value)} />
            <label htmlFor="password">{t('Password')}</label>
            <small className="danger-text danger-password red-text hide">Password does not match</small>
          </div>
        </div>
        <MyButton onClick={e => submitForm(e)} style={{ float: 'right' }} disabled={loading}>
          {t('Login')}
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
