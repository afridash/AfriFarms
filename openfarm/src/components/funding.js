import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Panel} from "react-bootstrap"
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import { Editor } from 'react-draft-wysiwyg'
import moment from 'moment'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertFromRaw } from 'draft-js'
import '../App.css';

export default class Funding extends Component {
  constructor (props) {
    super(props)
    this.state = {
      funds:[],
      loading:true
    }
    this.funds = []
    this.fundsRef = firebase.database().ref().child('funds')
    this.myFunds = firebase.database().ref().child('user_funds')
    firebase.auth().onAuthStateChanged(this.handleUser)
  }
  handleUser = (user) => {
    if (user) {
      this.setState({loggedin:true, userId:user.uid})
    }
  }
  addToList (fund) {
    var item = this.myFunds.child(this.state.userId).push()
    item.setWithPriority(fund, 0-Date.now())
    alert('Added to list')
  }
  componentWillMount () {
    this.fundsRef.once('value', (funds)=> {
      if (!funds.exists()) this.setState({loading:false, noResult:true})
      funds.forEach((fund)=>{
        this.funds.push({
          title:fund.val().title,
          post:fund.val().post,
          key:fund.key,
          apply:fund.val().questions ? true : false,
        })
        this.setState({funds:this.funds, noResult:false, loading:false})
      })
    })
  }
  showPage() {
    return (
      <div>
        {this.state.funds.map((fund)=>
          <div className='col-sm-10 col-sm-offset-1'>
            <Panel id="collapsible-panel-example-2">
              <Panel.Heading>
                <Panel.Title toggle style={{textAlign:'left'}}>
                  {fund.title}<span className='pull-right'>{this.state.loggedin && fund.apply && <Link to ={'/funding/'+fund.key}>Apply</Link>}</span>
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
                  {this.state.loggedin &&   <Link onClick={()=>this.addToList(fund)} to='#' style={{textDecoration:'none'}}>
                      <span className='pull-right'>
                        <img src={require('../images/plus.png')} style={{height:15, width:15}} />
                      </span>
                    </Link>}
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
          </div>
        )}

      </div>
    )
  }
  render() {
    return (
      <div className="col-sm-10 col-sm-offset-1" >
        <div className="row">
          <h3 className="pull-left" style={{fontSize:40, fontWeight:'600', marginBottom:'3%'}}>Funding</h3>
          {!this.state.loggedin && <i>Login to apply or add funds to your list</i>}
        </div>
        {(()=>{
          if (this.state.loading){
            return <p style={{margin:20, fontWeight:'600'}}>Loading...</p>
          }else if (this.state.noResult) {
            return <p style={{margin:20, fontWeight:'600'}}> No Funds Available Yet</p>
          }else return this.showPage()
        })()}
      </div>
    )
  }

}
