import Home from '../pages/home/Index.vue'
import WebAdvertise from '../pages/advertise/webIndex'
import H5Advertise from '../pages/advertise/h5Index'
import Finance from '../pages/finance/Index'
import Charlist from '../pages/finance/Charlist'
import Orderlist from '../pages/finance/Orderlist'
import Invoice from '../pages/finance/Invoice'
import Logistics from '../pages/logistics/Index'
import LogisticsRestaurant from '../pages/logistics/restaurant/Restaurant'
import LogisticsBus from '../pages/logistics/bus/Bus'
import LogisticsHotel from '../pages/logistics/hotel/Hotel'

import MeetEdit from '../pages/meetedit/Meetedit'
import MeetList from '../pages/meetlist/Index'
import History from '../pages/meetlist/History'
import Addmem from '../pages/member/Addmem'
import MemberInfo from '../pages/member/MemberInfo'
import passchange from '../pages/member/passchange'
import Progress from '../pages/meetlist/Progress'
import Prepare from '../pages/meetlist/Prepare'
import AddInformation from '../pages/meetlist/AddInformation'
import AddBeforeInfor from '../pages/meetlist/AddBeforeInfor'
import AddProgressInfor from '../pages/meetlist/AddProgressInfor'
import MeetSummary from '../pages/meetlist/MeetSummary'
import Member from '../pages/member/Index'
import Statics from '../pages/statics/Index'
import StaticsAttend from '../pages/statics/StaticsAttend'
import StaticsInteract from '../pages/statics/StaticsInteract'
import StaticsMaterial from '../pages/statics/StaticsMaterial'
import StaticsSign from '../pages/statics/StaticsSign'
import System from '../pages/system/Index'
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
import Neworder from '../pages/finance/Neworder'

import Addbus from '../pages/logistics/Addbus'
import Alterbus from '../pages/logistics/Alterbus'
import Driverlist from '../pages/logistics/Driverlist'
import Adddriver from '../pages/logistics/Adddriver'
import Alterdriver from '../pages/logistics/Alterdriver'
import Travelrecord from '../pages/logistics/Travelrecord'


import User from '../pages/system/User'
import Power from '../pages/system/Power'
import loginuser from '../pages/userlogin/loginuser'

export default [
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
    path: '/meetlist/Progress',
    component: Progress,
  },
  {
    path: '/meetlist/Prepare',
    component: Prepare,
  },
  {
    name: "history",
    path: '/meetlist/History',
    component: History,
    props: true
  },
  {
    name: "addInformation",
    path: '/meetlist/AddInformation',
    component: AddInformation,
    props: true
  },
  {
    name: "addBeforeInfor",
    path: '/meetlist/AddBeforeInfor',
    component: AddBeforeInfor,
    props: true
  },
  {
    name: "meetSummary",
    path: '/meetlist/MeetSummary',
    component: MeetSummary,
    props: true
  },
  {
    name: "addProgressInfo",
    path: '/meetlist/AddProgressInfor',
    component: AddProgressInfor,
    props: true
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
    path: '/statics/Interactive',
    component: StaticsInteract,
  },
  {
    path: '/statics/attend',
    component: StaticsAttend,
  },
  {
    path: '/statics/SignIn',
    component: StaticsSign,
  },
  {
    path: '/statics/Material',
    component: StaticsMaterial,
  },
  {
    path: '/system',
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
    path: '/logistics/addbus',
    component: Addbus,
  },
  {
    path: '/logistics/alterbus',
    component: Alterbus,
  },
  {
    path: '/logistics/driverlist',
    component: Driverlist,
  },
  {
    path: '/logistics/adddriver',
    component: Adddriver,
  },
  {
    path: '/logistics/alterdriver',
    component: Alterdriver,
  },
  {
    path: '/logistics/travelrecord',
    component: Travelrecord,
  },
  {
    path: '/finance/Invoice',
    component: Invoice,
  },
  {
    path: '/finance/Index',
    component: Finance,
  },
  // {
  //   path: '/finance/neworder',
  //   component: neworder,
  // },
  {
    path: '/finance/charlist',
    component: Charlist,
  },
  {
    path: '/finance/orderlist',
    component: Orderlist,
  },
  {
    path: '/system/Index',
    component: System,
  },
  {
    path: '/system/user',
    component: User,
  },
  {
    path: '/system/power',
    component: Power,
  },
  {
    path: '/member/list',
    component: Member,
  },
  {
    name:"memberInfor",
    path: '/member/memberInfor',
    component: MemberInfo,
    props:true
  },
  {
    path: '/member/add',
    component: Addmem,
  },
  {
    path: '/member/passchange',
    component: passchange,
  },
  {
    path: '/userlogin/loginuser',
    component: loginuser,
  }

]


