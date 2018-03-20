import React, { Component } from 'react'
import '../App.css';

export default class Dashboard extends Component {
   constructor (props) {
     super (props)
     this.state = {
       width:0,
       height:0
     }
   }
  render() {
    return (
      <div className="App">
        <p>Hello World Notifications </p>
      </div>
    );
  }
}
