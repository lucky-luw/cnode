import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const actions={
    async getTopics({commit},{tab,page,limit}){
        try {
            let result=await Vue.prototype.$API.requestTopic(tab, page, limit)
            commit('GETTOPICS',result.data)
        } catch (error) {
           return error
        }
    },
}
const mutations={
    GETTOPICS(state,value){
        state.topics.push(...value)
    }
}
const state={
    topics:[]
}
export default new Vuex.Store({
    actions, mutations, state
})