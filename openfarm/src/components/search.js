import React, { Component } from 'react'
import * as firebase from 'firebase'
import {Link} from 'react-router-dom'
import {Firebase} from '../helpers/firebase'
import '../App.css';

export default class Search extends Component {
   constructor (props) {
     super (props)
     this.searchString = this.props.match.params.id
     this.state = {
       searchString:this.searchString,
       users:[],
       results:[],
       loading:true,
       noResults:false,
     }
     this.users = []
     this.ref = firebase.database().ref().child('users')
   }
  componentWillReceiveProps ( newProps ) {
    if (this.searchString !== newProps.match.params.id) {
      this.setState({searchString:newProps.match.params.id})
    }
  }
   async componentWillMount () {
     await this.ref.once('value', (users)=> {
       users.forEach((user)=> {
         this.users.push({
           key:user.key,
           displayName:user.val().displayName,
           profilePicture:user.val().profilePicture,
           produce:user.val().produce,
           state:user.val().state,
           address:user.val().address
         })
       })
      this.getSearch()
     })
   }
   getSearch () {
     var temp = this.users.filter((user)=> user.displayName.toLowerCase().includes(this.state.searchString.toLowerCase()) || user.produce.toLowerCase().includes(this.state.searchString.toLowerCase()) )
     if (temp.length > 0) {
       this.setState({results:temp, noResults:false, loading:false})
     }else {
       this.setState({noResults:true, loading:false})
     }
   }
   showResults () {
     return this.state.results.map((result)=>
     <Link className='row' to={'/profile/'+result.key} style={{textDecoration:'none'}}>
       <div className='col-sm-8 col-sm-offset-2'>
         <div className='panel panel-default'>
           <div className='panel-body'>
             <div className='col-md-3 col-sm-3'>
               <img src={result.profilePicture} style={{height:100, width:200}} className='img-responsive img-thumbnail' />
             </div>
             <div className='col-md-9 col-sm-9 text-left'>
               <h3 >{result.displayName}</h3>
               <p>{result.address}</p>
               <p>{result.produce}</p>
             </div>
           </div>
         </div>
       </div>
     </Link>

     )
   }
  render() {
    return (
      <div className="App">
        <p>showing results for <span style={{fontWeight:'600'}}>{this.state.searchString} </span></p>
        {(()=>{
          if (this.state.noResults) {
            return (
              <p className='text-center'>No Results Match Search Query</p>
            )
          }else if (this.state.loading) {
          return <p style={{fontSize:16, fontWeight:'600'}}>Loading Results...</p>
          }else{
            return this.showResults()
          }
        })()}
      </div>
    );
  }
}
