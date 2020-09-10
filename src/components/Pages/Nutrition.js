import React, { useState, useEffect } from 'react';
import './basic.css';
import NutritionList from './NutritionList';
import { Form, Button, Card } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropDownList from './DropDownList';

//1) try to get the form working
//2) then research/implement hiding the edit based on who is logged in/what the admin can see

const Nutrition = props => {
  const [video, setVideo] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //default view values
  const [defaultVideo, setDefaultVideo] = useState('');
  const [defaultTitle, setDefaultTitle] = useState('');
  const [defaultDescription, setDefaultDescription] = useState('');

  const [category, setCategory] = useState('');
  const [searchBody, setSearchBody] = useState('');

  //internal change functions
  const addNutUpdateInt = event => {
    //change by calling App external function
    setSearchBody(event.target.value);
    //log
    console.log('Update Search text: ', searchBody);
  };

  //submit handler
  const submitSearch = event => {
    event.preventDefault();
    //redo search based on params
    let searchParams = {
      searchBody: searchBody,
      searchCategory: category
    };
    props.check(searchParams);

    //refocus on search results
    let listDiv = document.getElementById('listDiv');
    listDiv.style.display = 'block';

    setVideo('');
    setDescription('');
    setTitle('');
  };

  //used to display selected article title, body, and related video
  const displayArticle = article => {
    // console.log("In Display function")
    // console.log(title);
    // console.log(body);
    // console.log(video);
    let articleDiv = document.getElementById('articleDiv');
    let buttonDiv = document.getElementById('buttonDiv');

    if (article.title === '' && article.description === '') {
      articleDiv.style.display = 'none';
      buttonDiv.style.display = 'none';
    } else {
      setTitle(article.title);
      setDescription(article.description);
      articleDiv.style.display = 'block';
      buttonDiv.style.display = 'block';
      let listDiv = document.getElementById('listDiv');
      listDiv.style.display = 'none';
    }

    // only updates source if the passed in source isn't empty
    if (article.video !== '') {
      setVideo(
        'https://www.youtube.com/embed/' + article.video + '?modestbranding=1'
      );
    } else {
      setVideo('');
    }
  };

  //Used to hide selected article and go back to search results
  const hideArticle = () => {
    let listDiv = document.getElementById('listDiv');
    listDiv.style.display = 'block';

    let buttonDiv = document.getElementById('buttonDiv');
    buttonDiv.style.display = 'none';

    setVideo('');
    setDescription('');
    setTitle('');
    // console.log("In hide function")
    // console.log(title);
    // console.log(body);
    // console.log(video);
  };

  //video display functionality
  useEffect(() => {
    if (props.isAuthenticated) {
      let buttonDiv = document.getElementById('buttonDiv');
      buttonDiv.style.display = 'none';
      console.log('In useEffect function');
      console.log(title);
      console.log(description);
      console.log(video);
      let videoPlayer = document.getElementById('vidDiv');
      if (video === '') {
        videoPlayer.style.display = 'none';
      } else {
        videoPlayer.style.display = 'block';
        buttonDiv.style.display = 'block';
      }
    }
  }, [video]);

  useEffect(() => {
    if (!props.isAuthenticated) {
      //Do an empty search to get all articles
      let searchParams = {
        searchBody: '',
        searchCategory: ''
      };

      let articleSection = document.getElementById('defaultArticleSection');

      //choose the first article and display it in the default view
      if (
        props.articles !== undefined &&
        props.articles !== null &&
        props.articles[0] !== undefined &&
        props.articles[0] !== null
      ) {
        articleSection.style.display = 'block';

        //set default title
        if (
          props.articles[0].title !== undefined &&
          props.articles[0].title !== null
        ) {
          setDefaultTitle(props.articles[0].title);
        } else {
          setDefaultTitle('');
        }
        //set default description
        if (
          props.articles[0].description !== undefined &&
          props.articles[0].description !== null
        ) {
          setDefaultDescription(props.articles[0].description);
        } else {
          setDefaultDescription('');
        }
        //set default video
        let videoPlayer = document.getElementById('defaultVidDiv');
        if (
          props.articles[0].video === undefined ||
          props.articles[0].video === null ||
          props.articles[0].video === ''
        ) {
          setDefaultVideo('');
          videoPlayer.style.display = 'none';
        } else {
          setDefaultVideo(
            'https://www.youtube.com/embed/' +
              props.articles[0].video +
              '?modestbranding=1'
          );
          videoPlayer.style.display = 'block';
        }
      } else {
        articleSection.style.display = 'none';
        props.check(searchParams);
      }
    }
  }, [props.articles]);

  if (props.isAuthenticated) {
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

          <section className='page-section' id='overview'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-12 text-center'>
                  <h2 className='section-heading text-uppercase'>
                    {props.pageText === undefined ||
                    props.pageText.title === undefined ||
                    props.pageText.title === null
                      ? 'Guidance on a healthy diet'
                      : props.pageText.title}
                  </h2>
                  <h3 className='section-subheading text-muted'>
                    {props.pageText === undefined ||
                    props.pageText.subtitle === undefined ||
                    props.pageText.subtitle === null
                      ? 'A Brief Overview'
                      : props.pageText.subtitle}
                  </h3>

                  <div className='container'>
                    <p>
                      {props.pageText === undefined ||
                      props.pageText.body === undefined ||
                      props.pageText.body === null
                        ? ''
                        : props.pageText.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <span className='fa-stack fa-4x'>
            <i className='fa fa-circle fa-stack-2x text-primary'></i>
            <i className='fa fa-search fa-stack-1x fa-inverse'></i>
          </span>

          <section className='page-section' id='search'>
            <div className='row'>
              <div className='col-lg-12 text-center'>
                <h2 className='section-heading text-uppercase'>Search</h2>
                <h3 className='section-subheading text-muted'>
                  Search for Nutritional Videos and Articles
                </h3>

                <div className='container' style={{ width: '60pc' }}>
                  <Form onSubmit={submitSearch}>
                    <Form.Row>
                      <Form.Control
                        input
                        placeholder='Search for Nutritional Videos and Articles'
                        id='text'
                        onChange={addNutUpdateInt}
                        style={{ width: '45pc' }}
                      />

                      <div style={{ width: '12pc' }}>
                        <Form.Control
                          input
                          placeholder={
                            category === '' ? 'Search by Category' : category
                          }
                          id='categorySel'
                          disabled
                        />
                      </div>
                      <div style={{ width: '0pc' }}>
                        <Dropdown>
                          <DropdownToggle />
                          <DropdownMenu>
                            <DropDownList
                              categories={props.categories}
                              setSelected={setCategory}
                            />
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </Form.Row>

                    <div className='h1_p'>
                      <Button variant='primary' type='submit'>
                        Search
                      </Button>
                    </div>
                  </Form>
                </div>

                <div className='h1_p_1' id='listDiv'>
                  <div className='container'>
                    <NutritionList
                      articles={props.articles}
                      clickHandler={displayArticle}
                    />
                  </div>
                </div>

                <div className='h1_p_1' id='articleDiv'>
                  <h2 className='section-heading text-uppercase'>{title}</h2>
                  <div className='container'>
                    <p>{description}</p>
                  </div>
                </div>

                <div className='h1_p_1' id='vidDiv'>
                  <iframe
                    width='560'
                    height='315'
                    src={video}
                    frameBorder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </div>
                <div id='buttonDiv'>
                  <Button variant='primary' type='submit' onClick={hideArticle}>
                    Return to Results
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </Card>
      </div>
    );
  } else {
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

          <section className='page-section' id='defaultOverview'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-12 text-center'>
                  <h2 className='section-heading text-uppercase'>
                    {props.pageText === undefined ||
                    props.pageText.title === undefined ||
                    props.pageText.title === null
                      ? 'Guidance on a healthy diet'
                      : props.pageText.title}
                  </h2>
                  <h3 className='section-subheading text-muted'>
                    {props.pageText === undefined ||
                    props.pageText.subtitle === undefined ||
                    props.pageText.subtitle === null
                      ? 'A Brief Overview'
                      : props.pageText.subtitle}
                  </h3>

                  <div className='container'>
                    <p>
                      {props.pageText === undefined ||
                      props.pageText.body === undefined ||
                      props.pageText.body === null
                        ? ''
                        : props.pageText.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className='page-section'
            id='defaultArticleSection'
            style={{ margin: '-10pc 0 0 0' }}
          >
            <div className='col-lg-12 text-center'>
              <div id='defaultArticleDiv'>
                <h2
                  className='section-heading text-uppercase'
                  style={{ margin: '0 0 3pc 0' }}
                >
                  Sign Up to get access to nutrition articles like this
                </h2>
                <h3 className='section-heading text-uppercase'>
                  {defaultTitle}
                </h3>
                <div className='container'>
                  <p>{defaultDescription}</p>
                </div>
              </div>

              <div className='h1_p_1' id='defaultVidDiv'>
                <iframe
                  width='560'
                  height='315'
                  src={defaultVideo}
                  frameBorder='0'
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        </Card>
      </div>
    );
  }
};

export default Nutrition;
