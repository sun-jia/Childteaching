import {} from './type'

import getters from './getters'

const state={
	sider:false,
  Loading:false,
  header:true,
  footer:true
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
    showHeader(){
      state.header=true
    },
    hideHeader(){
      state.header=false
    },
    showFooter(){
      state.footer=true
    },
    hideFooter(){
      state.footer=false
    },
};

export default{
	state,
	mutations,
  getters
}
