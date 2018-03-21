import React, { Component } from 'react';
import { Button, FormGroup, FieldGroup, FormControl, ControlLabel } from "react-bootstrap"
import logo from '../logo.svg';
import '../App.css';

export default class Contact extends Component {
  render() {
    return (
      <div className="App">
        <div className="col-sm-8 col-sm-offset-2">
          <br/>
          <h4 className="pull-left">For comments and questions, please contact us by using the form below:</h4>
          <form>
            <FormGroup>
              <FormControl
                className='form-control'
                placeholder="Name"
                type='text'
              />
            </FormGroup>

            <FormGroup>
              <FormControl
                className='form-control'
                placeholder="Email"
                name='email'
              />
            </FormGroup>

            <FormGroup controlId="formControlsTextarea" bsSize="large">
              <FormControl componentClass="textarea" placeholder="Message" />
            </FormGroup>
            <Button type="submit" className="pull-right" style={{backgroundColor:'#1babc7', fontSize:16, color:'white'}}>Submit</Button>
          </form>
        </div>
      </div>
    );
  }
}
