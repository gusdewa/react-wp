import React from 'react';
import { Link } from 'react-router';

import './styles.scss';

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => (
  <div>
    <h2 className="alt-header">About</h2>
    <p>
      About me
    </p>
    <p>
      <Link to="/badlink">Click this bad link</Link> to see the 404 page.
    </p>
  </div>
);

export default AboutPage;
