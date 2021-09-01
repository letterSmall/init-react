import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isImmutable } from "immutable";
import { actionCreators } from '../../store'
import { connect } from 'react-redux'



import './index.less';


class Admin extends Component {

    render() {
        const { local_data, saveLoaclData } = this.props
        const local_dataJS = isImmutable(local_data) ? local_data.toJS() : local_data
        const { total } = local_dataJS
        return (
            <div className="header">
                <button onClick={() => { saveLoaclData({ total: total - 1 }) }}>
                     - 
                </button>
            </div>
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
        },
        saveLoaclData(value) {
            dispatch(actionCreators.saveLoaclData(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Admin));
