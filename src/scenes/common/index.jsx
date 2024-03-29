import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { isImmutable } from "immutable";
import { actionCreators } from './store'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

// 公共组件
import Header from './components/header-components'
import Footer from './components/footer-components'

// 页面组件
import Dash from '../index'

import './index.less';


class Admin extends Component {
    constructor(props) {
        super(props);
        props.getCommonInfo()
    }

    render() {
        const { local_data } = this.props
        const local_dataJS = isImmutable(local_data) ? local_data.toJS() : local_data
        const { total } = local_dataJS
        return (
            <Fragment>
                <Header />
                <Switch>
                    <Redirect from='/' exact to='/dash' />
                    <Route path='/dash' component={Dash} />

                </Switch>
                <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Admin));



