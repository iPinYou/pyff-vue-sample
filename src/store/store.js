import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as types from './mutation-types'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// 应用初始状态
const state = {
  count: 10,//test
  topMenuActive: 'advertiser',
  leftMenuActive: '',
  leftMenus: [],
  breadcrumbs: [],
}
const mutations = {
  [types.TOP_MENU_ACTIVE] (state, name) {
    state.topMenuActive=name;
  },
  [types.LEFT_MENU_ACTIVE] (state, name ) {
    state.leftMenuActive=name;
  },
  [types.LEFT_MENUS] (state, menus ) {
    state.leftMenus = menus;
  },
  [types.BREADCRUMBS] (state, breadcrumbs ) {
    state.breadcrumbs = breadcrumbs;
  },
  [types.INCREMENT](state) {
    state.count++
  },
  [types.DECREMENT](state) {
    state.count--
  },
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
})
