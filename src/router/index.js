
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
import Carousel from '../pages/home/Carousel.vue'
import ATemplates from '../pages/aTemplates/Index'
import SelectTemp from '../pages/aTemplates/SelectTemp'
import Result from '../pages/aTemplates/Result'

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
        component:Carousel
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

]


