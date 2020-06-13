import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <form className='register-form container'>
      <h3>Register</h3>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' placeholder='Enter your name' />
      </div>
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
      <div className='form-group'>
        <label htmlFor='password2'>Comfirm Password</label>
        <input type='password' name='password' placeholder='Comfirm password' />
      </div>
      <input type='submit' value='Register' />
      <p>
        Already register?{' '}
        <span>
          <Link className='link' to='login'>
            Login now.
          </Link>
        </span>
      </p>
    </form>
  );
};

export default Register;
