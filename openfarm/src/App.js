import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import logo from './openLogo.png';
import first from './images/third.jpg';
import second from './images/second.jpg';
import third from './images/fourth.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" style={{marginTop:-20}}>
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="item active">
                <img src={first} alt="Los Angeles" style={{width:'100%', height:'500px' }} />
              <div class="carousel-caption" style={{top:'50%'}}>
                <h2 style={{fontWeight:'600'}}>Connect with Farmers,</h2>
                <h2 style={{fontWeight:'600'}}>Funding, and Markets</h2>
                <button style={{backgroundColor:'#1babc7', padding:10, color:'white', borderColor:'transparent', borderRadius:2}}>GET STARTED</button>
              </div>
            </div>

            <div className="item">
              <img src={second} alt="Chicago" style={{width:'100%', height:'500px'}} />
              <div class="carousel-caption" style={{top:'50%'}}>
                <h2 style={{fontWeight:'600'}}>Connect with Farmers,</h2>
                <h2 style={{fontWeight:'600'}}>Funding, and Markets</h2>
                <button style={{backgroundColor:'#1babc7', padding:10, color:'white', borderColor:'transparent', borderRadius:2}}>GET STARTED</button>
              </div>
            </div>
            <div className="item">
              <img src={third} alt="New York" style={{width:'100%', height:'500px'}} />
              <div class="carousel-caption" style={{top:'50%'}}>
                <h2 style={{fontWeight:'600'}}>Connect with Farmers,</h2>
                <h2 style={{fontWeight:'600'}}>Funding, and Markets</h2>
                <button style={{backgroundColor:'#1babc7', padding:10, color:'white', borderColor:'transparent', borderRadius:2}}>GET STARTED</button>
              </div>
            </div>
          </div>
          <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <div className='row'>
          <div className='col-sm-12'>
            <h2 className='lead' style={{fontWeight:'600'}}>How it Works</h2>
          </div>
          <div className='col-sm-12' style={{fontWeight:'500', fontSize:'20'}}>
            <div className='col-sm-3'>
              <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
                <img src={require('./images/register-icon.svg')} style={{padding:20, height:100, width:100}} />
              </div>
              <p style={{fontWeight:'600', fontSize:'16'}}>REGISTER A PROFILE</p>
              <p>Register with OpenFarm to start your journey towards a more efficient farming experience.</p>
            </div>
            <div className='col-sm-3'>
              <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
              <img src={require('./images/list-produce-icon.svg')} style={{padding:20, height:100, width:100}} />
            </div>
              <p style={{fontWeight:'600', fontSize:'16'}}>LIST YOUR PRODUCE</p>
              <p>List your products, and get buyers/investors.</p>
            </div>
            <div className='col-sm-3'>
              <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
                <img src={require('./images/access-fund-icon.svg')} style={{padding:20, height:100, width:100}}  />
              </div>
              <p style={{fontWeight:'600', fontSize:'16'}}>ACCESS FUNDING</p>
              <p>Gain access to loans, and grants offered by individuals or corporate bodies.</p>
            </div>
            <div className='col-sm-3'>
              <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
              <img src={require('./images/connect-icon.svg')} style={{padding:20, height:100, width:100}}  />
              </div>
              <p style={{fontWeight:'600', fontSize:'16'}}>CONNECT & NETWORK</p>
              <p>Meet and connect with farmers, investors, and veterinarians with just a click </p>
            </div>
          </div>
          <div className='container'>
            <div className='row'>
              <div className='row'>
                <img src={require('./images/tiny-wheel.svg')} style={{padding:20, height:60, width:60}}  />
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  }
}

export default App;
