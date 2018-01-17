import * as types from './mutation-types'
//test
export const increment = ({commit}) => {
  commit(types.INCREMENT)
}
export const decrement = ({commit}) => {
  commit(types.DECREMENT)
}
export const setTopMenuActive = ({commit}, name) => {
  commit(types.TOP_MENU_ACTIVE, name)
}
export const setLeftMenuActive = ({commit}, name) => {
  commit(types.LEFT_MENU_ACTIVE, name)
}
export const setLeftMenus = ({commit}, leftMenus) => {
  commit(types.LEFT_MENUS, leftMenus)
}
export const setBreadcrumbs = ({commit}, breadcrumbs) => {
  commit(types.BREADCRUMBS, breadcrumbs)
}
