import React, { Component } from 'react';
import DashboardHeader from './dashboardHeader'
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import '../App.css';

export default class Dashboard extends Component {
   constructor (props) {
     super (props)
     this.state = {
       width:0,
       height:0
     }
     this.user = {}
     firebase.auth().onAuthStateChanged(this.handleUser)
   }
   handleUser = (user) => {
     if (user) {
       this.user = user
       if (user.displayName === null || user.displayName === undefined) this.setState({incomplete:true})
       this.setState({email:user.email})
     }
   }
   showPage () {
     return (
       <div className='row'>
         {(()=>{
           if (this.state.incomplete) {
             return ( <p>Welcome, {this.state.email}, click on user to complete your profile. </p>)
           }else{
             return this.showPageContent()
           }
         })()}

       </div>
     )
   }
   showPageContent () {
     return (
       <p>Hello everyone!</p>
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
