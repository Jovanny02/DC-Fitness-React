import React, { Component } from 'react';

import { Form, Col, Card, Button } from 'react-bootstrap';
import './basic.css';

const Calendar = props => {
  //internal change functions
  const addFNameInt = event => {
    console.log('Contact fName Triggered');

    //change by calling App external function
    props.addFNameUpdate(event.target.value);

    //log
    console.log('FName: ', event.target.value);
  };

  const addLNameInt = event => {
    console.log('Contact LName Triggered');

    //change by calling App external function
    props.addLNameUpdate(event.target.value);

    //log
    console.log('LName: ', event.target.value);
  };

  const addEmailInt = event => {
    console.log('Contact email Triggered');

    //change by calling App external function
    props.addEmailUpdate(event.target.value);

    //log
    console.log('email: ', event.target.value);
  };
  const addDateInt = event => {
    console.log('Contact Date Triggered');

    //change by calling App external function
    props.addDateUpdate(event.target.value);

    //log
    console.log('Date: ', event.target.value);
  };
  const addTimeInt = event => {
    console.log('Contact time Triggered');

    //change by calling App external function
    props.addTimeUpdate(event.target.value);

    //log
    console.log('Time: ', event.target.value);
  };
  const addAI_Int = event => {
    console.log('Contact Additional Information Triggered');

    //change by calling App external function
    props.addAIUpdate(event.target.value);

    //log
    console.log('Additional Information: ', event.target.value);
  };
  const addFileInt = event => {
    console.log('Contact File Triggered');

    //change by calling App external function
    props.addFileUpdate(event.target.value);

    //log
    console.log('File: ', event.target.value);
  };

  return (
    <div className='App'>
      <header className='masthead'>
        <div className='container'>
          <div className='intro-text'>
            <div className='intro-heading text-uppercase'>Calendar</div>
          </div>
        </div>
      </header>

      <Card body>
        <iframe
          style={{ width: '55%', height: '700px' }}
          src={props.calURL}
          title={'Meeting Availability'}
        ></iframe>
        <div className='container' style={{ paddingTop: '30px' }}>
          <Card body style={{ width: '100%' }}>
            <div className='container' style={{ width: '55%' }} v>
              <div className='col-12'>
                <Form onSubmit={props.check}>
                  <h1> Meeting Request Form</h1>
                  <p>
                    Please fill out your email, first and last name, and list
                    your prefered time and date. You are welcome to add any
                    additional information.
                  </p>
                  <p> Don't forget to attatch your new client pdf below! </p>

                  <a
                    href='https://drive.google.com/file/d/1qh-8s4hKG-ILOAe9EMZ5QbCEZ77Sv2Bj/view?usp=sharing'
                    target='blank'
                  >
                    Download New Client Form
                  </a>

                  <div className='h1_p_1'>
                    <Form.Row>
                      <Form.Label>First name </Form.Label>
                      <Form.Control
                        input
                        placeholder='First name'
                        id='FName'
                        onChange={addFNameInt}
                      />
                    </Form.Row>
                  </div>

                  <div className='h1_p_1'>
                    <Form.Row>
                      <Form.Label>Last name </Form.Label>
                      <Form.Control
                        input
                        placeholder='Last name'
                        id='LName'
                        onChange={addLNameInt}
                      />
                    </Form.Row>
                  </div>

                  <div className='h1_p_1'>
                    <Form.Row>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        input
                        type='email'
                        placeholder='Enter email'
                        id='email'
                        onChange={addEmailInt}
                      />
                      <Form.Text className='text-muted'>
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Row>
                  </div>

                  <div className='h1_p_1'>
                    <Form.Row>
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        input
                        type='Date'
                        placeholder='Date'
                        id='Date'
                        onChange={addDateInt}
                      />
                    </Form.Row>
                  </div>
                  <div className='h1_p_1'>
                    <Form.Row>
                      <Form.Label>Time</Form.Label>
                      <Form.Control
                        input
                        type='Time'
                        placeholder='Time'
                        id='Time'
                        onChange={addTimeInt}
                      />
                    </Form.Row>
                  </div>
                  <div className='h1_p_1'>
                    <Form.Row>
                      <Form.Label>Additional Information</Form.Label>
                      <Form.Control
                        input
                        type='Additional'
                        placeholder='Additional Information'
                        id='Additional'
                        onChange={addAI_Int}
                      />
                    </Form.Row>
                  </div>

                  <div className='h1_p_1'>
                    <Form.Row>
                      <Form.Label>New client form </Form.Label>
                      <Form.Control
                        input
                        type='file'
                        placeholder='file'
                        id='file'
                        onChange={addFileInt}
                      />
                    </Form.Row>
                  </div>
                  <div className='h1_p'>
                    <Button variant='primary' type='submit'>
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Calendar;
