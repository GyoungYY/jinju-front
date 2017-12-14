import fetch from '@/interface/fetch';

const API = '/api';

export default {

    //获取金句列表
    getJinjuList(params = {}) {
        return fetch.get(API + '/getJinjuList', params).then(response => {
            if (response.code === 0) {
                return response.data;
            } else {
                return Promise.reject(response.message);
            }
        })
    },

    //创建金句
    createJinju(params) {
        return fetch.post(API + '/createJinju', params, 'json').then(response => {
            if (response.code === 0) {
                return response.message;
            } else {
                return Promise.reject(response.message);
            }
        })
    },
}
