import React from 'react';
import './basic.css';

import { Form, Col, Row, Button, Card } from 'react-bootstrap';

//1) try to get the form working
//2) then research/implement hiding the edit based on who is logged in/what the admin can see

const Nutrition = props => {
  //internal change functions
  const addVideoCategoryInt = event => {
    //change by calling App external function
    props.updateVidCategory(event.target.value);
    console.log('Update Video Category: ', event.target.value);
  };

  const addVideoTitleInt = event => {
    //change by calling App external function
    props.updateVidTitle(event.target.value);
    console.log('Update Video Title: ', event.target.value);
  };

  const addVideoDecripInt = event => {
    //change by calling App external function
    props.updateVidDescrip(event.target.value);
    console.log('Update Video Descrip: ', event.target.value);
  };

  const addVideoEncodInt = event => {
    //change by calling App external function
    props.updateVidEncode(event.target.value);
    console.log('Update Video Encode: ', event.target.value);
  };

  return (
    <div className='App'>
      <header className='masthead'>
        <div className='container'>
          <div className='intro-text'>
            <div className='intro-heading text-uppercase'>Nutrition</div>
          </div>
        </div>
      </header>

      <Card body>
        <div className='h1_p_1'>
          <span className='fa-stack fa-4x'>
            <i className='fa fa-circle fa-stack-2x text-primary'></i>
            <i className='fa fa-cutlery fa-stack-1x fa-inverse'></i>
          </span>
        </div>

        <section className='page-section' id='profile'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12 text-center'>
                <h2 className='section-heading text-uppercase'>
                  Guidance on a Healthy Diet
                </h2>
                <h3 className='section-subheading text-muted'>
                  A Brief Overview
                </h3>

                <div className='container'>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Row style={{ paddingTop: '20px' }}>
          <div className='video_p'>
            <Card style={{ width: '420px' }}>
              <iframe
                style={{ width: '420px', height: '315px' }}
                src={'https://www.youtube.com/embed/' + props.subContent}
              ></iframe>
              <Card.Body>
                <Card.Title>{props.subTitle}</Card.Title>
                <Card.Text>{props.subText}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Row>

        <p>
          Please submit the ending encoding string to the <b>Youtube</b> video
        </p>
        <p>
          <b>EX: </b>"https://www.youtube.com/watch?v=mGvzVjuY8SY" submit{' '}
          <b>mGvzVjuY8SY</b>
        </p>

        <div className='container'>
          <Card body style={{ width: '1100px' }}>
            <div className='container' style={{ width: '600px' }} v>
              <div className='col-12'>
                <Form onSubmit={props.check}>
                  <Form.Row>
                    <Form.Label>Video Title</Form.Label>
                    <Form.Control
                      input
                      placeholder='Enter Video Title'
                      id='title'
                      onChange={addVideoTitleInt}
                    />
                  </Form.Row>

                  <div className='h1_p_1'>
                    <Form.Row>
                      <Form.Label>Video Category</Form.Label>
                      <Form.Control
                        input
                        placeholder='Enter Video Category'
                        id='category'
                        onChange={addVideoCategoryInt}
                      />
                    </Form.Row>
                  </div>

                  <div className='h1_p_1'>
                    <Form.Row>
                      <Form.Label>Video Description</Form.Label>
                      <Form.Control
                        input
                        placeholder='Enter Video Description'
                        id='description'
                        onChange={addVideoDecripInt}
                      />
                    </Form.Row>
                  </div>

                  <div className='h1_p_1'>
                    <Form.Row>
                      <Form.Label>Video Encoding</Form.Label>
                      <Form.Control
                        input
                        placeholder='Enter Video Encoding'
                        id='encode'
                        onChange={addVideoEncodInt}
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

export default Nutrition;
