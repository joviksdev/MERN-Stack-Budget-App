import React from 'react';

const Login = () => {
  return (
    <form className='login-form container'>
      <h3>Log in</h3>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' placeholder='Enter your email' />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Enter you password'
        />
      </div>
      <input type='submit' value='Log in' />
      <p>
        Not register? <span>Register now.</span>
      </p>
    </form>
  );
};

export default Login;
