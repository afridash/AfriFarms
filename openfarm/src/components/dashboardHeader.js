import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import moment from 'moment'
import weather from 'yahoo-weather'
import '../App.css';
const styles = {
  button:{margin: 15},
  box:{
    boxShadow: '5px 5px 5px #888888',
  },
};
export default class Dashboard extends Component {
   constructor (props) {
     super (props)
     this.state = {
       width:0,
       height:0,
     }
   }
  componentWillUnmount() {
     window.removeEventListener('resize', this.updateWindowDimensions);
   }
   updateWindowDimensions =() => {
     this.setState({ width: window.innerWidth, height: window.innerHeight});
   }
   handleChange = (event) => {
     this.setState({[event.target.name]:event.target.value})
   }
  componentWillMount(){
    this.updateWindowDimensions();
     window.addEventListener('resize', this.updateWindowDimensions)

     weather('lagos').then(info => {
       this.setState({
         temp:info.item.condition.temp,
         pressure:info.atmosphere.pressure,
         humidity:info.atmosphere.rising,
         tempHigh:info.item.forecast[0].high,
         tempLow:info.item.forecast[0].low,
         windSpeed:info.wind.speed,
         windDirection:info.wind.direction,
         text:info.item.condition.text,
       })
     }).catch(err => {
       // Oops! Errors! :(
     });
  }
  showProfile () {
    return (
      <div className='row'>
        <div className='col-sm-12' style={{height:'500px', overflowX:'scroll'}}>
          <p style={{fontWeight:'600', fontSize:16}}>Edit My Profile <Link to='#' className='pull-right' onClick={()=>this.setState({showProfile:!this.state.showProfile})}><i className="fas fa-times"></i></Link></p>
          <img src={require('../images/profile-pic.svg')} className='img-thumbnail' style={{width:50, height:50}} />
          <form>
            <br/>
              <FormGroup>
                <ControlLabel className="pull-left">First Name</ControlLabel>
                <FormControl
                  className='form-control'
                  placeholder="First Name"
                  name='firstName'
                  onChange = {this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel className="pull-left">Middle Name</ControlLabel>
                <FormControl
                  className='form-control'
                  name='middleName'
                  placeholder="Middle Name"
                  onChange = {this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel className="pull-left">Last Name</ControlLabel>
                <FormControl
                  className='form-control'
                  name='lastName'
                  placeholder="Last Name"
                  onChange = {this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel className="pull-left">Gender</ControlLabel>
                <FormControl name='gender' onChange={this.handleChange} value={this.state.gender} componentClass="select" placeholder="select">
                  <option value="select">Choose One</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel className="pull-left">Address/Location</ControlLabel>
                <FormControl
                  className='form-control'
                  name='address'
                  placeholder="Address/Location"
                  onChange = {this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="formControlsSelect2">
                <ControlLabel className="pull-left">State</ControlLabel>
                <FormControl name='state' onChange={this.handleChange} value={this.state.state} componentClass="select" placeholder="select">
                  <option value="select">Choose One</option>
                  <option value="akwa-ibom">Akwa-Ibom</option>
                  <option value="bayelsa">Bayelsa</option>
                  <option value="cross river">Cross River</option>
                  <option value="delta">Delta</option>
                  <option value="river state">River State</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel className="pull-left">Phone</ControlLabel>
                <FormControl
                  className='form-control'
                  name='phone'
                  placeholder="Phone"
                  onChange = {this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel className="pull-left">Farm Produce (separated by ;)</ControlLabel>
                <FormControl
                  className='form-control'
                  name='produce'
                  placeholder="Farm Produce separated by semi-colon;"
                  onChange = {this.handleChange}
                />
              </FormGroup>
                <FormGroup>
                  {this.state.loading ? <Button className="pull-right" type="submit"  bsSize="sm" style={{...styles.button, backgroundColor:'#1babc7', fontSize:16, color:'white'}}
                    >Saving in..</Button> : <Button className="pull-right" type="submit"  bsSize="sm" style={{...styles.button, backgroundColor:'#1babc7', fontSize:16, color:'white'}} onClick={(event) =>
                      this.handleSubmit(event)}>Save</Button> }
                  </FormGroup>
            </form>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <div className='row' style={{marginTop:-20, }}>
          <div className='col-md-3' style={{fontSize:20, backgroundColor:'#eeeeee',}}>
            <div className='row'>
              <div  style={{backgroundColor:'#eeeeee', padding:10, margin:5}}>
              <div className='panel-body'>
                <div className='row'>
                  <div className="pull-right" style={{fontSize:15}}>{moment().format('LLLL')}</div>
                </div>
                <div className='row'>
                  <div className='col-sm-6' style={{marginTop:20}}>
                    <img src={require('../images/cloud-cover.svg')} style={{height:40, width:40}}  />
                  </div>
                  <div className='col-sm-6' style={{fontSize:60, fontWeight:'800'}}>{this.state.temp}</div>
                </div>
                <div className='row'>
                  <h5>It will be {this.state.text} today. See recommended best farm practice for different crops today. Read More</h5>
                </div>
                <div className="row">
                  <div className='pull-left' style={{marginLeft:20}}>Temperature </div>
                </div>
                <div className='row' style={{fontSize:15}}>
                  <div className='col-sm-6'>
                    <div className='pull-left' style={{marginLeft:10, color:'grey'}}>HIGH:&nbsp; {this.state.tempHigh}</div>
                  </div>
                  <div className='col-sm-6' style={{color:'grey'}}>LOW:&nbsp;<span style={{color:'#00abc9'}}>{this.state.tempLow}</span></div>
                </div>
                <div className="row" style={{marginTop:10}}>
                  <div className='pull-left' style={{marginLeft:20}}>Humidity </div>
                </div>
                <div className='row' style={{fontSize:15}}>
                  <div className='col-sm-6'>
                    <div className='pull-left' style={{marginLeft:10, color:'grey'}}>RISING:&nbsp; {this.state.humidity}</div>
                  </div>
                </div>
                <div className="row" style={{marginTop:20}}>
                  <div className='pull-left' style={{marginLeft:20}}>Pressure </div>
                </div>
                <div className='row' style={{fontSize:15}}>
                  <div className='col-sm-6'>
                    <div className='pull-left' style={{marginLeft:10, color:'grey'}}></div>
                  </div>
                  <div className='col-sm-6' style={{color:'grey'}}>CURRENT:&nbsp;<span style={{color:'#00abc9'}}>{this.state.pressure}</span></div>
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
                  <div className='col-sm-4'>
                    <div className='pull-left' style={{marginLeft:10, color:'grey'}}>{this.state.windSpeed} km/h</div>
                  </div>
                  <div className='col-sm-4' style={{color:'grey'}}>
                    <div className='pull-left'>{this.state.windDirection}</div></div>
                  <div className='col-sm-4' style={{color:'grey'}}>
                    <div className='pull-left'>
                      <p style={{color:'#00abc9'}}>NW</p>
                    </div></div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className='col-md-9 cols-sm-12' style={{fontSize:15, height:20}}>
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
                          <h4>View as: List Card</h4>
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
                        <div onClick={()=>this.setState({showProfile:!this.state.showProfile})} className='col-sm-2' >
                          <div className='column'>
                        <img src={require('../images/profile-view.svg')} style={{height:30, width:30}}  />
                        <h5>User</h5>
                        </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={this.state.showProfile ? 'col-sm-8' : 'row'}>
              {this.props.children}
            </div>
            {this.state.showProfile && <div className='col-sm-4' style={{backgroundColor:'#FAFAFA',marginTop:-20}}>
            {this.showProfile()}
            </div>}
          </div>
        </div>
      </div>
    );
  }
}
