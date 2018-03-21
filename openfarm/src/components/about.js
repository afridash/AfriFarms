import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

export default class About extends Component {
  render() {
    return (
      <div className="App">
        <div className="row" style={{fontSize:40, fontWeight:'700'}}>
          About openFarm
        </div>
        <div className="row">
        </div>
        <div className='row'>
          <p className="col-sm-10 col-sm-offset-1" style={{fontSize:20}}>
            Open Farm is a responsive web portal that seeks to make the life of farmers and farming easy.
             The portal will provide lot’s of information and also act as a central database for farmers in the region.
          </p>
        </div>

        <div className='col-sm-12'>
          <div className='pull-left' style={{margin:20}}>
          </div>
          <div className='col-sm-12' style={{fontWeight:'500', fontSize:'20'}}>
            <div className='col-sm-3'>
              <div className='row text-center' style={{ border:'1px solid lightgrey', margin:10, height:250, width:350, backgroundColor:'#00abc9'}}>
                <p style={{fontSize:40, marginTop:'30%', color:'white'}}>Messages</p>
              </div>
              <p>Support for farmer collaborations, sales, and knowledge growth</p>
            </div>
            <div className='col-sm-3'>
              <div className='row text-center' style={{ border:'1px solid lightgrey', margin:10, height:250, width:350, backgroundColor:'#00abc9'}}>
                <p style={{fontSize:40, marginTop:'30%', color:'white'}}>Scope</p>
              </div>
                <p>Enable farmers access opportunities, and sell their farm produce to consumers.</p>
            </div>
            <div className='col-sm-3'>
              <div className='row text-center' style={{ border:'1px solid lightgrey', margin:10, height:250, width:350, backgroundColor:'#00abc9'}}>
                <p style={{fontSize:40, marginTop:'20%', color:'white'}}>Product Perspective</p>
              </div>
            <p>All in one platform for tutorials, funding, communication, and product marketing</p>
            </div>
            <div className='col-sm-3'>
              <div className='row text-center' style={{ border:'1px solid lightgrey', margin:10, height:250, width:350, backgroundColor:'#00abc9'}}>
                <p style={{fontSize:40, marginTop:'20%', color:'white'}}>Product Function</p>
              </div>
              <p>Serve as a central database offarmers in the Niger Delta region</p>
            </div>
          </div>
          </div>
          <div className='row'>
            <div className='col-sm-10 col-sm-offset-1' style={{backgroundColor:'#00abc9'}}>
              <p style={{fontSize:25, marginTop:'1%'}}>What we Offer</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-10 col-sm-offset-1' style={{ border:'1px solid lightgrey'}}>
              <div className='row' style={{fontSize:20, margin:'2%'}}>
                <div className='col-sm-12'>
                    <ul className="a" style={{textAlign:'left'}}>
                      <li>Farmers create an online profile with details of who they are and what farm produce they are into</li>
                      <li>A marketplace where farmers can showcase and sell their farm produce</li>
                      <li>Farmers can search and apply for loans and grants</li>
                      <li>Farmers can search and apply for loans and grants</li>
                      <li>A platform where investors search, find, and contact farmers for investment opportunities</li>
                      <li>Farmers can chat with veterinary doctors, and fellow farmers</li>
                      <li>Farmers can locate storage facilities in different states</li>
                      <li>Serve as a central database of farmers in the Niger Delta, allowing farmers to be able to find other farmers</li>
                      <li>Farmers can learn about new Agricultural opportunities and how they can apply for those opportunities.</li>
                      <li>Inbuilt notification system that notifies the farmers on important information like loans and grants opportunity</li>
                      <li>Open Farm will will enable farmers get weather data/forecasting</li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
      </div>

    );
  }
}
