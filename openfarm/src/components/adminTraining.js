import React, { Component } from 'react';
import '../App.css';

export default class Training extends Component {
  showPage () {
    return (
      <div className="App">
        <div>
          <ul className="nav nav-tabs">
      <li className="active"><a data-toggle="tab" href="#home">Article</a></li>
      <li><a data-toggle="tab" href="#menu2">Video</a></li>
      <li><a data-toggle="tab" href="#menu1">Create New Training</a></li>
    </ul>

    <div className="tab-content">
      <div id="home" className="tab-pane fade in active">
      <div className='row'>
        <div className='col-sm-7'>
            <div className='col-sm-12' style={{marginTop:20,}}>
              <p style={{borderRadius:2, borderColor:'black', backgroundColor:'lightgrey', fontSize:25, textAlign:'left' , boxShadow:'5px 5px 5px #888888'}}>
                &nbsp;United Nations Feed The World Fund
                <span  className='pull-right' style={{fontSize:15,marginTop:10}}>&nbsp;&nbsp;30/02/2017&nbsp;&nbsp;</span></p>
            </div>
        </div>
        <div className='col-sm-7'>
            <div className='col-sm-12' style={{marginTop:5,}}>
              <p style={{borderRadius:2, borderColor:'black', backgroundColor:'lightgrey', fontSize:25, textAlign:'left' , boxShadow:'5px 5px 5px #888888'}}>
                &nbsp;Nigeria Farmers Association Grant
                <span  className='pull-right' style={{fontSize:15,marginTop:10}}>&nbsp;&nbsp;30/02/2017&nbsp;&nbsp;</span></p>
            </div>
        </div>
        <div className='col-sm-7'>
            <div className='col-sm-12' style={{marginTop:5,}}>
              <p style={{borderRadius:2, borderColor:'black', backgroundColor:'lightgrey', fontSize:25, textAlign:'left' , boxShadow:'5px 5px 5px #888888'}}>
                &nbsp;One Young World Innovation in Agriculture
                <span  className='pull-right' style={{fontSize:15, marginTop:10}}>&nbsp;&nbsp;30/02/2017&nbsp;&nbsp;</span></p>
            </div>
        </div>
      </div>
      </div>
      <div id="menu1" className="tab-pane fade">
        <div className="row" style={{marginTop:20}}>
                <div className="col-md-7">
                <form role="form" action="" method="post">
                <div className="form-group">
                  <div className='col-sm-4'>
                    <label htmlFor="sel1">Funding Type</label>
                  </div>
                <div className='col-sm-8'>
                  <select className="form-control"  name="form">
                      <option value='' >article</option>
                       <option value='hi' >Video</option>
                  </select>
                </div>

                <br />
                </div>
                </form>
                <div className='row' style={{marginTop:40}}>
                  <div className='col-sm-4'>
                    <label htmlFor="Title">Title</label>
                  </div>
                  <div className='col-sm-8'>
                    <input type="text"  className="form-control" placeholder='title' style={{color:'white', border:'1px solid grey'}} />
                  </div>
                </div>

                <div className='row' style={{marginTop:40}}>
                  <div className='col-sm-4'>
                    <label htmlFor="content">Content</label>
                  </div>
                  <div className='col-sm-8'>
                    <textarea rows="8" cols="55" placeholder='Content'> </textarea>
                  </div>
                </div>
                <div className='row' style={{marginTop:40}}>
                  <div className='col-sm-4'>
                    <label htmlFor="Title">Video Title</label>
                  </div>
                  <div className='col-sm-8'>
                    <input type="text"  className="form-control" placeholder="Video Title" style={{color:'white', border:'1px solid grey'}} />
                  </div>
                </div>
                <div className='row' style={{marginTop:40}}>
                  <div className='col-sm-4'>
                    <label htmlFor="Title">Video URL</label>
                  </div>
                  <div className='col-sm-8'>
                    <input type="text"  className="form-control" placeholder='URL'  style={{color:'white', border:'1px solid grey'}} />
                  </div>
                </div>
            <div className='col-md-12'>
                <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent', fontSize:15, marginTop:20}}>
                  Create
                </button>
            </div>
                </div>
      </div>
    </div>
    <div id="menu2" className="tab-pane fade">
      <div className="row" style={{marginTop:20}}>
                <div className='col-sm-4'>
                  <iframe width="320" height="245" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
                  <p>Farm Business 101</p>
                </div>
                <div className='col-sm-4'>
                  <iframe width="320" height="245" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
                  <p>Modern Agriculture </p>
                </div>
                <div className='col-sm-4'>
                  <iframe width="320" height="245" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
                  <p>Latest tech machines in farming</p>
                </div>
    </div>
  </div>
  </div>
        </div>
      </div>
    )
  }
  render() {
    return this.showPage()
  }
}
