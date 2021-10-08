import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Form, Modal, Container } from "react-bootstrap";
import { ASSIGNEMP } from "../../../actions/ActionCreators";
import { ASSIGNEMPINPUTS, UPDATETASKINPUTS } from "../../../actions/Actions";
import {
  FETCHTASKDETAILS,
  FETCHUSERS,
  UPDATETASK
} from "../../../actions/ActionCreators";

class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AssignModal: false,
      task_id: "",
      taskdata: [],
      updateModal: false,
      task_name: "",
      sheet_id: ""
    };
  }
  componentDidMount() {
    var a;
    if (!this.props.location.state) {
      a = localStorage.getItem("sheet_id");
      this.props.FETCHTASKDETAILS(a);
    } else if (this.props.location.state) {
      localStorage.setItem("sheet_id", this.props.location.state.id);
      this.props.FETCHTASKDETAILS(localStorage.getItem("sheet_id"));
    }
    this.props.FETCHUSERS();
  }

  handleAssign = (value, task_id, task_name, sheet_id) => {
    const taskdata = this.props.taskDetails[0].sheet_data.filter(
      item => item._id === task_id
    );
    this.setState({
      AssignModal: value,
      task_id: task_id,
      taskdata: taskdata,
      task_name: task_name,
      sheet_id: sheet_id
    });
  };

  handleUpdate = (value, task_id) => {
    const taskdata = this.props.taskDetails[0].sheet_data.filter(
      item => item._id === task_id
    );
    this.setState({
      updateModal: value,
      task_id: task_id,
      taskdata: taskdata
    });
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <Container>
        <div>
          <div
            style={{
              display: "flex",
              margin: "10px",
              justifyContent: "space-between"
            }}
          >
            <h2>Manage tasks</h2>
            <Button variant="outline-dark" onClick={() => this.handleBack}>
              back
            </Button>
          </div>{" "}
          <Table striped bordered hover responsive style={{ marginTop: 10 }}>
            <TableHeader taskDetails={this.props.taskDetails} />
            <TableBody
              taskDetails={this.props.taskDetails}
              handleAssign={this.handleAssign}
              AssignModal={this.state.AssignModal}
              handleUpdate={this.handleUpdate}
              statuses={this.props.statuses}
            />
          </Table>
        </div>

        {/*------------------------------- Modal 1 -------------------------*/}

        <div>
          <Modal show={this.state.AssignModal}>
            <Modal.Header
              style={{ backgroundColor: "#003d79", color: "white" }}
            >
              <Modal.Title>Assign Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                ref="form"
                style={{ marginTop: 10 }}
                onSubmit={event =>
                  this.props.ASSIGNEMP(
                    this.props.assignemp_Inputs,
                    event,
                    this.refs.form,
                    this.state.task_id,
                    this.state.task_name,
                    this.state.sheet_id
                  )
                }
              >
                <AssignEmp
                  taskdata={this.state.taskdata}
                  usersDetails={this.props.usersDetails}
                  ASSIGNEMPINPUTS={this.props.ASSIGNEMPINPUTS}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#003d79" }}>
              <Button
                variant="outline-light"
                onClick={() => this.handleAssign(!this.state.AssignModal)}
              >
                Close
              </Button>
              <p>{this.props.assignsuccess}</p>
            </Modal.Footer>
          </Modal>
        </div>

        {/*------------------------------- Modal 2 -------------------------*/}

        <div>
          <Modal show={this.state.updateModal}>
            <Modal.Header
              style={{ backgroundColor: "#003d79", color: "white" }}
            >
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                ref="form"
                style={{ marginTop: 10 }}
                onSubmit={event =>
                  this.props.UPDATETASK(
                    this.props.updatetask_Inputs,
                    event,
                    this.refs.form,
                    this.state.task_id,
                    localStorage.getItem("sheet_id")
                  )
                }
              >
                <UpdateTasks
                  taskdata={this.state.taskdata}
                  UPDATETASKINPUTS={this.props.UPDATETASKINPUTS}
                  usersDetails={this.props.usersDetails}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#003d79" }}>
              <Button
                variant="outline-light"
                onClick={() => this.handleUpdate(!this.state.updateModal)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    );
  }
}
const AssignEmp = props => {
  return (
    <div>
      <Form.Group>
        <Form.Label>Task Name</Form.Label>
        <Form.Control
          type="text"
          value={props.taskdata[0] ? props.taskdata[0].Task : ""}
          disabled={true}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Select Emloyee</Form.Label>
        <Form.Control
          as="select"
          name="select_employee"
          onChange={props.ASSIGNEMPINPUTS}
          required
        >
          <option value="" disabled selected hidden>
            Select Emloyee
          </option>
          {props.usersDetails.map(data => {
            return <option value={data._id}>{data.emp_name}</option>;
          })}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Review Date</Form.Label>
        <Form.Control
          type="date"
          name="review_date"
          onChange={props.ASSIGNEMPINPUTS}
        />
      </Form.Group>

      <Button variant="outline-dark" type="submit">
        Assign
      </Button>
    </div>
  );
};

const UpdateTasks = props => {
  return (
    <div>
      <Form.Group>
        <Form.Label>Task Id.</Form.Label>
        <Form.Control
          type="text"
          value={props.taskdata[0] ? props.taskdata[0]._id : ""}
          disabled={true}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Task Name</Form.Label>
        <Form.Control
          name="task_name"
          type="text"
          placeholder={props.taskdata[0] ? props.taskdata[0].Task : ""}
          onChange={props.UPDATETASKINPUTS}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control
          name="priority"
          type="text"
          placeholder={props.taskdata[0] ? props.taskdata[0].Priority : ""}
          onChange={props.UPDATETASKINPUTS}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          name="due_date"
          type="text"
          placeholder={props.taskdata[0] ? props.taskdata[0].Due_Date : ""}
          onChange={props.UPDATETASKINPUTS}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Control
          name="status"
          type="text"
          placeholder={props.taskdata[0] ? props.taskdata[0].Status : ""}
          onChange={props.UPDATETASKINPUTS}
        />
      </Form.Group>
      {/* <Form.Group>
        <Form.Label>Time allocated</Form.Label>
        <Form.Control
          name="time_allocated"
          type="text"
          placeholder={
            props.taskdata[0] ? props.taskdata[0].time_allocated : ""
          }
          onChange={props.UPDATETASKINPUTS}
        />
      </Form.Group> */}
      <Form.Group>
        <Form.Label>Select Emloyee</Form.Label>
        <Form.Control
          as="select"
          name="select_employee"
          onChange={props.UPDATETASKINPUTS}
        //required
        >
          <option value="" disabled selected hidden>
            Select Emloyee
          </option>
          {props.usersDetails.map(data => {
            return <option value={data._id}>{data.emp_name}</option>;
          })}
        </Form.Control>
      </Form.Group>
      {/* <Form.Group>
        <Form.Label>Assigned To</Form.Label>
        <Form.Control
          name="assigned_to"
          type="text"
          placeholder={props.taskdata[0] ? props.taskdata[0].Assigned : ""}
          onChange={props.UPDATETASKINPUTS}
        />
      </Form.Group> */}

      <Button variant="outline-dark" type="submit">
        Update
      </Button>
    </div>
  );
};

const TableHeader = props => {
  var sheet_data = props.taskDetails[0] ? props.taskDetails[0].sheet_data : "";
  var data = sheet_data ? sheet_data[0] : "";
  var keys = Object.keys(data);
  let regex = /^_/;
  var regexkeys = keys.filter(i => !regex.test(i));
  return (
    <thead>
      <tr>
        {regexkeys.map(data => {
          return <th>{data}</th>;
        })}
      </tr>
    </thead>
  );
};

const TableBody = props => {
  var sheet_id = props.taskDetails[0] ? props.taskDetails[0]._id : "";
  if (!props.taskDetails[0]) return null;
  var sheet_data = props.taskDetails[0].sheet_data;
  let statuses = props.statuses
  sheet_data.forEach((sheetData, index) => {
    statuses.forEach((status, index1) => {
      if (sheetData.Status == status._id) {
        return (sheetData.Status = status.name);
      }
    });
  });

  var buttonData = sheet_data.map(i => {
    return {
      ...i,
      Assign: (
        <Button
          variant="outline-dark"
          onClick={() =>
            props.handleAssign(!props.AssignModal, i._id, i.Task, sheet_id)
          }
        >
          {" "}
          Assign{" "}
        </Button>
      ),
      Update: (
        <Button
          variant="outline-dark"
          onClick={() => props.handleUpdate(!props.updateModal, i._id)}
        >
          {" "}
          Update{" "}
        </Button>
      )
      // Delete: <Button onClick={() => console.log(i._id)}> Delete </Button>
    };
  });
  var keys = Object.keys(buttonData[0]);
  let regex = /^_/;
  var regexkeys = keys.filter(i => !regex.test(i));
  return (
    <tbody>
      {buttonData.map((row, index) => {
        return (
          <tr key={index}>
            {regexkeys.map(a => {
              return <td>{row[a] ? row[a] : "--"}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

function mapStateToProps(state) {
  return {
    taskDetails: state.ManagerReducer.taskDetails,
    usersDetails: state.EmployeeReducer.usersDetails,
    assignsuccess: state.ManagerReducer.assignsuccess,
    assignemp_Inputs: state.ManagerReducer.assignemp_Inputs,
    updatetask_Inputs: state.ManagerReducer.updatetask_Inputs,
    statuses: state.EmployeeReducer.statuses,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    FETCHTASKDETAILS: id => {
      dispatch(FETCHTASKDETAILS(id));
    },
    FETCHUSERS: () => {
      dispatch(FETCHUSERS());
    },
    ASSIGNEMPINPUTS: event => {
      let name = event.target.name;
      let value = event.target.value;
      dispatch(ASSIGNEMPINPUTS(name, value));
    },
    ASSIGNEMP: (assignemp_Inputs, event, form, task_id, task_name, sheet_id) => {
      dispatch(
        ASSIGNEMP(assignemp_Inputs, event, form, task_id, task_name, sheet_id)
      );
    },
    UPDATETASKINPUTS: event => {
      let name = event.target.name;
      let value = event.target.value;
      dispatch(UPDATETASKINPUTS(name, value));
    },
    UPDATETASK: (updatetask_Inputs, event, form, task_id, sheet_id) => {
      dispatch(UPDATETASK(updatetask_Inputs, event, form, task_id, sheet_id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
