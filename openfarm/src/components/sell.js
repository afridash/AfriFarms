import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

export default class Sell extends Component {
  render() {
    return (
      <div className="App">
        <div className="row" style={{marginTop:20}}>
          <div className="col-md-12">
            <div className='row' style={{marginTop:40}}>
              <div className='col-sm-2'></div>
              <div className='col-sm-8'>
                <div className='col-sm-12'>
                  <div className='col-sm-4' >
                    <label htmlFor="Title">Title</label>
                  </div>
                  <div className='col-sm-8'>
                    <input type="text" name='title'  className="form-control" />
                  </div>
                </div>
              </div>
            </div>
            <div className='row' style={{marginTop:20}}>
              <div className='col-sm-2'></div>
              <div className='col-sm-8'>
                <div className='row'>
                  <div className='col-sm-4'>
                    <label htmlFor="description">Description</label>
                  </div>
                  <div className='col-sm-8'>
                    <textarea rows="8" cols="65"> </textarea>
                  </div>
                </div>
              </div>
              <div className='col-sm-2'></div>

            </div>
            <div className='row' style={{marginTop:20}}>
              <div className='col-sm-2'></div>
              <div className='col-sm-8'>
                <div className='col-sm-12'>
                  <div className='col-sm-4'>
                    <label htmlFor="Thumb">Thumbnail</label>
                  </div>
                  <div className='col-sm-8'>
                      <button className='btn btn-primary' style={{backgroundColor:'#069fba', fontSize:16, color:'white', borderColor:'transparent',}}>Select</button>
                  </div>
                </div>
              </div>
              <div className='col-sm-2'></div>
            </div>

          <div className='row text-center' style={{margin:20}}>
              <button  className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>Create
            </button>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
