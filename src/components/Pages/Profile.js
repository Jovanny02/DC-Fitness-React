import React, { Component } from 'react';

import { Form, Col, Button, Card } from 'react-bootstrap';
import './basic.css';

const Profile = props => {
  //internal change functions

  return (
    <div className='App'>
      <header className='masthead'>
        <div className='container'>
          <div className='intro-text'>
            <div className='intro-heading text-uppercase'>User Profile</div>
          </div>
        </div>
      </header>

      <div className='container'>
        <Card body style={{ width: '100%' }}>
          <div className='container' style={{ width: '55%' }} v>
            <div className='col-12'>
              <span className='fa-stack fa-4x'>
                <i className='fa fa-circle fa-stack-2x text-primary'></i>
                <i className='fa fa-user-circle-o fa-stack-1x fa-inverse'></i>
              </span>

              <div className='h1_p_1'>
                <h5>Name: </h5>
                <p>
                  {props.FName} {props.LName}
                </p>
                <h5>Email: </h5>
                <p>{props.email} </p>

                <h5>Would you like to change your password?</h5>

                <p>
                  Click
                  {/*Maybe want to make a seperate change password link */}
                  <a href='/forgot'>
                    {' '}
                    <b>Here</b>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
