import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import '../App.css';

export default class FundingApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questions:[],
      loading:true
    }
    this.questions = []
    this.fundId = this.props.match.params.id
    this.fundsRef = firebase.database().ref().child('funds')
    this.submitRef = firebase.database().ref().child('submitted_funds')
    this.completedRef = firebase.database().ref().child('completed_applications')
    firebase.auth().onAuthStateChanged(this.handleUser)
  }
  handleUser = (user)=> {
    if (user) {
      this.setState({displayName:user.displayName, userId:user.uid})
    }
  }
  componentWillMount () {
    this.fundsRef.child(this.fundId).child('questions').once('value', (questions)=> {
      questions.forEach((question)=> {
        this.questions.push(question.val())
      })
      this.setState({questions:this.questions})
    })
    this.fundsRef.child(this.fundId).once('value', (fund)=> {
      this.setState({title:fund.val().title, post:fund.val().post})
    })
  }
  handleChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }
  async handleSubmit () {
    var info = {
      key:this.fundId,
      title:this.state.title,
      post:this.state.post
    }

    var data = []
    this.fundsRef.child(this.fundId).child('applicants').once('value', (applicants)=> {
      applicants.ref.set(applicants.val() + 1)
    })
    this.state.questions.forEach((question, key)=>{
      data.push({
        question:question,
        answer:this.state['answer'+key]
      })
    })

    var item = this.submitRef.child(this.fundId).child(this.state.userId).update(data)
    this.completedRef.child(this.state.userId).child(this.fundId).update(info)
    this.setState({redirect:true})
  }
  render() {
    return (
      <div className="App">
        {this.state.redirect && <Redirect to='/funding' push />}
        <div className='row'>
          <div className='col-sm-10 col-sm-offset-1' style={{backgroundColor:'#00abc9'}}>
            <p style={{fontSize:25, marginTop:'1%',color:'white'}}>{this.state.title}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-10 col-sm-offset-1' style={{ border:'1px solid lightgrey'}}>
            <div className='row' style={{fontSize:20, margin:'2%'}}>
              {this.state.questions.map((question,key)=>
                <div className='col-sm-12' style={{textAlign:'left'}}>
                    <div className='row'>
                      <p>{question}</p>
                    </div>
                    <div className='row' >
                        <textarea onChange={this.handleChange} name={'answer' + key} className='form-control' rows='4' cols='100'/>
                    </div>
                </div>
              )}

              <div className='row'  style={{marginTop:'2%'}}>
                <Link to='#' style={{textDecoration:'none'}}>
                  <button onClick={()=>this.handleSubmit()} type="button" className="btn btn-primary" style={{marginTop:10}}>Submit</button>
                </Link>&nbsp;&nbsp;
                <Link to='/funding' style={{textDecoration:'none'}}>
                  <button type="button" className="btn btn-danger" style={{marginTop:10}}>Close</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
