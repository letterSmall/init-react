import * as constants from './constants'


export const getCommonInfo = (value) => ({
    type: constants.GET_COMMON_INFO,
    value
})

// 保存本地数组数据
export const saveLoaclDataArray = (key, value) => ({
    type: constants.SAVE_LOCAL_DATA_ARRAY,
    key,
    value
})

// 保存本地对象数据
export const saveLoaclData = (value) => ({
    type: constants.SAVE_LOCAL_DATA,
    value
})