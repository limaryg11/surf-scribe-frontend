import React from 'react';

const SurfLocationItem = ({ location }) => {
  return (
    <div>
      <h3>{location.name}</h3>
      <p>{location.description}</p>
      {/* may add more features here */}
    </div>
  );
}

export default SurfLocationItem;
