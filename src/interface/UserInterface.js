import fetch from '@/interface/fetch';

const API = '/api';

export default {
    //获取用户信息
    getUserInfo(id) {
        return fetch.get(API + '/getUser/' + id).then(response => {
            if (response.code === 0) {
                return response.data;
            } else {
                return Promise.reject(response.message);
            }
        })
    },

    //登录
    login(params) {
        return fetch.post(API + '/login', params).then(response => {
            if (response.code === 0) {
                return response.data;
            } else {
                return Promise.reject(response.message);
            }
        })
    },

    //注册
    register(params) {
        return fetch.post(API + '/createUser', params).then(response => {
            if (response.code === 0) {
                return response.data;
            } else {
                return Promise.reject(response.message);
            }
        })
    },

    //更新用户信息
    updateUser(params) {
        return fetch.post(API + '/updateUser', params, 'json').then(response => {
            if (response.code === 0) {
                return response.message;
            } else {
                return Promise.reject(response.message);
            }
        })
    },
}
