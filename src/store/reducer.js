import {combineReducers} from "redux-immutable";
import {commonReducer} from '../scenes/common/store'
import {dashReducer} from '../scenes/index/store'


const reducer = combineReducers({
    common: commonReducer,
    dash: dashReducer,
})

export default reducer;
