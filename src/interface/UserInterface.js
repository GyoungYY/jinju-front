import fetch from '@/interface/fetch';

const API = '/api';

export default {
    getUserInfo(id) {
       return fetch.get(API + '/getUser/'+ id).then(response =>{
           return response;
       })
    },

    login(params){
        return fetch.post(API + '/login',params).then(response =>{
            if(response.code === 0){
                return response.data;
            }else{
                return Promise.reject(response.message);
            }
        })
    },
}