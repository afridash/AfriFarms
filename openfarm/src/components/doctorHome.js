import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

export default class DoctorHome extends Component {
  render() {
    return (
      <div className="App">
      <div className='row' style={{fontSize:25, padding:50}}>
       <div className='pull-left'><p>Welcome James,</p></div>
    </div>
    <div className='col-sm-12' style={{fontWeight:'500', fontSize:'20'}}>
      <div className='col-sm-3'></div>
      <div className='col-sm-3'>
        <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
        <img src={require('../images/messages.svg')} style={{padding:20, height:100, width:100}} />
          <p style={{fontWeight:'600', fontSize:'16'}}>Messages</p>
      </div>
      </div>
      <div className='col-sm-3'>
        <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
          <img src={require('../images/notifications.svg')} style={{padding:20, height:100, width:100}}  />
              <p style={{fontWeight:'600', fontSize:'16'}}>Notifications</p>
        </div>
      </div>
      <div className='col-sm-3'></div>
    </div>
      </div>
    );
  }
}
