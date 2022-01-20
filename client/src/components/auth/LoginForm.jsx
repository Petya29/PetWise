import React from 'react';
import MyButton from '../UI/MyButton/MyButton';

export default function LoginForm() {

  const submitForm = (e) => {
    e.preventDefault();
    console.log('submit');
  }

  return (
    <div className="login-form">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input id="email" type="email" className="validate" />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" className="validate" />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <MyButton onClick={e => submitForm(e)} style={{ float: 'right' }}>Login</MyButton>
      </form>
    </div>
  )
}
