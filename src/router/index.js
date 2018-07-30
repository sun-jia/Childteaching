
import Home from '../pages/home/Index.vue'
import Advertise from '../pages/advertise/Index'
import Finance from  '../pages/finance/Index'
import Frontend from  '../pages/frontend/Index'

import Logistics from  '../pages/logistics/Index'
import LogisticsRestaurant from  '../pages/logistics/Restaurant'
import LogisticsBus from  '../pages/logistics/Bus'
import LogisticsHotel from  '../pages/logistics/Hotel'

import MeetEdit from '../pages/meetedit/Index'
import MeetList from '../pages/meetlist/Index'
import Member from '../pages/member/Index'
import Statics from '../pages/statics/Index'
import System from  '../pages/system/Index'
import Content from '../pages/home/Content.vue'
import Login from '../pages/home/Login.vue'

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
    children: [
      {
        path: 'bus',
        component: LogisticsBus
      },
      {
        path: 'hotel',
        component: LogisticsHotel
      },
      {
        path: 'restaurant',
        component: LogisticsRestaurant
      }
    ]
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
        component: Content
      },
      {
        path: 'login',
        component: Login
      }
    ]
  }

]


