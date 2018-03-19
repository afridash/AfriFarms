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
              <div className="col-sm-4 col-sm-offset-4" style={styles.box}>
                <div>
                  <img src={logo} alt="logo" />
                </div>
                <h3 className='text-center'>Create Farmer's Profile</h3>
                <br/>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel className="pull-left">Business Category</ControlLabel>
                  <FormControl componentClass="select" placeholder="select">
                    <option value="select">Choose One</option>
                    <option value="select">Farmer</option>
                    <option value="other">Doctor</option>
                  </FormControl>
                </FormGroup>

                <br/>
                <FormGroup>
                  <FormControl
                    className='form-control'
                    placeholder="Email"
                    onChange = {this.handleEmailChange.bind(this)}
                  />
                </FormGroup>

                <br/>
                <FormGroup>
                  <FormControl
                    className='form-control'
                    type="password"
                    placeholder="Password"
                    onChange = {this.handlePasswordChange.bind(this)}
                  />
                </FormGroup>

                <br/>
                <FormGroup>
                  <FormControl
                    className='form-control'
                    type="password"
                    placeholder="Password again"
                    onChange = {this.handlePasswordChange.bind(this)}
                  />
                </FormGroup>

                <br/>
                <FormGroup>
                  <FormControl
                    className='form-control'
                    type="text"
                    placeholder="State"
                  />
                </FormGroup>

                <p style={{color:'red'}}>{this.state.error}</p>

                <div>
                  <br/>
                  <p className="password">By clicking Register, you are indicating that you have read
                    and agree to the <Link to="/termsConditions">Terms & Conditions</Link> of using this service</p>
                </div>
                  <FormGroup>
                    <Button className="pull-right" type="submit" bsStyle="primary" bsSize="large" style={styles.button} onClick={(event) =>
                      this.handleRegister(event)}>Register</Button>
                      <Button className="pull-left" type="button" bsSize="large" style={styles.button}><Link to="/login">No, thanks!</Link></Button>
                    </FormGroup>
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
