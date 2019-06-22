import React from 'react';

const Navigation = ({ navigate }) => (
  <div className="navigation">
    <button className="navigation-button" onClick={navigate('first')}>
      [First]
    </button>
    <button className="navigation-button" onClick={navigate('prev')}>
      [Prev]
    </button>
    <button className="navigation-button" onClick={navigate('random')}>
      [Random]
    </button>
    <button className="navigation-button" onClick={navigate('next')}>
      [Next]
    </button>
    <button className="navigation-button" onClick={navigate('latest')}>
      [Latest]
    </button>
  </div>
);

export default Navigation;
