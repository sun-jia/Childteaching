//import 数据 from ''	这里面可以获取数据
import * as types from './type'

export default{
     showSider:({commit})=>{
         commit('showSider')
     },
     hideSider:({commit})=>{
      commit('hideSider')
    }

}
