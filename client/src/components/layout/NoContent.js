import React from 'react';
import note from '../../images/note.png';
import Image from '../layout/Image';

const NoContent = () => {
  return (
    <div className='note-wrapper'>
      <div style={noteStyle}>
        <Image src={note} alt='note' />
      </div>
      <p className='mt-2'>No Budget/Expenses.</p>
      <p>Tap the + button to add budget/expenses!</p>
    </div>
  );
};

const noteStyle = {
  width: '150px',
  height: '150px'
};

export default NoContent;
