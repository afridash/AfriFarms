import React, { Component } from 'react';
import moment from 'moment'
import DashboardHeader from './dashboardHeader'
import * as firebase from 'firebase'
import {Link} from 'react-router-dom'
import {Firebase} from '../helpers/firebase'
import '../App.css';

export default class Storage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title:'',
      description:'',
      location:'',
      storages:[]
    }
    this.storages = []
    this.ref = firebase.database().ref().child('storages')
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
    </div>
    )
  }
  render() {
    return (
      <div className="App">
        <DashboardHeader children={this.showPage()} />
      </div>
    );
  }
}
