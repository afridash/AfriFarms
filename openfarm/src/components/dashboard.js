import React, { Component } from 'react';
import '../App.css';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="App">
        <div className='row'>
          <div className='col-sm-3' style={{fontSize:20}}>
            <div className='row'>
              <div className='panel panel-default' style={{backgroundColor:'grey'}}>
                <div className='panel-body'>
                  <div className='col-sm-6'>hello there</div>
                  <div className='col-sm-6'>hello</div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-9' style={{fontSize:20}}>
            <div className='row'>
              <div className='panel panel-default' style={{backgroundColor:'lightgrey'}}>
                <div className='panel-body'>
                  <div className='col-sm-5' style={{backgroundColor:'yellow'}}>hello there</div>
                  <div className='col-sm-7' style={{backgroundColor:'red'}}>
                      <div className='row'>
                        <div className='col-sm-3'>hello</div>
                        <div className='col-sm-1' >hey</div>
                        <div className='col-sm-2'>
                        <div className='column'>
                        
                        </div>
                       </div>
                        <div className='col-sm-2' >hello</div>
                        <div className='col-sm-2' >hello</div>
                        <div className='col-sm-2' >hello
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
