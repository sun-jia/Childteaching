
import Home from '../pages/home/Index.vue'
import Advertise from '../pages/advertise/Index'
import Finance from  '../pages/finance/Index'
import Frontend from  '../pages/frontend/Index'
import Logistics from  '../pages/logistics/Index'
import MeetEdit from '../pages/meetedit/Index'
import MeetList from '../pages/meetlist/Index'
import Member from '../pages/member/Index'
import Statics from '../pages/statics/Index'
import System from  '../pages/system/Index'
import ContentOne from '../pages/home/ContentOne.vue'
import Vue from 'vue'
import Router from 'vue-router'
/*映射*/
import money from '@/pages/finance/money'
import invoice from '@/pages/finance/invoice'
import neworder from '@/pages/finance/neworder'

Vue.use(Router)   //注册
/*映射*/
export default  [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/advertise',
    component: Advertise,
  },
  {
    path: '/finance',
    component: Finance,
  },
  {
    path: '/frontend',
    component: Frontend,
  },
  {
    path: '/logistics',
    component: Logistics,
  },
  {
    path: '/meetEdit',
    component: MeetEdit,
  },
  {
    path: '/meetList',
    component: MeetList,
  },
  {
    path: '/member',
    component: Member,
  },
  {
    path: '/statics',
    component: Statics,
  },
  {
    path: '/finance',
    component: Finance,
  },
  {
    path: '/syetem',
    component: System,
  },
  {
    path: '/home',
    redirect: '/home/index',
    component: Home,
    children: [
      {
        path: 'index',
        component: ContentOne
      }
    ]
  },
  {
    path:'/money',
    name:'money',
    component:money
  },
  {
    path:'/invoice',
    name:'invoice',
    component:invoice
  },
  {
    path:'/neworder',
    name:'neworder',
    component:neworder
  }

]


