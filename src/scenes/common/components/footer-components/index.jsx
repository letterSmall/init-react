import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isImmutable } from "immutable";
import { actionCreators } from '../../store'
import { connect } from 'react-redux'




import './index.less';


class Admin extends Component {

    render() {
        const { common_info_data, saveCommonInfo } = this.props
        const common_info_dataJS = isImmutable(common_info_data) ? common_info_data.toJS() : common_info_data
        const { total } = common_info_dataJS
        return (
            <div className="footer">
                <button onClick={() => { saveCommonInfo({ total: total+1 }) }}>
                    +
                </button>
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
        },
        saveCommonInfo(value) {
            dispatch(actionCreators.saveCommonInfo(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Admin));
