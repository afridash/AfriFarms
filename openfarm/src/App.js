import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import logo from './openLogo.png';
import first from './images/third.jpg';
import second from './images/second.jpg';
import third from './images/fourth.jpg';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App" style={{marginTop:-25}}>
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
                <Link to='/login'>
                  <button style={{backgroundColor:'#1babc7', padding:10, color:'white', borderColor:'transparent', borderRadius:2}}>GET STARTED</button>
                </Link>
              </div>
            </div>

            <div className="item">
              <img src={second} alt="Chicago" style={{width:'100%', height:'500px'}} />
              <div class="carousel-caption" style={{top:'50%'}}>
                <h2 style={{fontWeight:'600'}}>Connect with Farmers,</h2>
                <h2 style={{fontWeight:'600'}}>Funding, and Markets</h2>
                <Link to='/login'>
                  <button style={{backgroundColor:'#1babc7', padding:10, color:'white', borderColor:'transparent', borderRadius:2}}>GET STARTED</button>
                </Link>
              </div>
            </div>
            <div className="item">
              <img src={third} alt="New York" style={{width:'100%', height:'500px'}} />
              <div class="carousel-caption" style={{top:'50%'}}>
                <h2 style={{fontWeight:'600'}}>Connect with Farmers,</h2>
                <h2 style={{fontWeight:'600'}}>Funding, and Markets</h2>
                <Link to='/login'>
                  <button style={{backgroundColor:'#1babc7', padding:10, color:'white', borderColor:'transparent', borderRadius:2}}>GET STARTED</button>
                </Link>
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
              <div className='col-sm-12'>
                <img src={require('./images/tiny-wheel.svg')} style={{padding:20, height:60, width:60}}  />
                <div className='col-sm-12'>
                  <h3>We are here to help Grow your Farm</h3>
                  <i>Funding, Support Services, and Connection</i>
                  <p style={{fontSize:14}}>Open Farm is built for you, the farmer looking for means to increase your network, sell produce faster, and gain acess to loans and grants. It is built for you the investor looking for a productive farm to invest in. And for everyone else, you are welcome to connect with our farmers, and investors.</p>
                  <Link to='/about'>
                    <button style={{backgroundColor:'#1babc7', marginTop:40, padding:10, color:'white', borderColor:'transparent', borderRadius:30}}>SEE MORE ABOUT US</button>
                  </Link>

                </div>
              </div>
            </div>
          </div>
          <div className='container' style={{marginTop:'5%'}}>
            <div className='row'>
              <div className='col-sm-12'>
                <h3 style={{fontWeight:'600', fontSize:'16'}}>LATEST NEWS</h3>
                <i>stay ahead of farming trend</i>
              </div>
              <div className='col-sm-12' style={{fontWeight:'500', fontSize:'20', marginTop:'5%'}}>
                <div className='col-sm-3'>
                  <p style={{fontWeight:'700', fontSize:'16'}}>Are farmers getting adequate...</p>
                  <p>Register with OpenFarm to start your journey towards a more efficient farming experience.</p>
                  <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
                    <img src={require('./images/img-1.jpg')} style={{width:'100%', height:100}} />
                  </div>
                </div>
                <div className='col-sm-3'>
                  <p style={{fontWeight:'600', fontSize:'16'}}>Low cost fertilizer in the...</p>
                  <p>Register with OpenFarm to start your journey towards a more efficient farming experience.</p>
                  <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
                  <img src={require('./images/img-2.jpg')} style={{width:'100%', height:100}} />
                </div>
                </div>
                <div className='col-sm-3'>
                  <p style={{fontWeight:'600', fontSize:'16'}}>The Best Time to...</p>
                  <p>Register with OpenFarm to start your journey towards a more efficient farming experience.</p>
                  <div className='row' style={{border:'1px solid lightgrey', margin:10}}>
                    <img src={require('./images/img-3.jpg')} style={{width:'100%', height:100}}  />
                  </div>
                </div>
                <div className='col-sm-3'>
                  <p style={{fontWeight:'600', fontSize:'16'}}>Why Farmers need mar...</p>
                  <p>Register with OpenFarm to start your journey towards a more efficient farming experience.</p>
                  <div className='row'>
                  <img src={require('./images/img-4.jpg')} className='img-responsive' style={{width:'100%', height:100}}  />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row' style={{marginTop:'10%'}}>
          <i className="fas fa-copyright"></i>
          <span> OpenFarm 2018. All Rights Reserved</span>
        </div>
        </div>
    );
  }
}
