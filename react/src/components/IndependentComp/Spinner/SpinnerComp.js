import React, { PureComponent } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { SPINNER } from "../../../actions/IndependentComp/Actions";


class SpinnerComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      noDataMsg: "",
    }
  }

  async componentDidMount() {
    await this.props.SPINNER(!this.props.showSpinner)
    if (this.props.data !== undefined || this.props.data !== []) {
      await this.props.SPINNER(!this.props.showSpinner)
      this.setState({
        showSpinner: this.props.showSpinner
      })
    } else {
      setTimeout(async () => {
        await this.props.SPINNER(!this.props.showSpinner);
        this.setState({
          noDataMsg: "No data to display"
        });
      }, 5000);
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.showSpinner ? (
          <Spinner animation="border" />
        ) : (
          <React.Fragment>{this.state.noDataMsg}</React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    showSpinner: state.IndependentComp.showSpinner,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    SPINNER: async (value) => {
      console.log(value)
      await dispatch(SPINNER(value))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpinnerComp);
