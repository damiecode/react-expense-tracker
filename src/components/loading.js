import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => (
  <Loader
    type="Puff"
    color="#c850c0"
    height={500}
    width={300}
    timeout={3000}
    className="text-center"
  />
);

export default Loading;
