import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import {
  FETCHSHEETDATA,
  FETCHTASKDETAILS,
  FETCHSTATUS,
} from "../../../actions/ActionCreators";
import { withRouter } from "react-router-dom";

class SheetDetails extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.FETCHSHEETDATA();
    this.props.FETCHSTATUS();
  }

  handlenavigation = (id) => {
    this.props.history.replace({
      pathname: "/tasktabs",
      state: {
        id: id,
      },
    });
  };
  render() {
    if (this.props.sheets_data.length !== 0) {
      return (
        <Container>
          <Table striped bordered hover responsive>
            <TableHeader sheets_data={this.props.sheets_data} />
            <TableBody
              sheets_data={this.props.sheets_data}
              handlenavigation={this.handlenavigation}
            />
          </Table>
        </Container>
      );
    } else {
      return (
        <Container>
          <center>No sheet data</center>
        </Container>
      )
    }
  }
}

const TableHeader = (props) => {
  if (!props.sheets_data[0]) {
    return null;
  }
  var data = props.sheets_data[0];
  var keys = Object.keys(data);
  var key = keys.filter((i) => i.includes("sheet_name"));
  return (
    <thead>
      <tr>
        {key.map((data) => {
          return <th>{data}</th>;
        })}
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  if (!props.sheets_data[0]) {
    return null;
  }
  var keys = Object.keys(props.sheets_data[0]);
  var key = keys.filter((i) => i.includes("sheet_name"));
  return (
    <tbody>
      {props.sheets_data.map((row,index) => {
        return (
          <tr key={index}>
          {key.map((a) => {
              return (
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => props.handlenavigation(row._id)}
                >
                  {row[a]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

function mapStateToProps(state) {
  return {
    sheets_data: state.ManagerReducer.sheets_data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    FETCHSHEETDATA: () => {
      dispatch(FETCHSHEETDATA());
    },
    FETCHSTATUS: () => {
      dispatch(FETCHSTATUS());
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SheetDetails)
);
