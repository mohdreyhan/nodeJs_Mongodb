import React, { Component } from "react";
import { connect } from "react-redux";
// import {withRouter} from 'react-router-dom'

import { Tabs, Tab, Container, Button } from "react-bootstrap";
import TaskDetails from "./TaskDetails";
import PendingTasks from "./PendingTasks";
import CompletedTasks from "./CompletedTasks";
import { FETCHTASKDETAILS, FETCHUSERS } from "../../../actions/ActionCreators";

class TaskTabs extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    this.props.FETCHUSERS();
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <Container>
        <div
          style={{
            display: "flex",
            margin: "10px",
            justifyContent: "space-between"
          }}
        >
          <h2>Tasks Details</h2>
          <Button variant="outline-dark" onClick={()=>this.handleBack()}>
            back
          </Button>
        </div>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          style={{ marginTop: 10 }}
        >
          <Tab eventKey="profile" title="Task Details">
            <TaskDetails />
          </Tab>
          <Tab eventKey="home" title="Pending Tasks">
            <PendingTasks />
          </Tab>
          <Tab eventKey="contact" title="Completed Tasks">
            <CompletedTasks />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    FETCHTASKDETAILS: () => {
      dispatch(FETCHTASKDETAILS());
    },
    FETCHUSERS: () => {
      dispatch(FETCHUSERS());
    }
  };
}

export default (connect(mapStateToProps, mapDispatchToProps)(TaskTabs));
