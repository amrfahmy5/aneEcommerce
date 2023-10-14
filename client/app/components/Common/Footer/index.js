/**
 *
 * Footer
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import Newsletter from '../../../containers/Newsletter';

const Footer = () => {
  const infoLinks = [
    { id: 0, name: 'Contact Us', to: '/contact' },
    { id: 1, name: 'Sell With Us', to: '/sell' },
    { id: 1, name: 'Chat With Support Team', to: '/support' },
    // { id: 2, name: 'Shipping', to: '/shipping' }
  ];

  const footerBusinessLinks = (
    <ul className='support-links'>
      <li className='footer-link'>
        <Link to='/dashboard'>Account Details</Link>
      </li>
      <li className='footer-link'>
        <Link to='/dashboard/orders'>Orders</Link>
      </li>
      <li className='footer-link'>
        <Link to='/dashboard/security'>Change Password</Link>
      </li>
      <li className='footer-link'>
        <Link to='/dashboard/wishlist'>Wishlist</Link>
      </li>
    </ul>
  );

  const footerLinks = infoLinks.map(item => (
    <li key={item.id} className='footer-link'>
      <Link key={item.id} to={item.to}>
        {item.name}
      </Link>
    </li>
  ));

  const footerLinks2 = infoLinks.map(item => (
    <li key={item.id} className='footer-link'>
      <Link key={item.id} to={item.to}>
        {item.name}
      </Link>
    </li>
  ));

  return (
    <footer className='footer'>
      <Container>
        <div className='footer-content'>
          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='text-uppercase'>Customer Service</h3>
            </div>
            <div className='block-content'>
              <ul>{footerLinks}</ul>
            </div>
          </div>
          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='text-uppercase'>Links</h3>
            </div>
            <div className='block-content'>
              <ul>{footerBusinessLinks}</ul>
            </div>
          </div>
          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='text-uppercase'>Newsletter</h3>
              <Newsletter />
            </div>
          </div>
        </div>
        <div className='footer-copyright'>
          <span>© {new Date().getFullYear()} ANE</span>
        </div>
        <ul className='footer-social-item'>
          <li>
            <a href='https://www.facebook.com/Alnabilequipment/' rel='noreferrer noopener' target='_blank'>
              <span className='facebook-icon' />
            </a>
          </li>
          <li>
            <a href='https://www.instagram.com/aneequipment/' rel='noreferrer noopener' target='_blank'>
              <span className='instagram-icon' />
            </a>
          </li>
          <li>
            <a href='https://www.linkedin.com/company/ane-eg/' rel='noreferrer noopener' target='_blank'>
              <span className='linkedin-icon' />
            </a>
          </li>
          <li>
            <a href='https://goo.gl/maps/huZvDGxf3KhQ1eiHA' rel='noreferrer noopener' target='_blank'>
              <span className='google-icon' />
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
