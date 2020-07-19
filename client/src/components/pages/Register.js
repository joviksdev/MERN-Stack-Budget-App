import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Alert from '../layout/Alert';

const Register = props => {
  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { registerUser, msg, isAuthenticated } = authContext;

  useEffect(
    () => {
      /*       if (msg !== null) {
        const alerts = msg.map(alert => ({ ...alert, type: 'warning' }));
        setAlert(alerts);
      } */

      if (isAuthenticated) {
        props.history.push('/');
      }
    },
    // eslint-disable-next-line
    [msg, isAuthenticated]
  );

  const setChange = e => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isString = /[a-zA-Z]+\s?[a-zA-Z]?/;
    const isEmail = new RegExp('[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+.[a-zA-Z]+');
    const { name, email, password, password2 } = details;

    if (name === '' || email === '' || password === '' || password2 === '') {
      setAlert([
        {
          msg: 'Please enter all fields',
          type: 'warning'
        }
      ]);
      return;
    }

    if (!isString.test(name)) {
      setAlert([
        {
          msg: 'Please enter a valid name',
          type: 'warning'
        }
      ]);
      return;
    }

    if (!isEmail.test(email)) {
      setAlert([
        {
          msg: 'Please enter a valid email',
          type: 'warning'
        }
      ]);
      return;
    }

    if (password.length < 6) {
      setAlert([
        {
          msg: 'Password must be at least 6 character',
          type: 'warning'
        }
      ]);
      return;
    }

    if (password !== password2) {
      setAlert([
        {
          msg: 'Passwords are not equal ',
          type: 'warning'
        }
      ]);
      return;
    }

    const newUser = {
      name,
      email,
      password
    };

    registerUser(newUser);

    setDetails({
      name: '',
      email: '',
      password: '',
      password2: ''
    });
  };

  return (
    <div>
      <Alert />
      <div className='form-wrapper'>
        <form className='register-form ' onSubmit={handleSubmit}>
          <h3>Register</h3>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter your name'
              onChange={setChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              onChange={setChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter you password'
              onChange={setChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password2'>Comfirm Password</label>
            <input
              type='password'
              name='password2'
              placeholder='Comfirm password'
              onChange={setChange}
            />
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
      </div>
    </div>
  );
};

export default Register;
