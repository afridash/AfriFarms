import React, { Component } from 'react';
import {Firebase} from '../helpers/firebase'
import logo from '../logo.svg';
import { Editor } from 'react-draft-wysiwyg'
import moment from 'moment'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertFromRaw } from 'draft-js'
import '../App.css';
const firebase = require('firebase')

export default class GeneralNews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news:[],
      post:EditorState.createEmpty()
    }
    this.news = []
    this.newsroomRef = firebase.database().ref().child('newsroom')
    this.retrieveNews()
  }
  retrieveNews (){
    this.news = []
    this.newsroomRef.once('value', (snapshots) => {
      if(!snapshots.exists())this.setState({noNews: true, loading: false})
      snapshots.forEach((snapshot)=>{
        this.news.push({key:snapshot.key, title:snapshot.val().title, post:snapshot.val().post,
          thumbnail:snapshot.val().thumbnail, createdAt:snapshot.val().createdAt})
        this.setState({news:this.news, loading:false})
      })
    })
  }
  setDetails(news) {
    this.setState({
      title:news.title,
      post:news.post,
      showModal:true,
    })
  }
  render() {
    return (
      <div className="App">
        <div className="row" style={{marginTop:20}}>
        {this.state.news.map((news, key)=>
          <div key={key} onClick={()=>this.setDetails(news)} className='col-sm-3'>
            <p style={{fontSize:18, fontWeight:'600'}} data-toggle="modal" data-target="#myModal">{news.title}</p>
            <img src={news.thumbnail} className='img-responsive' style={{width:320, height:245, marginLeft:30}} data-toggle="modal" data-target="#myModal"  />
          </div>
      )}
        </div>
      <div className='row'>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">{this.state.title}</h4>
              </div>
              <div className="modal-body">
                {this.state.showModal &&
                  <Editor
                    editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.post)))}
                    toolbarHidden={true}
                    toolbarClassName="hide-toolbar"
                    readOnly
                  />
                }
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <span className="pull-left">Created on: {moment(this.state.createdAt).format('MMMM Do YYYY')}</span>
                </div>
              </div>

            </div>
          </div>
      </div>

      <div className='row' style={{marginTop:20}}>
        <a href="#" className="previous" style={{backgroundColor:'lightgrey', border:'2px solid lightgrey', borderRadius:2, fontSize:20}}>&laquo; Previous</a>
        <a href="#" className="previous" style={{backgroundColor:'#069fba', color:'white', border:'2px solid #069fba', borderRadius:2, fontSize:20}}> 1 &nbsp;</a>
        <a href="#" className="next" style={{backgroundColor:'lightgrey', border:'2px solid lightgrey', borderRadius:2, fontSize:20}}>Next &raquo;</a>
      </div>
      </div>
    );
  }
}
