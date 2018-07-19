import {} from './type'

import getters from './getters'

const state={
	sider:false,
  Loading:false,
};

const mutations={
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
