import {combineReducers} from "redux-immutable";
import {commonReducer} from '../scenes/common/store'


const reducer = combineReducers({
    common: commonReducer,
})

export default reducer;
