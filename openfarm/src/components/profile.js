import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

export default class Profile extends Component {
  render() {
    return (
      <div className="App">
          <div className='row'>
            <div className='col-sm-3 sm-offset-1'>
              <img src={require('../images/img-4.jpg')} className='img-responsive' style={{width:320, height:245, margin:30}}/>
              <p style={{fontSize:25}}> Mabel Ogiriki</p>
            </div>
            <div className='col-sm-8 sm-offset-1' style={{ borderRadius:2, border:'2px solid lightgrey', marginTop:30, padding:20}}>
              <div className='row'>
                <div className='col-sm-1'></div>
                <div className='col-sm-10'>
                  <p style={{ borderRadius:20, border:'2px solid #00abc9',backgroundColor:'#00abc9', marginTop:30, fontSize:25, color:'white'}}>michtell23@gmail.com
                  <span  className='pull-left' style={{backgroundColor:'lightgrey', borderRadius:20, border:'1px solid lightgrey',fontSize:25, marginTop:-2, padding:2, marginLeft:-2, color:'black'}}>&nbsp;&nbsp;Email:&nbsp;&nbsp;</span></p>
                </div>
                <div className='col-sm-1'></div>
              </div>
              <div className='row'>
                <div className='col-sm-1'></div>
                <div className='col-sm-10'>
                  <p style={{ borderRadius:20, border:'2px solid #00abc9',backgroundColor:'#00abc9', marginTop:0, fontSize:25, color:'white'}}>Sokoto
                  <span  className='pull-left' style={{backgroundColor:'lightgrey', borderRadius:20, border:'1px solid lightgrey',fontSize:25, marginTop:-2, padding:2, marginLeft:-2, color:'black'}}>&nbsp;&nbsp;State:&nbsp;&nbsp;</span></p>
                </div>
                <div className='col-sm-1'></div>
              </div>
              <div className='row'>
                <div className='col-sm-1'></div>
                <div className='col-sm-10'>
                  <p style={{ borderRadius:10, border:'2px solid lightgrey',backgroundColor:'lightgrey', marginTop:0, fontSize:25, padding:10}}>Bio:</p>
                </div>
                <div className='col-sm-1'></div>
              </div>
              <div className='row'>
                <div className='col-sm-1'></div>
                <div className='col-sm-10'>
                  <p style={{ borderRadius:10, border:'2px solid #00abc9',backgroundColor:'#00abc9', marginTop:-20, fontSize:20, color:'white'}}>
                    James Robinson was born in 1990 to
                    a family of 4 children. He liked the idea of caring for people, especially those who couldn't hungry. He grew up to embrace the life of a farmer. He has over 15
                    farms and has worked closely with over 1500 farmers to help them get better at what they do. Reach out to James if you have any issues or concerns with respect
                    to your farm. Directly through chat or contact page. Thanks.</p>
                </div>
                <div className='col-sm-1'></div>
              </div>
              <button type="button" className="btn btn-danger" style={{marginTop:10}}>Close</button>
            </div>

          </div>
        </div>

    );
  }
}
