import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.isAuthenticated = false;
    this.token = document.cookie
      ? document.cookie
        .split("; ")
        .find((row) => row.startsWith("authtoken="))
        .split("=")[1]
      : undefined;
      console.log("dsadsadsadas",document.cookie)
    if (this.token !== undefined && this.token.length > 1) {
      this.isAuthenticated = true;
    }
  }

  render() {
    console.log("bc")

    const component = this.props.component;
    const path = this.props.path;
    if (!this.isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    } else {
      console.log("loggedin")
      return (
        <Route path={path} component={component} />
        // <Route
        //   render={() => {
        //     return <Component />;
        //   }}
        // />
      );
    }
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
