import React, { Component } from 'react';
import DashboardHeader from './dashboardHeader'
import { Tabs, Tab, Badge, Well, FormGroup, ControlLabel, FormControl} from "react-bootstrap"
import { Link,Redirect, } from 'react-router-dom'
import Messaging from '../helpers/messaging'
import moment from 'moment'
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import pic from '../pic.png';
import '../App.css';
import '../custom.css'
const styles = {
  searchbox: {
    height:35,
    width:'95%',
    backgroundColor:'white',
    margin:10, border:1,
    borderRadius:5,
    textAlign:'center',
    borderColor:'#eeeeee'
  },
  popover:{
    position: 'absolute',
		boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
		border: '1px solid #CCC',
		borderRadius: 3,
		marginLeft: -5,
		marginTop: 10,
		padding: 5,
    backgroundColor:'white',
    fontWeight:'bold',
    zIndex:1000,
  },
  separator:{
    height:1,
    margin:5,
    backgroundColor:'grey',
  },
}
export default class Notifications extends Component {
  constructor (props) {
     super (props)
     this.state = {
       width:0,
       height:0,
       chats: [],
       error: null,
       mime:'',
       message:'',
       userId:'',
       conversations:[],
       attachment:'',
       messages:[],
       users:[]
     }
     firebase.auth().onAuthStateChanged(this.handleUser)
     this.chatFriend = firebase.database().ref().child('users')
     this.mRef = firebase.database().ref().child('direct_messages')
     this.conversationsRef = firebase.database().ref().child('recent_chats')
     this.messagesList = []
     this.friends = []
     this.messagesRef = ''
     this.users = []
     this.user = {}
   }
   componentWillMount () {
     this.chatFriend.once('value', (users)=> {
       users.forEach((user)=> {
         this.users.push({
           displayName:user.val().displayName,
           profilePicture:user.val().profilePicture,
           key:user.key,
           produce:user.val().produce
         })
       })
       this.setState({users:this.users})
     })
   }
  changeFriend (convo) {
     if (this.messagesRef !== '') this.messagesRef.off()
     this.friendId = convo.userKey
     this.setState({
       friendId: convo.userKey,
       loading:true,
       displayName: convo.sender,
       profilePicture: convo.profilePicture,
       messages:[],
       media:[],
       show:false,
       showChats:true
     })
     this.messagesList = []
     this.messageAddedListener(convo.userKey)
     this.getProduce(convo.userKey)
   }
   getProduce (userId) {
     this.chatFriend.child(userId).child('produce').once('value', (produce)=> {
       this.setState({produce:produce.val()})
     })
   }
  scrollToBottom() {
    const scrollHeight = this.divList.scrollHeight;
    const height = this.divList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.divList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
  componentDidUpdate() {
    if (this.state.showChats) {
      this.scrollToBottom();
    }

  }
  handleUser = (user)=> {
    if(user){
      this.user = user
      this.messageAddedListener ('')
      this.getConversations()
      this.listenConversationChange ()
      this.setState({userPicture:user.photoURL, userId:user.uid})
    }
  }
  getConversations () {
    this.conversations = []
    //firebase.database().ref().child('users').child(this.user.uid).update({messagesBadge:0,badge:0})
    this.conversationsRef.child(this.user.uid).on('child_added', (snapShot) => {
      if(snapShot.val().senderId !== this.user.uid ){
        var newMessage = false
        if(snapShot.val().status === "Delivered") newMessage = true
        this.conversations.push({newMessage:newMessage, userKey: snapShot.key, sender: snapShot.val().sender, profilePicture: snapShot.val().userPicture, sentAt: snapShot.val().sentAt, message: snapShot.val().message})
      }else if(snapShot.val().senderId === this.user.uid){
        this.conversations.push({newMessage:false, userKey: snapShot.key, sender: snapShot.val().receiver, profilePicture: snapShot.val().profilePicture, sentAt: snapShot.val().sentAt, message: snapShot.val().message})
      }
      this.setState({conversations:this.conversations})
    })
  }
  listenConversationChange () {
    this.conversationsRef.child(this.user.uid).on('child_changed', (snapShot)=>{
      this.setState({conversations:[]})
      this.conversations = []
      this.getConversations()
    })
  }
  async SendMessage (e) {
    e.preventDefault()
    Messaging (this.user, this.state.message, this.state.displayName, this.state.friendId, this.state.profilePicture, this.state.mime, this.state.attachment, '', '', '','')
    this.setState({message:''})
  }
  async  setMessages (snapShot) {
    var date = moment(snapShot.val().sentAt).format('L')
    var dateChanged = false
    var classStyle
    var status
    if (this.state.currentDate === date) {
      date = ''
      dateChanged = false
    } else {
      this.setState({currentDate: date})
      dateChanged = true
    }
    date = moment(snapShot.val().sentAt).format('dddd')
    var timestamp = moment(snapShot.val().sentAt).format('LT')
    if (this.user.uid === snapShot.val().senderId) {
      status=snapShot.val().status
      classStyle = "answer right"
    }else {
      firebase.database().ref().child('messages').child(snapShot.key).update({status:'Seen'})
      status=''
      classStyle = "answer left"
    }
    if (snapShot.val().attachment !== '') {
      this.media.push(snapShot.val().attachment)
      this.setState({photos:this.media})
    }
    if(snapShot.val().post !== ""){
      this.messagesList.push({classStyle:classStyle, status:status,key: snapShot.key,sharedPost:true, attachmentType: snapShot.val().attachmentType, message: snapShot.val().message, sender: snapShot.val().sender, timestamp: timestamp, attachment: snapShot.val().attachment,
      profilePicture: snapShot.val().userPicture, date: date, dateChanged: dateChanged, post:snapShot.val().post, postId:snapShot.val().postId, postPicture:snapShot.val().postPicture, createdAt:snapShot.val().createdAt})
    }else{
      this.messagesList.push({classStyle:classStyle, status:status,key: snapShot.key,sharedPost:false, attachmentType: snapShot.val().attachmentType, message: snapShot.val().message, sender: snapShot.val().sender, timestamp: timestamp, attachment: snapShot.val().attachment,
      profilePicture: snapShot.val().userPicture, date: date, dateChanged: dateChanged})
    }
    this.setState({messages:this.messagesList, loading:false, newChat:false})
  }
  async messageAddedListener (user = '') {
    if(user !== ''){
      this.mRef.child(this.user.uid).child(user).limitToLast(1).once('value', (message)=> {
        if (!message.exists()) this.setState({newChat:true, loading:false})
      })
      this.messagesRef = firebase.database().ref('direct_messages').child(this.user.uid).child(user).limitToLast(100)
      this.messagesRef.on('child_added', (snapShot) => {
        firebase.database().ref('messages').child(snapShot.val()).once('value', (snap) => {
          this.setMessages(snap)
        })
      })
    }
  }
  startConversation (user) {
    if (this.messagesRef !== '') this.messagesRef.off()
    this.friendId = user.key
    this.setState({
      friendId: user.key,
      loading:true,
      displayName: user.displayName,
      profilePicture: user.profilePicture,
      messages:[],
      produce:user.produce,
      media:[],
      show:false,
      showStartNew:false,
      showChats:true,
    })
    this.messagesList = []
    this.messageAddedListener(user.key)
  }
  searchFriends (text) {
    if (text === '') this.setState({users:this.users, noFriends:false})
    else {
      var results = this.users.filter ((friend) => friend.displayName.toLowerCase().includes(text.toLowerCase()))
      if (results.length > 0)
      this.setState({users:results, noFriends:false})
      else this.setState({noFriends:true})
    }
  }
  startNew () {
    return (
       <div key={1} className='col-sm-8 col-sm-offset-2'>
        <div>
          <div style={{backgroundColor:'#039be5', height:60, padding:10}}>
            <span onClick={()=>this.setState({startNew:false, opacity:0})}  style={{color:'white', marginTop:15, cursor:'pointer', fontSize:16}} className='fa fa-arrow-left fa-4x lead pull-left'> Back</span>
          </div>
          <div style={{height:55, backgroundColor:'#039be5', }}>
            <input style={styles.searchbox} name="msg" onChange={(event)=> this.searchFriends(event.target.value)} placeholder="Search friends" />
          </div>
        </div>
        <div className="col-inside-lg decor-default chat" style={{overflow: 'hidden',height:600, outline: 'none', overflowY:'scroll'}} tabIndex="5000">
          {this.state.noFriends ? <div className='lead text-center'>No user found</div> :
          <div className="chat-users list group" style={{padding:0,margin:0,}}>
            {this.state.users.map((user, key)=>
              <Link to='#' key={key} onClick={()=>this.startConversation(user)} className="list-group-item " style={{padding:10, borderWidth:'1px 0 0 0'}} >
              <div className="user">
              <div className="col-sm-4">
              <img alt={user.displayName} src={user.profilePicture} style={{width:50, height:50, borderRadius:25}} /></div>
              <div className="col-sm-8" style={{textAlign:'left', marginLeft:-15}}>{user.displayName}</div>
              <div style={{textAlign:'left'}}>Click to start</div>
              </div>
            </Link>
            )}
          </div>}
        </div>
      </div>
    )
  }
  handleInput = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }
  showMessage(message, key) {
    return (
      <div key={key} className={message.classStyle} style={{zIndex:100}} >
        {message.dateChanged &&  <p style={{right:100}}>{message.date}</p>}
          <p className="text">{message.message}
          <span className="time" style={{marginLeft:5}}>{message.timestamp}</span>
        </p>
    </div>
    )
  }
  showConversations () {
    if (this.state.conversations.length === 0) {
      return (
        <div className='col-sm-12'>
        <div className='col-sm-8 col-sm-offset-2'>
          <div className='col-sm-9'>
            <p>No conversations </p>
          </div>
          <Link style={{textDecoration:'none'}} onClick={()=>this.setState({showStartNew:true})} to='#' className='col-sm-3'>
            <span> New &nbsp;&nbsp;</span>
            <span style={{fontSize:20}} className='fas fa-comments'></span>
          </Link>
        </div>
        </div>
    )
    }else {
      return (
        <div className='col-sm-12'>
          <div className='col-sm-8 col-sm-offset-2' style={{margin:20}}>
            <Link onClick={()=>this.setState({showStartNew:true})} to='#'>
              <span style={{fontSize:20}} className='fas fa-comments pull-right'></span>
              <span className='pull-right'> New &nbsp;&nbsp;</span>
            </Link>
          </div>
          <div className='cols-sm-12'>
            {
              this.state.conversations.map((convo, key)=>
              <Link to='#' style={{textDecoration:'none'}} onClick={()=>this.changeFriend(convo)} className='col-sm-12'>
                <div className="row" key={key}>
                  <div className='col-sm-2'>
                    <div className='column'>
                      <img src={convo.profilePicture} style={{height:60, width:60, borderRadius:30}} />
                    </div>
                  </div>
                <div className='col-sm-5 text-left'>
                  <div className='column'>
                     <p style={{fontSize: 16, fontWeight: '600', fontFamily: 'verdana'}}>{convo.sender}</p>
                     <span>{convo.message}</span>
                  </div>
                </div>
                <div className='col-sm-5 text-left'>
                  <div className='column'>
                     <p style={{fontSize: 14, fontWeight: 'normal', fontFamily: 'verdana'}}>Yenagoa, Bayelsa</p>
                  </div>
                </div>
              </div>
              <div style={styles.separator}></div>
            </Link>
             )
            }
          </div>
        </div>
      )

    }
   }
  showPage () {
     return (
       <div className='col-md-12'>
         <div className='row'>
           <div className={this.state.showChats || this.state.showNotifs ? 'col-md-7 col-sm-12' : 'col-md-12 cols-sm-12'}>
             <div className='column'>
               <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                 <Tab eventKey={1} title="YOUR CHAT">
                   <br/>
                   <div className='row'>
                     { this.state.showStartNew ? this.startNew() : this.showConversations()}
                   </div>
                 </Tab>
                 <Tab eventKey={2}
                   title="NOTIFICATION">
                   <div className='col-sm-12'>
                     <br/>
                     <Well onClick={()=>this.setState({showNotifs:!this.state.showNotifs, showChats:false})} bsSize="sm">ANOTHER IMPORTANT MESSAGE: And this is the body of the message ...</Well>
                     <Well bsSize="small">THIS IS THE TITILE MESSAGE: And this is the body of the message ...</Well>
                   </div>
                 </Tab>
               </Tabs>
             </div>
           </div>
           {this.state.showChats &&
           <div className='col-md-5 col-sm-12'>
             <div className='col-sm-12' style={{backgroundColor:'#FAFAFA', marginTop:-20}}>
               <div className='col-sm-8 col-sm-offset-2'>
                 <div className='row' style={{padding:10}}>
                   <div className="col-sm-3">
                     <img src={this.state.profilePicture} style={{width:50, height:50, borderRadius:25}} alt="profilePic"/>
                   </div>
                 <div style={{lineHeight:1, lineSpace:1,}} className="col-sm-9">
                  <p style={{fontWeight:'600'}}>{this.state.displayName}</p>
                  <i>{this.state.produce}</i>
                 </div>
                 </div>
               </div>
             </div>
             <div className='chat col-sm-12'  style={{backgroundColor:'#EEEEEE', height:500}}>
               <div className='chat-body' ref={(div) => {this.divList = div; }} style={{height:450, overflowX:'scroll'}}>
                 {this.state.messages.map((message, key)=> this.showMessage(message, key))}
               </div>
               <div className='header-content' >
                 <form className='chat-body'>
                   <div className="answer-add">
                     <input onChange={this.handleInput} value={this.state.message} name="message" placeholder="Write a message" autoFocus />
                     <input onClick={(e)=>this.SendMessage(e)} type="submit" style={{display:'none'}}  name="submit" id="submitButton"  />
                   </div>
                 </form>
               </div>
             </div>
           </div> }
           {this.state.showNotifs &&
           <div className='col-md-5 col-sm-12'>
             <div className='col-sm-12' style={{backgroundColor:'#FAFAFA', marginTop:-20}}>
               <div className='col-sm-8 col-sm-offset-2'>
                 <div className='row' style={{padding:10}}>
                 <div style={{lineHeight:1}} className="col-sm-10 col-sm-offset-1">
                  <p>This is title of the subject</p>
                 </div>
                 </div>
               </div>
             </div>
             <div className='chat col-sm-12'  style={{backgroundColor:'#EEEEEE', height:500}}>
               <div className='chat-body' ref={(div) => {this.divList = div; }} style={{height:450, overflowX:'scroll'}}>
                 <p>Hello World</p>
               </div>
             </div>
           </div> }
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
