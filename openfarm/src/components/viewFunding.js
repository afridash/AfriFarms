import React, { Component } from 'react';
import DashboardHeader from './dashboardHeader'
import { Panel} from "react-bootstrap"
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import { Editor } from 'react-draft-wysiwyg'
import moment from 'moment'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertFromRaw } from 'draft-js'
import '../App.css';

export default class ViewFunding extends Component {
  constructor (props) {
    super(props)
    this.state = {
      funds:[],
      items:[],
      loading:true,
    }
    this.ref = firebase.database().ref().child('user_funds')
    this.completedRef = firebase.database().ref().child('completed_applications')
    firebase.auth().onAuthStateChanged(this.handleUser)
    this.funds = []
    this.items = []
  }
  handleUser = (user) => {
    if (user) {
      this.getFunds(user.uid)
    }
  }
  getFunds (userId) {
    this.ref.child(userId).once('value', (funds)=> {
      if (!funds.exists()) this.setState({loading:false, noResult:true})
      funds.forEach((fund)=> {
        this.funds.push({
          title:fund.val().title,
          post:fund.val().post,
          key:fund.val().key
        })
        this.setState({funds:this.funds, loading:false, noResult:false})
      })
    })

    this.completedRef.child(userId).once('value', (funds)=> {
      if (!funds.exists()) this.setState({loading:false, noCompleted:true})
      funds.forEach((f)=> {
        this.items.push({
          title:f.val().title,
          post:f.val().post,
          key:f.val().key
        })
        this.setState({items:this.items, loading:false, noCompleted:false})
      })
    })
  }
  showPageContent () {
    return (
      <div className='col-sm-12'>
        {this.state.funds.map((fund)=>
          <div className='col-sm-10 col-sm-offset-1'>
            <Panel id="collapsible-panel-example-2">
              <Panel.Heading>
                <Panel.Title toggle style={{textAlign:'left'}}>
                  {fund.title}
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  <Editor
                    editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(fund.post)))}
                    toolbarHidden={true}
                    toolbarClassName="hide-toolbar"
                    readOnly
                  />
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
          </div>
        )}
    </div>
  )
  }
  showPageCompleted () {
    return (
      <div className='col-sm-12'>
        {this.state.items.map((fund)=>
          <div className='col-sm-10 col-sm-offset-1'>
            <Panel id="collapsible-panel-example-2">
              <Panel.Heading>
                <Panel.Title toggle style={{textAlign:'left'}}>
                  {fund.title}
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  <Editor
                    editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(fund.post)))}
                    toolbarHidden={true}
                    toolbarClassName="hide-toolbar"
                    readOnly
                  />
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
          </div>
        )}
    </div>
  )
  }
  showPage () {
    return (
      <div className="App">
        <div className='col-sm-12'>
          <ul className="nav nav-tabs">
            <li className="active"><a data-toggle="tab" href="#home">Saved Funds</a></li>
            <li><a data-toggle="tab" href="#menu1">Submitted Applications</a></li>
          </ul>
          <div className="tab-content">
            <div id="home" className="tab-pane fade in active">
              <div className='row' style={{marginTop:30}}>
                {(()=>{
                  if (this.state.loading){
                    return <p style={{margin:20, fontWeight:'600'}}>Loading...</p>
                  }else if (this.state.noResult) {
                    return <p style={{margin:20, fontWeight:'600'}}> No Funds Available Yet</p>
                  }else return this.showPageContent()
                })()}
              </div>
            </div>
            <div id="menu1" className="tab-pane fade">
              <div className='row' style={{marginTop:30}}>
                {this.showPageCompleted()}
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
  render() {
    return (
      <DashboardHeader children={this.showPage()} />
    );
  }
}
