import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Image from './Image';
import auth from '../../images/user.png';
import search from '../../images/search.png';

import AppContext from '../../context/app/appContext';
import AuthContext from '../../context/auth/authContext';

const Header = () => {
  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext);

  const { logoutUser, isAuthenticated, user } = authContext;

  const {
    toggleAuthList,
    hideAuthList,
    isDisplayAuthList,
    isExpenseFormDisplay,
    isBudgetFormDisplay,
    isDisplayMenuList
  } = appContext;

  const setLogOut = () => {
    logoutUser();
    toggleAuthList();
  };

  return (
    <header>
      <div className='container'>
        <h4 className='header-text'>
          <Link
            style={{
              color:
                isExpenseFormDisplay || isBudgetFormDisplay || isDisplayMenuList
                  ? '#5917d4'
                  : '#141110'
            }}
            className='link'
            to='/'
          >
            Budget
          </Link>
        </h4>
        <nav className='navbar'>
          <ul className='navbar-nav'>
            <li style={listStyle} className='nav-list mr'>
              <Image src={search} alt='search-icon' />
            </li>
            <li className='nav-list auth'>
              <div style={listStyle} onClick={toggleAuthList}>
                <Image src={auth} alt='auth-icon' />
              </div>
              {isDisplayAuthList && (
                <ul className='auth-list'>
                  {user !== null && (
                    <li className='auth-list-item'>
                      {`${user.name.split(' ')[0]} ${user.name
                        .split(' ')[1]
                        .toString()
                        .charAt(0)}.`}
                    </li>
                  )}
                  {isAuthenticated ? (
                    <li className='auth-list-item' onClick={setLogOut}>
                      logout
                    </li>
                  ) : (
                    <li className='auth-list-item'>
                      <Link className='link' to='/login' onClick={hideAuthList}>
                        login
                      </Link>
                    </li>
                  )}

                  {!isAuthenticated && (
                    <li className=' auth-list-item'>
                      <Link
                        className='link'
                        to='/register'
                        onClick={hideAuthList}
                      >
                        register
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </li>
            <li className='nav-list ml'>
              <Link className='link' to='/about'>
                about
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const listStyle = {
  width: '20px',
  height: '20px',
  cursor: 'pointer'
};

export default Header;
