import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser, setAuth } from '../../store/reducers/authSlice';
import { useTranslation } from 'react-i18next';
import MyButton from '../UI/MyButton/MyButton';
import AuthService from '../../services/AuthService';
import AppLoader from '../UI/AppLoader/AppLoader';
import { hideErrors, showErrors } from '../../helpers/form';
import AppAlert from '../UI/AppAlert/AppAlert';

export default function RegistrationForm() {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();

        hideErrors();

        try {
            setLoading(true);
            setAlert('');

            const response = await AuthService.registration(name, email, password, confirmPassword);
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setUser(response.data.user));
            dispatch(setAuth(true));

            setLoading(false);
            history.push('/');
        } catch (e) {
            setLoading(false);
            console.log(e.response?.data);
            if (e.response?.data?.errors?.param) {
                showErrors(e.response.data.errors);
            } else {
                setAlert(e.response.data.errors[0].msg);
            }
        }
    }

    return (
        <div className="register-form">
            <form className="col s12">
                {alert
                    ?
                    <AppAlert>{alert}</AppAlert>
                    :
                    ''
                }
                <div className="row">
                    <div className="input-field col s12">
                        <input id="name" type="text" className="validate" onChange={e => setName(e.target.value)} />
                        <label htmlFor="name">{t('Name')}</label>
                        <small className="danger-text danger-name red-text hide">Name must be valid</small>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="email">{t('Email')}</label>
                        <small className="danger-text danger-email red-text hide">Email must be valid</small>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate" onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="password">{t('Password')}</label>
                        <small className="danger-text danger-password red-text hide">Password does not match</small>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="confirmPassword" type="password" className="validate" onChange={e => setConfirmPassword(e.target.value)} />
                        <label htmlFor="confirmPassword">{t('passwordConfirmation')}</label>
                        <small className="danger-text danger-confirmPassword red-text hide">Password does not match</small>
                    </div>
                </div>
                <MyButton onClick={e => submitForm(e)} style={{ float: 'right' }} disabled={loading}>
                    {t('Register')}
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
