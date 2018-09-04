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
          <div class="grid-content"><Dynamic></Dynamic></div>
          <div class="grid-content"><Links></Links></div>
          <div><Advertise></Advertise></div>
        </el-col>
        <el-col :span="5" class="side">
          <div class="grid-content"><DeadTime></DeadTime></div>
          <div class="grid-content m30"><TimeInfo></TimeInfo></div>
          <div class="grid-content m30"><Button></Button></div>
          <div class="grid-content"><Organization></Organization></div>
          <div class="grid-content"><Connect></Connect></div>
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
             this.$http.post('http://127.0.0.1:80/clubApi/backend/web/index.php/advertise/templates/getdatas').then(function(res){
               _this.alldata=JSON.parse(res.data.datas)
               console.log(_this.alldata);
               _this.renderdatas()
             })
           },
           renderdatas(){
             let _this=this
             this.alldata.forEach(function (elem,item,array) {
                  if(item==0){
                     _this.Lshow=elem.language
                  }
                  if(item==1){
                     _this.banner=elem.banner
                     console.log( _this.banner)

                  }
                  if(item==2){
                     _this.nav=elem.nav
                  }
                  if(item==3){
                    _this.carousel=elem.carousel
                  }
                  if(item==4){
                     _this.information=elem.information
                  }
             })
           }
        },
        created(){
          this.getdatas()

          // this.renderdatas()
          // console.log(this.alldata)
        },
        mounted(){
          // console.log(this.banner)
        },
        data(){
          return{
            alldata:[],
            Lshow:true,
            banner:{},
            nav:[],
            carousel:[],
            information:''
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
