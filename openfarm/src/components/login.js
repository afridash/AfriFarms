import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import { Link,Redirect, } from 'react-router-dom'
import * as firebase from 'firebase'
import {Firebase} from '../helpers/firebase'
import logo from '../openLogo.png';
import '../App.css';

export default class Login extends Component {
  constructor (props) {
    super(props)
      this.state = {
        email: '',
        password: '',
        error: '',
        redirect:false,
      }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit (event) {
    event.preventDefault()
    this.setState({loading:true})
    if (this.verifyPasswords()) {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user)=> {
        localStorage.setItem('email', user.email)
        this.setState({redirect:true})
      }).catch((error)=> {
        this.setState({error:error.message, loading:false})
      })
    }else{
      this.setState({error:'Email and Password cannot be empty',loading:false})
    }
  }
  verifyPasswords () {
    return this.state.email !== '' && this.state.password !== ''
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
                <p style={{color:'red'}}>{this.state.error}</p>
                <FormGroup>
                  <ControlLabel className="pull-left">Email</ControlLabel>
                  <FormControl
                    className='form-control'
                    placeholder="Email"
                    name='email'
                    onChange = {this.handleChange}
                  />
                </FormGroup>

                <br/>
                <FormGroup>
                  <ControlLabel className="pull-left">Password</ControlLabel>
                  <FormControl
                    className='form-control'
                    type="password"
                    name='password'
                    placeholder="Password"
                    onChange = {this.handleChange}
                  />
                </FormGroup>
                  <FormGroup>
                    {this.state.loading ? <Button className="pull-right" type="submit"  bsSize="sm" style={{...styles.button, backgroundColor:'#1babc7', fontSize:16, color:'white'}}
                      >Logging in..</Button> : <Button className="pull-right" type="submit"  bsSize="sm" style={{...styles.button, backgroundColor:'#1babc7', fontSize:16, color:'white'}} onClick={(event) =>
                        this.handleSubmit(event)}>Login</Button> }
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
        {this.state.redirect && <Redirect to='/dashboard' push />}
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
