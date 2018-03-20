import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';

export default class Funding extends Component {
  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
    <li className="active"><a data-toggle="tab" href="#home">All Funding</a></li>
    <li><a data-toggle="tab" href="#menu1">Create New Funding</a></li>
  </ul>

  <div className="tab-content">
    <div id="home" className="tab-pane fade in active">
    <div className='row'>
      <div className='col-sm-7'>
          <div className='col-sm-12' style={{marginTop:20,}}>
            <Link to='/viewfunding'>
            <p style={{borderRadius:2, borderColor:'black', backgroundColor:'lightgrey', fontSize:25, textAlign:'left' , boxShadow:'5px 5px 5px #888888'}}>
              &nbsp;United Nations Feed The World Fund
              <span  className='pull-right' style={{backgroundColor:'#00abc9', fontSize:25}}>&nbsp;&nbsp;30&nbsp;&nbsp;</span></p>
</Link>
      </div>
          <div className='col-sm-12' style={{marginTop:5,}}>
            <Link to='/viewfunding'>
            <p style={{borderRadius:2, borderColor:'black', backgroundColor:'lightgrey', fontSize:25, textAlign:'left' , boxShadow:'5px 5px 5px #888888'}}>
              &nbsp;Nigeria Farmers Association Grant
              <span  className='pull-right' style={{backgroundColor:'#00abc9', fontSize:25}}>&nbsp;&nbsp;30&nbsp;&nbsp;</span></p>
            </Link>
          </div>
          <div className='col-sm-12' style={{marginTop:5,}}>
            <Link to='/viewfunding'>
            <p style={{borderRadius:2, borderColor:'black', backgroundColor:'lightgrey', fontSize:25, textAlign:'left' , boxShadow:'5px 5px 5px #888888'}}>
              &nbsp;Nigeria Farmers Association Grant
              <span  className='pull-right' style={{backgroundColor:'#00abc9', fontSize:25}}>&nbsp;&nbsp;30&nbsp;&nbsp;</span></p>
            </Link>
          </div>
    </div>
  </div>
    </div>
    <div id="menu1" className="tab-pane fade">
      <div className="row" style={{marginTop:20}}>
              <div className="col-md-7">
              <form role="form" action="" method="post">
              <div className="form-group">
                <div className='col-sm-4'>
                  <label htmlFor="sel1">Funding Type</label>
                </div>
              <div className='col-sm-8'>
                <select className="form-control"  name="form">
                    <option value='' ></option>
                     <option value='hi' >hi</option>
                      <option value='hi' >hi</option>
                       <option value='hi' >hi</option>
                </select>
              </div>

              <br />
              </div>
              </form>
              <div className='row' style={{marginTop:40}}>
                <div className='col-sm-4'>
                  <label htmlFor="description">Description</label>
                </div>
                <div className='col-sm-8'>
                  <textarea rows="8" cols="55"> </textarea>
                </div>
              </div>
              <div className="col-md-12">
                <div className="col-md-3">
                  <label htmlFor="questions">Questions</label>
                </div>
              </div>
              <div className="col-md-12" style={{marginLeft:30}}>
                <div className="form-group">
                  <input type="text"  className="form-control"  style={{color:'white', border:'1px solid grey'}} />
                </div>
              </div>
              <div className="col-md-12">
                <div className="col-md-3" style={{marginTop:-10}} >
                  <span>add questions</span>
              </div>
          </div>
          <div className='col-md-12'>
              <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15}}>
                Submit
              </button>
          </div>
              </div>
    </div>
  </div>
</div>
      </div>
    );
  }
}
