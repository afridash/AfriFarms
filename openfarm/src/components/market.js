import React, { Component } from 'react';
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import '../App.css';

export default class Market extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items:[],
      loading:true,
    }
    this.items = []
    this.itemsRef = firebase.database().ref().child('store_items')
  }
  componentWillMount () {
    this.itemsRef.once('value', (items)=> {
      if (!items.exists()) this.setState({loading:false, noResult:true})
      items.forEach((item)=> {
        this.items.push({
          thumbnail:item.val().thumbnail,
          title:item.val().title,
          description:item.val().description
        })
      })
      this.setState({items:this.items,loading:false, noResult:false})
    })
  }
  showPage () {
    return (
      <div>
        <h2>Showcase & Sell</h2>
        <div className="row" style={{margin:20, backgroundColor:'lightgrey'}}>
          {this.state.items.map((item)=>
            <div className='col-sm-3 text-center' style={{padding:20}}>
              <div className='panel text-center' style={{boxShadow: '5px 5px 5px #888888',}}>
                <img src={item.thumbnail} className='img-responsive text-center' style={{width:230, height:205,}} />
                <p style={{fontSize:20, fontWeight:'700'}}>{item.title}</p>
                <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
                  Add to Cart
                </button>
              </div>
            </div>
          )}
      </div>
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        {(()=>{
          if (this.state.loading){
            return <p style={{margin:20, fontWeight:'600'}}>Loading...</p>
          }else if (this.state.noResult) {
            return <p style={{margin:20, fontWeight:'600'}}> No Items</p>
          }else return this.showPage()
        })()}
      </div>
    );
  }
}
