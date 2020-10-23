import ajax from './ajax';
import { API_DOMAIN } from '../utils/constants';

/** 第一维度 */
/** 入口（Index）模块 */


/** Dashborad 模块 */
export const mock_demo = (params) => ajax(API_DOMAIN + '/mock_demo', params, 'GET');
