import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Panel} from "react-bootstrap"
import DashboardHeader from './dashboardHeader'
import logo from '../logo.svg';
import '../App.css';

export default class Funding extends Component {
  showPage() {
    return (
      <div className="col-sm-10 col-sm-offset-1" >
        <div className="row">
          <h3 className="pull-left">Funding</h3>
        </div>
        <div>
            <Panel id="collapsible-panel-example-2" defaultExpanded>
              <Panel.Heading>
                <Panel.Title toggle>
                  Title that functions as a collapse toggle
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt sapiente
                  ea proident.
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
        </div>
      </div>
    )
  }
  render() {
    return (
      <DashboardHeader children={this.showPage()} />
    );
  }
}
