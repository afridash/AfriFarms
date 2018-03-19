import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='row xs-hidden text-center' style={{backgroundColor:'lightgrey'}}>
        <div className='col-md-3'>Open Farm</div>
        <div className='col-md-3'>
          <div className='row'>
            <div className='col-sm-3'>
              <div className='pull-right'>
                <i className='fa fa-map pull-right'></i>
              </div>
            </div>
            <div className='col-sm-9'>
              <div className='pull-left'>
                <p>11, Elekahia Road</p>
                <p>Port Harcourt</p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='row'>
            <div className='col-sm-3' style={{backgroundColor:'yellow'}}>
              <div className='pull-right'>
                <i className='fa fa-envelope pull-right'></i>
              </div>
            </div>
            <div className='col-sm-9' style={{backgroundColor:'red'}}>
              <div className='pull-left'>
                <p>info@openfarm.com.ng</p>
                <span>+234 809 773 7457</span>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent'}}>
            REGISTER/LOGIN
          </button>
        </div>
      </div>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
