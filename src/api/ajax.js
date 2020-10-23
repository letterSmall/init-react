import axios from 'axios';
import qs from 'qs';

const CancelToken = axios.CancelToken
let sources = []
let removeSource = (config) => {
    for (let source in sources) {
        // 当多次请求相同时，取消之前的请求
        if (sources[source].umet === config.url + '&' + config.method) {
            sources[source].cancel("取消请求")
            sources.splice(source, 1)
        }
    }
}

// 请求响应
axios.interceptors.request.use(config => {
    let url = config.url.split('/');
    let method = url[url.length - 1]
    if (method !== 'g_single_translation' && method !== 's_one_third_party_app_trans') {
        removeSource(config)
        config.cancelToken = new CancelToken((c) => {
            // 将取消函数存起来
            sources.push({ umet: config.url + '&' + config.method, cancel: c })
        })
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 结果响应
axios.interceptors.response.use(response => {
    // 请求结束后将对应存储的取消函数删除
    removeSource(response.config)
    return response
}, error => {
    return Promise.reject(error)
})

export default function ajax(url, data = {}, type = 'GET', headers = "false") {
    return new Promise((resolve, reject) => {
        let promise;
        // GET 请求
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        }
        // POST 请求
        else if (type === 'POST') {
            if (headers === 'false') {
                promise = axios.post(url, qs.stringify(data))
            } else {
                promise = axios.post(url, data)
            }
        }
        // 请求成功
        promise.then((response, reject) => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}
