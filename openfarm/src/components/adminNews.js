import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg'
import moment from 'moment'
import FileReaderInput from 'react-file-reader-input'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertFromRaw } from 'draft-js'
import {Link} from 'react-router-dom'
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import '../App.css';

export default class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadedImages:[],
      editorState: EditorState.createEmpty(),
      news:[],
    }
    this.news = []
    firebase.auth().onAuthStateChanged(this.handleUser)
    this.ref = firebase.database().ref().child('newsroom')
    this.onChange = (editorState) => this.setState({editorState})
  }
  handleUser = (user) => {
    if (user) {
      this.setState({displayName:user.displayName, userId:user.uid, profilePicture:user.photoURL})
    }
  }
  componentWillMount () {
    this.ref.on('child_added', (news)=> {
      this.news.push({
        title:news.val().title,
        post:news.val().post,
        createdBy:news.val().createdBy,
        createdAt:news.val().createdAt
      })
      this.setState({news:this.news})
    })
  }
  onContentStateChange = (content) => {
    var json = JSON.stringify(content)
    this.setState({post:json})
  }
  handleFile = (e, results) => {
    results.forEach(result => {
      const [e, file] = result; //Retrieve the picture that was selected
      this.setState({attachment:e.target.result,mime:file.type, fileName:file.name}) //Store the picture as a state variable before trying to save
    });
  }
  saveNews () {
    this.setState({loading:true})
    if (this.authenticateData()) {
      const sessionId = new Date().getTime()
      var ref=firebase.storage().ref().child('newsroom').child(`${sessionId}`)
      ref.putString(this.state.attachment, 'data_url').then((task)=>{
        var data = {
          post: this.state.post,
          createdAt:firebase.database.ServerValue.TIMESTAMP,
          createdBy:this.state.displayName,
          userId:this.state.userId,
          profilePicture:this.state.profilePicture,
          title:this.state.title,
          thumbnail:task.downloadURL
        }
        var item = this.ref.push()
        item.setWithPriority(data,0 - Date.now())
        this.setState({editorState:EditorState.createEmpty(), title:'', fileName:'', loading:false, saved:true})
      }).catch((e)=> {
        this.setState({error:'Unable to upload thumbnail', loading:false, saved:false})
      }) //Save the picture

    }else {
      this.setState({error:'All fields must be filled. Thumbnail must be selected', loading:false, saved:false})
    }
  }
  authenticateData () {
    return this.state.post !=='' && this.state.title !=='' && this.state.fileName !== undefined
  }
  handleChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }
  uploadCallback = async (file) => {
   let uploadedImages = this.state.uploadedImages;

   const sessionId = new Date().getTime()
   var ref = firebase.storage().ref().child('newsroom').child(`${sessionId}`)
   let imageObject = {}
   await ref.put(file).then((snapshot)=> {
     imageObject = {
       file:file,
       localSrc:snapshot.downloadURL
     }
   })
    uploadedImages.push(imageObject)

    this.setState({uploadedImages})
    return new Promise(
      (resolve, reject) => {
        resolve({ data: { link: imageObject.localSrc } })
      }
    );
  }
  toggleIcon (news, key) {
    var item = this.state.news[key]
    item.opened = !news.opened
    var clone = this.state.news
    clone[key] = item
    this.setState({news:clone})
  }
  showPage () {
    return (
      <div className="App">
        <div className='col-sm-8 col-sm-offset-2'>
          <ul className="nav nav-tabs">
            <li className="active"><a data-toggle="tab" href="#home">News</a></li>
            <li><a data-toggle="tab" href="#menu1">New Post</a></li>
          </ul>
      <div className="tab-content">
        <div id="home" className="tab-pane fade in active">
          <div className='row'>
            {this.state.news.length === 0 && <p className='text-center lead'>Loading ...</p>}
            {this.state.news.map((news, key)=>
              <div className='col-sm-12'>
                <div>
                  <div className="col-sm-12 col-md-12">
                    <div className="panel panel-grey" >
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a onClick={()=>this.toggleIcon(news, key)}
                            data-toggle="collapse"
                            style={{textDecoration:'none'}}
                            data-parent="#accordion"
                            href={"#collapse"+key}> <p style={{padding:10, backgroundColor:'#FAFAFA', borderRadius:2, borderColor:'black', fontSize:20, textAlign:'left' , boxShadow:'5px 5px 5px #888888'}}>
                                &nbsp;{news.title}
                                <span style={{fontSize:12, padding:5, color:'#069fba' }} className='pull-right'>Created By: {news.createdBy}</span>
                                </p>
                              </a>
                        </h4>
                      </div>
                      <div id={"collapse"+key} className="panel-collapse collapse">
                      <div className="panel-body" style={{margin:5}}>
                        <Editor
                          editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(news.post)))}
                          toolbarHidden={true}
                          toolbarClassName="hide-toolbar"
                          readOnly
                        />
                        <div>

                          <div className='row'>
                            <span style={{marginTop:20,}} className='pull-left'>{moment(news.createdAt).format('L')}</span>
                            <span style={{marginTop:20,}} className='pull-right'>{moment(news.createdAt).format('LT')}</span>
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
                  <label htmlFor="Title">Title</label>
                </div>
                <div className='col-sm-8'>
                  <input type="text" name='title' value={this.state.title} onChange={this.handleChange}  className="form-control" />
                </div>
              </div>
              <div className='row' style={{marginTop:40}}>
                <div className='col-sm-4'>
                  <label htmlFor="description">Description</label>
                </div>
                <div className='col-sm-8'>
                  <Editor
                     editorState={this.state.editorState}
                     toolbarStyle={{backgroundColor:'white', borderWidth:1, borderColor:'lightgrey'}}
                     placeholder='Write Article'
                     editorStyle={{backgroundColor:'white', height:200, border:'1px solid lightgrey', padding:5}}
                     onEditorStateChange={this.onChange}
                     onContentStateChange={this.onContentStateChange}
                     toolbar={{
                       image: {uploadCallback: this.uploadCallback,
                              defaultSize: {
                              height: '60%',
                              width: '60%',
                              }
                            },
                     }}
                   />
                </div>
              </div>
              <div className='row' style={{marginTop:40}}>
                <div className='col-sm-4'>
                  <label htmlFor="Title">Thumbnail</label>
                </div>
                <div className='col-sm-8'>
                  <FileReaderInput as="url" id="my-file-input"
                    onChange={this.handleFile}>
                    <button className='btn btn-primary' style={{backgroundColor:'#069fba', fontSize:16, color:'white', borderColor:'transparent',}}>Select</button>
                    <span>{this.state.fileName}</span>
                  </FileReaderInput>
                </div>
              </div>
              <div className='row' style={{marginTop:20}}>
                <div className='col-sm-4'></div>
                <div className='col-sm-8'>
                  {this.state.saved && <p className='lead' style={{padding:10, backgroundColor:'#069fba', fontSize:20, borderRadius:10, color:'white'}}>News has been created</p>}
                </div>
              </div>
            <div className='row text-center' style={{margin:20}}>
              <p style={{color:'red'}}>{this.state.error}</p>
              {this.state.loading ? <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>Saving...
              </button> : <button onClick={()=>this.saveNews()} className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>Create
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
