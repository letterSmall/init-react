import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { isImmutable } from "immutable";
import { actionCreators } from './store'
import { connect } from 'react-redux'

    

import './index.less';


class Dash extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        const { local_data } = this.props
        const local_dataJS = isImmutable(local_data) ? local_data.toJS() : local_data
        const { total } = local_dataJS
        return (
            <Fragment>
                {total}
            </Fragment>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        local_data: state.getIn(['common', 'local_data'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCommonInfo(value) {
            dispatch(actionCreators.getCommonInfo(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dash));

