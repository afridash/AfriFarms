import React, { Component } from 'react';
import moment from 'moment'
import * as firebase from 'firebase'
import {Link} from 'react-router-dom'
import {Firebase} from '../helpers/firebase'
import '../App.css';

export default class AdminStorage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title:'',
      description:'',
      location:'',
      storages:[],
      users:[]
    }
    this.users = []
    this.storages = []
    this.ref = firebase.database().ref().child('storages')
    this.usersRef = firebase.database().ref().child('users')
    this.badgesRef = firebase.database().ref().child('badges')
    firebase.auth().onAuthStateChanged(this.handleUser)
  }
  handleUser = (user) => {
    if (user) {
      this.setState({displayName:user.displayName, userId:user.uid, profilePicture:user.photoURL})
    }
  }
  componentWillMount () {
    this.ref.on('child_added', (storage)=> {
      this.storages.push({
        description:storage.val().description,
        createdBy:storage.val().createdBy,
        createdAt:storage.val().createdAt,
        title:storage.val().title,
        location:storage.val().location
      })
      this.setState({storages:this.storages})
    })
    this.usersRef.once('value', (users)=> {
      users.forEach((user)=> {
        this.users.push({
          key:user.key,
          displayName:user.val().displayName
        })
      })
      this.setState({users:this.users})
    })
  }
  saveStorage () {
    this.setState({loading:true})
    if (this.authenticateData()) {
      var data = {
        description: this.state.description,
        createdAt:firebase.database.ServerValue.TIMESTAMP,
        createdBy:this.state.displayName,
        userId:this.state.userId,
        profilePicture:this.state.profilePicture,
        title:this.state.title,
        location:this.state.location
      }
      var item = this.ref.push()
      item.setWithPriority(data, 0 - Date.now())
      this.state.users.forEach((user)=>{
        data = {
          title: "Storage Location -- " + this.state.title,
          message: "Dear " +  user.displayName + ", a new storage location was added by " + this.state.displayName + ".",
          createdAt:firebase.database.ServerValue.TIMESTAMP
        }
        firebase.database().ref().child('notifications').child(user.key).push(data)
        this.badgesRef.child(user.key).child('notificationsBadges').once('value', (badgeCount)=>{
          if (badgeCount.val()) badgeCount.ref.set(badgeCount.val()+1)
          else badgeCount.ref.set(1)
        })
      })
      this.setState({error:'', title:'', location:'', description:'', loading:false, saved:true})
    }else{
      this.setState({error:'Fields cannot be empty', loading:false})
    }
  }
  authenticateData () {
    return this.state.title !=='' && this.state.description !== '' && this.state.location !== ''
  }
  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  showPage () {
    return (
      <div className="App">
        <div className='col-sm-8 col-sm-offset-2'>
          <ul className="nav nav-tabs">
      <li className="active"><a data-toggle="tab" href="#home">Storages</a></li>
      <li><a data-toggle="tab" href="#menu1">Add Storage</a></li>
    </ul>

    <div className="tab-content">
      <div id="home" className="tab-pane fade in active">
      <div className='row'>
        {this.state.storages.length === 0 && <p className='text-center lead'>Loading ...</p>}
        {this.state.storages.map((storage,key)=>
          <div key={key} className='col-sm-12'>
            <div>
              <div className="col-sm-12 col-md-12">
                <div className="panel panel-grey" >
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <a
                        data-toggle="collapse"
                        style={{textDecoration:'none'}}
                        data-parent="#accordion"
                        href={"#collapse"+key}> <p style={{padding:10, backgroundColor:'#FAFAFA', borderRadius:2, borderColor:'black', fontSize:20, textAlign:'left' , boxShadow:'5px 5px 5px #888888'}}>
                            &nbsp;{storage.title}
                            <span style={{fontSize:12, padding:5, color:'#069fba' }} className='pull-right'>Created By: {storage.createdBy}</span>
                            </p>
                          </a>
                    </h4>
                  </div>
                  <div id={"collapse"+key} className="panel-collapse collapse">
                  <div className="panel-body" style={{margin:5}}>
                    <p style={{textAlign:'left', fontSize:16, fontWeight:'600'}}>Description</p>
                    <p style={{textAlign:'left'}}>{storage.description}</p>
                      <p style={{textAlign:'left', fontSize:16, fontWeight:'600'}}>Location: {storage.location}</p>
                    <div>
                      <div className='row'>
                        <span style={{marginTop:20,}} className='pull-left'>{moment(storage.createdAt).format('L')}</span>
                        <span style={{marginTop:20,}} className='pull-right'>{moment(storage.createdAt).format('LT')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
        </div>
        )}
      </div>
    </div>
      <div id="menu1" className="tab-pane fade">
        <div className="row" style={{marginTop:20}}>
                <div className="col-md-12">
                <div className='row' style={{marginTop:40}}>
                  <div className='col-sm-4'>
                    <label htmlFor="Title">Name</label>
                  </div>
                  <div className='col-sm-8'>
                    <input type="text" placeholder='Name'  className="form-control"  name='title' value={this.state.title} onChange={this.handleChange} />
                  </div>
                </div>

                <div className='row' style={{marginTop:40}}>
                  <div className='col-sm-4'>
                    <label htmlFor="description">Description</label>
                  </div>
                  <div className='col-sm-8'>
                    <textarea rows='5' placeholder='Description' className='form-control' name='description' value={this.state.description} onChange={this.handleChange} />
                  </div>
                </div>
                <div className='row' style={{marginTop:40}}>
                  <div className='col-sm-4'>
                    <label htmlFor="Title">Location</label>
                  </div>
                  <div className='col-sm-8'>
                    <input type="text" placeholder='Location'  className="form-control"  name='location' value={this.state.location} onChange={this.handleChange} />
                  </div>
                </div>
                <div className='row' style={{marginTop:20}}>
                  <div className='col-sm-4'></div>
                  <div className='col-sm-8'>
                    {this.state.saved && <p className='lead' style={{padding:10, backgroundColor:'#069fba', fontSize:20, borderRadius:10, color:'white'}}>Storage has been created</p>}
                  </div>
                </div>
            <div className='col-sm-12'>
              <p style={{color:'red'}}>{this.state.error}</p>
              {this.state.loading ?   <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
                  Saving...
                </button> :   <button onClick={()=>this.saveStorage()} className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
                    Add
                  </button>}

            </div>
                </div>
      </div>
    </div>
  </div>
        </div>
        <div style={{"position": "fixed", "zIndex": 1000, "bottom": "5%", "left": "5%"}} className='pull-left'>
          <Link to='/admin'><button style={{color:'white', fontSize:18, borderRadius:10, backgroundColor:'#069fba', padding:5, margin:10}}>Back</button></Link>
        </div>
    </div>
    )
  }
  render() {
    return this.showPage()
  }
}
