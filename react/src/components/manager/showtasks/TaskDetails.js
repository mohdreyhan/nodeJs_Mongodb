import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { FETCHTASKDETAILS } from "../../../actions/ActionCreators";
import { withRouter } from "react-router-dom";

class TaskDetails extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let a = "";
    if (!this.props.location.state) {
      a = localStorage.getItem("sheet_id");
      this.props.FETCHTASKDETAILS(a);
    } else if (this.props.location.state) {
      localStorage.setItem("sheet_id", this.props.location.state.id);
      this.props.FETCHTASKDETAILS(localStorage.getItem("sheet_id"));
    }
  }
  render() {
    return (
      <div>
        <Table striped bordered hover responsive style={{ marginTop: 10 }}>
          <TableHeader taskDetails={this.props.taskDetails} />
          <TableBody
            taskDetails={this.props.taskDetails}
            statuses={this.props.statuses}
          />
        </Table>
      </div>
    );
  }
}

const TableHeader = (props) => {
  var sheet_data = props.taskDetails[0] ? props.taskDetails[0].sheet_data : "";
  var data = sheet_data ? sheet_data[0] : "";
  var keys = Object.keys(data);
  let regex = /^_/;
  var regexkeys = keys.filter((i) => !regex.test(i));
  return (
    <thead>
      <tr>
        {regexkeys.map((data) => {
          return <th>{data}</th>;
        })}
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  const statuses = props.statuses;
  if (!props.taskDetails[0]) return null;
  var sheet_data = props.taskDetails[0].sheet_data;
  // var butData = sheet_data.map(i => {
  //   return {
  //     ...i,
  //     button: <Button onClick={() => console.log(i._id)}> Assign</Button>
  //   };
  // });
  var keys = Object.keys(sheet_data[0]);
  let regex = /^_/;
  var regexkeys = keys.filter((i) => !regex.test(i));

  sheet_data.forEach((sheetData, index) => {
    statuses.forEach((status, index1) => {
      if (sheetData.Status == status._id) {
        return (sheetData.Status = status.name);
      }
    });
  });
  return (
    <tbody>
      {sheet_data.map((row,index) => {
        return (
          <tr key={index}>
          {regexkeys.map((a) => {
              return <td>{row[a] ? row[a] : "-"}</td>;
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
    statuses: state.EmployeeReducer.statuses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    FETCHTASKDETAILS: (id) => {
      dispatch(FETCHTASKDETAILS(id));
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TaskDetails)
);
