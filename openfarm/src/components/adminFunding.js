import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertFromRaw } from 'draft-js'
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import logo from '../logo.svg';
import '../App.css';

export default class Funding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      questions:[],
      post:'',
      title:'',
      funds:[]
    }
    this.onChange = (editorState) => this.setState({editorState})
    this.questions = []
    this.funds = []
    this.ref = firebase.database().ref().child('funds')
    firebase.auth().onAuthStateChanged(this.handleUser)
  }
  componentWillMount () {
    this.ref.on('child_added', (fund)=> {
      this.funds.push({
        title:fund.val().title,
        applicants:fund.val().applicants
      })
      this.setState({funds:this.funds})
    })
  }
  handleUser = (user) => {
    if (user) {
      this.setState({displayName:user.displayName, userId:user.uid, profilePicture:user.photoURL})
    }
  }
  onContentStateChange = (content) => {
    var json = JSON.stringify(content)
    this.setState({post:json})
  }
  handleChange = (event)=> {
    this.setState({[event.target.name] : event.target.value})
  }
  addQuestion () {
    this.questions.push(this.state.question)
    this.setState({questions:this.questions, question:''})
  }
  uploadCallback = async (file) => {
   let uploadedImages = this.state.uploadedImages;

   const sessionId = new Date().getTime()
   var ref = firebase.storage().ref().child('funding').child(`${sessionId}`)
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
  remove (q, k) {
    this.questions = this.questions.filter((question, i) =>  i !== k)
    this.setState({questions:this.questions})
  }
  saveFunding () {
    if (this.authenticateData()) {
      var data = {
        post:this.state.post,
        title:this.state.title,
        fundType:this.state.fundType,
        createdAt:firebase.database.ServerValue.TIMESTAMP,
        createdBy:this.state.displayName,
        userId:this.state.userId,
        profilePicture:this.state.profilePicture,
        questions:this.state.questions,
        applicants:0,
      }
      var item = this.ref.push()
      item.setWithPriority(data, 0 - Date.now())
      this.setState({loading:false, saved:true, title:'', editorState:EditorState.createEmpty(), fundType:'', questions:[]})
    }else{
      this.setState({error:'Fields cannot be empty'})
    }
  }
  authenticateData () {
    return this.state.post !== '' && this.state.fundType !== undefined && this.state.title !== ''
  }
  showPage() {
    return (
      <div className='col-sm-8 col-sm-offset-2'>
        <ul className="nav nav-tabs">
          <li className="active"><a data-toggle="tab" href="#home">All Funding</a></li>
          <li><a data-toggle="tab" href="#menu1">Create New Funding</a></li>
        </ul>
        <div className="tab-content">
          <div id="home" className="tab-pane fade in active">
            <div className='row'>
              <div className='col-sm-12'>
                {this.state.funds.length === 0 && <p className='text-center lead'>Loading ...</p>}
                {this.state.funds.map((fund)=>
                  <div className='col-sm-12' style={{marginTop:20,}}>
                    <Link style={{textDecoration:'none'}} to='/viewfunding'>
                    <p style={{borderRadius:2, borderColor:'black', backgroundColor:'#FAFAFA', fontSize:25, textAlign:'left' , boxShadow:'5px 5px 5px #888888'}}>
                      &nbsp;{fund.title}
                      <span  className='pull-right' style={{backgroundColor:'#00abc9', fontSize:25}}>&nbsp;&nbsp;{fund.applicants}&nbsp;&nbsp;</span></p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div id="menu1" className="tab-pane fade">
            <div className="row" style={{marginTop:20}}>
              <div className="col-md-12">
              <div className="form-group">
                <div className='col-sm-4'>
                  <label htmlFor="sel1">Funding Type</label>
                </div>
              <div className='col-sm-8'>
                <select value={this.state.fundType} onChange={this.handleChange}  className="form-control"  name="fundType">
                  <option value=''>Select Type</option>
                  <option value='grant'>Grant</option>
                  <option value='loan' >Loan</option>
                </select>
              </div>
              <br />
              </div>
              <div className="row" style={{marginTop:20}}>
                <div className='col-sm-4'>
                  <label htmlFor="sel1">Title</label>
                </div>
              <div className='col-sm-8'>
                <input type="text" name='title' value={this.state.title} onChange={this.handleChange}  className="form-control"  />
              </div>
              <br />
              </div>
              <div className='row' style={{marginTop:20}}>
                <div className='col-sm-4'>
                  <label htmlFor="description">Description</label>
                </div>
                <div className='col-sm-8'>
                  <Editor
                     editorState={this.state.editorState}
                     toolbarStyle={{backgroundColor:'white', borderWidth:1, borderColor:'lightgrey'}}
                     placeholder='Fund Description'
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
              <div className="col-md-12" style={{marginTop:40}}>
                <div className="col-sm-4">
                  <label htmlFor="questions">Questions</label>
                </div>
                <div className="col-sm-8">
                  {this.state.questions.map((q,k)=>
                  <p style={{padding:5, backgroundColor:'#069fba', fontSize:14, borderRadius:10, color:'white',}}>{q}
                  <Link onClick={()=>this.remove(q,k)} to='#'><span className='pull-right fa fa-times' ></span></Link></p>)}
                  <div className="form-group" >
                    <input type="text" name='question' value={this.state.question} onChange={this.handleChange}  className="form-control"  />
                    <span onClick={()=>this.addQuestion()} style={{cursor:'pointer', margin:5}} className='pull-left'>Add Question</span>
                  </div>
                </div>
              </div>
              <div className='row' style={{marginTop:20}}>
                <div className='col-sm-4'></div>
                <div className='col-sm-8'>
                  {this.state.saved && <p className='lead' style={{padding:10, backgroundColor:'#069fba', fontSize:20, borderRadius:10, color:'white'}}>Funding has been added</p>}
                </div>
              </div>
            <div className='col-md-12' style={{margin:20}}>
              <p style={{color:'red'}}>{this.state.error}</p>
              <button onClick={()=>this.saveFunding()} className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15}}>
                Submit
              </button>
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
