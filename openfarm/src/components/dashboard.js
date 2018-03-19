import React, { Component } from 'react';
import '../App.css';

export default class Dashboard extends Component {
   constructor (props) {
     super (props)
     this.state = {
       width:0,
       height:0
     }
   }
    componentWillUnmount() {
     window.removeEventListener('resize', this.updateWindowDimensions);
   }
   updateWindowDimensions() {
     this.setState({ width: window.innerWidth, height: window.innerHeight});
   }
  componentWillMount(){
    this.updateWindowDimensions();
     window.addEventListener('resize', this.updateWindowDimensions);
  }
  render() {
    return (
      <div className="App">
        <div className='row' style={{marginTop:-20, }}>
          <div className='col-sm-3' style={{fontSize:20, height:this.state.height-100, backgroundColor:'#eeeeee',}}>
            <div className='row'>
              <div  style={{backgroundColor:'#eeeeee', padding:20}}>
              <div className='panel-body'>
                <div className='row'>
                  <div className="pull-right" style={{marginTop:20, fontSize:15}}>Sunday August 9, 2017</div>
                </div>
                <div className='row'>
                  <div className='col-sm-6' style={{marginTop:30}}>
                    <img src={require('../images/cloud-cover.svg')} style={{height:40, width:40}}  />
                  </div>
                  <div className='col-sm-6' style={{fontSize:60, fontWeight:'800'}}>27</div>
                </div>
                <div className='row'>
                  <h5>It will be sunny today. See recommended best farm practice for different crops today. Read More</h5>
                </div>
                <div className="row">
                  <div className='pull-left' style={{marginLeft:20}}>Temperature </div>
                </div>
                <div className='row' style={{fontSize:15}}>
                  <div className='col-sm-6'>
                    <div className='pull-left' style={{marginLeft:10, color:'grey'}}>HIGH:&nbsp; 46</div>
                  </div>
                  <div className='col-sm-6' style={{color:'grey'}}>LOW:&nbsp;<span style={{color:'#00abc9'}}>36</span></div>
                </div>
                <div className="row" style={{marginTop:20}}>
                  <div className='pull-left' style={{marginLeft:20}}>Humidity </div>
                </div>
                <div className='row' style={{fontSize:15}}>
                  <div className='col-sm-6'>
                    <div className='pull-left' style={{marginLeft:10, color:'grey'}}>RISING:&nbsp; 87</div>
                  </div>
                </div>
                <div className="row" style={{marginTop:20}}>
                  <div className='pull-left' style={{marginLeft:20}}>Pressure </div>
                </div>
                <div className='row' style={{fontSize:15}}>
                  <div className='col-sm-6'>
                    <div className='pull-left' style={{marginLeft:10, color:'grey'}}>High:&nbsp; 30.90</div>
                  </div>
                  <div className='col-sm-6' style={{color:'grey'}}>CURRENT:&nbsp;<span style={{color:'#00abc9'}}>30.29</span></div>
                </div>
                <div className="row" style={{marginTop:20}}>
                  <div className='pull-left' style={{marginLeft:20}}>Rainfall </div>
                </div>
                <div className='row' style={{fontSize:15}}>
                  <div className='col-sm-6'>
                    <div className='pull-left' style={{marginLeft:10, color:'grey'}}>CUMUL:&nbsp; 0</div>
                  </div>
                  <div className='col-sm-6' style={{color:'grey'}}>CURRENT:&nbsp;<span style={{color:'#00abc9'}}>0</span></div>
                </div>
                <div className="row" style={{marginTop:20}}>
                  <div className='pull-left' style={{marginLeft:20}}>Wind Speed </div>
                </div>
                <div className='row' style={{fontSize:15}}>
                  <div className='col-sm-6'>
                    <div className='pull-left' style={{marginLeft:10, color:'grey'}}>AVG</div>
                  </div>
                  <div className='col-sm-6' style={{color:'grey'}}>GUST</div>
                </div>
                <div className='row' style={{fontSize:15}}>
                  <div className='col-sm-6'>
                    <div className='pull-left' style={{marginLeft:10, color:'grey'}}>3</div>
                  </div>
                  <div className='col-sm-6' style={{color:'#00abc9'}}>5</div>
                </div>
                <div className='row' style={{fontSize:15}}>
                  <div className='col-sm-4'>
                    <div className='pull-left' style={{marginLeft:10, color:'grey'}}>3 mph</div>
                  </div>
                  <div className='col-sm-4' style={{color:'grey'}}>
                    <div className='pull-left'>315</div></div>
                  <div className='col-sm-4' style={{color:'grey'}}>
                    <div className='pull-left'>
                      <p style={{color:'#00abc9'}}>NW</p>
                    </div></div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className='col-sm-9' style={{fontSize:15, height:20}}>
            <div className='row'>
              <div className='panel panel-default' style={{backgroundColor:'#f5f5f5'}}>
                <div className='panel-body'>
                  <div className='col-sm-5'>
                        <div className="form-group" style={{backgroundColor:'#e0e0e0', marginTop:10}}>
                          <input type="text"  className="form-control" placeholder="Search" style={{backgroundColor:'transparent', color:'white'}} />
                        </div>
                  </div>
                  <div className='col-sm-7'>
                      <div className='row'>
                        <div className='col-sm-4' style={{marginTop:15}}>
                          <h4>View as: LIST CARD</h4>
                        </div>

                        <div className='col-sm-2'>
                        <div className='column'>
                        <img src={require('../images/add-user.svg')} style={{height:30, width:30}}  />
                        <h5>New</h5>
                        </div>
                       </div>
                        <div className='col-sm-2' >
                          <div className='column'>
                          <img src={require('../images/report.svg')} style={{height:30, width:30}}  />
                          <h5>Reports</h5>
                          </div>
                        </div>
                        <div className='col-sm-2' >
                          <div className='column'>
                          <img src={require('../images/chats.svg')} style={{height:30, width:30}}  />
                          <h5>Chats</h5>
                          </div>
                        </div>
                        <div className='col-sm-2' >
                          <div className='column'>
                        <img src={require('../images/profile-view.svg')} style={{height:30, width:30}}  />
                        <h5>User Profile</h5>
                        </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
