//import 数据 from ''	这里面可以获取数据
import * as types from './type'

export default{
      login:({commit},obj)=>{
          commit('setUser',obj.user),commit('setUserName',obj.name),commit('setUserKind',obj.kind),commit("setAccessToken",obj.access_token)
      },
      logout:({commit})=>{
          commit('delUser'),commit('delUserName'),commit('delUserKind'),commit('delAccessToken')
      },
      showByLogin:({commit})=>{
          commit('showByLogin'), commit('showSider')
      },
      hideByLogin:({commit})=>{
          commit('hideByLogin'),commit('hideSider')
      },
      showSider:({commit})=>{
          commit('showSider')
      },
      hideSider:({commit})=>{
          commit('hideSider')
      },
      showLoading:({commit})=>{
          commit('showLoading')
      },
      hideLoading:({commit})=>{
        commit('hideLoading')
      },
      showHeader:({commit})=>{
        commit('showHeader')
      },
      hideHeader:({commit})=>{
        commit('hideHeader')
      },
      showFooter:({commit})=>{
        commit('showFooter')
      },
      hideFooter:({commit})=>{
        commit('hideFooter')
      },
      showSmart:({commit})=>{
        commit('showSmart')
      },
      hideSmart:({commit})=>{
        commit('hideSmart')
      },
      setMeetId:({commit},meetId)=>{
        commit('setMeetId',meetId)
      },
}
