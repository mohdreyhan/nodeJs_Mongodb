import React, { Component } from "react";
import { Button, Container, Row, Col, Table, Form, ThemeProvider } from "react-bootstrap";
import { connect } from "react-redux";
import "./Projects.css";
import { PROJECTS, DELETEPROJECT, DELETEPROJECTS } from "../../actions/Projects/ActionCreators";
import { DELETEPROJECTINPUTS, EDITPROJECTINPUTS } from "../../actions/Projects/Actions";
import SearchBar from "../IndependentComp/SearchBar/SearchBar";
import SpinnerComp from "../IndependentComp/Spinner/SpinnerComp";
import CreateProject from "./CreateProject";
import EditProject from "./EditProject";



class Projects extends Component {
  constructor(props) {
    super(props);
    this.props.PROJECTS()
    this.state = {
      showModal: false,
      searchInputs: "",
      editProjectDetails: ""
    }
  }

  handleDeleteProject = (userId, deleteProjectInputs, projects) => {
    if (this.props.deleteProjectInputs && this.props.deleteProjectInputs.length > 1) {
      this.props.DELETEPROJECTINPUTS(userId, deleteProjectInputs, projects);
    } else {
      this.props.DELETEPROJECT(userId, deleteProjectInputs[0], projects);
    }
  }

  handleDeleteProjectInputs = (value) => {
    this.props.DELETEPROJECTINPUTS(value)
  }

  handleModal = (value) => {
    this.setState({
      showModal: value
    });
  }

  handleSearchBar = (event) => {
    this.setState({
      searchInputs: event.target.value.toLowerCase(),
    });
  };

  handleEditProjectDetails = async (editProjectDetails) =>
  {
    const data = this.props.allProjects.filter((data,index) => {
      return data._id == editProjectDetails[0]
    })
    await this.setState({
      editProjectDetails : editProjectDetails[0]
    })
    this.handleModal(!this.state.showModal)
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col sm={4} style={{ display: "flex", justifyContent: "flex-start" }} >
              <h2>Projects</h2>
            </Col>
            <Col sm={2}></Col>
            <Col sm={6} style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button style={{ marginRight: "5px" }}
                className={
                  this.props.deleteProjectInputs.length > 0 && this.props.deleteProjectInputs[0] !== undefined
                    ? "showButtons"
                    : "hideButtons"
                }
                onClick={() => this.handleEditProjectDetails(this.props.deleteProjectInputs)}>
                Edit
              </Button>
              <Button style={{ marginRight: "5px" }}
                className={
                  this.props.deleteProjectInputs.length > 0 && this.props.deleteProjectInputs[0] !== undefined
                    ? "showButtons"
                    : "hideButtons"
                }
                onClick={() =>
                  this.handleDeleteProject(
                    localStorage.getItem("userId"),
                    this.props.deleteProjectInputs,
                    this.props.allProjects
                  )
                }
              >
                Delete
              </Button>
              <Button
                style={{ marginRight: "5px" }}
                onClick={() => this.handleModal(!this.state.showModal)}
              >
                Create Project
              </Button>
              <SearchBar handleSearchBar={this.handleSearchBar} />
            </Col>
          </Row>
          <Row>
            <Col sm={12} style={{ marginTop: "5px" }}>
              <Table striped bordered hover responsive>
                <TableHeader />
                <TableBody
                  allProjects={this.props.allProjects}
                  usersDetails={this.props.usersDetails}
                  searchInputs={this.state.searchInputs}
                  DELETEPROJECTS={this.props.DELETEPROJECTS}
                  handleDeleteProjectInputs={this.handleDeleteProjectInputs}
                />
              </Table>
              {/* <SpinnerComp data={this.state.allProjects} /> */}
            </Col>
            <CreateProject
              handleModal={this.handleModal}
              showModal={this.state.showModal}
            />
            {/* <EditProject
              handleModal={this.handleModal}
              showModal={this.state.showModal}
              editProjectDetails={this.state.editProjectDetails}
             /> */}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const TableHeader = props => {
  // if (!props.sheets_data[0]) {
  //   return null;
  // }
  // var data = props.sheets_data[0];
  // var keys = Object.keys(data);
  // var key = keys.filter(i => i.includes("sheet_name"));
  return (
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Status</th>
        <th>Start Date</th>
        <th>Owner</th>
      </tr>
    </thead>
  );
};


const TableBody = props => {
  let searchInputData = []
  if (props.allProjects) {
    searchInputData = props.allProjects.filter((projectData, index) => {
      props.usersDetails.forEach((userData) => {
        if (projectData.owner == userData._id) {
          projectData.owner = userData.emp_name;
        }
      });
      return projectData.name.toLowerCase().indexOf(props.searchInputs) !== -1;
    });
  }
  const rows = searchInputData.map((projectData, index) => {
    return (
      <tr key={index}>
        <td style={{ width: "30px" }}>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" value={false} onChange={() => props.handleDeleteProjectInputs(projectData._id)} />
          </Form.Group>
        </td>
        <td>{projectData.name}</td>
        <td>{projectData.status ? projectData.status : "ACTIVE"}</td>
        <td>{projectData.startDate}</td>
        <td>{projectData.owner}</td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
};

function mapStateToProps(state) {
  return {
    allProjects: state.ProjectsReducer.allProjects,
    usersDetails: state.EmployeeReducer.usersDetails,
    statusCode: state.ProjectsReducer.statusCode,
    deleteProjectInputs: state.ProjectsReducer.deleteProjectInputs

  };
}

function mapDispatchToProps(dispatch) {
  return {
    PROJECTS: async (userId) => {
      await dispatch(PROJECTS(userId));
    },
    DELETEPROJECTINPUTS: async (value) => {
      await dispatch(DELETEPROJECTINPUTS(value))
    },
    DELETEPROJECT: async (userId, deleteProjectInputs, projects) => {
      await dispatch(DELETEPROJECT(userId, deleteProjectInputs, projects))
    },
    DELETEPROJECTS: async (userId, deleteProjectInputs, projects) => {
      await dispatch(DELETEPROJECTS(userId, deleteProjectInputs, projects))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
