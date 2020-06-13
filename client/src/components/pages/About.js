import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='container mt-1'>
      <h4>About App</h4>
      <p>A Budget MERN stack Application</p>
      <p className='about-link mt'>
        <Link className='link back-link' to='/'>
          Back
        </Link>
      </p>
    </div>
  );
};

export default About;
