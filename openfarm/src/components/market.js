import React, { Component } from 'react';
import '../App.css';

export default class Market extends Component {

  render() {
    return (
      <div className="App" style={{backgroundColor:'lightgrey'}}>
        <p>Showcase & Sell</p>
        <div className="row" style={{margin:20}}>
                  <div className='col-sm-3 text-center' style={{padding:20}}>
                    <div className='panel text-center' style={{boxShadow: '5px 5px 5px #888888',}}>
                      <img src={require('../images/rice.jpg')} className='img-responsive text-center' style={{width:230, height:205,}} />
                      <p style={{fontSize:20, fontWeight:'700'}}>Rice</p>
                      <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className='col-sm-3' style={{padding:20}}>
                    <div className= 'panel text-center'  style={{boxShadow: '5px 5px 5px #888888'}} >
                      <img src={require('../images/maize.jpg')} className='img-responsive' style={{width:320, height:205,}}  />
                      <p style={{fontSize:20, fontWeight:'700'}}>Maize</p>
                      <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
                        Add to Cart
                      </button>
                    </div>

                  </div>
                  <div className='col-sm-3' style={{padding:20}}>
                  <div className= 'panel text-center'  style={{boxShadow: '5px 5px 5px #888888'}} >
                    <img src={require('../images/millet.jpg')} className='img-responsive' style={{width:230, height:205}} />
                    <p style={{fontSize:20, fontWeight:'700'}}>Millet</p>
                    <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
                      Add to Cart
                    </button>
                  </div>

                  </div>
                  <div className='col-sm-3' style={{padding:20}}>
                      <div className= 'panel text-center'  style={{boxShadow: '5px 5px 5px #888888'}} >
                        <img src={require('../images/wheat.jpg')} className='img-responsive' style={{width:230, height:205}}/>
                        <p style={{fontSize:20, fontWeight:'700'}}>Wheat</p>
                        <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
                          Add to Cart
                        </button>
                      </div>
                  </div>
      </div>
      <div className="row" style={{margin:20}}>
                <div className='col-sm-3'>
                  <div className= 'panel text-center'  style={{boxShadow: '5px 5px 5px #888888'}} >
                    <img src={require('../images/oat.jpg')} className='img-responsive' style={{width:230, height:205}} />
                    <p style={{fontSize:20, fontWeight:'700'}}>Oat</p>
                    <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className= 'panel text-center'  style={{boxShadow: '5px 5px 5px #888888'}} >
                    <img src={require('../images/rye.jpg')} className='img-responsive' style={{width:230, height:205}} />
                    <p style={{fontSize:20, fontWeight:'700'}}>Rye</p>
                    <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className= 'panel text-center'  style={{boxShadow: '5px 5px 5px #888888'}} >
                    <img src={require('../images/wheat.jpg')} className='img-responsive' style={{width:230, height:205}} />
                    <p style={{fontSize:20, fontWeight:'700'}}>Wheat</p>
                    <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className= 'panel text-center'  style={{boxShadow: '5px 5px 5px #888888'}} >
                    <img src={require('../images/barley.jpg')} className='img-responsive' style={{width:230, height:205}} />
                    <p style={{fontSize:20, fontWeight:'700'}}>Barley</p>
                    <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
                      Add to Cart
                    </button>
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
