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
import GeneralFunding from './components/funding'
import News from './components/adminNews'
import Home from './components/home'
import ViewFunding from './components/viewFunding'
import AdminTraining from './components/adminTraining'
import AdminStorage from './components/adminStorage'
import Login from './components/login'
import Register from './components/register'
import AdminHome from './components/admin'
import GeneralNews from './components/generalNews'
import Profile from './components/profile'
import Market from './components/market'
import Sell from './components/sell'
import Cart from './components/cart'
import Training from './components/training'
import Search from './components/search'
import './index.css'
render((
  //Render different routes
  <BrowserRouter >
    <div>
      <Switch>
      <Header >
      <Route exact path={"/"} component={App} />
      <Route exact path={"/about"} component={About} />
      <Route exact path={"/search/:id"} component={Search} />
      <Route exact path={"/contact"} component={Contact} />
      <Route exact path={"/admin/news"} component={News} />
      <Route exact path={"/admin/funding"} component={Funding} />
      <Route exact path={"/admin/training"} component={AdminTraining} />
      <Route exact path={"/dashboard"} component={Dashboard} />
      <Route exact path={"/notifications"} component={Notifications} />
      <Route exact path={"/admin/storage"} component={AdminStorage} />
      <Route exact path={"/chats"} component={Notifications} />
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"/admin"} component={AdminHome} />
      <Route exact path={"/register"} component={Register} />
      <Route exact path={"/news"} component={GeneralNews} />
      <Route exact path={"/profile/:id"} component={Profile} />
      <Route exact path={"/home"} component={Dashboard} />
      <Route exact path={"/market"} component={Market} />
      <Route exact path={"/sell"} component={Sell} />
      <Route exact path={"/cart"} component={Cart} />
      <Route exact path={"/viewfunding"} component={ViewFunding} />
      <Route exact path={"/funding"} component={GeneralFunding} />
      <Route exact path={"/training"} component={Training} />
    </Header>
      </Switch>
    </div>
</BrowserRouter>),
  document.getElementById('root')
);
