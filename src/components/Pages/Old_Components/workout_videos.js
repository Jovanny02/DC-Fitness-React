import React, { Component } from 'react';

import { Form, Col, Row, Button, Card } from 'react-bootstrap';
import './basic.css';

const Client_Portal = () => (
  <div className='App'>
    <header className='masthead'>
      <div className='container'>
        <div className='intro-text'>
          <div className='intro-heading text-uppercase'>Client Portal</div>
          <div className='intro-lead-in'>Welcome back, Insert Name </div>
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
        <h3 className='section-subheading text-muted'>Lower Body</h3>

        <Row style={{ paddingTop: '20px' }}>
          <div className='video_p'>
            <Card style={{ width: '420px' }}>
              <iframe
                style={{ width: '420px', height: '315px' }}
                src='https://www.youtube.com/embed/mGvzVjuY8SY'
              ></iframe>
              <Card.Body>
                <Card.Title>Squat</Card.Title>
                <Card.Text>How to perform a perfect squat</Card.Text>
                <Button variant='primary'>Link</Button>
              </Card.Body>
            </Card>
          </div>

          <div className='video_p'>
            <Card style={{ width: '420px' }}>
              <iframe
                style={{ width: '420px', height: '315px' }}
                src='https://www.youtube.com/embed/wrwwXE_x-pQ'
              ></iframe>
              <Card.Body>
                <Card.Title>Lunge</Card.Title>
                <Card.Text>How to perform a perfect lunge</Card.Text>
                <Button variant='primary'>Link</Button>
              </Card.Body>
            </Card>
          </div>

          <div className='video_p'>
            <Card style={{ width: '420px' }}>
              <iframe
                style={{ width: '420px', height: '315px' }}
                src='https://www.youtube.com/embed/3FNAoJpGbrI'
              ></iframe>
              <Card.Body>
                <Card.Title>Rep Squat</Card.Title>
                <Card.Text>How to perform rep squat routine</Card.Text>
                <Button variant='primary'>Link</Button>
              </Card.Body>
            </Card>
          </div>
        </Row>

        <h3
          className='section-subheading text-muted'
          style={{ paddingTop: '20px', paddingBottom: '20px' }}
        >
          Upper Body
        </h3>
        <Row>
          <div className='video_p'>
            <Card style={{ width: '420px' }}>
              <iframe
                style={{ width: '420px', height: '315px' }}
                src='https://www.youtube.com/embed/VULt--bcWd0'
              ></iframe>
              <Card.Body>
                <Card.Title>Upper Body Active Stretch</Card.Title>
                <Card.Text>How to perform active stretch</Card.Text>
                <Button variant='primary'>Link</Button>
              </Card.Body>
            </Card>
          </div>

          <div className='video_p'>
            <Card style={{ width: '420px' }}>
              <iframe
                style={{ width: '420px', height: '315px' }}
                src='https://www.youtube.com/embed/oUychjqfO8I'
              ></iframe>
              <Card.Body>
                <Card.Title>Arms Workout</Card.Title>
                <Card.Text>How to perform arms workout</Card.Text>
                <Button variant='primary'>Link</Button>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </div>
    </Card>
  </div>
);

export default Client_Portal;
