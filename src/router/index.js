
import Home from '../pages/home/Index.vue'
import WebAdvertise from '../pages/advertise/webIndex'
import H5Advertise from '../pages/advertise/h5Index'
import Finance from '../pages/finance/Index'
import charlist from '../pages/finance/charlist'
import orderlist from '../pages/finance/Orderlist'
import Logistics from  '../pages/logistics/Index'
import LogisticsRestaurant from  '../pages/logistics/restaurant/Restaurant'
import LogisticsBus from  '../pages/logistics/bus/Bus'
import LogisticsHotel from  '../pages/logistics/hotel/Hotel'

import MeetEdit from '../pages/meetedit/Index'
import MeetList from '../pages/meetlist/Index'
import Member from '../pages/member/Index'
import Statics from '../pages/statics/Index'
import System from  '../pages/system/Index'
import Carousel from '../pages/home/Carousel.vue'
import ATemplates from '../pages/advertise/webTemplates/Index'
import SelectTemp from '../pages/advertise/webTemplates/SelectTemp'
import Result from '../pages/advertise/webTemplates/Result'

/*映射*/
import Index from '../pages/finance/Index'

// Vue.use(VueRouter)   //注册
/*映射*/

import Content from '../pages/home/Content.vue'
import Login from '../pages/home/Login.vue'

/*映射*/
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
    component: WebAdvertise,
  },
  {
    path: '/advertise/web',
    component: WebAdvertise,
  },
  {
    path: '/advertise/h5',
    component: H5Advertise,
  },
  {
    path: '/advertise/web',
    component: SelectTemp,
  },
  {
    path: '/finance',
    component: Finance,
  },
  // {
  //   path: '/frontend',
  //   component: Frontend,
  // },
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
  {
    path: '/finance/invoice',
    component: invoice,
  },
  {
  path: '/finance/Index',
    component: Index,
  },
  {
    path: '/finance/neworder',
    component: neworder,
  },
  {
    path: '/finance/charlist',
    component: charlist,
  },
  {
    path: '/finance/orderlist',
    component: orderlist,
  },


]


