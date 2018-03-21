import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import '../App.css';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.profileId = this.props.match.params.id
    this.state = {
      isLoading:true,
      user:this.profileId
    }
    this.usersRef = firebase.database().ref().child('users')
    firebase.auth().onAuthStateChanged(this.handleUser)
    this.getDetails(this.profileId)
  }
  handleUser = (user) => {
    if (user) {
      this.setState({userId:user.uid, profilePicture:user.photoURL})
    }
  }
  componentWillReceiveProps ( newProps ) {
    if (this.profileId !== newProps.match.params.id) {
      this.getDetails(newProps.match.params.id)
    }
  }
  getDetails (userId) {
    this.usersRef.child(userId).once('value', (user)=> {
      this.setState({
        isLoading:false,
        bio:user.val().bio,
        email:user.val().email,
        state:user.val().state,
        displayName:user.val().displayName,
        profilePicture:user.val().profilePicture,
      })
    })
  }
  showPage () {
    return (
      <div className='row' style={{margin:10}}>
        <div className='col-sm-3'>
          <img src={this.state.profilePicture} className='img-responsive img-thumbnail' style={{width:320, height:245}}/>
          <p style={{fontSize:25}}> {this.state.displayName}</p>
        </div>
        <div className='col-sm-9' style={{ borderRadius:2, border:'2px solid lightgrey', padding:20}}>
          <div className='row'>
            <div className='col-sm-1'></div>
            <div className='col-sm-10'>
              <p style={{ borderRadius:20, border:'2px solid #00abc9',backgroundColor:'#00abc9', marginTop:30, fontSize:25, color:'white'}}>{this.state.email}
              <span  className='pull-left' style={{backgroundColor:'lightgrey', borderRadius:20, border:'1px solid lightgrey',fontSize:25, marginTop:-2, padding:2, marginLeft:-2, color:'black'}}>&nbsp;&nbsp;Email:&nbsp;&nbsp;</span></p>
            </div>
            <div className='col-sm-1'></div>
          </div>
          <div className='row'>
            <div className='col-sm-1'></div>
            <div className='col-sm-10'>
              <p style={{ borderRadius:20, border:'2px solid #00abc9',backgroundColor:'#00abc9', marginTop:0, fontSize:25, color:'white'}}>{this.state.state}
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
              {this.state.bio}</p>
            </div>
            <div className='col-sm-1'></div>
          </div>
          <Link to='/' style={{textDecoration:'none'}}>
            <button type="button" className="btn btn-danger" style={{marginTop:10}}>Close</button>
          </Link>

        </div>

      </div>
    )
  }
  render() {
    return (
      <div className="App">
        {this.state.isLoading ? <div className='text-center'>
          <p style={{fontSize:16, fontWeight:'600'}}>Loading...</p>
        </div> : this.showPage()}
        </div>

    );
  }
}
