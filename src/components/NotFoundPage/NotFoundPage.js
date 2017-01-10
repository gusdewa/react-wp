import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => (
  <div>
    <h4>
      404 Page Not Found
    </h4>
    <Link to="/"> Go back to HomePage</Link>
  </div>
);

export default NotFoundPage;
