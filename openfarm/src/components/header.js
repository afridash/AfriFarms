import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import logo from '../openLogo.png';
import '../App.css';

export default class Header extends Component {
  constructor (props) {
    super(props)
      this.state =  {
        selected:'home'
      }
  }
  render() {
    return (
      <div className='App'>
        <div className='row hidden-xs' style={{backgroundColor:'#FAFAFA',border: '0.5px solid lightgrey', }}>
          <div className='row' style={{margin:10}}>
            <div className='col-md-3 col-sm-3'>
              <div>
                <img src={logo} alt="logo" style={{height:50, width:100}} />
              </div>
            </div>
            <div className='col-md-3 col-sm-3'>
              <div className='row'>
                <div className='col-sm-3' style={{marginRight:-20}}>
                  <div className='pull-right'>
                    <i className='fas fa-map-marker-alt' style={{color:'#069fba'}}></i>
                  </div>
                </div>
                <div className='col-sm-9' style={{fontSize:10, lineHeight:1, lineSpace:1}}>
                  <div className='pull-left'>
                    <p>11, Elekahia Road</p>
                    <p>Port Harcourt</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-3 col-sm-3'>
              <div className='row'>
                <div className='col-sm-3 text-center'>
                  <div className='pull-right'>
                    <i className="fas fa-copy" style={{color:'#069fba'}}></i>
                  </div>
                </div>
                <div className='col-sm-9' style={{marginLeft:-20}}>
                  <div className='pull-left' style={{fontSize:10, lineHeight:1, lineSpace:1}}>
                    <p>info@openfarm.com.ng</p>
                    <span>+234 809 773 7457</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-3 col-sm-3'>
              <div className='pull-right'>
                <button className='btn btn-primary' style={{backgroundColor:'#069fba',borderColor:'transparent'}}>
                  REGISTER/LOGIN
                </button>
              </div>

            </div>
          </div>
      </div>
      <nav className="navbar navbar-default" style={{backgroundColor:'#069fba'}}>
  <div className="container-fluid" style={{marginLeft:'8%'}}>
    <div className="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
    </div>
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li onClick={()=>this.setState({selected:'home'})}> <Link  to='/' style={{color: this.state.selected === 'home' ? 'black' :'white'}}>HOME <span className="sr-only">(current)</span></Link></li>
        <li onClick={()=>this.setState({selected:'funding'})}><Link to="/funding" style={{color:this.state.selected === 'funding' ? 'black' :'white'}}>FUNDING <span className="sr-only">(current)</span></Link></li>
        <li onClick={()=>this.setState({selected:'training'})}><Link to="/training" style={{color:this.state.selected === 'training' ? 'black' :'white'}}>TRAINING</Link></li>
        <li onClick={()=>this.setState({selected:'news'})}><Link to="/news" style={{color:this.state.selected === 'news' ? 'black' :'white'}}>NEWS</Link></li>
        <li onClick={()=>this.setState({selected:'about'})}><Link to="/about" style={{color:this.state.selected === 'about' ? 'black' :'white'}}>ABOUT US</Link></li>
        <li onClick={()=>this.setState({selected:'contact'})}><Link to="/contact" style={{color:this.state.selected === 'contact' ? 'black' :'white'}}>CONTACT US</Link></li>
      </ul>
      <ul className="nav navbar-nav navbar-right" style={{backgroundColor:'#007185'}}>
        <form className="navbar-form navbar-left">
          <div className="form-group">
            <input type="text"  className="form-control" placeholder="Search" style={{backgroundColor:'transparent', color:'white', border:'0px solid transparent'}} />
          </div>
        </form>
      </ul>

    </div>
  </div>
</nav>
        {this.props.children}
      </div>
    );
  }
}
