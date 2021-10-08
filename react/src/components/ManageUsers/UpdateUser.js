import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { USERROLE } from "../../actions/ActionCreators";
import { PureComponent } from "react";

class UpdateUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      updateUserInputs: {},
    };
  }

  upddateUserOnchange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    await this.setState({
      updateUserInputs: {
        ...this.state.updateUserInputs,
        [name]: value,
      },
    });
  };
  render() {
    let updateUserDetails = this.props.updateUserDetails,
      showUpdateModal = this.props.showUpdateModal,
      handleUpdateUser = this.props.handleUpdateUser;
    return (
      <React.Fragment>
        <Modal show={showUpdateModal}>
          <Modal.Header style={{ backgroundColor: "#003d79", color: "white" }}>
            <Modal.Title>Update User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              ref="form"
              style={{ marginTop: 10 }}
              onSubmit={(event) =>
                this.props.USERROLE(
                  event,
                  this.refs.form,
                  this.state.updateUserInputs,
                  updateUserDetails[0]._id,
                  handleUpdateUser,showUpdateModal
                )
              }
            >
              <UpdateTasks
                updateUserDetails={updateUserDetails}
                emp_roles={this.props.emp_roles}
                upddateUserOnchange={this.upddateUserOnchange}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#003d79" }}>
            <Button
              variant="outline-light"
              onClick={() => handleUpdateUser(!showUpdateModal)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const UpdateTasks = (props) => {
  return (
    <div>
      <Container>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="emp_name"
                type="text"
                placeholder={
                  props.updateUserDetails[0]
                    ? props.updateUserDetails[0].emp_name
                    : ""
                }
                onChange={props.upddateUserOnchange}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="priority"
                type="text"
                placeholder={
                  props.updateUserDetails[0]
                    ? props.updateUserDetails[0].emp_email
                    : ""
                }
                onChange={props.upddateUserOnchange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="due_date"
                type="text"
                placeholder={
                  props.updateUserDetails[0]
                    ? props.updateUserDetails[0].emp_password
                    : ""
                }
                onChange={props.upddateUserOnchange}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Select Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                onChange={props.upddateUserOnchange}
                //required
              >
                <option value="" disabled selected hidden>
                  Select Role
                </option>
                {props.emp_roles.map((roles) => {
                  return <option value={roles._id}>{roles.name}</option>;
                })}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {/* <Form.Group>
          <Form.Label>Select Emloyee</Form.Label>
          <Form.Control
            as="select"
            name="select_employee"
            //   onChange={props.UPDATETASKINPUTS}
            //required
          >
            <option value="" disabled selected hidden>
              Select Emloyee
            </option>
            {props.updateUserDetails.map((data) => {
              return <option value={data._id}>{data.emp_name}</option>;
            })}
          </Form.Control>
        </Form.Group> */}

        <Button variant="outline-dark" type="submit">
          Update
        </Button>
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    emp_roles: state.ManagerReducer.emp_roles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    USERROLE: async (event, form, updateUserInputs, user_id, handleUpdateUser,showUpdateModal) => {
      await dispatch(USERROLE(event, form, updateUserInputs, user_id, handleUpdateUser, showUpdateModal));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
