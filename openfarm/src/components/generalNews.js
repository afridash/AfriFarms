import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

export default class GeneralNews extends Component {
  render() {
    return (
      <div className="App">
        <div className="row" style={{marginTop:20}}>
                  <div className='col-sm-3'>
                    <p style={{fontSize:20, fontWeight:'600'}} data-toggle="modal" data-target="#myModal">Farm Business 101</p>
                    <p data-toggle="modal" data-target="#myModal">Farmers all over the world are seeking new ways to better sell their produc this it it, i'm the light of the world..</p>
                    <img src={require('../images/img-4.jpg')} className='img-responsive' style={{width:320, height:245, marginLeft:30}} data-toggle="modal" data-target="#myModal"  />
                  </div>
                  <div className='col-sm-3'>
                   <p style={{fontSize:20, fontWeight:'600'}} data-toggle="modal" data-target="#myModal">Modern Agriculture </p>
                   <p data-toggle="modal" data-target="#myModal"> Gadgets are everyday and are produced in the number every year...</p>
                    <img src={require('../images/img-4.jpg')} className='img-responsive' style={{width:320, height:245, marginLeft:30}} data-toggle="modal" data-target="#myModal" />
                  </div>
                  <div className='col-sm-3'>
                    <p style={{fontSize:20, fontWeight:'600'}} data-toggle="modal" data-target="#myModal">Latest tech machines in farming</p>
                    <p data-toggle="modal" data-target="#myModal">Farm produce is the reward of a farmer. But maximizing that product...</p>
                  <img src={require('../images/img-4.jpg')} className='img-responsive' style={{width:320, height:245, marginLeft:30}} data-toggle="modal" data-target="#myModal" />
                  </div>
                  <div className='col-sm-3'>
                  <p style={{fontSize:20, fontWeight:'600'}} data-toggle="modal" data-target="#myModal">Latest tech machines in farming</p>
                  <p data-toggle="modal" data-target="#myModal">The world is being driven by a lot of things which stop existing after in a ...</p>
                    <img src={require('../images/img-4.jpg')} className='img-responsive' style={{width:320, height:245, marginLeft:30}} data-toggle="modal" data-target="#myModal" />
                  </div>
      </div>
      <div className='row'>
<div id="myModal" className="modal fade" role="dialog">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Farm Business 101</h4>
      </div>
      <div className="modal-body">
        <p>Farmers all over the world are seeking new ways to better sell their produc this it it, i'm the light of the world.
        This is bunch of useless write up just to test how much I can put into this modal, and i'm still just typing more and more test. I should probably stope right now</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
      </div>
      <div className='row' style={{marginTop:20}}>
        <a href="#" className="previous" style={{backgroundColor:'lightgrey', border:'2px solid lightgrey', borderRadius:2, fontSize:20}}>&laquo; Previous</a>
        <a href="#" className="previous" style={{backgroundColor:'#069fba', color:'white', border:'2px solid #069fba', borderRadius:2, fontSize:20}}> 1 &nbsp;</a>
        <a href="#" className="next" style={{backgroundColor:'lightgrey', border:'2px solid lightgrey', borderRadius:2, fontSize:20}}>Next &raquo;</a>
      </div>
      </div>
    );
  }
}
