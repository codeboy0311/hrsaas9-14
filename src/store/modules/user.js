import { getToken, removeToken, setToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  // 放置状态
  token: getToken() // 设置token为共享状态，初始化vuex的时候，就先从缓存中读取
}
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null// 将vuex置空
    // 同步给缓存
    removeToken()
  }
}
const actions = {
  async login(context, data) {
    // 调用了api 的接口
    const result = await login(data)
    context.commit('setToken', result)
    // if (result.data.success) {

    // }
  }
}

export default {
  namesapaced: true,
  state,
  mutations,
  actions
}
