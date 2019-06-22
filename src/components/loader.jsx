import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader
    className="loader"
    primaryColor={'#1b1b1b'}
    secondaryColor={'#1e1e1e'}
    speed={1.25}
    width={400}
    height={190}
  >
    <rect x="142" y="5" rx="5" ry="5" width="115" height="30" />
    <rect x="125" y="47" rx="4" ry="4" width="149" height="140" />
  </ContentLoader>
);

export default MyLoader;
