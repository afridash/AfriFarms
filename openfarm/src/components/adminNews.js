import React, { Component } from 'react';
import '../App.css';

export default class News extends Component {
  showPage () {
    return (
      <div className="App">
        <div>
          <ul className="nav nav-tabs">
      <li className="active"><a data-toggle="tab" href="#home">News</a></li>
      <li><a data-toggle="tab" href="#menu1">New Post</a></li>
    </ul>

    <div className="tab-content">
      <div id="home" className="tab-pane fade in active">
      <div className='row'>
        <div className='col-sm-7'>
            <div className='col-sm-12' style={{marginTop:20,}}>
              <p style={{borderRadius:2, borderColor:'black', backgroundColor:'lightgrey', fontSize:25, textAlign:'left' , boxShadow:'5px 5px 5px #888888'}}>
                &nbsp;United Nations Feed The World Fund
                <span  className='pull-right' style={{fontSize:15,marginTop:10}}>&nbsp;&nbsp;30/02/2017&nbsp;&nbsp;</span></p>
            </div>
        </div>
        <div className='col-sm-7'>
            <div className='col-sm-12' style={{marginTop:5,}}>
              <p style={{borderRadius:2, borderColor:'black', backgroundColor:'lightgrey', fontSize:25, textAlign:'left' , boxShadow:'5px 5px 5px #888888'}}>
                &nbsp;Nigeria Farmers Association Grant
                <span  className='pull-right' style={{fontSize:15,marginTop:10}}>&nbsp;&nbsp;30/02/2017&nbsp;&nbsp;</span></p>
            </div>
        </div>
        <div className='col-sm-7'>
            <div className='col-sm-12' style={{marginTop:5,}}>
              <p style={{borderRadius:2, borderColor:'black', backgroundColor:'lightgrey', fontSize:25, textAlign:'left' , boxShadow:'5px 5px 5px #888888'}}>
                &nbsp;One Young World Innovation in Agriculture
                <span  className='pull-right' style={{fontSize:15, marginTop:10}}>&nbsp;&nbsp;30/02/2017&nbsp;&nbsp;</span></p>
            </div>
        </div>
      </div>
      </div>
      <div id="menu1" className="tab-pane fade">
        <div className="row" style={{marginTop:20}}>
                <div className="col-md-7">
                <div className='row' style={{marginTop:40}}>
                  <div className='col-sm-4'>
                    <label htmlFor="Title">Title</label>
                  </div>
                  <div className='col-sm-8'>
                    <input type="text"  className="form-control"  style={{color:'white', border:'1px solid grey'}} />
                  </div>
                </div>

                <div className='row' style={{marginTop:40}}>
                  <div className='col-sm-4'>
                    <label htmlFor="description">Description</label>
                  </div>
                  <div className='col-sm-8'>
                    <textarea rows="8" cols="55"> </textarea>
                  </div>
                </div>
            <div className='col-md-12'>
                <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
                  Create
                </button>
            </div>
                </div>
      </div>
    </div>
  </div>
        </div>
      </div>
    )
  }
  render() {
    return this.showPage()
  }
}
