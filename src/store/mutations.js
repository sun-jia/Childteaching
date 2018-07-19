import {} from './type'

import getters from './getters'

const state={
	sider:false
};

const mutations={
    showSider(){
        state.sider=true
    },
  hideSider(){
    state.sider=false
  }
};

export default{
	state,
	mutations,
  getters
}
