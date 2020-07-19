import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import bgLogo from '../../images/Budget-logo.png';
import preview from '../../images/preview.JPG';
import Image from '../layout/Image';

const Index = () => {
  return (
    <Fragment>
      <section className='showcase'>
        <div className='showcase-header'>
          <div className='container'>
            <div className='showcase-content'>
              <h1>Gain control of</h1>
              <h3>your money</h3>
            </div>
            <div style={logo}>
              <Image src={bgLogo} alt='budget-icon' />
            </div>
          </div>
        </div>
        <div className='showcase-preview  my-2'>
          <div style={previewStyle} className='preview container'>
            <Image src={preview} alt='preview' />
          </div>
          <div className='preview-description'>
            <div className='container'>
              <p>
                Keep record of how much money you spend on each stuff you need
              </p>
              <h3 className='mt-1'>
                <Link className='btn btn-get-started link' to='/register'>
                  get started now
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const logo = {
  width: '250px',
  height: '250px'
};

const previewStyle = {
  maxWidth: '300px'
};

export default Index;
