import React from 'react';
import {render} from "react-dom"; //Render method
import { BrowserRouter, Route ,Switch,Router } from 'react-router-dom' //Naviation functions
//Import our route options
import App from './App'
import Header from './components/header'
import Dashboard from './components/dashboard'
import Notifications from './components/notifications'
import About from './components/about'
import Contact from './components/contact'
import Funding from './components/adminFunding'
import News from './components/adminNews'
import Home from './components/home'
import ViewFunding from './components/viewFunding'
import Training from './components/adminTraining'
import Storage from './components/adminStorage'
import Login from './components/login'
import Register from './components/register'
import AdminHome from './components/admin'
import GeneralNews from './components/generalNews'
import Profile from './components/profile'
import './index.css'
render((
  //Render different routes
  <BrowserRouter >
    <div>
      <Switch>
      <Header >
      <Route exact path={"/"} component={App} />
      <Route exact path={"/about"} component={About} />
      <Route exact path={"/contact"} component={Contact} />
      <Route exact path={"/admin/news"} component={News} />
      <Route exact path={"/admin/funding"} component={Funding} />
      <Route exact path={"/admin/training"} component={Training} />
      <Route exact path={"/dashboard"} component={Dashboard} />
      <Route exact path={"/notifications"} component={Notifications} />
      <Route exact path={"/admin/storage"} component={Storage} />
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"/admin"} component={AdminHome} />
      <Route exact path={"/register"} component={Register} />
      <Route exact path={"/news"} component={GeneralNews} />
      <Route exact path={"/profile"} component={Profile} />
      <Route exact path={"/home"} component={Dashboard} />
    </Header>
      </Switch>
    </div>
</BrowserRouter>),
  document.getElementById('root')
);
