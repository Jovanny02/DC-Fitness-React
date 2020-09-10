/* eslint-disable react/jsx-pascal-case */
import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

//import the content of each page
import HomeContent from './Pages/Home';
import About_Me_Content from './Pages/About_Me';
import Client_Portal_Content from './Pages/Client_Portal';
import Nutrition_Content from './Pages/Nutrition';
import Calendar_Content from './Pages/Calendar';
import Admin_Content from './Pages/Admin';
import Login_Content from './Pages/Login';
import Sign_Up_Content from './Pages/Sign_Up';
import Forgot_Password_Content from './Pages/Forgot_Password';
import Profile_Content from './Pages/Profile';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
Array.prototype.unique = function() {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

//Defines the content that is returned from each page
//(Which is returned from the individual js files for each page)
//For dynamic pages, (e.g. Sign up and login) the state functions and returning variables are managed here
export const Home = () => {
  return <HomeContent />;
};

export const About_Me = () => {
  const [aboutMeArray, setAboutMeArray] = useState([]);
  const [isAUpdating, setIsAUpdating] = useState(false);

  if (!isAUpdating) {
    setIsAUpdating(true);
    axios.get('/api/about_mes/').then(response => {
      setAboutMeArray(response.data);
    });
    setTimeout(async () => {
      setIsAUpdating(false);
    }, 5000);
  }
  return (
    <div>
      <About_Me_Content aboutMeArray={aboutMeArray} />
    </div>
  );
};

export const Client_Portal = props => {
  const [workouts, setWorkouts] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    'email',
    'token',
    'admin'
  ]);

  if (!isUpdating) {
    setIsUpdating(true);
    axios
      .get('/api/workout_videos/?access_token=' + cookies['token'])
      .then(response => {
        setWorkouts(response.data);
      });
    setTimeout(async () => {
      setIsUpdating(false);
    }, 5000);
  }

  return (
    <div>
      <Client_Portal_Content workout_videos={workouts} />
    </div>
  );
};

export const Calendar = () => {
  const [FNameAdd, setFName] = useState('');
  const [LNameAdd, setLName] = useState('');
  const [emailAdd, setEmail] = useState('');
  const [dateAdd, setDate] = useState('');
  const [timeAdd, setTime] = useState('');
  const [aiAdd, setAI] = useState('');
  const [fileAdd, setFile] = useState('');

  const addFNameUpdate = value => {
    setFName(value);
    console.log('addFNameUpdate() called, value: ', value);
  };

  const addLNameUpdate = value => {
    setLName(value);
    console.log('addLNameUpdate() called, value: ', value);
  };

  const addEmailUpdate = value => {
    setEmail(value);
    console.log('addEmailUpdate() called, value: ', value);
  };

  const addDateUpdate = value => {
    setDate(value);
    console.log('addDateUpdate() called, value: ', value);
  };

  const addTimeUpdate = value => {
    setTime(value);
    console.log('addTimeUpdate() called, value: ', value);
  };

  const addAIUpdate = value => {
    setAI(value);
    console.log('addAIUpdate() called, value: ', value);
  };

  const addFileUpdate = value => {
    setFile(value);
    console.log('addFileUpdate() called, value: ', value);
  };

  const check = async event => {
    //prevent the refresh of page on submit
    event.preventDefault();

    //log
    console.log('check Calendar() for New Meeting Request called');
    console.log('New Meeting- FName: ', FNameAdd);
    console.log('New Meeting- LName: ', LNameAdd);
    console.log('New Meeting- email: ', emailAdd);
    console.log('New Meeting- date: ', dateAdd);
    console.log('New Meeting- time: ', timeAdd);
    console.log('New Meeting- ai: ', aiAdd);
    console.log('New Meeting- file: ', fileAdd);

    let newMeetingRequest = {
      FNme: FNameAdd,
      LName: LNameAdd,
      email: emailAdd,
      date: dateAdd,
      time: timeAdd,
      ai: aiAdd,
      file: fileAdd
    };

    try {
      await axios.post('/api/mail/newMeetingRequest/', newMeetingRequest);
    } catch (err) {
      // TODO: do something
    }
  };

  //TODO: fetch the URL from backend
  const [calURL, setCalURL] = useState([]);
  const [isCalUpdating, setIsCalUpdating] = useState(false);

  if (!isCalUpdating) {
    setIsCalUpdating(true);
    axios.get('/api/config/').then(response => {
      setCalURL(response.data.calendar);
    });
    setTimeout(async () => {
      setIsCalUpdating(false);
    }, 30000);
  }

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <Calendar_Content
      check={check}
      addFNameUpdate={addFNameUpdate}
      addLNameUpdate={addLNameUpdate}
      addEmailUpdate={addEmailUpdate}
      addDateUpdate={addDateUpdate}
      addTimeUpdate={addTimeUpdate}
      addAIUpdate={addAIUpdate}
      addFileUpdate={addFileUpdate}
      calURL={calURL}
    />
  );
};

export const Nutrition = props => {
  //states for the login
  const [infos, setInfos] = useState([]);
  const [filteredInfos, setFilteredInfos] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingCat, setIsUpdatingCat] = useState(false);
  const [isUpdatingText, setIsUpdatingText] = useState(false);
  const [selectedCat, setSelectedCat] = useState('');
  //TODO REMOVE DEFAULT TESTING VALUES
  const [allCategories, setAllCategories] = useState([]);
  const [isCatUpdating, setIsCatUpdating] = useState(false);
  if (!isCatUpdating) {
    setIsCatUpdating(true);
    axios.get('/api/config/').then(response => {
      setAllCategories(
        response.data.categories.map(c => {
          return { title: c };
        })
      );
    });
    setTimeout(async () => {
      setIsCatUpdating(false);
    }, 5000);
  }

  const [pageText, setPageText] = useState({});
  const [isPageUpdating, setIsPageUpdating] = useState(false);

  if (!isPageUpdating) {
    setIsPageUpdating(true);
    axios.get('/api/config/').then(response => {
      setPageText(response.data.page);
    });
    setTimeout(async () => {
      setIsPageUpdating(false);
    }, 5000);
  }

  //get categories for admin page
  //TODO edit to match backend path
  // if (!isUpdatingCat) {
  //   setIsUpdatingCat(true);
  //   axios.get('/api/categories/').then(response => {
  //     setAllCategories(response.data);
  //   });
  //   setTimeout(async () => {
  //     setIsUpdatingCat(false);
  //   }, 25000);
  // }

  //get Nutrition Page Text
  //TODO edit to match backend path
  // if (!isUpdatingText) {
  //   setIsUpdatingText(true);
  //   axios.get('/api/ADD_PATH_HERE/').then(response => {
  //     setPageText(response.data);
  //   });
  //   setTimeout(async () => {
  //     setIsUpdatingText(false);
  //   }, 25000);
  // }

  //gets all articles
  if (!isUpdating) {
    setIsUpdating(true);
    axios.get('/api/nutrition_info/').then(response => {
      setInfos(response.data);
    });
    setTimeout(async () => {
      setIsUpdating(false);
    }, 25000);
  }

  //the check function to the database
  const check = params => {
    //prevent the refresh of page on submit

    console.dir(infos);
    setFilteredInfos(
      infos
        .filter(
          i =>
            params.searchCategory === '' || i.category === params.searchCategory
        )
        .filter(el => {
          if (params.searchBody === '') {
            return true;
          } else {
            return (
              el.title
                .toLowerCase()
                .includes(params.searchBody.toLowerCase()) ||
              el.description
                .toLowerCase()
                .includes(params.searchBody.toLowerCase())
            );
          }
        })
    );
    /* //TODO remove Test Case
    setFilteredInfos([
      {
        title: 'Healthy Aging With Nutrition',
        category: 'Category 3',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
          'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
          'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
          'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
        video: ''
      }
    ]);
    console.log('check() called');
    console.dir(params);*/
  };

  return (
    <Nutrition_Content
      check={check}
      isAuthenticated={props.isAuthenticated}
      pageText={pageText}
      categories={allCategories}
      articles={filteredInfos}
    />
  );
};

export const Admin = () => {
  //Clients
  const deleteClient = async (event, client) => {
    //prevent the refresh of page on submit
    //will need to be deleted
    event.preventDefault();

    //log
    console.log('deleteClient() called: ', client);

    await axios.delete('/api/users/' + client);
    setIsCUpdating(false);
  };

  //=============================================================
  //Workout Videos
  //states for the video add
  const [vidTitle, setVidTitle] = useState('');
  const [vidCategory, setVidCategory] = useState('');
  const [vidDescrip, setVidDescrip] = useState('');
  const [vidEncode, setVidEncode] = useState('');

  //take in the form fields and update their states
  const updateVidTitle = value => {
    setVidTitle(value);
  };

  const updateVidCategory = value => {
    setVidCategory(value);
  };

  const updateVidDescrip = value => {
    setVidDescrip(value);
  };

  const updateVidEncode = value => {
    setVidEncode(value);
  };

  const save = event => {
    //prevent the refresh of page on submit
    //will need to be deleted
    event.preventDefault();

    //log
    console.log('save() Workout Video called');

    //parse out the encode from the Youtube URL
    let encodeRaw = vidEncode;
    let encSplit = encodeRaw.split('=');
    let finEncode = encSplit[1];

    //LATER
    //1) need to check that the video does not already exist in database
    //2) need to create unique id's for each video

    //Save the submitted content as a JS object to database
    //create a new workout video schema
    let newWorkoutVideo = {
      title: vidTitle,
      category: vidCategory,
      description: vidDescrip,
      video: finEncode,

      //NEW FIELD: need to label
      label: vidTitle
    };

    axios.post('/api/workout_videos/', newWorkoutVideo);

    console.log('newWorkoutVideo: ', newWorkoutVideo);
  };

  const delete_wv = async (event, wv_name) => {
    //prevent the refresh of page on submit
    //will need to be deleted
    event.preventDefault();

    //log
    console.log('delete_wv() called. Video to delete: ', wv_name);
    await axios.delete('/api/workout_videos/' + wv_name);

    //TODO: send request to backend to delete the video ("wv_name")
  };

  //-------------------------------------------------------------------
  //New Client/Workout Video Assignment
  //Data: Temporary Clients Array (TO BE REPLACED LATER WITH THE BACKEND CLIENTS)

  //To connect to the front end set up (to populate dropdown menus)
  //Then delete the import of static at $S1

  //declare the arrays to be used

  const [clientsArray, setClientsArray] = useState([]);
  const [isCUpdating, setIsCUpdating] = useState(false);

  if (!isCUpdating) {
    setIsCUpdating(true);
    axios.get('/api/users/').then(response => {
      setClientsArray(response.data);
    });
    setTimeout(async () => {
      setIsCUpdating(false);
    }, 5000);
  }

  const [workoutVidArray, setWorkoutVidArray] = useState([]);
  const [isWUpdating, setIsWUpdating] = useState(false);

  if (!isWUpdating) {
    setIsWUpdating(true);
    axios.get('/api/workout_videos/').then(response => {
      setWorkoutVidArray(response.data);
    });
    setTimeout(async () => {
      setIsWUpdating(false);
    }, 5000);
  }

  const [aboutMeArray, setAboutMeArray] = useState([]);
  const [isAUpdating, setIsAUpdating] = useState(false);

  if (!isAUpdating) {
    setIsAUpdating(true);
    axios.get('/api/about_mes/').then(response => {
      setAboutMeArray(response.data);
    });
    setTimeout(async () => {
      setIsAUpdating(false);
    }, 5000);
  }

  //--------------------------------------------------------------------------
  //retrieve the names of clients
  let names_clients = [];

  //TODO: Instead need to fetch the clients/users database (currently static src: "clientsArray")
  //Iterate through array and retrieve the client names
  clientsArray.forEach(function(arrayItem) {
    arrayItem.label = arrayItem.fullName;
    arrayItem.value = arrayItem.fullName;
    var x = arrayItem.fullName;
    names_clients.push(x);
  });

  //retrieve the names of videos
  let names_videos = [];

  //TODO: Instead need to fetch the videos database (currently static src: "workoutVidArray")
  //Iterate through array and retrieve the videos names
  workoutVidArray.forEach(function(arrayItem) {
    arrayItem.label = arrayItem.title;
    arrayItem.value = arrayItem.title;
    var x = arrayItem.title;
    names_videos.push(x);
  });

  //save functions
  //get the list of selected clients
  //Assign Videos and Clients
  const assign_clientVideo_selections = (clientData, videoData) => {
    console.log('assign_clientVideo_selections() called');

    for (let i = 0; i < videoData.length; i++) {
      //query the video database
      let loopQuery = workoutVidArray.filter(obj => {
        return obj.title === videoData[i];
      });

      //check if the query was null
      if (loopQuery.length !== 0) {
        //push onto array
        videoData[i] = loopQuery[0].video;
      }
    }

    console.log('clientData ', clientData);
    console.log('videoData ', videoData);

    for (let client of clientData) {
      let videos = clientsArray.filter(c => c.fullName === client)[0].videos;
      axios.put(
        '/api/users/assign/' + client,
        videos.concat(videoData).unique()
      );
    }
    setIsCUpdating(false);

    //TODO: will need to push the received arrays of clients and videos and update them (add) in backend
    //TODO: Functionality of parsing the client and video data to update the backend
  };

  //Unassign Videos and Clients
  const unassign_clientVideo_selections = (clientData, videoData) => {
    console.log('unassign_clientVideo_selections() called');
    console.log('clientData ', clientData);
    console.log('videoData ', videoData);

    for (let i = 0; i < videoData.length; i++) {
      //query the video database
      let loopQuery = workoutVidArray.filter(obj => {
        return obj.title === videoData[i];
      });

      //check if the query was null
      if (loopQuery.length !== 0) {
        //push onto array
        videoData[i] = loopQuery[0].video;
      }
    }

    console.log('clientData ', clientData);
    console.log('videoData ', videoData);

    for (let client of clientData) {
      let videos = clientsArray.filter(c => c.fullName === client)[0].videos;
      axios.put(
        '/api/users/assign/' + client,
        videos.filter(v => !videoData.includes(v))
      );
    }
    setIsCUpdating(false);

    //TODO: will need to push the received arrays of clients and videos and update them (delete) in backend
    //TODO: Functionality of parsing the client and video data to update the backend
  };

  //=============================================================
  //Nutrition Page Text
  const saveNutText = async newText => {
    //TODO edit to match backend path
    // try {
    //   await axios.post('/api/ADD_PATH_HERE/', newText);
    // } catch (err) {
    //   console.log('SAVE nutrition Text', err);
    // }

    console.log('saveNutText() called');
    console.log('save Nutrition Text content: ', newText);
    await axios.put('/api/config/', { page: newText });
  };

  //=============================================================
  //Nutrition Categories
  //const [isUpdating, setIsUpdating] = useState(false);

  const [categories, setCategories] = useState([]);
  const [isCatUpdating, setIsCatUpdating] = useState(false);
  if (!isCatUpdating) {
    setIsCatUpdating(true);
    axios.get('/api/config/').then(response => {
      setCategories(
        response.data.categories.map(c => {
          return { title: c };
        })
      );
    });
    setTimeout(async () => {
      setIsCatUpdating(false);
    }, 5000);
  }
  //get categories for admin page
  //TODO edit to match backend path
  // if (!isUpdating) {
  //   setIsUpdating(true);
  //   axios.get('/api/categories/').then(response => {
  //     setCategories(response.data);
  //   });
  //   setTimeout(async () => {
  //     setIsUpdating(false);
  //   }, 25000);
  // }

  const saveCat = async newCategory => {
    const Category = {
      title: newCategory.title
    };

    //TODO edit to match backend path
    // try {
    //   await axios.post('/api/categories/', Category);
    // } catch (err) {
    //   console.log('SAVE Category', err);
    // }

    console.log('saveCat() called');
    console.log('saveCat content: ', Category);

    let newCats = categories.map(c => c.title);
    newCats.push(newCategory.title);
    console.log('ABOUT TO SEND', newCats.unique());
    axios.put('/api/config/', { categories: newCats.unique() });
    setIsCUpdating(false);
    setIsCatUpdating(false);
  };

  const deleteCat = async delCategory => {
    //TODO edit to match backend path
    // try {
    //   await axios.delete('/api/categories/', {data: {deleteCategory : delCategory.title}});
    // } catch (err) {
    //   console.log('SAVE Category', err);
    // }

    console.log('deleteCat() called');
    console.log('deleteCat content: ', delCategory);

    axios.put('/api/config/', {
      categories: categories
        .map(c => c.title)
        .filter(c => c !== delCategory.title)
    });
    setIsCUpdating(false);
    setIsCatUpdating(false);
  };

  //=============================================================
  //Nutrition
  //the save Nutrition article function
  const saveNut = async newArticle => {
    const article = {
      title: newArticle.title,
      category: newArticle.category,
      description: newArticle.body,
      video: newArticle.vidSrc
    };

    try {
      await axios.post('/api/nutrition_info/', article);
    } catch (err) {
      console.log('SAVENUT', err);
    }

    console.log('saveNut() called');
    console.log('saveNut content: ', newArticle);
  };
  //=============================================================
  //Nutrition Delete
  const [articles, setArticles] = useState([
    {
      title: 'NewArticle title',
      category: 'Category 1',
      body: 'new description',
      vidSrc: ''
    },
    {
      title: 'Article2 ',
      category: 'Category 2',
      body: 'new description',
      vidSrc: ''
    },
    {
      title: 'Healthy Lifestyle!',
      category: 'Category 1',
      body: 'new description',
      vidSrc: ''
    }
  ]);
  const [isUpdatingNut, setIsUpdatingNut] = useState(false);

  //retrieve all articles
  //TODO uncomment when done testing
  // if (!isUpdatingNut) {
  //   setIsUpdatingNut(true);
  //   axios.get('/api/nutrition_info/').then(response => {
  //     setArticles(response.data);
  //   });
  //   setTimeout(async () => {
  //     setIsUpdatingNut(false);
  //   }, 25000);
  // }

  let articleTitles = [];
  if (articles !== null && articles !== undefined) {
    articles.map(article => {
      articleTitles = [...articleTitles, { title: article.title }];
      //console.log(article.title);
    });
  }
  //console.log('All article titles: ');
  //console.table(articleTitles);

  //delete selected article
  const deleteNut = async delNutTitle => {
    //get entire article based on title
    //****NOTE if title is not enough to delete an article, uncomment this and adjust function to use entire article****
    //const delArticle = articles.filter(article => article.title === delNutTitle.title);

    //TODO edit to match backend path, see if sending title is enough for deletion
    // try {
    //   await axios.delete('/api/nutrition_info/', {data: {articleTitle : delNutTitle.title}});
    // } catch (err) {
    //   console.log('SAVE Article', err);
    // }

    console.log('Delete Nutrition article called on title:', delNutTitle.title);
  };

  //=============================================================
  //About Me
  //the save About Me section function
  const saveAM = async new_AM_Section => {
    const section = {
      title: new_AM_Section.AM_title,
      subtitle: new_AM_Section.AM_subtitle,
      body: new_AM_Section.AM_body
    };

    //**********TODO**********
    //TODO: save the About Me text Sections to backend

    try {
      await axios.post('/api/about_mes/', section);
    } catch (err) {
      console.log('SAVE_ABOUT_ME', err);
    }

    console.log('saveAM() called');
    console.log('saveAM content: ', new_AM_Section);
  };

  let names_am_articles = [];

  //TODO: Instead need to fetch the about me database (currently static src: "aboutMeArray")
  //Iterate through array and retrieve the client names
  aboutMeArray.forEach(function(arrayItem) {
    var x = arrayItem.title;
    names_am_articles.push(x);
  });

  const delete_am = async (event, am_name) => {
    //prevent the refresh of page on submit
    //will need to be deleted
    event.preventDefault();

    //log
    console.log('delete_am() called. Video to delete: ', am_name);

    await axios.delete('/api/about_mes/' + am_name);
    setIsAUpdating(false);

    //TODO: send request to backend to delete the about me article ("am_name")
  };

  //=============================================================
  //Calendar
  const [calURL, setCalURL] = useState('');

  //take in the form fields and update their states
  const updateCalURL = value => {
    setCalURL(value);
  };

  //save functions
  const saveCalURL = async event => {
    //will need to be deleted
    event.preventDefault();

    //TODO: save Google Calendar URL on backend

    //log
    console.log('saveCalURL() called, new calURL: ', calURL);
    await axios.put('/api/config', { calURL: calURL });
  };

  //=============================================================
  //Registration Code
  const [regCode, setRegCode] = useState('');
  const [isUpdatingReg, setIsUpdatingReg] = useState(false);

  //retrieve registration code
  //TODO Connect to backend path and test to make sure code is received
  // if (!isUpdatingReg) {
  //   setIsUpdatingReg(true);
  //   axios.get('/api/ADD_PATH_HERE/').then(response => {
  //     setRegCode(response.data);
  //   });
  //   setTimeout(async () => {
  //     setIsUpdatingReg(false);
  //   }, 25000);
  // }

  const saveRegCode = async () => {
    //TODO CONNECT TO CORRECT BACKEND PATH
    // try {
    //   await axios.post('/api/ADD_PATH_HERE/', {registrationCode : regCode});
    // } catch (err) {
    //   console.log('SAVE Reg code', err);
    // }
    console.log('Save Reg Called: ', regCode);
    await axios.put('/api/config', { code: regCode });
  };

  return (
    <Admin_Content
      deleteClient={deleteClient}
      save={save}
      delete_wv={delete_wv}
      saveNut={saveNut}
      saveCat={saveCat}
      deleteCat={deleteCat}
      articles={articleTitles}
      deleteNut={deleteNut}
      categories={categories}
      updateVidTitle={updateVidTitle}
      updateVidCategory={updateVidCategory}
      updateVidDescrip={updateVidDescrip}
      updateVidEncode={updateVidEncode}
      vidCategory={vidCategory}
      vidTitle={vidTitle}
      vidDescrip={vidDescrip}
      vidEncode={vidEncode}
      saveAM={saveAM}
      names_clients={names_clients}
      names_videos={names_videos}
      clientsArray={clientsArray}
      workoutVidArray={workoutVidArray}
      assign_clientVideo_selections={assign_clientVideo_selections}
      unassign_clientVideo_selections={unassign_clientVideo_selections}
      names_am_articles={names_am_articles}
      delete_am={delete_am}
      updateCalURL={updateCalURL}
      saveCalURL={saveCalURL}
      saveRegCode={saveRegCode}
      regCode={regCode}
      setRegCode={setRegCode}
      saveNutText={saveNutText}
    />
  );
};

//checking if the login credentials match the existing users in the database
export const Login = props => {
  //states for the login
  const [emailAdd, setEmail] = useState('');
  const [passAdd, setPass] = useState('');
  const [displayMsg, setDisplayMsg] = useState(false);

  //take in the email from the form and check to see if it exists in the database
  const checkEmail = value => {
    setEmail(value);
    console.log('checkEmail() called, value: ', value);
  };

  const checkPass = value => {
    setPass(value);
    //console.log('checkPass() called, value: ', value);
  };

  //the check function to the database
  const check = async event => {
    //prevent the refresh of page on submit
    event.preventDefault();

    //log
    console.log('check() called');
    console.log('check() email: ', emailAdd);
    //console.log('check() pass: ', passAdd);

    const loginData = { email: emailAdd, password: passAdd };

    try {
      const response = await axios.post('/api/sessions/', loginData);
      props.setIsAdmin(String(response.data.isAdmin));
      props.setEmail(emailAdd);
      props.setToken(response.data.token);
      console.log('isadmin: ', response.data.isAdmin);
      setDisplayMsg(false);
    } catch (err) {
      // TODO: do something
      setDisplayMsg(true);
      console.log(err);
    }
  };

  if (props.email) {
    return <Redirect to='/client_portal' />;
  }

  return (
    <Login_Content
      check={check}
      checkEmail={checkEmail}
      checkPass={checkPass}
      displayMsg={displayMsg}
    />
  );
};

//adding a new user to the database
export const Sign_Up = () => {
  //states for the new user
  const [regPassAdd, setRegPass] = useState('');
  const [FNameAdd, setFName] = useState('');
  const [LNameAdd, setLName] = useState('');
  const [emailAdd, setEmail] = useState('');
  const [passAdd, setPass] = useState('');
  const [passCAdd, setCPass] = useState('');
  const [reload, setReload] = useState(false);

  //the update functions update the current states
  const addRegPasswordUpdate = value => {
    setRegPass(value);
    console.log('addRegPasswordUpdate() called, value: ', value);
  };

  const addFNameUpdate = value => {
    setFName(value);
    console.log('addFNameUpdate() called, value: ', value);
  };

  const addLNameUpdate = value => {
    setLName(value);
    console.log('addLNameUpdate() called, value: ', value);
  };

  const addEmailUpdate = value => {
    setEmail(value);
    console.log('addEmailUpdate() called, value: ', value);
  };

  const addPassUpdate = value => {
    setPass(value);
    //console.log('addPassUpdate() called, value: ', value);
  };

  const addPassConfUpdate = value => {
    setCPass(value);
    //console.log('addPassConfUpdate() called, value: ', value);
  };

  //the save function to the database
  const save = async event => {
    //prevent the refresh of page on submit
    event.preventDefault();

    //log
    console.log('save() Sign Up called');
    console.log('save() regPass: ', regPassAdd);
    console.log('save() FName: ', FNameAdd);
    console.log('save() LName: ', LNameAdd);
    console.log('save() email: ', emailAdd);
    console.log('save() pass: ', passAdd);
    console.log('save() passC: ', passCAdd);

    //2) and will need to check is the email already exists in the database

    //create a new user schema
    //**4/19: CHANGED THE USER SCHEMA, MAY NEED TO RE-ADD EXISTING TESTING USER DATA */
    let newUser = {
      code: regPassAdd,
      FName: FNameAdd,
      LName: LNameAdd,
      fullName: FNameAdd + ' ' + LNameAdd,
      label: FNameAdd + ' ' + LNameAdd,
      email: emailAdd,
      password: passAdd
    };

    try {
      await axios.post('/api/mail/confirmation/', newUser);
      const s = await axios.post('/api/users/', newUser);
      if (s.status == 200) {
        setReload(true);
      }
    } catch (err) {
      return false;
    }
    console.log('trying reload');
  };

  if (reload) {
    console.log('caught redirect');
    setTimeout(() => {
      setReload(false);
    }, 10000);
    return <Redirect to='/login' />;
  }

  return (
    <Sign_Up_Content
      save={save}
      addRegPasswordUpdate={addRegPasswordUpdate}
      addFNameUpdate={addFNameUpdate}
      addLNameUpdate={addLNameUpdate}
      addEmailUpdate={addEmailUpdate}
      addPassUpdate={addPassUpdate}
      addPassConfUpdate={addPassConfUpdate}
    />
  );
};

export const Forgot_Password = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassC, setnewPassC] = useState('');

  const emailUpdate = value => {
    setEmail(value);
  };

  const nameUpdate = value => {
    setName(value);
  };

  const NewPassUpdate = value => {
    setNewPass(value);
  };

  const NewPassCUpdate = value => {
    setnewPassC(value);
  };

  const save = async event => {
    //prevent the refresh of page on submit
    event.preventDefault();

    //log
    console.log('save Forgot Password() called');
    console.log('email: ', email);
    console.log('name: ', name);
    console.log('newPass: ', newPass);
    console.log('newPassC: ', newPassC);

    let User = {
      FNme: name,
      email: email
    };

    try {
      await axios.post('/api/mail/resetNotification/', User);
    } catch (err) {
      // TODO: do something
    }

    //TODO: need to query the database based on the email
    //then update the user schema with the new password
  };

  return (
    <div>
      <Forgot_Password_Content
        emailUpdate={emailUpdate}
        nameUpdate={nameUpdate}
        NewPassUpdate={NewPassUpdate}
        NewPassCUpdate={NewPassCUpdate}
        save={save}
      />
    </div>
  );
};

//NO Backend user session functionality
export const Profile = () => {
  //temporary
  let exampleUser = {
    FName: 'Jodie',
    LName: 'Doe',
    email: 'jodie@ufl.edu',
    password: 'passAdd'
  };

  //TODO: Needs to fetch the data of the userthat is currently logged in, and display the information

  return (
    <div>
      <Profile_Content
        FName={exampleUser.FName}
        LName={exampleUser.LName}
        email={exampleUser.email}
      />
    </div>
  );
};
