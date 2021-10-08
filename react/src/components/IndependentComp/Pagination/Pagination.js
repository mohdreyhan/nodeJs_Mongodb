import React, { PureComponent } from "react";
import { Pagination } from "react-bootstrap";
import { connect } from "react-redux";

class Pagination extends PureComponent {
  constructor() {
    super();
  }

  render() {
    const handleSearchBar = this.props.handleSearchBar;
    return (
      <React.Fragment>
       <Pagination>
              <Pagination.Prev
                onClick={() => this.pagItemHandler(this.state.currentPage - 1)}
              />
              <Pag
                pages={this.state.pages}
                active={this.state.active}
                pagItemHandler={this.pagItemHandler}
              />
              <Pagination.Next
                onClick={() => this.pagItemHandler(this.state.currentPage + 1)}
              />
            </Pagination>
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

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
