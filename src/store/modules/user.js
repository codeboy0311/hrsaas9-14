import { getToken, removeToken, setToken, setTimeStamp, getTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

const state = {
  // 放置状态
  token: getToken(), // 设置token为共享状态，初始化vuex的时候，就先从缓存中读取
  userInfo: {} // 定义一个空的对象，不是null 因为后边我要开发userinfo的属性给别人用 userinfo.name
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
  },
  setUserInfo(state, result) {
    // 更新一个对象
    state.userInfo = { ...result }// 这样是响应式
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    // 调用了api 的接口
    const result = await login(data)
    context.commit('setToken', result)
    setTimeStamp()
  },
  async getUserInfo(context) {
    const result = await getUserInfo() // 获取返回值
    const baseInfo = await getUserDetailById(result.userId) // 用户的详情数据
    const baseResult = { ...result, ...baseInfo } // 两个获取信息进行合并

    context.commit('setUserInfo', baseResult) // 将整个的个人信息设置到用户的vuex中
    return result // 这里为什么要返回 为后面埋下伏笔
  },
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }

}

export default {
  namesapaced: true,
  state,
  mutations,
  actions
}
