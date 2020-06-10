import React, { useContext } from 'react';
import Image from './Image';
import auth from '../../images/user.png';
import search from '../../images/search.png';

import AppContext from '../../context/app/appContext';

const Header = () => {
  const appContext = useContext(AppContext);
  const { toggleAuthList, displayAuthList } = appContext;
  return (
    <header>
      <div className='container'>
        <h4 className='header-text'>Budget</h4>
        <nav className='navbar'>
          <ul className='navbar-nav'>
            <li style={listStyle} className='nav-list mr'>
              <Image src={search} alt='search-icon' />
            </li>
            <li className='nav-list auth'>
              <div style={listStyle} onClick={toggleAuthList}>
                <Image src={auth} alt='auth-icon' />
              </div>
              {displayAuthList && (
                <ul className='auth-list'>
                  <li className='auth-list-item'>user</li>
                  <li className='auth-list-item'>log in</li>
                  <li className='auth-list-item'>register</li>
                </ul>
              )}
            </li>
            <li className='nav-list ml'>about</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const listStyle = {
  width: '25px',
  height: '25px'
};

export default Header;
