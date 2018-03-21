import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import '../App.css';

export default class Home extends Component {
   constructor (props) {
     super (props)
     this.state = {
       width:0,
       height:0
     }
     firebase.auth().onAuthStateChanged(this.handleUser)
   }
   handleUser = (user) => {
     if (user){
       this.setState({displayName:user.displayName})
     }
   }
  render() {
    return (
      <div className="App">
        <div className='col-sm-12'>
          <div className='pull-left' style={{margin:20}}>
            <p style={{fontSize:30 }}>Greetings, {this.state.displayName}</p>
          </div>
          <div className='col-sm-12' style={{fontWeight:'500', fontSize:'20'}}>
            <Link to='/chats' className='col-sm-4' style={{textDecoration:'none'}}>
              <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
                <img src={require('../images/messages.svg')} style={{padding:20, height:100, width:100}} />
                <p style={{fontSize:20}}>Messages</p>
              </div>
            </Link>
            <Link style={{textDecoration:'none'}} to='/chats' className='col-sm-4'>
              <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
              <img src={require('../images/list-produce-icon.svg')} style={{padding:20, height:100, width:100}} />
              <p style={{fontSize:20}}>Notifications</p>
            </div>
          </Link>
            <div className='col-sm-4'>
              <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
                <img src={require('../images/access-fund-icon.svg')} style={{padding:20, height:100, width:100}}  />
                <p style={{fontSize:20}}>Funding</p>
              </div>
            </div>
          </div>
          <div className='col-sm-12' style={{fontWeight:'500', fontSize:'20'}}>
            <div className='col-sm-4'>
              <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
                <img src={require('../images/trainings.svg')} style={{padding:20, height:100, width:100}}  />
                <p style={{fontSize:20}}>Trainings</p>
              </div>
            </div>
            <div className='col-sm-4'>
              <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
                <Link to='/sell'>
                <img src={require('../images/showcase.svg')} style={{padding:20, height:100, width:100}}  />
                <p style={{fontSize:20}}>Showcase and Sell</p>
                </Link>
              </div>
            </div>
          </div>
          </div>
      </div>
    );
  }
}
