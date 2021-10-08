import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FETCHUSERS, FETCHROLES } from "../../actions/ActionCreators";
import UpdateUser from "./UpdateUser";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateUserDetails: [],
      showUpdateModal: false,
    };
  }

  componentDidMount = async () => {
    await this.props.FETCHUSERS();
    await this.props.FETCHROLES();
  };

  handleUpdateUser = async (row, value) => {
    let a = [];
    if (this.state.updateUserDetails[0]) {
      a[0] = row;
    } else {
      a.push(row);
    }
    await this.setState({
      updateUserDetails: a,
      showUpdateModal: value,
    });
    if(this.state.showUpdateModal == false)
    {
      await this.props.FETCHUSERS();
    }
  };

  render() {
    return (
      <Container>
        <Table striped bordered hover responsive style={{ marginTop: 10 }}>
          <TableHeader usersDetails={this.props.usersDetails} />
          <TableBody
            usersDetails={this.props.usersDetails}
            showUpdateModal={this.state.showUpdateModal}
            handleUpdateUser={this.handleUpdateUser}
            emp_roles={this.props.emp_roles}
          />
        </Table>
        <UpdateUser
          updateUserDetails={this.state.updateUserDetails}
          showUpdateModal={this.state.showUpdateModal}
          handleUpdateUser={this.handleUpdateUser}
        />
      </Container>
    );
  }
}

const TableHeader = (props) => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Role</th>
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  const rows = props.usersDetails.map((row, index) => {
    props.emp_roles.forEach((roles) => {
      if (row.role == roles._id) {
        row.role = roles.name;
      }
    });
    return (
      <tr key={index}>
        <td>{row.emp_name}</td>
        <td>{row.emp_email}</td>
        <td>{row.emp_password}</td>
        <td>{row.role ? row.role : "Not Assigned"}</td>
        <td>
          <Button
            variant="outline-dark"
            onClick={() => props.handleUpdateUser(row, !props.showUpdateModal)}
          >
            Update
          </Button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

function mapStateToProps(state) {
  return {
    usersDetails: state.EmployeeReducer.usersDetails,
    emp_roles: state.ManagerReducer.emp_roles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    FETCHUSERS: async () => {
      await dispatch(FETCHUSERS());
    },
    FETCHROLES: async () => {
      await dispatch(FETCHROLES());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
