import React, { PureComponent } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { CREATEPROJECTINPUTS } from "../../actions/Projects/Actions";
import { CREATEPROJECT, PROJECTS } from "../../actions/Projects/ActionCreators";
import { FETCHUSERS } from "../../actions/ActionCreators";


class CreateProject extends PureComponent {
  constructor() {
    super();
    this.formRef = null;
    this.setFormRef = (element) => {
      this.formRef = element;
    };

  }

  async componentDidMount() {
    await this.props.FETCHUSERS();
  }

  handleModal = (value) => {
    this.setState({
      showModal: value
    });
  }

  render() {
    const handleModal = this.props.handleModal;
    const showModal = this.props.showModal;
    return (
      <React.Fragment>
        <Modal show={showModal}>
          <Modal.Header style={{ backgroundColor: "#003d79", color: "white" }}>
            <Modal.Title>Create Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form ref={this.setFormRef} style={{ marginTop: 10 }}
              onSubmit={(event) =>
                this.props.CREATEPROJECT(
                  event,
                  this.formRef,
                  this.props.createProjectInputs,
                  this.props.allProjects
                )
              }
            >
              <CreateProjectForm
                CREATEPROJECTINPUTS={this.props.CREATEPROJECTINPUTS}
                createProjectInputs={this.props.createProjectInputs}
                usersDetails={this.props.usersDetails}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#003d79", color: "white" }}>
            <React.Fragment>{this.props.message}</React.Fragment>
            <Button
              variant="outline-light"
              onClick={() => handleModal(!showModal)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const CreateProjectForm = (props) => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" onChange={props.CREATEPROJECTINPUTS} />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Owner</Form.Label>
              <Form.Control as="select" name="owner" onChange={props.CREATEPROJECTINPUTS} required>
                <option value="" disabled selected hidden>
                  Select User
                </option>
                {props.usersDetails.map((data) => {
                  return <option value={data._id}>{data.emp_name}</option>;
                })}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control name="startDate" type="date" onChange={props.CREATEPROJECTINPUTS} />
            </Form.Group>
          </Col>
          <Col sm={6}>
            {/* <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control name="startDate" type="text" onChange={props.CREATEPROJECTINPUTS} />
            </Form.Group> */}
          </Col>
        </Row>
        <Button variant="outline-dark" type="submit">
          Create
        </Button>
      </Container>
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return {
    allProjects: state.ProjectsReducer.allProjects,
    createProjectInputs: state.ProjectsReducer.createProjectInputs,
    message: state.ProjectsReducer.message,
    usersDetails: state.EmployeeReducer.usersDetails,
    statusCode: state.ProjectsReducer.statusCode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CREATEPROJECTINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(CREATEPROJECTINPUTS(name, value));
    },
    CREATEPROJECT: async (event, form, createProjectInputs, projects) => {
      await dispatch(CREATEPROJECT(event, form, createProjectInputs, projects));
    },
    FETCHUSERS: async () => {
      await dispatch(FETCHUSERS());
    },
    PROJECTS: async () => {
      await dispatch(PROJECTS());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
