import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import DashboardHeader from './dashboardHeader'
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import '../App.css';

export default class AdminView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users:[]
    }
    this.users = []
    this.fundId = this.props.match.params.id
    this.usersRef = firebase.database().ref().child('users')
    this.submitRef = firebase.database().ref().child('submitted_funds')
  }
  componentWillMount () {
    this.submitRef.child(this.fundId).once('value', (users)=> {
      users.forEach((user)=> {
        this.getUserInfo(user.key)
        this.setState({[user.key]: user.val()})
      })
    })
  }
  getUserInfo (userId) {
    this.usersRef.child(userId).child('displayName').once('value', (name)=> {
      this.users.push({key:userId, displayName:name.val()})
      this.setState({users:this.users})
    })
  }
  selectUser(userId) {
    this.questions = []
    this.state[userId].forEach((question)=>
      this.questions.push(question)
    )
    this.setState({currentUser:userId, showQuestions:true, questions:this.questions})
  }
  showPage() {
    return (
      <div className="App">
        <div className='row'>
          <div className='col-sm-3'>
            <div className='row'>
              <div className='col-sm-10 col-sm-offset-1' style={{backgroundColor:'#00abc9'}}>
                <p style={{fontSize:25, marginTop:'1%',color:'white'}}>All Funds</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-10 col-sm-offset-1' style={{ border:'1px solid lightgrey'}}>
                <div className='row' style={{fontSize:15, margin:'2%'}}>
                  <div className='col-sm-12' style={{textAlign:'left'}}>
                      <div className='row'>
                        {this.state.users.map((user)=>
                        <p style={{padding:10, cursor:'pointer'}} onClick={()=>this.selectUser(user.key)}>{user.displayName}</p>
                      )}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-9'>
            <div className='row'>
              <div className='col-sm-10 col-sm-offset-1'>
                <div className='row' style={{fontSize:20, margin:'2%'}}>
                  {this.state.showQuestions &&
                  <div className='col-sm-12' style={{textAlign:'left'}}>
                    {this.state.questions.map((question)=>
                      <div className='row'>
                        <div className='panel panel-default'>
                          <div className='panel-body'>
                            <p>Question: {question.question}</p>
                            <p>Answer: {question.answer}</p>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>}

                </div>
              </div>
            </div>
          </div>
          <div style={{"position": "fixed", "zIndex": 1000, "bottom": "5%", "left": "5%"}} className='pull-left'>
            <Link to='/admin/funding'><button style={{color:'white', fontSize:18, borderRadius:10, backgroundColor:'#069fba', padding:5, margin:10}}>Back</button></Link>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="App">
        {this.showPage()}
      </div>
    );
  }
}
