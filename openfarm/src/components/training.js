import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import moment from 'moment'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertFromRaw } from 'draft-js'
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import '../App.css';

export default class Training extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url:'',
      title:'',
      editorState: EditorState.createEmpty(),
      videos:[],
      articles:[],
    }
    this.videos = []
    this.articles = []
    this.onChange = (editorState) => this.setState({editorState})
    this.ref = firebase.database().ref().child('trainings')
    firebase.auth().onAuthStateChanged(this.handleUser)
  }
  onContentStateChange = (content) => {
    var json = JSON.stringify(content)
    this.setState({article:json})
  }
  handleChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }
  componentWillMount () {
    this.ref.on('child_added', (post)=> {
      if (post.val().type === 'article') {
        this.articles.push({title:post.val().title, article:post.val().article, createdAt:post.val().createdAt, createdBy:post.val().createdBy})
        this.setState({articles:this.articles})
      }else if (post.val().type === 'video') {
        this.videos.push({title:post.val().title, url:post.val().url, createdBy:post.val().createdBy})
        this.setState({videos:this.videos})
      }
    })
  }
  handleUser = (user) => {
    if (user) {
      this.setState({displayName:user.displayName, userId:user.uid, profilePicture:user.photoURL})
    }
  }
  uploadCallback = async (file) => {
   let uploadedImages = this.state.uploadedImages;

   const sessionId = new Date().getTime()
   var ref = firebase.storage().ref().child('training').child(`${sessionId}`)
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
  showArticle () {
    return (
      <div>
        <div className='row' style={{marginTop:20}}>
          <div className='col-sm-4'>
            <label htmlFor="Title">Title</label>
          </div>
          <div className='col-sm-8'>
            <input type="text"  className="form-control" placeholder='title' name='title' value={this.state.title} onChange={this.handleChange} />
          </div>
        </div>
        <div className='row' style={{marginTop:40}}>
          <div className='col-sm-4'>
            <label htmlFor="content">Content</label>
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
        <div className='row' style={{marginTop:20}}>
          <div className='col-sm-4'></div>
          <div className='col-sm-8'>
            {this.state.saved && <p className='lead' style={{padding:10, backgroundColor:'#069fba', fontSize:20, borderRadius:10, color:'white'}}>Article has been added</p>}
          </div>
        </div>
        <div className='col-md-12' style={{margin:20}}>
            <p style={{color:'red'}}>{this.state.error}</p>
            {this.state.loading ? <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
              Saving...
            </button>:
            <button onClick={()=>this.saveArticle()} className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
              Create
            </button>}

        </div>
      </div>

    )
  }
  saveVideo () {
    this.setState({loading:true})
    if (this.authenticateDataVideo()) {
      var data = {
        url:this.state.url,
        type:this.state.articleType,
        title:this.state.title,
        createdAt:firebase.database.ServerValue.TIMESTAMP,
        createdBy:this.state.displayName,
        userId:this.state.userId,
        profilePicture:this.state.profilePicture,
      }
      var item = this.ref.push()
      item.setWithPriority(data, 0 - Date.now())
      this.setState({loading:false, saved:true, title:'', url:'', error:''})
    }else{
      this.setState({error:'URL and title must be filled', loading:false})
    }
  }
  saveArticle () {
    this.setState({loading:true})
    if (this.authenticateDataArticle()) {
      var data = {
        article:this.state.article,
        type:this.state.articleType,
        title:this.state.title,
        createdAt:firebase.database.ServerValue.TIMESTAMP,
        createdBy:this.state.displayName,
        userId:this.state.userId,
        profilePicture:this.state.profilePicture,
      }
      var item = this.ref.push()
      item.setWithPriority(data, 0 - Date.now())
      this.setState({loading:false, saved:true, title:'', url:'', editorState:EditorState.createEmpty(), error:''})
    }else{
      this.setState({error:'Title, and article cannot be empty', loading:false})
    }
  }
  authenticateDataVideo () {
    return this.state.title !== '' && this.state.url !== ''
  }
  authenticateDataArticle () {
    return this.state.title !== '' && this.state.article !== ''
  }
  showVideo () {
    return (
      <div>
        <div className='row' style={{marginTop:40}}>
          <div className='col-sm-4'>
            <label htmlFor="Title">Video Title</label>
          </div>
          <div className='col-sm-8'>
            <input type="text" name='title' value={this.state.title} onChange={this.handleChange} className="form-control" placeholder="Video Title"  />
          </div>
        </div>
        <div className='row' style={{marginTop:40}}>
          <div className='col-sm-4'>
            <label htmlFor="Title">Video URL</label>
          </div>
          <div className='col-sm-8'>
            <input onChange={this.handleChange} value={this.state.url} name='url' type="text"  className="form-control" placeholder='URL'   />
          </div>
        </div>
        <div className='row' style={{marginTop:20}}>
          <div className='col-sm-4'></div>
          <div className='col-sm-8'>
            {this.state.saved && <p className='lead' style={{padding:10, backgroundColor:'#069fba', fontSize:20, borderRadius:10, color:'white'}}>Video has been added</p>}
          </div>
        </div>
        <div className='col-sm-12' style={{margin:20}}>
          <p style={{color:'red'}}>{this.state.error}</p>
           {this.state.loading ? <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
             Saving...
           </button> :
           <button onClick={()=>this.saveVideo()} className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
             Create
           </button> }

        </div>
      </div>
    )
  }
  showPage () {
    return (
      <div className="App">
        <div className='col-sm-8 col-sm-offset-2'>
          <ul className="nav nav-tabs">
      <li className="active"><a data-toggle="tab" href="#home">Article</a></li>
      <li><a data-toggle="tab" href="#menu2">Video</a></li>
    </ul>

    <div className="tab-content">
      <div id="home" className="tab-pane fade in active">
      <div className='row'>
        <div className='col-sm-12'>
          {this.state.articles.length === 0 && <p className='text-center lead'>Loading ...</p>}
          {this.state.articles.map((article, key)=>
            <div className='col-sm-12'>
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
                              &nbsp;{article.title}
                              <span style={{fontSize:12, padding:5, color:'#069fba' }} className='pull-right'>Created By: {article.createdBy}</span>
                              </p>
                            </a>
                      </h4>
                    </div>
                    <div id={"collapse"+key} className="panel-collapse collapse">
                    <div className="panel-body" style={{margin:5}}>
                      <Editor
                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(article.article)))}
                        toolbarHidden={true}
                        toolbarClassName="hide-toolbar"
                        readOnly
                      />
                      <div>

                        <div className='row'>
                          <span style={{marginTop:20,}} className='pull-left'>{moment(article.createdAt).format('L')}</span>
                          <span style={{marginTop:20,}} className='pull-right'>{moment(article.createdAt).format('LT')}</span>
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
      
      <div id="menu2" className="tab-pane fade">
        <div className="row" style={{marginTop:20}}>
          {this.state.videos.map((video, key)=>
            <div key={key} className='col-sm-4'>
              <iframe width="320" height="245" src={video.url}></iframe>
              <p style={{fontSize:14, fontWeight:'600'}}>{video.title} created by {video.createdBy}</p>
            </div>
          )}
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
