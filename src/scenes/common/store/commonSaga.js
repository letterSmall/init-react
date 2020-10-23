import { takeEvery, put } from 'redux-saga/effects'
import { actionCreators } from "./index";
import { constants } from './index'
import { mock_demo } from "../../../api/";

function* getCommonInfo(getAction){
    try {
        const getData = yield mock_demo()
        yield put(actionCreators.saveCommonInfo(getData.data))
    } catch (error) {
        console.log('getCommonInfo:' + error)
    }
}

function* commonSaga() {
    yield takeEvery(constants.GET_COMMON_INFO, getCommonInfo)
}

export default commonSaga
