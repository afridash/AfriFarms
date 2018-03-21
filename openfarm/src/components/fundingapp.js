import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';

export default class FundingApp extends Component {
  render() {
    return (
      <div className="App">
        <div className='row'>
          <div className='col-sm-10 col-sm-offset-1' style={{backgroundColor:'#00abc9'}}>
            <p style={{fontSize:25, marginTop:'1%',color:'white'}}>Bill and Melinda Gates Farmers Funding Grant for young farmers</p>
          </div>
        </div>
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
              <div className='row'  style={{marginTop:'2%'}}>
                <Link to='#' style={{textDecoration:'none'}}>
                  <button type="button" className="btn btn-primary" style={{marginTop:10}}>Submit</button>
                </Link>&nbsp;&nbsp;
                <Link to='/' style={{textDecoration:'none'}}>
                  <button type="button" className="btn btn-danger" style={{marginTop:10}}>Close</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
