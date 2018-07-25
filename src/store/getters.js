
export default {
  getAccessToken:(state)=>{
    return state.access_token
  },
  getUserName:(state)=>{
    return state.name
  },
  showSider:(state)=>{
    return state.sider
  },
  showByLogin:(state)=>{
    return state.login
  },
  loading:(state)=>{
    return state.Loading
  },
}
