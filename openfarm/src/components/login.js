import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import { Link,Redirect, } from 'react-router-dom'
import logo from '../openLogo.png';
import '../App.css';

export default class Login extends Component {
  constructor (props) {
    super(props)
      this.state = {
        username: '',
        password: '',
        error: '',
        redirect:false,
      }
  }

  handleEmailChange (event) {
    this.setState({email: event.target.value})
  }

  handlePasswordChange (event){
    this.setState({password: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <div  className="container">
          <div className="row" >
            <br/>
            <form>
              <br/>
              <div className="col-sm-4 col-sm-offset-4" style={styles.box}>
                <div>
                  <img src={logo} alt="logo" />
                </div>
                <h3 className='text-center'>Login</h3>
                <br/>
                <FormGroup>
                  <ControlLabel className="pull-left">Email</ControlLabel>
                  <FormControl
                    className='form-control'
                    placeholder="Email"
                    onChange = {this.handleEmailChange.bind(this)}
                  />
                </FormGroup>

                <br/>
                <FormGroup>
                  <ControlLabel className="pull-left">Password</ControlLabel>
                  <FormControl
                    className='form-control'
                    type="password"
                    placeholder="Password"
                    onChange = {this.handlePasswordChange.bind(this)}
                  />
                </FormGroup>

                <p style={{color:'red'}}>{this.state.error}</p>
                  <FormGroup>
                    <Button className="pull-right" type="submit" bsStyle="primary" bsSize="large" style={styles.button} onClick={(event) =>
                      this.handleSubmit(event)}>Login</Button>
                    </FormGroup>
                    <div className="pull-left">
                      <br/>
                      <p className="password"><Link to="/reset">Forgot Password?</Link></p>
                      <p className="password">Or Click <Link to="/register">here</Link> to register</p>
                    </div>
                </div>
              </form>
            </div>
        </div>
      </div>
    );
  }
}
const styles = {
  button:{margin: 15},
  box:{
    boxShadow: '5px 5px 5px #888888',
  },
};
