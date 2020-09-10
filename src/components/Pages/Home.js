import React from 'react';

import { Form, Button, Card } from 'react-bootstrap';
import './basic.css';

const Home = props => {
  //Internal change functions
  //These are called within this file's return fucntions, and then call the external functions to update the variables states
  const updateFullNameInt = event => {
    console.log('CU updateFullNameInt Triggered');

    //change by calling App external function
    props.updateFullName(event.target.value);

    //log
    console.log('Update Full Name: ', event.target.value);
  };

  const updateEmailInt = event => {
    console.log('CU updateEmailInt Triggered');

    //change by calling App external function
    props.updateEmail(event.target.value);

    //log
    console.log('Update Email: ', event.target.value);
  };

  const updatePhoneInt = event => {
    console.log('CU updatePhoneInt Triggered');

    //change by calling App external function
    props.updatePhone(event.target.value);

    //log
    console.log('Update Phone: ', event.target.value);
  };

  const updateInquiryInt = event => {
    console.log('CU updateInquiryInt Triggered');

    //change by calling App external function
    props.updateInquiry(event.target.value);

    //log
    console.log('Update Inquiry: ', event.target.value);
  };

  return (
    <div className='App'>
      <header className='masthead2'>
        <div className='container'>
          <div className='intro-text'>
            <div className='intro-lead-in'>Welcome To DC Fitness!</div>
            <div className='intro-heading text-uppercase'>
              Let's Get Started
            </div>
            <a
              className='btn btn-primary btn-xl text-uppercase js-scroll-trigger'
              href='/sign_up'
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>

      <Card body>
        <section className='page-section' id='services'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12 text-center'>
                <h2 className='section-heading text-uppercase'>Services</h2>
                <h3 className='section-subheading text-muted'>
                  Here is a summary of what we have to offer.
                </h3>
              </div>
            </div>
            <div className='row text-center'>
              <div className='col-md-4'>
                <span className='fa-stack fa-4x'>
                  <i className='fa fa-circle fa-stack-2x text-primary'></i>
                  <i className='fa fa-laptop fa-stack-1x fa-inverse'></i>
                </span>
                <h4 className='service-heading'>Online Accessibility</h4>
                <p className='text-muted'>
                  Access your workout routines, nutrition advice, and many more
                  features that our fitness center has to offer online to help
                  you achieve your wellness goals.
                </p>
              </div>
              <div className='col-md-4'>
                <span className='fa-stack fa-4x'>
                  <i className='fa fa-circle fa-stack-2x text-primary'></i>
                  <i className='fa fa-bar-chart fa-stack-1x fa-inverse'></i>
                </span>
                <h4 className='service-heading'>Personalized Workouts</h4>
                <p className='text-muted'>
                  Receive personalized workout plans and professional
                  instructional videos from a fitness expert that fits your
                  workout needs.
                </p>
              </div>
              <div className='col-md-4'>
                <span className='fa-stack fa-4x'>
                  <i className='fa fa-circle fa-stack-2x text-primary'></i>
                  <i className='fa fa-cutlery fa-stack-1x fa-inverse'></i>
                </span>
                <h4 className='service-heading'>Nutrition Guidance</h4>
                <p className='text-muted'>
                  Receive nutrition guidance on healthier ways of eating, and
                  explore new diets to see what is right for you.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Card>
    </div>
  );
};
export default Home;
