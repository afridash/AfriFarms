import React, { Component } from 'react';
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import '../App.css';

export default class Storage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title:'',
      description:'',
      location:''
    }
    this.ref = firebase.database().ref().child('storages')
    firebase.auth().onAuthStateChanged(this.handleUser)
  }
  handleUser = (user) => {
    if (user) {
      this.setState({displayName:user.displayName, userId:user.uid, profilePicture:user.photoURL})
    }
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
      this.setState({error:'', title:'', location:'', description:'', loading:false})
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
        <div className='col-sm-12'>
            <div className='col-sm-12' style={{marginTop:20,}}>
              <p style={{borderRadius:2, borderColor:'black', backgroundColor:'lightgrey', fontSize:25, textAlign:'left' , boxShadow:'5px 5px 5px #888888'}}>
                &nbsp;State Storage Warehouse
                </p>
            </div>
        </div>
      </div>
      </div>
      <div id="menu1" className="tab-pane fade">
        <div className="row" style={{marginTop:20}}>
                <div className="col-md-12">
                <div className='row' style={{marginTop:40}}>
                  <div className='col-sm-4'>
                    <label htmlFor="Title">Title</label>
                  </div>
                  <div className='col-sm-8'>
                    <input type="text"  className="form-control"  name='title' value={this.state.title} onChange={this.handleChange} />
                  </div>
                </div>

                <div className='row' style={{marginTop:40}}>
                  <div className='col-sm-4'>
                    <label htmlFor="description">Description</label>
                  </div>
                  <div className='col-sm-8'>
                    <textarea placeholder='Description' className='form-control' name='description' value={this.state.description} onChange={this.handleChange} />
                  </div>
                </div>
                <div className='row' style={{marginTop:40}}>
                  <div className='col-sm-4'>
                    <label htmlFor="Title">Location</label>
                  </div>
                  <div className='col-sm-8'>
                    <input type="text"  className="form-control"  name='location' value={this.state.location} onChange={this.handleChange} />
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
      </div>
    )
  }
  render() {
    return this.showPage()
  }
}
