import * as constants from './constants'
import { fromJS } from "immutable";

const defaultState = fromJS({
    common_info_data: {
        total: 0
    }

})

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.SAVE_COMMON_INFO:
            return state.mergeDeep({ 'common_info_data': action.value })
        default:
            return state;
    }
}
