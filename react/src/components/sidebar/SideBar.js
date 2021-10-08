import React, { PureComponent } from "react";
import { connect } from "react-redux";



class SideBar extends PureComponent {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <SheetDetails />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
