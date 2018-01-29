import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

/**
 * 使用方法：
 * {{$store.state.activeName}}
 * this.$store.commit('changeTab',key);
 */
export default new vuex.Store({
    state: {
        activeName: sessionStorage.getItem("activeName") || "jinjuList",
        userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
    },
    mutations: {
        changeTab(state, index) {
            state.activeName = index;
            sessionStorage.setItem("activeName", index);
        },

        updateUserInfo(state, userInfo) {
            state.userInfo = userInfo;
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        },
    }
})
