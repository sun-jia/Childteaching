<template>
<div id="index" class="topImg">
  <!--头部开始-->
  <el-row>
     <el-col :span="16" :offset="4">
       <div class="grid-content"><Language></Language></div>
     </el-col>
  </el-row>
  <el-row>
    <el-col :span="16" :offset="4">
      <div class="grid-content banners"><Banner></Banner></div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="16" :offset="4">
      <div class="grid-content bg-purple-dark"><Nav></Nav></div>
    </el-col>
  </el-row>
  <!--头部结束-->

  <el-row class="myHeigh" :gutter="20">
    <el-col :span="11" :offset="4">
      <div class="grid-content carouselColor"><Carousel :hide="1"></Carousel></div>
      <div class="grid-content"><Information></Information></div>
      <div class="grid-content"><Dynamic></Dynamic></div>
      <div class="grid-content"><Links></Links></div>
      <div style="width: 200px"><Advertise></Advertise></div>
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
  <el-row>
     <el-col :span="16" :offset="4"><GetSiteName :SiteNameVisible=SiteNameVisible @nextLanguage="nextLanguage($event)"></GetSiteName></el-col>
     <el-col :span="16" :offset="4"><GetInfo  :dialogFormVisible=FormVisible @nextBanner="nextBanner($event)" @nextBanner2="nextBanner($event)"></GetInfo></el-col>
     <el-col :span="16" :offset="4"><GetBanner :BannerVisible=BannerVisible @nextNav="nextNav($event)"></GetBanner></el-col>
     <el-col :span="16" :offset="4"><GetNav :NavVisible=NavVisible @nextCarousel="nextCarousel($event)"></GetNav></el-col>
     <el-col :span="16" :offset="4"><GetCarousel :CarouselVisible=CarouselVisible @nextInformation="nextInformation($event)"></GetCarousel></el-col>
     <el-col :span="16" :offset="4"><GetInformation :InformationVisible=InformationVisible @nextDynamic="nextDynamic($event)"></GetInformation></el-col>
    <el-col :span="16" :offset="4"><GetDynamic :DynamicVisible=DynamicVisible @nextLink="nextLink($event)"></GetDynamic></el-col>
    <el-col :span="16" :offset="4"><GetLink :LinkVisible=LinkVisible @nextDeadTime="nextDeadTime($event)"></GetLink></el-col>
    <el-col :span="16" :offset="4"><GetDeadTime :DeadTimeVisible=DeadTimeVisible @nextTimeInfo="nextTimeInfo($event)"></GetDeadTime></el-col>
    <el-col :span="16" :offset="4"><GetTimeInfo :TimeInfoVisible=TimeInfoVisible @nextButton="nextButton($event)"></GetTimeInfo></el-col>
    <el-col :span="16" :offset="4"><GetButton :ButtonVisible=ButtonVisible @nextOrganization="nextOrganization($event)"></GetButton></el-col>
    <el-col :span="16" :offset="4"><GetOrganization :OrganizationVisible=OrganizationVisible @nextConnect="nextConnect($event)"></GetOrganization></el-col>
    <el-col :span="16" :offset="4"><GetConnect :ConnectVisible=ConnectVisible @over="over($event)"></GetConnect></el-col>
    <el-col :span="16" :offset="4"><GetAdvertise :AdvertiseVisible=AdvertiseVisible @nextAdvertise="nextAdvertise($event)"></GetAdvertise></el-col>
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
    import GetInfo from './GetInfos/GetLang'
    import GetBanner from './GetInfos/GetBanner'
    import GetNav from './GetInfos/GetNav'
    import GetCarousel from './GetInfos/GetCarousel'
    import GetInformation from './GetInfos/GetInformation'
    import GetDynamic from './GetInfos/GetDynamic'
    import GetLink from './GetInfos/GetLink'
    import GetDeadTime from './GetInfos/GetDeadTime'
    import GetTimeInfo from './GetInfos/GetTimeInfo'
    import GetButton from './GetInfos/GetButton'
    import GetOrganization from './GetInfos/GetOrganization'
    import GetConnect from './GetInfos/GetConnect'
    import GetAdvertise from './GetInfos/GetAdvertise'
    import GetSiteName from './GetInfos/GetSiteName'

    export default {
        name: "Index",
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
          AFooter,
          GetInfo,
          GetBanner,
          GetNav,
          GetCarousel,
          GetInformation,
          GetDynamic,
          GetLink,
          GetDeadTime,
          GetTimeInfo,
          GetButton,
          GetOrganization,
          GetConnect,
          GetAdvertise,
          GetSiteName

        },
        methods:{
          open() {
            const h = this.$createElement;
            this.$msgbox({
              title: '消息',
              message: h('p', "是否选择该模板",),
              showClose:true,
              lockScroll:false,
              closeOnClickModal:false,
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = '执行中...';
                  done()
                } else {
                  done();
                }
              }
            }).then(action => {
               this.$message({
                 type: 'success',
                 message:"现在开始制作网站,中途不要断开，否则数据将无法保存",
              })
              this.SiteNameVisible=true
            });
          },
          nextLanguage(res){
            console.log(res)
            this.SiteNameVisible=false
            this.FormVisible=res[1]
            this.sitename=res[0].sitename
            console.log(this.sitename)
            console.log(typeof  this.sitename)
          },
          nextBanner(res){
             console.log(res)
             this.FormVisible=false
             this.BannerVisible=res[1]
             this.alldata.push(res[0])
             console.log(this.alldata)
          },
          nextNav(res){
            console.log(res)
            this.BannerVisible=false
            this.NavVisible=res[1]
            this.alldata.push(res[0])
            console.log(this.alldata)
          },
          nextCarousel(res){
            console.log(res)
            this.NavVisible=false
            this.CarouselVisible=res[1]
            this.alldata.push(res[0])
            console.log(this.alldata)
          },
          nextInformation(res){
            console.log(res)
            this.CarouselVisible=false
            this.InformationVisible=res[1]
            this.alldata.push(res[0])
            console.log(this.alldata)
          },
          nextDynamic(res){
            console.log(res)
            this.InformationVisible=false
            this.DynamicVisible=res[1]
            this.alldata.push(res[0])
            console.log(this.alldata)
          },
          nextLink(res){
            console.log(res)
            this.DynamicVisible=false
            this.LinkVisible=res[1]
            this.alldata.push(res[0])
            console.log(this.alldata)
          },
          nextDeadTime(res){
            console.log(res)
            this.LinkVisible=false
            this.DeadTimeVisible=res[1]
            this.alldata.push(res[0])
            console.log(this.alldata)
          },
          nextTimeInfo(res){
            console.log(res)
            this.DeadTimeVisible=false
            this.TimeInfoVisible=res[1]
            this.alldata.push(res[0])
            console.log(this.alldata)
          },
          nextButton(res){
            console.log(res)
            this.TimeInfoVisible=false
            this.ButtonVisible=res[1]
            this.alldata.push(res[0])
            console.log(this.alldata)
          },
          nextOrganization(res){
            console.log(res)
            this.ButtonVisible=false
            this.OrganizationVisible=res[1]
            this.alldata.push(res[0])
            console.log(this.alldata)
          },
          nextConnect(res){
            console.log(res)
            this.OrganizationVisible=false
            this.ConnectVisible=res[1]
            this.alldata.push(res[0])
            console.log(this.alldata)
          },
          over(res){
            console.log(res)
            this.ConnectVisible=false
            this.AdvertiseVisible=res[1]
            this.alldata.push(res[0])
            console.log(this.alldata)
          },
          nextAdvertise(res){
            console.log(res)
            this.AdvertiseVisible=false
            // this.ConnectVisible=res[1]
            this.alldata.push(res[0])
            this.$message({
              message: '信息填写完成！'
            })
            let fd = new FormData();
            fd.append('templateDates',JSON.stringify(this.alldata));//传文件
            fd.append('sitename',this.sitename);//传网址
            this.$http.post('http://127.0.0.1/clubApi/backend/web/index.php/advertise/templates/templates',fd).then(function(res){
               console.log(res.data);
            })
            // this.$router.push('/result')
            console.log(this.alldata)
            console.log(typeof(this.alldata))
          },
          uploadImg(){

          }
        },
        mounted(){
           setTimeout(this.open,2000)
          // this.uploadImg()
        },
        data(){
          return{
            SiteNameVisible:false,
            FormVisible:false,
            BannerVisible:false,
            NavVisible:false,
            CarouselVisible:false,
            InformationVisible:false,
            DynamicVisible:false,
            LinkVisible:false,
            DeadTimeVisible:false,
            TimeInfoVisible:false,
            ButtonVisible:false,
            OrganizationVisible:false,
            ConnectVisible:false,
            AdvertiseVisible:false,
            alldata:[],
            sitename:""
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
  //为了满足屏幕尺寸大于1000
  .myHeigh{
     min-height: 650px;
  }
  .el-notification{width: 220px !important;
    height: 300px;}
  #index{padding:0px 20px}
  .topImg{background-image: url("../../common/img/body.jpg");background-repeat: no-repeat;}
  .banners{height: 200px;}
  .carouselColor{background-color: azure}

  .side{border: gray solid 1px}
  .m30{margin-top: 20px}
</style>
