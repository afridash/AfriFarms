import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import DashboardHeader from './dashboardHeader'
import logo from '../logo.svg';
import '../App.css';

export default class AdminView extends Component {
  showPage() {
    return (
      <div className="App">
        <div className='row'>
          <div className='col-sm-3'>
            <div className='row'>
              <div className='col-sm-10 col-sm-offset-1' style={{backgroundColor:'#00abc9'}}>
                <p style={{fontSize:25, marginTop:'1%',color:'white'}}>All Funds</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-10 col-sm-offset-1' style={{ border:'1px solid lightgrey'}}>
                <div className='row' style={{fontSize:15, margin:'2%'}}>
                  <div className='col-sm-12' style={{textAlign:'left'}}>
                      <div className='row'>
                        <p>James Anthony</p>
                      </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-9'>
            <div className='row'>
              <div className='col-sm-10 col-sm-offset-1' style={{ border:'1px solid lightgrey'}}>
                <div className='row' style={{fontSize:20, margin:'2%'}}>
                  <div className='col-sm-12' style={{textAlign:'left'}}>
                      <div className='row'>
                        <p>What will this fund be used for?</p>
                      </div>
                      <div className='row' >
                          <textarea className='form-control' rows='4' cols='100'/>
                      </div>

                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="App">
        <DashboardHeader children={this.showPage()} />
      </div>
    );
  }
}
