import React from 'react';
import {render} from "react-dom"; //Render method
import { BrowserRouter, Route ,Switch,Router } from 'react-router-dom' //Naviation functions
//Import our route options
import App from './App'
import Header from './components/header'
import DashboardHeader from './components/dashboardHeader'
import Dashboard from './components/dashboard'
import Notifications from './components/notifications'
import About from './components/about'
import Contact from './components/contact'
import Funding from './components/funding'
import News from './components/news'
import Training from './components/training'
import './index.css'
render((
  //Render different routes
  <BrowserRouter >
    <div>
      <Switch>
      <Header >
      <Route exact path={"/"} component={App} />
      <DashboardHeader>
        <Route exact path={"/dashboard"} component={Dashboard} />
        <Route exact path={"/notifications"} component={Notifications} />
      </DashboardHeader>
      <Route exact path={"/about"} component={About} />
      <Route exact path={"/contact"} component={Contact} />
      <Route exact path={"/news"} component={News} />
      <Route exact path={"/funding"} component={Funding} />
      <Route exact path={"/training"} component={Training} />
    </Header>
      </Switch>
    </div>
</BrowserRouter>),
  document.getElementById('root')
);
