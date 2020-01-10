/**
 * axios 网络请求封装1
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';

import signature from './signature';

let _sign_key = '';
let _sign_secret = '';
let _errorHandle = () =>{};
let _error_msg  = {
    timeoutMsg:'请求超时，请稍后重试',
    noNetworkMsg:'没有网络连接，请检查您的网络设置',
    networkErrorMsg:'服务器开小差了，请稍后重试',
    otherErrorMsg:'服务器开小差了，请稍后重试'
}

const log = (title, data) => {
    console.group(title);
    console.log(data);
    console.groupEnd();
};
/**
 * 请求接口报错信息，可在httpConfig中配置
 * @param status 状态码 1000，400， 401等
 * @param msg
 * @param response
 * */
const errorHandler = (status, msg, response) => {
    _errorHandle({status, msg, response})
};

const returnResponse = (response = {}) => {
    const responseData = response.data || {};
    const config = response && response.config || {};
    const api = config.url || '';
    const requestTime = config.requestTime || Date.now();
    const responseTime = Date.now() - requestTime;
    log('response', {
        api: api,
        status: response.status,
        statusText: response.statusText,
        responseData: responseData,
        responseTime: responseTime
    });
    const {status, msg, message, data} = responseData;
    const _status = response.status !== 200 ? response.status : status;
    let _msg = msg || message || 'ok';
    if (_status !== 0) {
        _msg = msg || message;
        errorHandler(_status, _msg, response);
    }
    return Promise.resolve({status: _status, data: data, msg: _msg, message: _msg});
};

axios.defaults.headers.common.Accept = 'application/json';

// 请求拦截器
axios.interceptors.request.use((config) => {
    console.log('测测试一下config.headers.access_token:::',config.headers.access_token)
    const withoutCheckSign = config.withoutCheckSign || false; // 不需要阿里验签
    if (!withoutCheckSign && config.headers.access_token) {
        console.log('测测试一下1111config.headers.access_token:::',config.headers.access_token)
        config.headers.common.Authorization = config.headers.access_token;
    }
    if (!withoutCheckSign) {
        if (config.method.toLocaleUpperCase() !== 'GET') {
            config.headers['Content-Type'] = 'application/json; charset=UTF-8';
        } else {
            // POST 请求使用此content type 验签失败
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
    }
    const _requestConfig = config.hasOwnProperty('__retryCount') || withoutCheckSign ? config : signature(config, _sign_key, _sign_secret);
    log('request', {
        api: _requestConfig.url,
        method: _requestConfig.method,
        params: _requestConfig.params,
        data: _requestConfig.data && typeof _requestConfig.data === 'string' ? JSON.parse(_requestConfig.data) : '',
        stringToSign: _requestConfig.stringToSign,
        requestConfig:_requestConfig
    });
    return _requestConfig;
}, (error) => Promise.reject(error));
// 响应拦截器
axios.interceptors.response.use((response) => returnResponse(response), (error) => {
    const {config, request, response, message} = error || {};
    const onLine = navigator.onLine;
    // 请求重试
    if (onLine && config && config.retry && config.retry > 0) {
        config.__retryCount = config.__retryCount || 0;
        if (config.__retryCount < config.retry) {
            config.__retryCount = config.__retryCount + 1;
            if (config.__retryDelayTimeout) {
                clearTimeout(config.__retryDelayTimeout);
            }
            const timeout = new Promise((resolve) => {
                config.__retryDelayTimeout = setTimeout(() => {
                    resolve();
                }, config.retryDelay || 1);
            });
            return timeout.then(() => axios.request(config));
        }
    }

    if (response && onLine) {
        // 请求已经发出，但响应为非200状态
        return returnResponse(response);
    }
    // 请求已经发出，但未收到任何响应。
    // 网络错误、无网络连接...
    let errorMessage = message;
    if (!onLine) {
        errorMessage = _error_msg.noNetworkMsg;
    } else if (message.indexOf('Network Error') !== -1) {
        errorMessage = _error_msg.networkErrorMsg;
    } else if (message.indexOf('timeout') !== -1) {
        errorMessage = _error_msg.timeoutMsg;
    } else {
        errorMessage = _error_msg.otherErrorMsg;
    }
    return returnResponse({
        status: -1000,
        statusText: message,
        config: config,
        request: request,
        data: {status: -1000, msg: errorMessage}
    });
});

/**
 * 配置http请求
 * @param sign_key 阿里验签key
 * @param sign_secret 阿里验签秘钥
 * @param errorHandle 返回错误信息
 * */
export function httpConfig({sign_key, sign_secret, errorHandle = () =>{}, errorMsg = {}}) {
    _sign_key = sign_key;
    _sign_secret = sign_secret;
    _errorHandle = errorHandle;
    _error_msg = {..._error_msg, ...errorMsg}
}

/**
 * @param host
 * @param uri
 * @param params 已GET和HEAD请求
 * @param data 已POST和PUT请求
 * @param method
 * @param headers.access_token 
 * @param options.withoutCheckSign 是否不需要阿里验签， 默认 false
 * @param options.timeout 超时时间， 默认 10 * 1000
 * @param options.retry 请求失败自动重试次数， 默认 3
 * @param options.retryDelay 重试间隔， 默认 2000
 * */
export function request({host, uri, params = {}, data = {}, headers = {}, method = 'GET', options = {}}) {
    const url = host + uri;
    if (url.indexOf('http') !== 0) {
        throw new Error(`非法请求: ${url}`);
    }
    // GET方法参数处理
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];
            if (value === undefined || value === null || value === '') {
                delete params[key];
            }
        }
    }
    const defaultOptions = {
        withoutCheckSign: false,
        timeout: 10 * 1000,
        retry: 3,
        retryDelay: 2000,
    };
    const defaultHeaders = {

    }
    const config = {
        ...defaultOptions,
        ...options,
        url: url,
        headers:{...defaultHeaders, ...headers},
        method: method,
        params:params,
        data: JSON.stringify(data),
        requestTime: Date.now(),
    };
    return axios.request(config);
}
