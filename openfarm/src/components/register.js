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
        password: '',
        email:'',
        error: '',
        state:'',
        occupation:'',
        redirect:false,
      }
      this.usersRef = firebase.database().ref().child('users')
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleRegister (e) {
    e.preventDefault()
    this.setState({loading:true})
    if (this.authenticateData()) {
      if (this.verifyPasswords()) {
        var data = {
          email:this.state.email,
          state:this.state.state,
          occupation:this.state.occupation
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user)=>{
          this.usersRef.child(user.uid).update(data, (error)=> {
            if (!error) this.setState({redirect:true})
            else this.setState({error:error.message})
          })
        }).catch((error)=> {
          this.setState({error:error.message})
        })
      }else{
        this.setState({error:'Passwords must match'})
      }
    }else{
      this.setState({error:'Data fields cannnot be empty'})
    }
  }
  authenticateData () {
    return this.state.email !== '' && this.state.password !== '' && this.state.state !== '' && this.state.occupation !== '' && this.state.password2 !== ''
  }
  verifyPasswords () {
    return this.state.password === this.state.password2
  }
  render() {
    return (
      <div className="App">
        <div  className="container">
          <div className="row" >
            <br/>
            <form>
              <div className="col-sm-6 col-sm-offset-3" style={styles.box}>
                <div>
                  <img src={logo} alt="logo" />
                </div>
                <h3 className='text-center'>Create Farmer's Profile</h3>
                <br/>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel className="pull-left">Business Category</ControlLabel>
                  <FormControl name='occupation' onChange={this.handleChange} value={this.state.occupation} componentClass="select" placeholder="select">
                    <option value="select">Choose One</option>
                    <option value="farmer">Farmer</option>
                    <option value="doctor">Doctor</option>
                  </FormControl>
                </FormGroup>

                <br/>
                <FormGroup>
                  <FormControl
                    className='form-control'
                    placeholder="Email"
                    name='email'
                    onChange = {this.handleChange}
                  />
                </FormGroup>

                <br/>
                <FormGroup>
                  <FormControl
                    className='form-control'
                    type="password"
                    name='password'
                    placeholder="Password"
                    onChange = {this.handleChange}
                  />
                </FormGroup>

                <br/>
                <FormGroup>
                  <FormControl
                    className='form-control'
                    type="password"
                    name='password2'
                    placeholder="Password again"
                    onChange = {this.handleChange}
                  />
                </FormGroup>

                <br/>
                <FormGroup controlId="formControlsSelect2">
                  <ControlLabel className="pull-left">State</ControlLabel>
                  <FormControl name='state' onChange={this.handleChange} value={this.state.state} componentClass="select" placeholder="select">
                    <option value="select">Choose One</option>
                    <option value="akwa-ibom">Akwa-Ibom</option>
                    <option value="bayelsa">Bayelsa</option>
                    <option value="cross river">Cross River</option>
                    <option value="delta">Delta</option>
                    <option value="river state">River State</option>
                  </FormControl>
                </FormGroup>
                <p style={{color:'red'}}>{this.state.error}</p>
                <div>
                  <br/>
                  <p className="password">By clicking Register, you are indicating that you have read
                    and agree to the <Link to="/termsConditions">Terms & Conditions</Link> of using this service</p>
                </div>
                  <FormGroup>
                    {this.state.loading  ? <Button className="pull-right" type="submit" bsSize="sm" style={{backgroundColor:'#1babc7', margin:15, color:'white', fontSize:16}}>Registering...</Button> : <Button className="pull-right" type="submit" bsSize="sm"
                      style={{backgroundColor:'#1babc7', margin:15, color:'white', fontSize:16}} onClick={(event) =>
                      this.handleRegister(event)}>Register</Button> }
                      <Link to="/"><Button className="pull-left" type="button" bsSize="sm" style={styles.button}>No, thanks!</Button></Link>
                    </FormGroup>
                </div>
              </form>
            </div>
        </div>
        {this.state.redirect && <Redirect to='/dashboard' push /> }
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
