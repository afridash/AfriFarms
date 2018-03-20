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
import Home from './components/home'
import ViewFunding from './components/viewFunding'
import Storage from './components/storage'
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
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/funding"} component={Funding} />
        <Route exact path={"/viewfunding"} component={ViewFunding} />
        <Route exact path={"/storage"} component={Storage} />
        <Route exact path={"/news"} component={News} />
          <Route exact path={"/training"} component={Training} />
      </DashboardHeader>
      <Route exact path={"/about"} component={About} />
      <Route exact path={"/contact"} component={Contact} />




    </Header>
      </Switch>
    </div>
</BrowserRouter>),
  document.getElementById('root')
);
