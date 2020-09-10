import React from 'react';

import { Card } from 'react-bootstrap';
import './basic.css';

const About_Me = props => {
  //create a dynamic list of workout videos from the database
  const AboutMeContent = props.aboutMeArray.map(temp => {
    return (
      <section className='page-section' id='profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 text-center'>
              <h2 className='section-heading text-uppercase'>{temp.title}</h2>
              <h3 className='section-subheading text-muted'>{temp.subtitle}</h3>
              <div className='container'>
                <p>{temp.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  });

  return (
    <div className='App'>
      <header className='masthead'>
        <div className='container'>
          <div className='intro-text'>
            <div className='intro-heading text-uppercase'>About Me</div>
          </div>
        </div>
      </header>

      <Card body>
        <div className='h1_p_1'>
          <span className='fa-stack fa-4x'>
            <i className='fa fa-circle fa-stack-2x text-primary'></i>
            <i className='fa fa-user fa-stack-1x fa-inverse'></i>
          </span>
        </div>

        {AboutMeContent}
      </Card>
    </div>
  );
};

export default About_Me;
