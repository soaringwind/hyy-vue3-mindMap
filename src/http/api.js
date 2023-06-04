import $http from "./index.js";
import Qs from 'qs'

const address = "http://127.0.0.1"
const port = 5000

export const getHttpData = $http.get('http://127.0.0.1:5000/')
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function getHttp(url, params = {}) {
    return new Promise((resolve, reject) => {
        $http.get(url)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}
 
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function postHttp(url='http://127.0.0.1:5000/api/saveData/', data = {}) {
    data = Qs.stringify({"data": data})
    return new Promise((resolve, reject) => {
        $http.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}
