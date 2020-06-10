import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt }) => <img src={src} alt={alt} />;

Image.propType = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default Image;
