/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './basic.css';
import { Form, Button, Card, Tabs, Tab } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropDownList from './DropDownList';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  CSVExport,
  Search
} from 'react-bootstrap-table2-toolkit';

//Admin Link will need to be changed to client's
const Admin = props => {
  //Clients
  //Define Table tool kit components
  const { ExportCSVButton } = CSVExport;
  const { SearchBar } = Search;

  //create a dynamic list of clients from the database
  //This defines the columns and the data values they will pull from
  const columnsClientTable = [
    {
      dataField: 'FName',
      text: 'First Name',
      sort: true
    },
    {
      dataField: 'LName',
      text: 'Last Name',
      sort: true
    },
    {
      dataField: 'email',
      text: 'Email Address'
    }
  ];

  //Delete a Client
  const [client_del_name, setclient_del_name] = useState('');

  const selectClientDelete = event => {
    //change state
    setclient_del_name(event.target.value);
    console.log('Client to Delete: ', event.target.value);
  };

  const clientDeleteHandler = event => {
    console.log('Client Delete Submitted');

    //send to pages.js
    props.deleteClient(event, client_del_name);

    //display message
    let labelElement = document.getElementById('delClient_submit_message');
    labelElement.innerHTML = 'Client Successfully Deleted.';
    labelElement.className = 'alert alert-success';
    labelElement.style.display = 'block';
  };

  ///============================================================
  //Workout Videos
  //for Youtube URL format verification
  const [wv_URL, setwv_URL] = useState('');

  //internal change functions
  const addVideoCategoryInt = event => {
    //change by calling App external function
    props.updateVidCategory(event.target.value);
  };

  const addVideoTitleInt = event => {
    //change by calling App external function
    props.updateVidTitle(event.target.value);
  };

  const addVideoDecripInt = event => {
    //change by calling App external function
    props.updateVidDescrip(event.target.value);
  };

  const addVideoURLInt = event => {
    //change by calling App external function
    props.updateVidEncode(event.target.value);

    setwv_URL(event.target.value);
  };

  const addWorkoutVideoSaveHandler = event => {
    //event.preventDefault();

    //log
    console.log('addWorkoutVideoSaveHandler() called');

    //check to make sure it is a valid Youtube URL
    console.log('wv_URL ', wv_URL);

    let boolWVYoutubeURL = wv_URL.includes('https://www.youtube.com');
    console.log('boolWVYoutubeURL ', boolWVYoutubeURL);

    //only call the save handler if it is a valid Youtube URL
    if (boolWVYoutubeURL === true) {
      //display success message
      let labelElement = document.getElementById('addWV_submit_message');
      labelElement.innerHTML = 'New Workout Video Added Successfully!';
      labelElement.className = 'alert alert-success';
      labelElement.style.display = 'block';

      //clear fields
      let wv_title_ele = document.getElementById('title_vid');
      wv_title_ele.value = '';
      let wv_cat_ele = document.getElementById('category_vid');
      wv_cat_ele.value = '';
      let wv_des_ele = document.getElementById('description_vid');
      wv_des_ele.value = '';
      let wv_enc_ele = document.getElementById('encode_vid');
      wv_enc_ele.value = '';

      //call save function
      props.save(event);
    } else {
      //else do not submit, and display error message
      event.preventDefault();

      let labelElement = document.getElementById('addWV_submit_message');
      labelElement.innerHTML =
        'Input invalid, not a valid Youtube Link. Please try again.';
      labelElement.className = 'alert alert-danger';
      labelElement.style.display = 'block';
    }
  };

  //------------------------------------------------------------------------
  //Assign Clients to Videos
  const c_v_multipleSaveHandler = event => {
    event.preventDefault();

    //convert to HTML
    let clients_elem_HTML = document.getElementById('clients_multiple_sel')
      .innerHTML;
    let w_videos_elem_HTML = document.getElementById('w_videos_multiple_sel')
      .innerHTML;

    //return
    let clients_arrayObj_return = [];
    let videos_arrayObj_return = [];

    //search through the returned HTML for options
    for (let i = 0; i < props.clientsArray.length; i++) {
      //search for clients
      var n = clients_elem_HTML.search(props.clientsArray[i].fullName);
      //console.log(props.clientsArray[i].name, ' found: ', n);

      //create an object to store the selects if it exists
      if (n !== -1) {
        clients_arrayObj_return.push(props.clientsArray[i].fullName);
      }
    }

    for (let i = 0; i < props.workoutVidArray.length; i++) {
      //search for videos
      var v = w_videos_elem_HTML.search(props.workoutVidArray[i].title);

      //create an object to store the selects if it exists
      if (v !== -1) {
        videos_arrayObj_return.push(props.workoutVidArray[i].title);
      }
    }

    //log the selected
    console.log('Client Assign Videos Submit triggered');

    //check to make sure form was filled out correctly
    if (
      clients_arrayObj_return.length === 0 ||
      videos_arrayObj_return.length === 0
    ) {
      //display error message
      let labelElement = document.getElementById('cav_submit_message');
      labelElement.innerHTML =
        'Videos Not Assigned Successfully, Please Fill Select Fields.';
      labelElement.className = 'alert alert-danger';
      labelElement.style.display = 'block';
    } else {
      //display success message
      let labelElement = document.getElementById('cav_submit_message');
      labelElement.innerHTML = 'Videos Assigned to Clients Successfully!';
      labelElement.className = 'alert alert-success';
      labelElement.style.display = 'block';

      //Send the data to pages.js for backend integration
      props.assign_clientVideo_selections(
        clients_arrayObj_return,
        videos_arrayObj_return
      );
    }
  };

  const c_v_multipleUnassignHandler = event => {
    event.preventDefault();

    //convert to HTML
    let clients_elem_HTML = document.getElementById('clients_multiple_sel_un')
      .innerHTML;
    let w_videos_elem_HTML = document.getElementById('w_videos_multiple_sel_un')
      .innerHTML;

    //return
    let clients_arrayObj_return = [];
    let videos_arrayObj_return = [];

    //search through the returned HTML for options
    for (let i = 0; i < props.clientsArray.length; i++) {
      //search for clients
      var n = clients_elem_HTML.search(props.clientsArray[i].fullName);
      //console.log(props.clientsArray[i].name, ' found: ', n);

      //create an object to store the selects if it exists
      if (n !== -1) {
        clients_arrayObj_return.push(props.clientsArray[i].fullName);
      }
    }

    for (let i = 0; i < props.workoutVidArray.length; i++) {
      //search for videos
      var v = w_videos_elem_HTML.search(props.workoutVidArray[i].title);

      //create an object to store the selects if it exists
      if (v !== -1) {
        videos_arrayObj_return.push(props.workoutVidArray[i].title);
      }
    }

    //log the selected
    console.log('Client Unassign Videos Submit triggered');

    //check to make sure form was filled out correctly
    if (
      clients_arrayObj_return.length === 0 ||
      videos_arrayObj_return.length === 0
    ) {
      //display error message
      let labelElement = document.getElementById('cuv_submit_message');
      labelElement.innerHTML =
        'Videos Not Unassigned Successfully, Please Fill Select Fields.';
      labelElement.className = 'alert alert-danger';
      labelElement.style.display = 'block';
    } else {
      //display success message
      let labelElement = document.getElementById('cuv_submit_message');
      labelElement.innerHTML = 'Videos Unassigned to Clients Successfully!';
      labelElement.className = 'alert alert-success';
      labelElement.style.display = 'block';

      //Send the data to pages.js for backend integration
      props.unassign_clientVideo_selections(
        clients_arrayObj_return,
        videos_arrayObj_return
      );
    }
  };

  //Delete Wokrkout Video
  const [wv_delete, setwv_delete] = useState('');

  const select_wv_delete = event => {
    //change state
    setwv_delete(event.target.value);
    console.log('Workout Video to be Deleted: ', event.target.value);
  };

  const wv_delete_handler = event => {
    props.delete_wv(event, wv_delete);

    //display message
    let labelElement = document.getElementById('del_wv_submit_message');
    labelElement.innerHTML = 'Workout Video Deleted Successfully!';
    labelElement.className = 'alert alert-success';
    labelElement.style.display = 'block';
  };

  //------------------------------------------------------------------------
  //View Client's Assigned Videos
  let vc_clientVideos = [];
  const [client_VName, setclient_VName] = useState('');

  const selectClientVNameInt = event => {
    //change state
    setclient_VName(event.target.value);
    console.log('Update ClientVName: ', event.target.value);
  };

  const client_VNameSaveHandler = event => {
    event.preventDefault();

    //log
    console.log('client_VNameSaveHandler() called');
    console.log('Client Name for videos to fetch: ', client_VName);

    //TODO 4/17
    //send a request to GET the video information based on this client name, client_VName (currently static)
    //query the array based on client name
    let queryObj = props.clientsArray.filter(obj => {
      return obj.fullName === client_VName;
    });

    //retrieve the videos array of that query
    let videosArr = queryObj[0].videos;
    console.log('query ', queryObj);
    console.log('videosArr ', videosArr);

    //query the video database for the list of names based on the encoding
    vc_clientVideos = [];
    for (let i = 0; i < props.workoutVidArray.length; i++) {
      //query the video database
      let loopQuery = props.workoutVidArray.filter(obj => {
        return obj.video === videosArr[i];
      });

      //check if the query was null
      if (loopQuery.length !== 0) {
        //push onto array
        vc_clientVideos.push(loopQuery[0].title);

        console.log('loopQuery object ', loopQuery);
        console.log('exists? ', i);
      }
    }

    console.log('final vc_clientVideos ', vc_clientVideos);

    //on the submit, change the results of the client videos to the front end
    let vc_element = document.getElementById('cv_videolist');
    vc_element.className = 'alert alert-info';
    vc_element.style.display = 'block';
    vc_element.innerHTML =
      vc_clientVideos.length === 0
        ? 'No videos assigned'
        : vc_clientVideos.join('<br>');
  };

  ///============================================================
  //Nutrition Text
  const [saveMsgNutText, setSaveMsgNutText] = useState(
    'Text Saved Successfully'
  );
  const [nutTextTitle, setNutTextTitle] = useState('');
  const [nutTextSubtitle, setNutTextSubtitle] = useState('');
  const [nutTextBody, setNutTextBody] = useState('');

  useEffect(() => {
    let saveMsg = document.getElementById('saveMessage_NutText');
    saveMsg.style.display = 'none';
  }, []);

  const changeHandlerNutText = () => {
    let title = document.getElementById('nutritionTitle');
    setNutTextTitle(title.value);

    let subTitle = document.getElementById('nutritionSubtitle');
    setNutTextSubtitle(subTitle.value);

    let body = document.getElementById('nutritionBody');
    setNutTextBody(body.value);

    //clear message
    let labelElement = document.getElementById('saveMessage_NutText');
    labelElement.style.display = 'none';
  };

  const saveHandler_NutText = event => {
    event.preventDefault();
    let labelElement = document.getElementById('saveMessage_NutText');
    labelElement.style.display = 'block';

    if (nutTextBody === '' || nutTextSubtitle === '' || nutTextTitle === '') {
      setSaveMsgNutText('Save Failed: Cannot have empty categories');
      labelElement.className = 'alert alert-danger';
    } else {
      //save info
      let newText = {
        title: nutTextTitle,
        subtitle: nutTextSubtitle,
        body: nutTextBody
      };
      props.saveNutText(newText);

      //set save message
      setSaveMsgNutText('Text Saved Successfully');
      labelElement.className = 'alert alert-success';

      //clear values
      let title = document.getElementById('nutritionTitle');
      setNutTextTitle('');
      title.value = '';

      let subTitle = document.getElementById('nutritionSubtitle');
      setNutTextSubtitle('');
      subTitle.value = '';

      let body = document.getElementById('nutritionBody');
      setNutTextBody('');
      body.value = '';
    }
  };

  //------------------------------------------------------------
  //Nutrition Category
  const [selectedCat, setSelectCat] = useState('');
  const [saveMsgCat, setSaveMsgCat] = useState('Category Saved Successfully');
  const [deleteMsgCat, setdeleteMsgCat] = useState(
    'Category Deleted Successfully'
  );
  useEffect(() => {
    let deleteMsg = document.getElementById('deleteMessage_cat');
    deleteMsg.style.display = 'none';

    let saveMsg = document.getElementById('saveMessage_cat');
    saveMsg.style.display = 'none';
  }, []);

  //Save Handlers
  const saveHandler_cat = event => {
    event.preventDefault();
    //call save function in pages file
    let categoryElement = document.getElementById('category');
    let newCategory = { title: categoryElement.value };
    let saveMsg = document.getElementById('saveMessage_cat');

    if (newCategory.title !== '' && newCategory.title !== undefined) {
      //call delete function in pages
      props.saveCat(newCategory);

      //set messages and clear selected
      setSaveMsgCat('Category Saved Successfully');
      saveMsg.style.display = 'block';
      saveMsg.className = 'alert alert-success';
      categoryElement.value = '';
    } else {
      setdeleteMsgCat('Save Failed: Cannot create an empty category');
      saveMsg.className = 'alert alert-danger';
    }
  };

  //Delete Handlers
  const updateSelected_cat = category => {
    setSelectCat(category);
    let deleteMsg = document.getElementById('deleteMessage_cat');
    deleteMsg.style.display = 'none';
  };

  const deleteHandler_cat = event => {
    event.preventDefault();
    let deleteMsg = document.getElementById('deleteMessage_cat');
    deleteMsg.style.display = 'block';

    if (selectedCat !== '' && selectedCat !== undefined) {
      let delCategory = { title: selectedCat };

      //call delete function in pages
      props.deleteCat(delCategory);

      //set messages and clear selected
      setdeleteMsgCat('Category Deleted Successfully');
      deleteMsg.className = 'alert alert-success';
      setSelectCat('');
    } else {
      setdeleteMsgCat('Delete Failed: No category selected');
      deleteMsg.className = 'alert alert-danger';
    }
  };

  ///============================================================
  //Nutrition
  const [title, setTitle] = useState('');
  const [category_nut, setCategory_nut] = useState('');
  const [body, setBody] = useState('');
  const [vidSrc, setVidSrc] = useState('');
  const [saveMessage_nut, setSaveMessage_nut] = useState('');

  const saveHandler_nut = event => {
    console.log('Update Admin Nutrition Triggered');
    event.preventDefault();
    let newArticle = { title: '', category: '', body: '', vidSrc: '' };

    //check for link and parse it for unique code
    if (vidSrc !== '' && vidSrc !== undefined) {
      //splits link and takes the unique code needed for the embed
      let parsedLink = vidSrc.split('=');
      if (parsedLink[1] !== null && parsedLink[1] !== undefined) {
        newArticle.vidSrc = parsedLink[1];
      } else {
        //display Error Message
        let labelElement = document.getElementById('saveMessage_nut');
        setSaveMessage_nut(
          'Article Save Failed: Video Link in Incorrect Format'
        );
        labelElement.style.display = 'block';
        labelElement.className = 'alert alert-danger';
        return;
      }
    }

    //check for empty category
    if (category_nut === '' || category_nut === undefined) {
      //display Error Message
      let labelElement = document.getElementById('saveMessage_nut');
      setSaveMessage_nut('Article Save Failed: No category selected');
      labelElement.style.display = 'block';
      labelElement.className = 'alert alert-danger';
      return;
    }

    //checks for empty title or body
    if (
      title === '' ||
      title === undefined ||
      body === '' ||
      body === undefined
    ) {
      //display Error Message
      let labelElement = document.getElementById('saveMessage_nut');
      setSaveMessage_nut('Article Save Failed: Title or Description is Empty');
      labelElement.style.display = 'block';
      labelElement.className = 'alert alert-danger';

      return;
    } else {
      //save article
      newArticle.title = title;
      newArticle.category = category_nut;
      newArticle.body = body;
      props.saveNut(newArticle);

      console.log('new article is: ');
      console.dir(newArticle);
      //clear fields
      let titleElement = document.getElementById('title');
      titleElement.value = '';
      let categoryElement = document.getElementById('category_nut');
      categoryElement.value = '';
      let bodyElement = document.getElementById('body');
      bodyElement.value = '';
      let linkElement = document.getElementById('link');
      linkElement.value = '';

      //display save message
      let labelElement = document.getElementById('saveMessage_nut');
      setSaveMessage_nut('Article Saved Successfully!');
      labelElement.className = 'alert alert-success';
      labelElement.style.display = 'block';
    }

    console.log('Saved Article: ');
    console.dir(newArticle);
  };

  const changeHandler = () => {
    let title = document.getElementById('title');
    setTitle(title.value);

    let body = document.getElementById('body');
    setBody(body.value);

    let vidSrc = document.getElementById('link');
    setVidSrc(vidSrc.value);

    //clear message
    let labelElement = document.getElementById('saveMessage_nut');
    labelElement.style.display = 'none';
  };
  useEffect(() => {
    let labelElement = document.getElementById('saveMessage_nut');
    labelElement.style.display = 'none';
  }, []);

  ///============================================================
  //Delete Nutrition
  const [allArticles, setAllArticles] = useState(props.articles);
  const [selectedArticle, setSelectedArticle] = useState('');
  const [deleteMsgNut, setdeleteMsgNut] = useState(
    'Article Deleted Successfully'
  );
  useEffect(() => {
    let deleteMsg = document.getElementById('deleteMessage_nut');
    deleteMsg.style.display = 'none';
  }, []);

  const deleteHandler_nut = event => {
    event.preventDefault();
    let deleteMsg = document.getElementById('deleteMessage_nut');
    deleteMsg.style.display = 'block';

    if (selectedArticle !== '' && selectedArticle !== undefined) {
      let delNutTitle = { title: selectedArticle };

      //call delete function in pages
      props.deleteNut(delNutTitle);

      //set messages and clear selected
      setdeleteMsgNut('Category Deleted Successfully');
      deleteMsg.className = 'alert alert-success';
      setSelectedArticle('');
    } else {
      setdeleteMsgNut('Delete Failed: No Article selected');
      deleteMsg.className = 'alert alert-danger';
    }
  };

  ///============================================================
  //About Me
  const [AM_name, setAM_name] = useState('');
  const [AM_title, setAM_title] = useState('');
  const [AM_subtitle, setAM_subtitle] = useState('');
  const [AM_body, setAM_body] = useState('');
  const [saveMessage_AM, setSaveMessage_AM] = useState('');

  const saveHandler_AM = event => {
    console.log('Update Admin About Me Triggered');
    event.preventDefault();
    let new_AM_Section = { AM_title: '', AM_subtitle: '', AM_body: '' };

    //checks for empty title or body
    if (
      AM_title === '' ||
      AM_title === undefined ||
      AM_subtitle === '' ||
      AM_subtitle === undefined ||
      AM_body === '' ||
      AM_body === undefined
    ) {
      //display Error Message
      let labelElement = document.getElementById('saveMessage_AM');
      setSaveMessage_nut(
        'Section Save Failed: Title or Subtitle or Description is Empty'
      );
      labelElement.style.display = 'block';
      labelElement.className = 'alert alert-danger';
    } else {
      //save new section
      new_AM_Section.AM_title = AM_title;
      new_AM_Section.AM_subtitle = AM_subtitle;
      new_AM_Section.AM_body = AM_body;
      //call external function to save to server
      props.saveAM(new_AM_Section);

      //clear fields
      let titleElement = document.getElementById('title_AM');
      titleElement.value = '';
      let subtitleElement = document.getElementById('subtitle_AM');
      subtitleElement.value = '';
      let bodyElement = document.getElementById('body_AM');
      bodyElement.value = '';

      //display save message
      let labelElement = document.getElementById('saveMessage_AM');
      setSaveMessage_AM('About Me Section Saved Successfully!');
      labelElement.className = 'alert alert-success';
      labelElement.style.display = 'block';
    }

    console.log('Saved Section: ');
    console.dir(new_AM_Section);
  };

  const changeHandler_AM = () => {
    let title = document.getElementById('title_AM');
    setAM_title(title.value);

    let subtitle = document.getElementById('subtitle_AM');
    setAM_subtitle(subtitle.value);

    let body = document.getElementById('body_AM');
    setAM_body(body.value);

    //clear message
    let labelElement = document.getElementById('saveMessage_AM');
    labelElement.style.display = 'none';
  };
  useEffect(() => {
    let labelElement = document.getElementById('saveMessage_AM');
    labelElement.style.display = 'none';
  }, []);

  //------------------------------------------------
  //Delete a About Me Article

  const [am_article_del, setam_article_del] = useState('');

  const select_AM_Delete = event => {
    //change state
    setam_article_del(event.target.value);
    console.log('Article to Delete: ', event.target.value);
  };

  const am_delete_handler = event => {
    props.delete_am(event, am_article_del);

    //display message
    let labelElement = document.getElementById('del_am_message');
    labelElement.innerHTML = 'About Me Section Deleted Successfully!';
    labelElement.className = 'alert alert-success';
    labelElement.style.display = 'block';
  };

  ///============================================================
  //Calendar
  //for format verification
  const [calURL, setCalURL] = useState('');

  const addCalURLInt = event => {
    //change by calling App external function
    props.updateCalURL(event.target.value);

    setCalURL(event.target.value);
  };

  const saveCalURLHandler = event => {
    event.preventDefault();
    //log
    console.log('saveCalURLInt() called');

    //check to make sure input matches correct Google Calendar format
    console.log('calURL ', calURL);

    let boolCal = calURL.includes('https://calendar.google.com/calendar/embed');
    console.log('boolCal ', boolCal);

    if (boolCal === true) {
      //display success message
      let labelElement = document.getElementById('calURL_submit_message');
      labelElement.innerHTML =
        '<b>Google Calendar URL Updated Successfully!</b>';
      labelElement.className = 'alert alert-success';
      labelElement.style.display = 'block';

      //clear fields
      let urlElement = document.getElementById('cal_url');
      urlElement.value = '';

      //call save function
      props.saveCalURL(event);
    } else {
      //else do not submit, and display error message
      let labelElement = document.getElementById('calURL_submit_message');
      labelElement.innerHTML =
        '<b>Input invalid, not a valid Google Calendar Link. Please try again.</b>';
      labelElement.className = 'alert alert-danger';
      labelElement.style.display = 'block';
    }
  };

  ///============================================================
  //Registration Code
  /*
  const [regCode, setRegCode] = useState('');

  const changeHandler_regCode = event => {
    setRegCode(event.target.value);
  };

  //internal change functions
  const save_reg = event => {
    event.preventDefault();

    //change by calling App external function
    props.saveRegCode(event, regCode);

    //display message
    let labelElement = document.getElementById('regCode_submit_message');
    labelElement.innerHTML = '<b>Registration Code Updated Successfully</b>';
    labelElement.className = 'alert alert-success';
    labelElement.style.display = 'block';
  };
  */
  const [saveMessage_Reg, setSaveMessage_Reg] = useState(
    'Registration Code Updated Successfully'
  );
  const changeHandler_reg = event => {
    event.preventDefault();
    props.setRegCode(event.target.value);
    //clear label on any change
    let saveMsg = document.getElementById('saveMessage_Reg');
    saveMsg.style.display = 'none';
  };

  const save_Reg = event => {
    event.preventDefault();

    let saveMsg = document.getElementById('saveMessage_Reg');
    if (props.regCode === '' || props.regCode === undefined) {
      //display error label
      saveMsg.style.display = 'block';
      setSaveMessage_Reg('Save Failed: Registration Code Cannot be Empty');
      return;
    }
    //save code
    props.saveRegCode();

    //display  success label
    saveMsg.style.display = 'block';
    setSaveMessage_Reg('Registration Code Updated Successfully');
  };
  useEffect(() => {
    //hide message on first render
    let saveMsg = document.getElementById('saveMessage_Reg');
    saveMsg.style.display = 'none';
  }, []);

  return (
    <div className='App'>
      <header className='masthead'>
        <div className='container'>
          <div className='intro-text'>
            <div className='intro-heading text-uppercase'>Admin</div>
          </div>
        </div>
      </header>

      <Card body>
        <div className='container'>
          <Tabs defaultActiveKey='Clients' id='admin-tab'>
            {/* Begin Clients Tab */}
            <Tab eventKey='Clients' title='Clients'>
              <div style={{ paddingTop: '90px' }}>
                {/*Clients*/}
                <div className='container'>
                  <Card body style={{ width: '100%' }}>
                    <div className='container' style={{ width: '55%' }} v>
                      <div className='col-12'>
                        <h2>View Clients</h2>
                        <span className='fa-stack fa-4x'>
                          <i className='fa fa-circle fa-stack-2x text-primary'></i>
                          <i className='fa fa-users fa-stack-1x fa-inverse'></i>
                        </span>
                      </div>
                    </div>

                    {/*Table pulls from Clients Array*/}
                    <div className='h1_p_1'>
                      <ToolkitProvider
                        keyField='id1'
                        data={props.clientsArray}
                        columns={columnsClientTable}
                        striped
                        bordered
                        exportCSV
                        search
                      >
                        {props => (
                          <div>
                            <h5>Filter By Search:</h5>
                            <SearchBar {...props.searchProps} />
                            <br />
                            <ExportCSVButton {...props.csvProps}>
                              Export to CSV
                            </ExportCSVButton>
                            <hr />
                            <BootstrapTable {...props.baseProps} />
                          </div>
                        )}
                      </ToolkitProvider>
                    </div>
                  </Card>

                  <hr></hr>

                  <Card body style={{ width: '100%' }}>
                    <h3>Delete a Client</h3>
                    <Form onSubmit={clientDeleteHandler}>
                      <div
                        className='container'
                        style={{ width: '55%', paddingTop: '20px' }}
                        v
                      >
                        <Form.Group controlId='exampleForm.ControlSelect1'>
                          <Form.Label>
                            <b>Select a Client to Delete</b>
                          </Form.Label>
                          <Form.Control
                            as='select'
                            onChange={selectClientDelete}
                          >
                            <option value='' selected disabled hidden>
                              ---Select Client Here---
                            </option>

                            {/* To generate options, map the clients names from the extenral array names_clients*/}
                            {props.names_clients.map(function(name, index) {
                              return <option value={name}>{name}</option>;
                            })}
                          </Form.Control>
                        </Form.Group>
                      </div>

                      <div className='h1_p'>
                        <Button variant='primary' type='submit'>
                          Delete
                        </Button>
                      </div>
                    </Form>

                    <div
                      className='container'
                      style={{ width: '55%', paddingTop: '20px' }}
                    >
                      <p id='delClient_submit_message'></p>
                    </div>
                  </Card>
                </div>
              </div>
            </Tab>
            {/* End Clients Tab */}

            {/* Begin Workout Videos Tab */}
            <Tab eventKey='Workout Videos' title='Workout Videos'>
              <div style={{ paddingTop: '90px' }}>
                <div className='container'>
                  <Card body style={{ width: '100%' }}>
                    <div className='container' style={{ width: '55%' }} v>
                      <div className='col-12'>
                        <h2>Add Workout Videos</h2>
                        <span className='fa-stack fa-4x'>
                          <i className='fa fa-circle fa-stack-2x text-primary'></i>
                          <i className='fa fa-video-camera fa-stack-1x fa-inverse'></i>
                        </span>

                        <Form onSubmit={addWorkoutVideoSaveHandler}>
                          <Form.Row>
                            <Form.Label className='inputLabel'>
                              Video Title
                            </Form.Label>
                            <Form.Control
                              input
                              required='required'
                              placeholder='Enter Video Title'
                              id='title_vid'
                              onChange={addVideoTitleInt}
                            />
                          </Form.Row>

                          <div className='h1_p_1'>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Video Category
                              </Form.Label>
                              <Form.Control
                                input
                                required='required'
                                placeholder='Enter Video Category'
                                id='category_vid'
                                onChange={addVideoCategoryInt}
                              />
                            </Form.Row>
                          </div>

                          <div className='h1_p_1'>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Video Description
                              </Form.Label>
                              <Form.Control
                                input
                                required='required'
                                placeholder='Enter Video Description'
                                id='description_vid'
                                onChange={addVideoDecripInt}
                              />
                            </Form.Row>
                          </div>

                          <div className='h1_p_1'>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Video Youtube URL
                              </Form.Label>
                              <Form.Control
                                input
                                required='required'
                                placeholder='Enter Youtube URL'
                                id='encode_vid'
                                onChange={addVideoURLInt}
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

                    <div
                      className='container'
                      style={{ width: '55%', paddingTop: '20px' }}
                    >
                      <p id='addWV_submit_message'></p>
                    </div>
                  </Card>

                  <hr></hr>
                  <Card body style={{ width: '100%' }}>
                    <div className='container' style={{ width: '55%' }} v>
                      <div className='col-12'>
                        <h2>Delete Workout Videos</h2>
                      </div>
                    </div>

                    <Form onSubmit={wv_delete_handler}>
                      <div
                        className='container'
                        style={{ width: '55%', paddingTop: '20px' }}
                        v
                      >
                        <Form.Group controlId='exampleForm.ControlSelect1'>
                          <Form.Label>
                            <b>Select a Workout Video to Delete</b>
                          </Form.Label>
                          <Form.Control as='select' onChange={select_wv_delete}>
                            <option value='' selected disabled hidden>
                              ---Select Video Here---
                            </option>

                            {/* To generate options, map the clients names from the external array names_videos*/}
                            {props.names_videos.map(function(name, index) {
                              return <option value={name}>{name}</option>;
                            })}
                          </Form.Control>
                        </Form.Group>
                      </div>

                      <div className='h1_p'>
                        <Button variant='primary' type='submit'>
                          Delete
                        </Button>
                      </div>
                    </Form>

                    <div
                      className='container'
                      style={{ width: '55%', paddingTop: '20px' }}
                      v
                    >
                      <div className='col-12' id='cv_div'>
                        <p id='del_wv_submit_message'></p>
                      </div>
                    </div>
                  </Card>

                  <hr></hr>

                  <Card body style={{ width: '100%' }}>
                    <div className='container' style={{ width: '55%' }} v>
                      <div className='col-12'>
                        <h2>View Client's Assigned Videos</h2>
                      </div>
                    </div>

                    <Form onSubmit={client_VNameSaveHandler}>
                      <div
                        className='container'
                        style={{ width: '55%', paddingTop: '20px' }}
                        v
                      >
                        <Form.Group controlId='exampleForm.ControlSelect1'>
                          <Form.Label>
                            <b>Select a Client to See Video Assignments</b>
                          </Form.Label>
                          <Form.Control
                            as='select'
                            onChange={selectClientVNameInt}
                          >
                            <option value='' selected disabled hidden>
                              ---Select Client Here---
                            </option>

                            {/* To generate options, map the clients names from the external array names_clients*/}
                            {props.names_clients.map(function(name, index) {
                              return <option value={name}>{name}</option>;
                            })}
                          </Form.Control>
                        </Form.Group>
                      </div>

                      <div className='h1_p'>
                        <Button variant='primary' type='submit'>
                          Submit
                        </Button>
                      </div>
                    </Form>

                    <div
                      className='container'
                      style={{ width: '55%', paddingTop: '20px' }}
                      v
                    >
                      <div className='col-12' id='cv_div'>
                        <p id='cv_videolist'></p>
                      </div>
                    </div>
                  </Card>

                  <hr></hr>

                  <Card body style={{ width: '100%' }}>
                    <div className='container' style={{ width: '55%' }} v>
                      <div className='col-12'>
                        <h2>Assign Client Videos</h2>
                      </div>
                    </div>

                    <Form onSubmit={c_v_multipleSaveHandler}>
                      <div
                        className='container'
                        style={{ width: '55%', paddingTop: '20px' }}
                        v
                      >
                        <Form.Label>
                          <b>Select Clients to Assign</b>
                        </Form.Label>
                        {/* To generate options, map the clients names from the external array clientsArray*/}
                        <Select
                          isMulti
                          multiple={true}
                          name='clients_multiple_sel'
                          options={props.clientsArray}
                          className='basic-multi-select'
                          classNamePrefix='select'
                          id='clients_multiple_sel'
                          required
                        />

                        <div className='h1_p_1'>
                          <Form.Label>
                            <b>Select Videos to Assign</b>
                          </Form.Label>
                          <Select
                            isMulti
                            multiple={true}
                            name='w_videos_multiple_sel'
                            options={props.workoutVidArray}
                            className='basic-multi-select'
                            classNamePrefix='select'
                            id='w_videos_multiple_sel'
                            required
                          />
                        </div>
                      </div>

                      <div className='h1_p'>
                        <Button variant='primary' type='submit'>
                          Submit
                        </Button>
                      </div>
                    </Form>

                    <div
                      className='container'
                      style={{ width: '55%', paddingTop: '20px' }}
                    >
                      <p id='cav_submit_message'></p>
                    </div>
                  </Card>

                  <hr></hr>

                  <Card body style={{ width: '100%' }}>
                    <div className='container' style={{ width: '55%' }} v>
                      <div className='col-12'>
                        <h2>Unassign Client Videos</h2>
                      </div>
                    </div>

                    <Form onSubmit={c_v_multipleUnassignHandler}>
                      <div
                        className='container'
                        style={{ width: '55%', paddingTop: '20px' }}
                        v
                      >
                        <Form.Label>
                          <b>Select Clients to Unassign</b>
                        </Form.Label>
                        {/* To generate options, map the clients names from the external array clientsArray*/}
                        <Select
                          isMulti
                          multiple={true}
                          name='clients_multiple_sel_un'
                          options={props.clientsArray}
                          className='basic-multi-select'
                          classNamePrefix='select'
                          id='clients_multiple_sel_un'
                          required
                        />

                        <div className='h1_p_1'>
                          <Form.Label>
                            <b>Select Videos to Unassign</b>
                          </Form.Label>
                          <Select
                            isMulti
                            multiple={true}
                            name='w_videos_multiple_sel_un'
                            options={props.workoutVidArray}
                            className='basic-multi-select'
                            classNamePrefix='select'
                            id='w_videos_multiple_sel_un'
                            required
                          />
                        </div>
                      </div>

                      <div className='h1_p'>
                        <Button variant='primary' type='submit'>
                          Submit
                        </Button>
                      </div>
                    </Form>

                    <div
                      className='container'
                      style={{ width: '55%', paddingTop: '20px' }}
                    >
                      <p id='cuv_submit_message'></p>
                    </div>
                  </Card>
                </div>
              </div>
            </Tab>
            {/* End Workout Video Tab */}

            {/* Begin Nutrition Tab */}
            <Tab eventKey='nutrition' title='Nutrition'>
              <div style={{ paddingTop: '90px' }}>
                {/* Nutrition Page Text */}

                <div className='container'>
                  <Card body style={{ width: '100%' }}>
                    <div className='container' style={{ width: '600px' }}>
                      <div className='col-12'>
                        <h2>Change Nutrition Page Text</h2>
                        <span className='fa-stack fa-4x'>
                          <i className='fa fa-circle fa-stack-2x text-primary'></i>
                          <i className='fa fa-cutlery fa-stack-1x fa-inverse'></i>
                        </span>
                        <Form onSubmit={saveHandler_NutText}>
                          <div>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Nutrition Section Title
                              </Form.Label>
                              <Form.Control
                                input
                                placeholder='Enter the Nutrition Section Title'
                                id='nutritionTitle'
                                onChange={changeHandlerNutText}
                                required
                              />
                            </Form.Row>
                          </div>
                          <div>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Nutrition Section Subtitle
                              </Form.Label>
                              <Form.Control
                                input
                                required
                                placeholder='Enter the Nutrition  Section Subtitle'
                                id='nutritionSubtitle'
                                onChange={changeHandlerNutText}
                              />
                            </Form.Row>
                          </div>
                          <div>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Nutrition Section Body
                              </Form.Label>
                              <textarea
                                placeholder='Enter the Nutrition Section Body'
                                id='nutritionBody'
                                className='form-control form-control-lg'
                                rows='8'
                                onChange={changeHandlerNutText}
                                required
                              />
                            </Form.Row>
                          </div>
                          <div className='h1_p'>
                            <Button variant='primary' type='submit'>
                              Save
                            </Button>
                          </div>
                          &nbsp;
                          <div
                            className='alert alert-success'
                            id='saveMessage_NutText'
                          >
                            <strong>{saveMsgNutText}</strong>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </Card>
                </div>

                <hr></hr>

                {/* Nutrition category */}

                <div className='container'>
                  <Card body style={{ width: '100%' }}>
                    <div className='container' style={{ width: '600px' }}>
                      <div className='col-12'>
                        <h2>Create a New Nutrition Article Category</h2>
                        <Form onSubmit={saveHandler_cat}>
                          <div>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Category Name
                              </Form.Label>
                              <Form.Control
                                input
                                placeholder='Enter the New Category Name'
                                id='category'
                                required
                              />
                            </Form.Row>
                          </div>

                          <div>
                            <div className='h1_p'>
                              <Button variant='primary' type='submit'>
                                Save
                              </Button>
                            </div>
                            &nbsp;
                            <div
                              className='alert alert-success'
                              id='saveMessage_cat'
                            >
                              <strong>{saveMsgCat}</strong>
                            </div>
                          </div>
                        </Form>

                        <h2>Delete a Nutrition Article Category</h2>
                        <Form onSubmit={deleteHandler_cat}>
                          <Form.Row>
                            <Form.Label className='inputLabel'>
                              Category Name
                            </Form.Label>

                            <div style={{ width: '33pc' }}>
                              <Form.Control
                                input
                                placeholder={
                                  selectedCat === ''
                                    ? 'Select a Category to Delete'
                                    : selectedCat
                                }
                                id='categorySel'
                                disabled
                                required
                              />
                            </div>

                            <div style={{ width: '0pc' }}>
                              <Dropdown>
                                <DropdownToggle />
                                <DropdownMenu>
                                  <DropDownList
                                    categories={props.categories}
                                    setSelected={updateSelected_cat}
                                  />
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </Form.Row>

                          <div>
                            <div className='h1_p'>
                              <Button variant='primary' type='submit'>
                                Delete
                              </Button>
                            </div>
                            &nbsp;
                            <div
                              className='alert alert-success'
                              id='deleteMessage_cat'
                            >
                              <strong>{deleteMsgCat}</strong>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </Card>
                </div>

                <hr></hr>

                {/*Nutrition*/}
                <div className='container'>
                  <Card body style={{ width: '100%' }}>
                    <div className='container' style={{ width: '600px' }} v>
                      <div className='col-12'>
                        <h2>Create a New Nutrition Article</h2>
                        <Form onSubmit={saveHandler_nut}>
                          <div>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Article Title
                              </Form.Label>
                              <Form.Control
                                input
                                placeholder='Enter the Article Title'
                                id='title'
                                onChange={changeHandler}
                                required
                              />
                            </Form.Row>
                          </div>
                          <div>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Article Category
                              </Form.Label>
                              <div style={{ width: '33pc' }}>
                                <Form.Control
                                  input
                                  placeholder={
                                    category_nut === ''
                                      ? 'Enter the Article Category'
                                      : category_nut
                                  }
                                  id='category_nut'
                                  disabled
                                  required
                                  onChange={changeHandler}
                                />
                              </div>
                              <div style={{ width: '0pc' }}>
                                <Dropdown>
                                  <DropdownToggle />
                                  <DropdownMenu>
                                    <DropDownList
                                      categories={props.categories}
                                      setSelected={setCategory_nut}
                                    />
                                  </DropdownMenu>
                                </Dropdown>
                              </div>
                            </Form.Row>
                          </div>
                          <div>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Article Description
                              </Form.Label>
                              <textarea
                                placeholder='Enter the Article Description'
                                id='body'
                                className='form-control form-control-lg'
                                rows='8'
                                onChange={changeHandler}
                                required
                              />
                            </Form.Row>
                          </div>
                          <div>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Related Video Link (Optional)
                              </Form.Label>
                              <Form.Control
                                input
                                placeholder='Enter the Youtube URL'
                                id='link'
                                onChange={changeHandler}
                              />
                            </Form.Row>
                          </div>
                          <div className='h1_p'>
                            <Button variant='primary' type='submit'>
                              Save
                            </Button>
                          </div>
                          &nbsp;
                          <div
                            className='alert alert-success'
                            id='saveMessage_nut'
                          >
                            <strong>{saveMessage_nut}</strong>
                          </div>
                        </Form>

                        <h2>Delete a Nutrition Article</h2>

                        <Form onSubmit={deleteHandler_nut}>
                          <Form.Row>
                            <Form.Label className='inputLabel'>
                              Article Name
                            </Form.Label>

                            <div style={{ width: '33pc' }}>
                              <Form.Control
                                input
                                placeholder={
                                  selectedArticle === ''
                                    ? 'Select a Category to Delete'
                                    : selectedArticle
                                }
                                id='ArticleSel'
                                disabled
                                required
                              />
                            </div>

                            <div style={{ width: '0pc' }}>
                              <Dropdown>
                                <DropdownToggle />
                                <DropdownMenu>
                                  <DropDownList
                                    categories={allArticles}
                                    setSelected={setSelectedArticle}
                                  />
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </Form.Row>

                          <div>
                            <div className='h1_p'>
                              <Button variant='primary' type='submit'>
                                Delete
                              </Button>
                            </div>
                            &nbsp;
                            <div
                              className='alert alert-success'
                              id='deleteMessage_nut'
                            >
                              <strong>{deleteMsgNut}</strong>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Tab>
            {/* End Nutrition Tab */}

            {/* Begin About Me Tab */}
            <Tab eventKey='AboutMe' title='About Me'>
              <div style={{ paddingTop: '90px' }}>
                {/*About Me*/}
                <div className='container'>
                  <Card body style={{ width: '100%' }}>
                    <div className='container' style={{ width: '55%' }} v>
                      <div className='col-12'>
                        <h2>Add an About Me Article</h2>
                        <span className='fa-stack fa-4x'>
                          <i className='fa fa-circle fa-stack-2x text-primary'></i>
                          <i className='fa fa-user fa-stack-1x fa-inverse'></i>
                        </span>

                        <Form onSubmit={saveHandler_AM}>
                          <div>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Section Title
                              </Form.Label>
                              <Form.Control
                                input
                                placeholder='Enter the Section Title'
                                id='title_AM'
                                onChange={changeHandler_AM}
                                required
                              />
                            </Form.Row>
                          </div>
                          <div>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Section Subtitle
                              </Form.Label>
                              <Form.Control
                                input
                                required='required'
                                placeholder='Enter the Section Subtitle'
                                id='subtitle_AM'
                                onChange={changeHandler_AM}
                              />
                            </Form.Row>
                          </div>
                          <div>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Section Body
                              </Form.Label>
                              <textarea
                                placeholder='Enter the Section Body'
                                id='body_AM'
                                className='form-control form-control-lg'
                                rows='8'
                                onChange={changeHandler_AM}
                                required
                              />
                            </Form.Row>
                          </div>
                          <div className='h1_p'>
                            <Button variant='primary' type='submit'>
                              Save
                            </Button>
                          </div>
                          &nbsp;
                          <div
                            className='alert alert-success'
                            id='saveMessage_AM'
                          >
                            <strong>{saveMessage_AM}</strong>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </Card>

                  <hr></hr>

                  <Card body style={{ width: '100%' }}>
                    <h3>Delete an About Me Article</h3>
                    <Form onSubmit={am_delete_handler}>
                      <div
                        className='container'
                        style={{ width: '55%', paddingTop: '20px' }}
                        v
                      >
                        <Form.Group controlId='exampleForm.ControlSelect1'>
                          <Form.Label>
                            <b>Select a Article to Delete</b>
                          </Form.Label>
                          <Form.Control as='select' onChange={select_AM_Delete}>
                            <option value='' selected disabled hidden>
                              ---Select an Article Here---
                            </option>

                            {/* To generate options, map the clients names from the extenral array names_clients*/}
                            {props.names_am_articles.map(function(name, index) {
                              return <option value={name}>{name}</option>;
                            })}
                          </Form.Control>
                        </Form.Group>
                      </div>

                      <div className='h1_p'>
                        <Button variant='primary' type='submit'>
                          Delete
                        </Button>
                      </div>
                    </Form>

                    <div
                      className='container'
                      style={{ width: '55%', paddingTop: '20px' }}
                    >
                      <p id='del_am_message'></p>
                    </div>
                  </Card>
                </div>
              </div>
            </Tab>
            {/* End About Me Tab */}

            {/* Calendar Tab */}
            <Tab eventKey='Calendar' title='Calendar'>
              <div style={{ paddingTop: '90px' }}>
                <div className='container'>
                  <Card body style={{ width: '100%' }}>
                    <div className='container' style={{ width: '600px' }} v>
                      <div className='col-12'>
                        <h2>Change Calendar</h2>
                        <span className='fa-stack fa-4x'>
                          <i className='fa fa-circle fa-stack-2x text-primary'></i>
                          <i className='fa fa-calendar  fa-stack-1x fa-inverse'></i>
                        </span>

                        <div style={{ paddingTop: '45px' }}>
                          <h5>How to Share your Google Calendar</h5>

                          <div className='left_t'>
                            <ol style={{ paddingTop: '10px', align: 'left' }}>
                              <li>
                                Go to
                                <a
                                  href='https://calendar.google.com/'
                                  target='blank'
                                >
                                  : https://calendar.google.com/
                                </a>
                              </li>

                              <li>
                                On the left side of the page, find{' '}
                                <b>"My calendars"</b>
                              </li>
                              <li>
                                Hover over the name of the calendar you would
                                like to use
                              </li>
                              <li>
                                Click on the ":" on the right side,{' '}
                                <b>"Options"</b>
                              </li>
                              <li>
                                Click, <b>"Settings and Sharing"</b>
                              </li>
                              <li>
                                Go to <b>"Access permissions"</b>
                              </li>
                              <li>
                                Check <b>"Make available to public"</b>
                              </li>
                              <li>
                                Scroll down to <b>"Integrate calendar"</b>{' '}
                                section of page
                              </li>
                              <li>
                                Copy and paste the{' '}
                                <b>"Public URL to this calendar"</b>
                              </li>
                            </ol>
                          </div>
                        </div>

                        <Form onSubmit={saveCalURLHandler}>
                          <div>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Google Calendar URL
                              </Form.Label>

                              <Form.Control
                                input
                                placeholder='Enter the Public URL'
                                id='cal_url'
                                onChange={addCalURLInt}
                                required
                              />
                            </Form.Row>
                          </div>
                          <div className='h1_p'>
                            <Button variant='primary' type='submit'>
                              Save
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                    <div
                      className='container'
                      style={{ width: '55%', paddingTop: '20px' }}
                    >
                      <p id='calURL_submit_message'></p>
                    </div>
                  </Card>
                </div>
              </div>
            </Tab>
            {/* End Calendar Tab */}

            {/*Start Registration Tab */}
            <Tab eventKey='RegistrationCode' title='Registration Code'>
              <div style={{ paddingTop: '90px' }}>
                <div className='container'>
                  <Card body style={{ width: '100%' }}>
                    <div className='container' style={{ width: '600px' }} v>
                      <div className='col-12'>
                        <h2>Set Registration Code</h2>
                        <span className='fa-stack fa-4x'>
                          <i className='fa fa-circle fa-stack-2x text-primary'></i>
                          <i className='fa fa-key fa-stack-1x fa-inverse'></i>
                        </span>

                        <Form onSubmit={save_Reg}>
                          <div>
                            <Form.Row>
                              <Form.Label className='inputLabel'>
                                Registration Code
                              </Form.Label>
                              <Form.Control
                                input
                                value={props.regCode}
                                placeholder='Enter the Registration Code'
                                id='regCode_input'
                                onChange={changeHandler_reg}
                                required
                              />
                            </Form.Row>
                          </div>
                          <div className='h1_p'>
                            <Button variant='primary' type='submit'>
                              Update
                            </Button>
                          </div>
                          &nbsp;
                          <div
                            className='alert alert-success'
                            id='saveMessage_Reg'
                          >
                            <strong>{saveMessage_Reg}</strong>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Tab>
            {/*End Registration Tab */}
          </Tabs>
          {/* End All Tabs */}
        </div>
      </Card>
    </div>
  );
};

export default Admin;
