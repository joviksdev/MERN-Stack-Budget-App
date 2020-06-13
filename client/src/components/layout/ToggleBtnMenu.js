import React, { useContext } from 'react';
import AppContext from '../../context/app/appContext';

const ToggleBtnMenu = () => {
  const appContext = useContext(AppContext);

  const { toggleMenuList, isDisplayMenuList } = appContext;

  return (
    <div className='menu-wrapper'>
      <input
        type='checkbox'
        className='btn-hamburger'
        onChange={toggleMenuList}
        checked={isDisplayMenuList}
      />
      <div></div>
    </div>
  );
};

export default ToggleBtnMenu;
