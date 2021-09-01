import * as constants from './constants'
import { fromJS } from "immutable";

const defaultState = fromJS({
    local_data: {
        total: 0
    },
    local_data_array: {
        mock_array: []
    }
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.SAVE_LOCAL_DATA:
            return state.mergeDeep({ 'local_data': action.value })
        case constants.SAVE_LOCAL_DATA_ARRAY:
            return state.setIn(['local_data_array', action.key], action.value)
        default:
            return state;
    }
}
