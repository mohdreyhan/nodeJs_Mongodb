import React, { Component } from "react";
import { connect } from "react-redux";
import SheetDetails from "../manager/showtasks/SheetDetails";
import EmpTaskTabs from "../Employee/EmpTaskTabs";
import { FETCHUSERS } from "../../actions/ActionCreators";
import token from "../../lib/token";



class Dashboard extends Component {
  async componentDidMount() {
    if (localStorage.getItem("sheet_id")) {
      localStorage.removeItem("sheet_id");
    }
    await this.props.FETCHUSERS();
  }

  render() {
    if (document.cookie) {
      token.authtoken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authtoken="))
        .split("=")[1];
    }
    if (localStorage.getItem("role") === "employee/manager") {
      return (
      <React.Fragment>
        <SheetDetails />
      </React.Fragment>
      )
    }
    else if (localStorage.getItem("role") === "employee") {
      return (
        <React.Fragment>
          <EmpTaskTabs />
        </React.Fragment>
      );
    }
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    FETCHUSERS: async () => {
      return dispatch(FETCHUSERS())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
