import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { isImmutable } from "immutable";
import { actionCreators } from './store'
import { connect } from 'react-redux'

// 公共组件
import Header from './components/header-components'
import Footer from './components/footer-components'


import './index.less';


class Admin extends Component {
    constructor(props) {
        super(props);
        props.getCommonInfo()
    }

    render() {
        const { common_info_data } = this.props
        const common_info_dataJS = isImmutable(common_info_data) ? common_info_data.toJS() : common_info_data
        const { total } = common_info_dataJS
        return (
            <Fragment>
                <Header />

                <div className="center">
                    {total}
                </div>

                <Footer />
            </Fragment>

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



