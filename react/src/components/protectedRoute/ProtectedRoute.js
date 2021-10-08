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
    if (this.token !== undefined && this.token.length > 1) {
      this.isAuthenticated = true;
    }
  }

  render() {
    if (!this.isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    } else {
      const component = this.props.component;
      const path = this.props.path;

      return (
        // <Route
        //   render={() => {
        //     return <Component />;
        //   }}
        // />
        <Route path = {path} component={component} />
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
