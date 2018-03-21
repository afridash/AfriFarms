import React, { Component } from 'react';
import FileReaderInput from 'react-file-reader-input'
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import '../App.css';

export default class Sell extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title:'',
      attachment:'',
      description:'',
      items:[],
      loading:true,
    }
    this.ref = firebase.database().ref().child('store_items')
    this.myRef = firebase.database().ref().child('user_items')
    this.usersRef = firebase.database().ref().child('users')
    firebase.auth().onAuthStateChanged(this.handleUser)
    this.items = []
  }
  handleChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }
  handleUser = (user) => {
    if (user) {
      this.setState({userId:user.uid, displayName:user.displayName, photoURL:user.photoURL})
      this.getItems(user.uid)
    }
  }
  getItems (userId) {
    this.myRef.child(userId).once('value', (items)=> {
      if (!items.exists()) this.setState({loading:false, noResult:true})
      items.forEach((item)=> {
        this.ref.child(item.val()).once('value', (it)=> {
          this.items.push({
            thumbnail:it.val().thumbnail,
            title:it.val().title,
            description:it.val().description
          })
          this.setState({items:this.items, loading:false, noResult:false})
        })
      })
    })
  }
  saveItem () {
    this.setState({loading:true})
    if (this.authenticateData()) {
      const sessionId = new Date().getTime()
      var ref=firebase.storage().ref().child('store_items').child(`${sessionId}`)
      ref.putString(this.state.attachment, 'data_url').then((task)=>{
        var data = {
          title:this.state.title,
          description:this.state.description,
          thumbnail:task.downloadURL,
          photoURL:this.state.photoURL,
          displayName:this.state.displayName,
          userId:this.state.userId,
          createdAt:firebase.database.ServerValue.TIMESTAMP
        }
        this.items.push(data)
        this.setState({items:this.items})
        var item = this.ref.push()
        var key = item.key
        item.setWithPriority(data, 0 - Date.now())
        item = this.myRef.child(this.state.userId).push()
        item.setWithPriority(key, 0 - Date.now())
        this.usersRef.child(this.state.userId).child('items').once('value', (items)=> {
          if (!items.exists()) items.ref.set(1)
          else items.ref.set(items.val() + 1)
        })
        this.setState({title:'', description:'', fileName:undefined, loading:false,error:'', saved:true, attachment:''})
      }).catch((error)=> {
        this.setState({error:'Failed to upload attachment', loading:false})
      })

    }else {
      this.setState({error:'Fields must be filled', loading:false})
    }
  }
  authenticateData () {
    return this.state.title !=='' && this.state.description !== '' && this.state.fileName !== undefined
  }
  handleFile = (e, results) => {
    results.forEach(result => {
      const [e, file] = result; //Retrieve the picture that was selected
      this.setState({attachment:e.target.result,mime:file.type, fileName:file.name}) //Store the picture as a state variable before trying to save
    });
  }
  showItems () {
    return (
      <div className='row'>
        {this.state.items.map((item)=>
          <div className='col-sm-3 text-center' style={{padding:20}}>
            <div className='panel text-center' style={{boxShadow: '5px 5px 5px #888888',}}>
              <img src={item.thumbnail} className='img-responsive text-center' style={{width:230, height:205,}} />
              <p style={{fontSize:20, fontWeight:'700'}}>{item.title}</p>
            </div>
          </div>
        )}
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <div className='col-sm-8 col-sm-offset-2'>
          <ul className="nav nav-tabs">
            <li className="active"><a data-toggle="tab" href="#home">Store Items</a></li>
            <li><a data-toggle="tab" href="#menu1">Add Store Item</a></li>
          </ul>
          <div className="tab-content">
            <div id="home" className="tab-pane fade in active">
              {(()=>{
                if (this.state.loading){
                  return <p style={{margin:20, fontWeight:'600'}}>Loading...</p>
                }else if (this.state.noResult) {
                  return <p style={{margin:20, fontWeight:'600'}}> No Items</p>
                }else return this.showItems()
              })()}
            </div>
            <div id="menu1" className="tab-pane fade">
              <div className="row" style={{marginTop:20}}>
                <div className="col-md-12">
                  <div className='row' style={{marginTop:40}}>
                      <div className='col-sm-12'>
                        <div className='col-sm-4' >
                          <label htmlFor="Title">Name</label>
                        </div>
                        <div className='col-sm-8'>
                          <input type="text" placeholder='Enter Item Name' name='title' value={this.state.title} onChange={this.handleChange}  className="form-control" />
                        </div>
                      </div>
                  </div>
                  <div className='row' style={{marginTop:20}}>
                      <div className='col-sm-4'>
                        <label htmlFor="description">Description</label>
                      </div>
                      <div className='col-sm-8'>
                        <textarea onChange={this.handleChange} value={this.state.description} name='description' placeholder='Item Description'  className='form-control' rows="8" />
                      </div>
                    </div>
                  {this.state.attachment !== '' &&
                  <div className='row' style={{marginTop:20}}>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-8'>
                      <div className='col-sm-12'>
                        <div className='col-sm-4'>
                          <label htmlFor="Thumb">Uploaded</label>
                        </div>
                        <div className='col-sm-8'>
                          <img src={this.state.attachment} style={{width:200, height:200}} className='img-responsive img-thumbnail' />
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-2'></div>
                  </div>
                }
                  <div className='row' style={{marginTop:20}}>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-8'>
                      <div className='col-sm-12'>
                        <div className='col-sm-4'>
                          <label htmlFor="Thumb">Thumbnail</label>
                        </div>
                        <div className='col-sm-8'>
                          <FileReaderInput as="url" id="my-file-input"
                            onChange={this.handleFile}>
                            <button className='btn btn-primary' style={{backgroundColor:'#069fba', fontSize:16, color:'white', borderColor:'transparent',}}>Select</button>
                            <span>{this.state.fileName}</span>
                          </FileReaderInput>
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-2'></div>
                  </div>
                  <div className='row' style={{marginTop:20}}>
                    <div className='col-sm-4'></div>
                    <div className='col-sm-8'>
                      {this.state.saved && <p className='lead' style={{padding:10, backgroundColor:'#069fba', fontSize:20, borderRadius:10, color:'white'}}>Item was successfully listed</p>}
                    </div>
                  </div>
                <div className='row text-center' style={{margin:20}}>
                  <p style={{color:'red'}}>{this.state.error}</p>
                  {this.state.loading ? <button  className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>Saving...</button> :
                  <button onClick={()=>this.saveItem()}  className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>Create</button> }
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
