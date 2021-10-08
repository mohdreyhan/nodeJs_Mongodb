import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import ExcelReader from "./ExcelReader";

class index extends Component {
  // componentDidMount() {
  //   if (!localStorage.getItem("token")) {
  //     this.props.history.replace({
  //       pathname: "/"
  //     });
  //   }
  // }
  render() {
    return (
      <Container>
        {(() => {
          if (localStorage.getItem("role") === "employee/manager") {
            return (
              <Container
                style={{
                  border: "solid 1px black",
                  borderRadius: 30,
                  marginTop: 10
                }}
              >
                <ExcelReader />
                <center>{this.props.taskaddedsuccessmsg}</center>
              </Container>
            );
          }
        })()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    taskaddedsuccessmsg: state.ManagerReducer.taskaddedsuccessmsg
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(index);
