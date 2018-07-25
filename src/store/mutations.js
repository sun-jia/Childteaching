import {} from './type'

import getters from './getters'

const state={
  user:"",
  name:"",
  kind:"",
  access_token:"",
	sider:false,
  login:true,
  Loading:false,
};

const mutations={
    setAccessToken:function(state,access_token){
      state.access_token =access_token;
    },
    delAccessToken(){
      state.access_token=""
    },
    setUser:function(state,user){
      state.user =user;
    },
    delUser(){
      state.user=""
    },
    setUserName:function(state,name){
      state.name =name;
    },
    delUserName(){
      state.name=""
    },
    setUserKind:function(state,kind){
      state.kind =kind;
    },
    delUserKind(){
      state.kind=""
    },
    showByLogin(){
      state.login=true
    },
    hideByLogin(){
       state.login=false
    },
    showSider(){
      state.sider=true
    },
    hideSider(){
      state.sider=false
    },
    showLoading(state){
      state.Loading=true
    },
    hideLoading(state){
      state.Loading=false
    },
};

export default{
	state,
	mutations,
  getters
}
