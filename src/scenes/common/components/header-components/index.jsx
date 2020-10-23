import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isImmutable } from "immutable";
import { actionCreators } from '../../store'
import { connect } from 'react-redux'



import './index.less';


class Admin extends Component {

    render() {
        const { common_info_data } = this.props
        const common_info_dataJS = isImmutable(common_info_data) ? common_info_data.toJS() : common_info_data
        const { total }=common_info_dataJS
        return (
            <div className="header">
                {total}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        common_info_data: state.getIn(['common', 'common_info_data'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCommonInfo(value) {
            dispatch(actionCreators.getCommonInfo(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Admin));
