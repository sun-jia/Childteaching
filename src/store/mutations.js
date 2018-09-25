import {} from './type'

import getters from './getters'
import actions from "./actions";

//刷新将重新加载这个部分
const state={
  user:JSON.parse(localStorage.getItem("vuex"))?JSON.parse(localStorage.getItem("vuex"))['user']:"",
  name:JSON.parse(localStorage.getItem("vuex"))?JSON.parse(localStorage.getItem("vuex"))['name']:"",
  kind:JSON.parse(localStorage.getItem("vuex"))?JSON.parse(localStorage.getItem("vuex"))['kind']:"",
  access_token:JSON.parse(localStorage.getItem("vuex"))?JSON.parse(localStorage.getItem("vuex"))['access_token']:"",
	sider:JSON.parse(localStorage.getItem("vuex"))?JSON.parse(localStorage.getItem("vuex"))['sider']:false,
  login:JSON.parse(localStorage.getItem("vuex"))?JSON.parse(localStorage.getItem("vuex"))['login']:true,
  Loading:JSON.parse(localStorage.getItem("vuex"))?JSON.parse(localStorage.getItem("vuex"))['Loading']:false,
  Smart:false
};

const mutations={
    setAccessToken:function(state,access_token){
      state.access_token =access_token;
      localStorage.setItem("vuex",JSON.stringify(state));    },
    delAccessToken(){
      state.access_token=""
      localStorage.setItem("vuex",JSON.stringify(state));    },
    setUser:function(state,user){
      state.user =user;
      localStorage.setItem("vuex",JSON.stringify(state));    },
    delUser(){
      state.user=""
      localStorage.setItem("vuex",JSON.stringify(state));    },
    setNAME:function(state,name){
      state.name =name;
      localStorage.setItem("vuex",JSON.stringify(state));    },
    delNAME(){
      state.name=""
      localStorage.setItem("vuex",JSON.stringify(state));    },
    setUserKind:function(state,kind){
      state.kind =kind;
      localStorage.setItem("vuex",JSON.stringify(state));    },
    delUserKind(){
      state.kind=""
      localStorage.setItem("vuex",JSON.stringify(state));    },
    showByLogin(){
      state.login=true
      localStorage.setItem("vuex",JSON.stringify(state));    },
    hideByLogin(){
      state.login=false
      localStorage.setItem("vuex",JSON.stringify(state));    },
    showSider(){
      state.sider=true
      localStorage.setItem("vuex",JSON.stringify(state));    },
    hideSider(){
      state.sider=false
      localStorage.setItem("vuex",JSON.stringify(state));    },
    showLoading(state){
      state.Loading=true
      localStorage.setItem("vuex",JSON.stringify(state));    },
    hideLoading(state){
      state.Loading=false
      localStorage.setItem("vuex",JSON.stringify(state));    },
    showSmart(state){
      state.Smart=true                                      },
    hideSmart(state){
      state.Smart=false                                     },
};

export default{
	state,
	mutations,
  getters,
  actions
}
