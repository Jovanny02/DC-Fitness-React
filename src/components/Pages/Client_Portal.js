import React, { Component } from 'react';

import { Form, Col, Row, Button, Card } from 'react-bootstrap';
import './basic.css';

const Client_Portal = props => {
  //create a dynamic list of workout videos from the database
  const workoutVideoList = props.workout_videos.map(temp => {
    return (
      <div className='video_p'>
        <Card style={{ width: '420px' }}>
          <iframe
            style={{ width: '420px', height: '315px' }}
            src={'https://www.youtube.com/embed/' + temp.video}
          ></iframe>
          <Card.Body>
            <Card.Title>{temp.title}</Card.Title>
            <Card.Text>{temp.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  });

  //the we page content that is returned
  return (
    <div className='App'>
      <header className='masthead'>
        <div className='container'>
          <div className='intro-text'>
            <div className='intro-heading text-uppercase'>Client Portal</div>
            <div className='intro-lead-in'>Welcome back!</div>
          </div>
        </div>
      </header>

      <Card body>
        <div className='h1_p_1'>
          <span className='fa-stack fa-4x'>
            <i className='fa fa-circle fa-stack-2x text-primary'></i>
            <i className='fa fa-video-camera fa-stack-1x fa-inverse'></i>
          </span>
        </div>

        <div className='h1_p'>
          <h2 className='section-heading text-uppercase'>Workouts</h2>
          {/*<h3 className='section-subheading text-muted'>Lower Body</h3>*/}

          <Row style={{ paddingTop: '20px' }}>
            {/*Place the referenced list of videos here*/}
            {workoutVideoList}
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default Client_Portal;
