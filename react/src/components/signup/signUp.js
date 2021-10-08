import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { SIGNUPINPUTS } from "../../actions/Actions";
import { SIGNUP } from "../../actions/ActionCreators";

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.setFormRef = (element) => {
      this.formRef = element;
    };
  }
  handleSignupform = (event, form, history, signupInputs) => {
    event.preventDefault();
    this.props.SIGNUP(form, history, signupInputs);
  };
  render() {
    return (
      <Container>
        <Row>
          <Col sm={4}></Col>
          <Col sm={4}>
            <Form
              ref={this.setFormRef}
              onSubmit={(event) =>
                this.handleSignupform(
                  event,
                  this.formRef,
                  this.props.history,
                  this.props.signupInputs
                )
              }
            >
              <SignupForm
                SIGNUPINPUTS={this.props.SIGNUPINPUTS}
                signupmsg={this.props.signupmsg}
              />
            </Form>
          </Col>
          <Col sm={4}></Col>
        </Row>
      </Container>
    );
  }
}

const SignupForm = (props) => {
  return (
    <React.Fragment>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Username"
          name="username"
          onChange={props.SIGNUPINPUTS}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={props.SIGNUPINPUTS}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={props.SIGNUPINPUTS}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <p>{props.signupmsg}</p>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    signupInputs: state.SignupReducer.signupInputs,
    signupmsg: state.SignupReducer.signupmsg,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    SIGNUPINPUTS: (event) => {
      const name = event.target.name;
      const value = event.target.value;
      dispatch(SIGNUPINPUTS(name, value));
    },
    SIGNUP: (form, history, loginInputs) => {
      dispatch(SIGNUP(form, history, loginInputs));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
