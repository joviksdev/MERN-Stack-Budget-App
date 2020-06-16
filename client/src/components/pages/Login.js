import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Alert from '../layout/Alert';

const Login = props => {
  const [details, setDetails] = useState({
    email: '',
    password: ''
  });

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { loginUser, msg, isAuthenticated } = authContext;

  useEffect(
    () => {
      if (isAuthenticated) {
        props.history.push('/');
      }
      if (msg !== null) {
        const alerts = msg.map(alert => ({ ...alert, type: 'warning' }));
        setAlert(alerts);
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
    const isEmail = new RegExp('[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+.[a-zA-Z]+');

    const { email, password } = details;

    if (email === '' || password === '') {
      setAlert([
        {
          msg: 'Please enter all fields',
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

    const newUser = {
      email,
      password
    };

    loginUser(newUser);

    setDetails({
      email: '',
      password: ''
    });
  };

  return (
    <div className='form-wrapper'>
      <form className='login-form container' onSubmit={handleSubmit}>
        <h3>Log in</h3>
        <Alert />
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            value={details.name}
            onChange={setChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Enter you password'
            value={details.password}
            onChange={setChange}
          />
        </div>
        <input type='submit' value='Log in' />
        <p>
          Not register?{' '}
          <span>
            <Link className='link' to='/register'>
              Register now.
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
