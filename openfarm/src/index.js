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
import Funding from './components/funding'
import News from './components/news'
import Training from './components/training'
import Storage from './components/storage'
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
      <Route exact path={"/news"} component={News} />
      <Route exact path={"/funding"} component={Funding} />
      <Route exact path={"/training"} component={Training} />
        <Route exact path={"/dashboard"} component={Dashboard} />
        <Route exact path={"/notifications"} component={Notifications} />
        <Route exact path={"/storage"} component={Storage} />
    </Header>
      </Switch>
    </div>
</BrowserRouter>),
  document.getElementById('root')
);
