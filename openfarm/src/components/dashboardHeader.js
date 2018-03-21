import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import FileReaderInput from 'react-file-reader-input'
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import moment from 'moment'
import { Link,Redirect, } from 'react-router-dom'
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
       produce:'',
       firstName:'',
       middleName:'',
       lastName:'',
       address:'',
       phone:'',
       bio:'',
     }
     firebase.auth().onAuthStateChanged(this.handleUser)
     this.usersRef = firebase.database().ref().child('users')
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

     weather('port harcourt').then(info => {
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
  handleUser = (user) => {
    if (user) {
      this.setState({userId:user.uid})
      this.getUserInfo(user.uid)
    }
  }
  handleFile = (e, results) => {
    results.forEach(result => {
      const [e, file] = result; //Retrieve the picture that was selected
      this.setState({profilePicture:e.target.result,mime:file.type}) //Store the picture as a state variable before trying to save
      this.saveProfilePicture(e.target.result)
    });
  }
  saveProfilePicture (file) {
    const sessionId = new Date().getTime()
    var ref=firebase.storage().ref().child('users').child('profile').child(this.state.userId).child(`${sessionId}`)
     var uploadTask = ref.putString(file, 'data_url') //Save the picture

     uploadTask.on('state_changed', (snapshot) => {
     // Observe state change events such as progress, pause, and resume
     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     this.setState({width:progress.toFixed(0), uploading:true})
     switch (snapshot.state) {
       case firebase.storage.TaskState.PAUSED: // or 'paused'
         break;
       case firebase.storage.TaskState.RUNNING: // or 'running'
         break;
      default:
        break;
     }
     }, function(error) {
     // Handle unsuccessful uploads
     }, (success) => {
     // Handle successful uploads on complete
     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
       var downloadURL = uploadTask.snapshot.downloadURL;
       this.updateProfilePicture (downloadURL)
     });
  }
  updateProfilePicture (downloadURL) {
    this.setState({uploading:false})
    var user = firebase.auth().currentUser
    if(user){
      user.updateProfile({
        photoURL: downloadURL
      }).then(()=> {
          this.usersRef.child(this.state.userId).update({profilePicture:downloadURL})
      }, function(error) {
        alert("There was an error uploading your picture")
      });
    }

  }
  getUserInfo (userId) {
    this.usersRef.child(userId).once('value', (user)=> {
      this.setState({
        firstName:user.val().firstName,
        middleName:user.val().middleName,
        lastName:user.val().lastName,
        gender:user.val().gender,
        address:user.val().address,
        state:user.val().state,
        phone:user.val().phone,
        produce:user.val().produce,
        profilePicture:user.val().profilePicture
      })
    })
  }
  handleSubmit (event) {
    event.preventDefault()
    this.setState({loading:true})
    if (this.authenticateData()){
      var data = {
        firstName:this.state.firstName,
        middleName:this.state.middleName,
        lastName:this.state.lastName,
        displayName:this.state.firstName + ' ' + this.state.lastName,
        gender:this.state.gender,
        address:this.state.address,
        state:this.state.state,
        phone:this.state.phone,
        bio:this.state.bio,
        produce:this.state.produce,
      }
      var user = firebase.auth().currentUser
      user.updateProfile({
        displayName: this.state.firstName + ' ' + this.state.lastName,
        photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(()=> {
        this.usersRef.child(this.state.userId).update(data, (error)=> {
          if (!error) this.setState({loading:false})
          else {
            alert ('Error updating user profile, try again later')
            this.setState({loading:false})
          }
        })
      }).catch((error)=> {
        alert('Error updating user profile, try again')
      });

    }
  }
  authenticateData () {
    return this.state.firstName !== '' && this.state.lastName && this.state.state !==undefined && this.state.gender !== undefined && this.state.address !=='' && this.state.phone !==''
  }
  showProfile () {
    return (
      <div className='row'>
        <div className='col-sm-12' style={{height:'500px', overflowX:'scroll'}}>
          <p style={{fontWeight:'600', fontSize:16}}>Edit My Profile <Link to='#' className='pull-right' onClick={()=>this.setState({showProfile:!this.state.showProfile})}><i className="fas fa-times"></i></Link></p>
          <FileReaderInput as="url" id="my-file-input"
            onChange={this.handleFile}>
            {this.state.profilePicture ? <img src={this.state.profilePicture} className='img-thumbnail' style={{width:100, height:100}} />: <img src={require('../images/profile-pic.svg')} className='img-thumbnail' style={{width:50, height:50}} /> }
          </FileReaderInput>
          {this.state.uploading && <span style={{fontSize:10}}>Uploading...{this.state.width}%</span>}
          <form>
            <br/>
              <FormGroup>
                <ControlLabel className="pull-left">First Name</ControlLabel>
                <FormControl
                  className='form-control'
                  placeholder="First Name"
                  value={this.state.firstName}
                  name='firstName'
                  onChange = {this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel className="pull-left">Middle Name</ControlLabel>
                <FormControl
                  className='form-control'
                  name='middleName'
                  value={this.state.middleName}
                  placeholder="Middle Name"
                  onChange = {this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel className="pull-left">Last Name</ControlLabel>
                <FormControl
                  className='form-control'
                  name='lastName'
                  value={this.state.lastName}
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
                  value={this.state.address}
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
                  value={this.state.phone}
                  placeholder="Phone"
                  onChange = {this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel className="pull-left">Farm Produce (separated by ;)</ControlLabel>
                <FormControl
                  className='form-control'
                  name='produce'
                  value={this.state.produce}
                  placeholder="Farm Produce separated by semi-colon;"
                  onChange = {this.handleChange}
                />
              </FormGroup>
              <div className='row' style={{marginTop:10}}>
                <label htmlFor="description">Bio</label>
                <div className='col-sm-12'>
                  <textarea rows='5' placeholder='Bio' className='form-control' name='bio' value={this.state.bio} onChange={this.handleChange} />
                </div>
              </div>
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
          <div className='col-md-3' style={{backgroundColor:'#eeeeee'}}>
            <div className='row'>
              <div  style={{backgroundColor:'#eeeeee', padding:10, margin:5, height:600}}>
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
                        <div className='col-sm-4'>
                        </div>
                        <div className='col-sm-4'>
                        </div>
                        <div className='col-sm-2' >
                          <div className='column'>
                            <Link to="/chats" style={{color:'black', textDecoration:'none'}}>
                              <img src={require('../images/chats.svg')} style={{height:20, width:20}}  />
                              <h5>Chats</h5>
                            </Link>
                          </div>
                        </div>
                        <div onClick={()=>this.setState({showProfile:!this.state.showProfile, selected:'user'})} className='col-sm-2' >
                          <div style={{color:this.state.selected === 'user' ? '#069fba' : 'black'}} className='column'>
                        <img src={require('../images/profile-view.svg')} style={{height:20, width:20, color:this.state.selected === 'user' ? '#069fba' : 'black'}}  />
                        <h5 style={{fontWeight:'600'}}>PROFILE</h5>
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
