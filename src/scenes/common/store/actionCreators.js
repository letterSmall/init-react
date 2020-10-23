import * as constants from './constants'

/* common */
export const saveCommonInfo = (value) => ({
    type: constants.SAVE_COMMON_INFO,
    value
})

export const getCommonInfo = (value) => ({
    type: constants.GET_COMMON_INFO,
    value
})