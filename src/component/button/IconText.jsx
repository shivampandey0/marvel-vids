import React from 'react';

export const IconText = ({ title, children }) => {
  return (
    <button className='btn'>
      {children} {title}
    </button>
  );
};
