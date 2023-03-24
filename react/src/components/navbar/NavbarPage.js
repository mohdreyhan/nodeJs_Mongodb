import React, { Component } from "react";
import {
  Navbar,
  Button,
  Image,
  Dropdown,
  Container,
  Row,
  Nav,
} from "react-bootstrap";
import "./NavbarPage.css";
import { withRouter, Link } from "react-router-dom";
import { USERLOGOUT } from "../../actions/ActionCreators";
import { connect } from "react-redux";
import navbarMenu from "./navbarMenu";
import userImage from "../../images/user.png"

class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownStatus: false,
    };
  }


  logout = () => {
    this.setState({
      dropdownStatus: !this.state.dropdownStatus,
    });
    this.props.USERLOGOUT(localStorage.getItem("userId"), this.props.history);
  };

  render() {
    const token = document.cookie
      ? document.cookie
        .split("; ")
        .find((row) => row.startsWith("authtoken="))
        .split("=")[1]
      : undefined;
    if (token && token.length > 1) {
      return (
        <React.StrictMode>
          <Navbar expand="lg" style={{ margin: "5px" }}>
            {/* <Button variant="light" style={{ width: 40, height: 40 }}>
              <Image
                src={require("../../images/menu.png")}
                style={{ width: "inherit", height: "inherit" }}
              />
            </Button> */}
            <Navbar.Brand to="/dashboard" as={Link}>
              <span className="navbartitle">
                {" "}
                Work<span style={{ color: "red" }}>Tracker</span>{" "}
              </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {navbarMenu.map((menu, index) => {
                  return (
                    <Nav.Link className="navlinks" as={Link} to={menu.path} key={index}>
                      {menu.name}
                    </Nav.Link>
                  )
                })
                }
              </Nav>
              <Button
                variant="dark"
                className="mr-sm-4"
                onClick={() =>
                  this.setState({
                    dropdownStatus: !this.state.dropdownStatus,
                  })
                }
                style={{ borderRadius: "100%", padding: "1px" }}
              >
                <Image
                  src={userImage}
                  style={{ width: 40, height: 40 }}
                  roundedCircle
                />
              </Button>
              <Dropdown.Menu show={this.state.dropdownStatus} alignRight>
                <Dropdown.Item eventKey="1" to= "/profile" as={Link}>Profile</Dropdown.Item>
                <Dropdown.Item eventKey="2" to="/users" as={Link}>
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="3" onClick={this.logout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Navbar.Collapse>
          </Navbar>
        </React.StrictMode>
      )
    } else {
      return (
        <React.Fragment></React.Fragment>
      )
    }
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    USERLOGOUT: (emp_id, history) => {
      dispatch(USERLOGOUT(emp_id, history));
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavbarPage)
);
