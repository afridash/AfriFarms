import React, { Component } from 'react';
import DashboardHeader from './dashboardHeader'
import '../App.css';

export default class Dashboard extends Component {
   constructor (props) {
     super (props)
     this.state = {
       width:0,
       height:0
     }
   }
   showPage () {
     return (
         <p>Hello World </p>
     )
   }
  render() {
    return (
      <div className="App">
        <DashboardHeader children={this.showPage()} />
      </div>
    );
  }
}
