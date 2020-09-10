import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'; // import the react-router-dom components
import {
  Home,
  About_Me,
  Client_Portal,
  Nutrition,
  Calendar,
  Admin,
  Login,
  Sign_Up,
  Forgot_Password,
  Profile
} from './pages'; // import our pages
import AuthenticatedRoute from './Pages/AuthenticatedRoute.js';

const Main = props => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about_me' component={About_Me} />
      <AuthenticatedRoute
        path='/client_portal'
        component={Client_Portal}
        isAuthenticated={props.isAuthenticated}
      />
      <Route
        exact
        path='/nutrition'
        component={() => <Nutrition isAuthenticated={props.isAuthenticated} />}
      />
      <Route exact path='/calendar' component={Calendar} />
      <AuthenticatedRoute
        path='/admin'
        component={Admin}
        isAuthenticated={props.isAdmin}
      />
      <Route
        exact
        path='/login'
        component={() => (
          <Login
            setEmail={props.setEmail}
            setToken={props.setToken}
            setIsAdmin={props.setIsAdmin}
            email={props.email}
          />
        )}
      />
      <Route exact path='/sign_up' component={Sign_Up} />
      <Route exact path='/forgot' component={Forgot_Password} />
      <AuthenticatedRoute
        path='/profile'
        component={Profile}
        isAuthenticated={props.isAuthenticated}
      />
      <Route component={Home} />
    </Switch>
  </main>
);

export default Main;
