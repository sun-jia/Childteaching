
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
import Carousel from '../pages/home/Carousel.vue'
import ATemplates from '../pages/aTemplates/Index'
import SelectTemp from '../pages/aTemplates/SelectTemp'
import Result from '../pages/aTemplates/Result'
import Content from '../pages/home/Content.vue'
import Login from '../pages/home/Login.vue'

/*映射*/
import money from '@/pages/finance/money'
import invoice from '@/pages/finance/invoice'
import neworder from '@/pages/finance/neworder'

import Addbus from '../pages/logistics/Addbus'
import Alterbus from '../pages/logistics/Alterbus'
import Driverlist from '../pages/logistics/Driverlist'
import Adddriver from '../pages/logistics/Adddriver'
import Alterdriver from '../pages/logistics/Alterdriver'
import Travelrecord from '../pages/logistics/Travelrecord'

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
  },

  {
    path: '/templates',
    component: ATemplates,
  },
  {
    path: '/selectTemp',
    component: SelectTemp,
  },
  {
    path: '/result',
    component: Result,
  },
  {
    path:'/logistics/addbus',
    component:Addbus,
  },
  {
    path:'/logistics/alterbus',
    component:Alterbus,
  },
  {
    path:'/logistics/driverlist',
    component:Driverlist,
  },
  {
    path:'/logistics/adddriver',
    component:Adddriver,
  },
  {
    path:'/logistics/alterdriver',
    component:Alterdriver,
  },
  {
    path:'/logistics/travelrecord',
    component:Travelrecord,
  },
]


