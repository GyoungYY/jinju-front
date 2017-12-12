import fetch from '@/interface/fetch';

const API = '/api';

export default {
    getJinjuList(params = {}) {
       return fetch.get(API + '/getJinjuList',params).then(response =>{
        if(response.code === 0){
            return response.data;
        }else{
            return Promise.reject(response.message);
        }
       })
    },
}