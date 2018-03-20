import React, { Component } from 'react';
import '../App.css';

export default class Home extends Component {
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
        <div className='row'>
          <div className='pull-left' style={{margin:20}}>
            <p style={{fontSize:30 }}>Greeting People,</p>
          </div>
          <div className='col-sm-12' style={{fontWeight:'500', fontSize:'20'}}>
            <div className='col-sm-4'>
              <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
                <img src={require('../images/messages.svg')} style={{padding:20, height:100, width:100}} />
                <p style={{fontSize:20}}>Messages</p>
              </div>
            </div>
            <div className='col-sm-4'>
              <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
              <img src={require('../images/list-produce-icon.svg')} style={{padding:20, height:100, width:100}} />
              <p style={{fontSize:20}}>Notifications</p>
            </div>
            </div>
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
          </div>
        </div>

      </div>
    );
  }
}
