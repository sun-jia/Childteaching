<template>
    <div class="topImg">
      <!--头部开始-->
      <el-row v-show="Lshow">
        <el-col :span="16" :offset="4" >
          <div class="grid-content"><Language></Language></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <div class="grid-content banners"><Banner v-bind:banner="banner"></Banner></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <div class="grid-content bg-purple-dark"><Nav v-bind:nav="nav"></Nav></div>
        </el-col>
      </el-row>
      <!--头部结束-->

      <el-row class="myHeigh" :gutter="20">
        <el-col :span="11" :offset="4">
          <div class="grid-content carouselColor"><Carousel :hide="1" v-bind:carousel="carousel"></Carousel></div>
          <div class="grid-content"><Information v-bind:information="information"></Information></div>
          <div class="grid-content"><Dynamic v-bind:dynamic="dynamic"></Dynamic></div>
          <div class="grid-content"><Links v-bind:links="links"></Links></div>
          <div><Advertise v-bind:advertise="advertise"></Advertise></div>
        </el-col>
        <el-col :span="5" class="side">
          <div class="grid-content"><DeadTime v-bind:deadtime="deadtime"></DeadTime></div>
          <div class="grid-content m30"><TimeInfo v-bind:timeinfo="timeinfo"></TimeInfo></div>
          <div class="grid-content m30"><Button v-bind:buttons="buttons"></Button></div>
          <div class="grid-content"><Organization v-bind:organization="organization"></Organization></div>
          <div class="grid-content"><Connect v-bind:connect="connect"></Connect></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16" :offset="4">
          <div class="grid-content"><AFooter></AFooter></div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import Language from './Childrens/MulLanguage'
  import Backimg from './Childrens/Backimg'
  import Banner from './Childrens/Banner'
  import Nav from './Childrens/Nav'
  import Carousel from './Childrens/Carousel'
  import Information from './Childrens/Information'
  import DeadTime from './Childrens/DeadTime'
  import TimeInfo from './Childrens/TimeInfo'
  import Connect from './Childrens/Connect'
  import Links from './Childrens/Links'
  import Dynamic from './Childrens/Dynamic'
  import Organization from './Childrens/Organization'
  import Advertise from './Childrens/Advertise'
  import Button from './Childrens/Button'
  import AFooter from './Childrens/MyFooter'

    export default {
        name: "Result",
      components:{
        Language,
        Backimg,
        Banner,
        Nav,
        Carousel,
        Information,
        DeadTime,
        TimeInfo,
        Connect,
        Links,
        Dynamic,
        Organization,
        Advertise,
        Button,
        AFooter
       },
        methods:{
           getdatas(){
             let _this=this
             // console.log(_this.$route.query.sitename)
             this.$http.post('http://127.0.0.1:8081/clubApi/backend/web/index.php/advertise/templates/getdatas',{
                 sitename:_this.$route.query.sitename
             }).then(function(res){

               _this.alldata=JSON.parse(res.data.datas)
               console.log(_this.alldata);
               _this.renderdatas()
             })
           },
           renderdatas(){
             let _this=this
             this.alldata.forEach(function (elem,item,array) {
                console.log(Object.keys(elem)[0])
                 switch (Object.keys(elem)[0]) {
                   case "language":
                     _this.Lshow=elem.language
                     break;
                   case "banner":
                     _this.banner=elem.banner
                     break;
                   case "nav":
                     _this.nav=elem.nav
                     break;
                   case "carousel":
                     _this.carousel=elem.carousel
                      break;
                   case  "dynamic":
                     _this.dynamic=elem.dynamic
                      break;
                   case  "information":
                     _this.information=elem.information
                     break;
                   case  "link":
                     _this.links=elem.link
                      break;
                   case "deadtime":
                     _this.deadtime=elem.deadtime
                      break;
                   case  "timeinfo":
                     _this.timeinfo=elem.timeinfo
                      break;
                   case  "organization":
                     _this.organization=elem.organization
                     break;
                   case  "button":
                     // console.log(elem.buttons)
                     _this.buttons=elem.button
                     // console.log(_this.buttons)
                     break;
                   case  "connect":
                     _this.connect=elem.connect
                     break;
                   case  "advertise":
                     _this.advertise=elem.advertise
                     break;
                   default:
                   // ...
                 }

             })
           }
        },
        created(){
          // this.renderdatas()
          // console.log(this.alldata)
        },
        mounted(){
           this.sitename=this.$route.query.sitename
           this.getdatas()
        },
        watch:{
          $route(){
             if(this.$route.path=='/result'){
               this.sitename=this.$route.query.sitename
               this.getdatas()
               // console.log(this.sitename)
             }

          }
        },
        data(){
          return{
            sitename:'',
            alldata:[],
            Lshow:true,
            banner:{},
            nav:[],
            carousel:[],
            information:'',
            dynamic:[],
            links:[],
            deadtime:[],
            timeinfo:[],
            buttons:[],
            organization:[],
            connect:'',
            advertise:''


          }
        }
    }
</script>

<style lang="scss">
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 40px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  /*//为了满足屏幕尺寸大于1000*/
    .myHeigh{
      min-height: 650px;
    }
  .el-notification{width: 220px!important;height: 300px!important;}
   #index{padding:0px 20px}
  .topImg{background-image: url("../../common/img/body.jpg");background-repeat: no-repeat;}
  .banners{height: 200px;}
  .carouselColor{background-color: azure}

  .side{border: gray solid 1px}
  .m30{margin-top: 20px}
</style>
