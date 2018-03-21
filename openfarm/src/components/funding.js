import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Panel} from "react-bootstrap"
import logo from '../logo.svg';
import '../App.css';

export default class Funding extends Component {
  render() {
    return (
      <div className="col-sm-10 col-sm-offset-1" >
        <div className="row">
          <h3 className="pull-left" style={{fontSize:40, fontWeight:'600', marginBottom:'3%'}}>Funding</h3>
        </div>
        <div>
          <div className='col-sm-10 col-sm-offset-1'>
            <Panel id="collapsible-panel-example-2">
              <Panel.Heading>
                <Panel.Title toggle style={{textAlign:'left'}}>
                  Bill and Melinda Gates Farmers Funding Grant for young farmers <span className='pull-right'><Link to ='/fundingapp'>Apply</Link></span>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt sapiente
                  <span className='pull-right'>
                    <img src={require('../images/plus.png')} style={{height:15, width:15}} />
                  </span>

                  ea proident.
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
          </div>
          <div className='col-sm-10 col-sm-offset-1'>
            <Panel id="collapsible-panel-example-2">
              <Panel.Heading>
                <Panel.Title toggle style={{textAlign:'left'}}>
                  Technology in farming Grant <span className='pull-right'><Link to ='/fundingapp'>Apply</Link></span>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  Technology is changing the face of everything in the world. Farming has been since the existence of man.
                   But moving forward, we look at how we can implement new technologies in the farming space. This grant is
                    meant to support a young farmer between the ages of 18 - 45. The grant provides $45,000 to be used by
                    the farmer in farm crop and animal production. The Deadline for the application is:  20/04/2018
                  <span className='pull-right'>
                    <img src={require('../images/plus.png')} style={{height:15, width:15}} />
                  </span>

                  ea proident.
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
          </div>

        </div>
      </div>
    )
  }
  
}
