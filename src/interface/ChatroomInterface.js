import fetch from '@/interface/fetch';

const API = '/api';

export default {

    //获取游客id
    getVisitorId(id) {
        return fetch.get(API + '/chat/getVisitorId').then(response => {
            if (response.code === 0) {
                return response.data;
            } else {
                return Promise.reject(response.message);
            }
        })
    },

    //获取历史消息
    getHistoryMessage(limit) {
        return fetch.get(API + '/chat/getHistoryMessage' , { limit: limit }).then(response => {
            if (response.code === 0) {
                return response.data;
            } else {
                return Promise.reject(response.message);
            }
        })
    },
}