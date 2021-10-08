import React, { PureComponent } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";

class SearchBar extends PureComponent {
  constructor() {
    super();
  }

  render() {
    const handleSearchBar = this.props.handleSearchBar;
    return (
      <React.Fragment>
        <InputGroup style = {{width : "50%"}}>
          <FormControl
            size="sm"
            type="text"
            style = {{height : "100%"}}
            placeholder="Search"
            onChange={(event) => handleSearchBar(event)}
          />
        </InputGroup>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
