import React from 'react';

const Footer = () => (
  <footer className='footer'>
    <div className='container'>
      <div className='row align-items-center'>
        <div className='col-md-4'>
          <span className='copyright'>Copyright &copy; DC Fitness 2020</span>
        </div>
        <div className='col-md-4'>
          <ul className='list-inline social-buttons'>
            <li className='list-inline-item'>
              <a href='https://twitter.com/home' target='_blank'>
                <i className='fa fa-twitter'></i>
              </a>
            </li>
            <li className='list-inline-item'>
              <a href='https://www.facebook.com/' target='_blank'>
                <i className='fa fa-facebook-f'></i>
              </a>
            </li>
            <li className='list-inline-item'>
              <a href='https://www.instagram.com/' target='_blank'>
                <i className='fa fa-instagram'></i>
              </a>
            </li>
          </ul>
        </div>
        <div className='col-md-4'>
          <ul className='list-inline quicklinks'>
            <li className='list-inline-item'>
              <a href='#privacy' style={{ color: 'black' }}>
                Privacy Policy
              </a>
            </li>
            <li className='list-inline-item'>
              <a href='#terms' style={{ color: 'black' }}>
                Terms of Use
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
