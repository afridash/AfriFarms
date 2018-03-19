import React from 'react';
import {render} from "react-dom"; //Render method
import { BrowserRouter, Route ,Switch,Router } from 'react-router-dom' //Naviation functions
//Import our route options
import App from './App'
import Header from './components/header'
import Dashboard from './components/dashboard'
import './index.css'
render((
  //Render different routes
  <BrowserRouter >
    <div>
      <Switch>
      <Route exact path={"/"} component={App} />
      <Header >
      <Route exact path={"/dashboard"} component={Dashboard} />
    </Header>
      </Switch>
    </div>
</BrowserRouter>),
  document.getElementById('root')
);
