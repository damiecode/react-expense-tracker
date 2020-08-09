import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../404.jpg';

const NotFoundPage = () => (
  <div>
    <img src={PageNotFound} alt="Page Not Found" />
    <p style={{ textAlign: 'center' }}>
      <Link to="/">Go to Home </Link>
    </p>
  </div>
);

export default NotFoundPage;
