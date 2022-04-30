import React from 'react';

export const IconText = ({ title, children, onClick }) => {
  return (
    <button className='btn' onClick={onClick}>
      {children} {title}
    </button>
  );
};
