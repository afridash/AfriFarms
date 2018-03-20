import React, { Component } from 'react';
import DashboardHeader from './dashboardHeader'
import { Tabs, Tab, Badge, Well, FormGroup, ControlLabel, FormControl} from "react-bootstrap"
import { Link,Redirect, } from 'react-router-dom'
import pic from '../pic.png';
import '../App.css';

export default class Notifications extends Component {
   constructor (props) {
     super (props)
     this.state = {
       width:0,
       height:0,
       chats: [],
       error: null
     }
   }
   componentDidMount (){
     fetch(`https://randomuser.me/api/?results=3`)
      .then(results => {
        return results.json();
     }).then(data=> {
       let chats = data.results.map((item) => {
         return (
           <div className='col-sm-12'>
             <div className="row" key={item.results}>
                <div style={styles.separator}></div>
                <br/>
               <div className='col-sm-2'>
                 <div className='column'>
                   <img src={ item.picture.thumbnail} style={{height:60, width:60, borderRadius:30}} />
                 </div>
               </div>

             <div className='col-sm-5'>
               <div className='column'>
                  <p style={{fontSize: 16, fontWeight: '600', fontFamily: 'verdana'}}>{item.name.first} {item.name.last}</p>
               </div>
             </div>

             <div className='col-sm-5'>
               <div className='column'>
                  <p style={{fontSize: 14, fontWeight: 'normal', fontFamily: 'verdana'}}>{item.location.city}, {item.location.state}</p>
               </div>
             </div>

           </div>

           </div>
         )
       })
       this.setState({chats: chats});
     })
     .catch(error => {
       alert(error)
     });
   }

   showPage () {
     return (
       <div className='col-md-12'>
         <div className='row'>
           <div className='col-md-7'>
             <div className='column'>
               <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                 <Tab eventKey={1} title="YOUR CHAT">
                   <br/>
                   <div className='row'>
                     {this.state.chats}
                   </div>
                 </Tab>
                 <Tab eventKey={2}
                   title="NOTIFICATION">
                   <div className='row'>
                     <br/>
                     <Well bsSize="sm">ANOTHER IMPORTANT MESSAGE: And this is the body of the message ...</Well>
                     <Well bsSize="small">THIS IS THE TITILE MESSAGE: And this is the body of the message ...</Well>

                   </div>
                 </Tab>
               </Tabs>
             </div>
           </div>
           <div className='col-md-5 col-sm-12'>
             <div className='row'>
               <br/>
               <div className='col-sm-8 col-sm-offset-2'>
                 <div className='row' >
                   <div className="pull-left">
                     <img src={pic} alt="profilePic"/>
                   </div>
                 <div className="pull-right">
                  <p>ALBERTO KENZI</p>
                  <p>Agbor, Delta State.</p>
                  <p>08065371500</p>
                 </div>
                 </div>
                 <div className='row'>
                 </div>
               </div>
               <div className='row'>
                 <div className='col-sm-10 col-sm-offset-1'>
                   <h4>FARM PRODUCE:</h4>
                   <h4>Rice, Millet, Cassava, Corn</h4>
                 </div>
               </div>

             </div>
           </div>

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

const styles = {
  separator:{
    height:1,
    backgroundColor:'grey',
  },
};
