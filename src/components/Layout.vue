<template>
  <div>
    <LoadView v-show="loading"></LoadView>
    <div class="header" v-show="showHeader">
      <div class="logo">会议管理系统</div>
      <div class="user">陈敏</div>
      <div class="home">
        <router-link :to="{ path:headerMeau.path , query:{ name:headerMeau.name }}" tag="a" >
          {{ headerMeau.name }}
        </router-link>
      </div>
      <div class="clean"></div>
    </div>
    <div class="nav" v-show="showSider">
      <ul>
        <router-link v-for="(item,index) in meauList" :to="{ path:item.path, query:{ name:item.name }}" tag="li"  :key="item.id" :class="[index==num ? 'router-link-active' : '']"  @click.native="changeNum">
          {{ item.name }}
        </router-link>
      </ul>
    </div>
    <div :class="[isActive ? condotion : myfade]">
      {{pathName}}
    </div>
    <div :class="[isActive ? activeClass : errorClass]">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="clean"></div>
    <div class="fooster" v-show="showFooter">i am fooster</div>
  </div>
</template>

<script>
  import LoadView from './Loading'
  import {mapGetters,mapActions} from 'vuex'

  export default {
    name: 'Layout',
    watch:{
      $route(to,from){

        //当路由变化时，侧边栏样式作相应变化
        if(to.query.id){
            this.num=to.query.id-1
        }
        var path=to.path.substring(1);
        this.pathName=this.$route.query.name

        console.log(path)
        this.siderChange(path);
        this.headerChange(path);
        this.footerChange(path);
      }
    },
    data(){
      return{
        num:0,//侧边栏的条目
        condotion:'condotion',
        myfade:'myfade',

        isActive:true,//
        activeClass:'content',//
        errorClass:'content2',//控制templates组件的样式
        pathName:this.$route.query.name,
        headerMeau:{
          name: '首页',
          path: '/home',
        },
        meauList:[
          {
            name: '会议列表',
            path: '/meetList',
          },
          {
            name: '会议编辑',
            path: '/meetEdit',
          },
          {
            name: '会议财务',
            path: '/finance',
          },
          {
            name: '会议后勤',
            path: '/logistics',
          },
          {
            name: '会议宣传',
            path: '/advertise',
          },
          {
            name: '组织成员',
            path: '/member',
          },
          {
            name: '会议数据',
            path: '/statics',
          },
          {
            name: '系统管理',
            path: '/system',
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'showSider',
        'loading',
        'showHeader',
        'showFooter',
      ])
    },
    methods:{
      //当路由变化时，显示侧边栏
      siderChange(path){
        if(path!='home'&&path!='home/index'&&path!='selectTemp' ){
          this.$store.dispatch('showSider')
        }else{
          this.$store.dispatch('hideSider')
        }
      },
      //当显示模板页时，头部和底部隐藏
      headerChange(path){
         this.isActive=false

         if(path=='templates'||path=='selectTemp'||path=='result'){
           this.$store.dispatch('hideHeader')
         }
      },
      footerChange(path){
        if(path=='templates'||path=='selectTemp'||path=='result'){
          this.$store.dispatch('hideFooter')
        }
      },
      changeNum(){
         this.num=-1;
      }
    },
    mounted(){

      this.headerChange(this.$route.path.substring(1));
      this.footerChange(this.$route.path.substring(1));
      // console.log(this.$route.path)
    },
    components:{
      LoadView
    }
  }
</script>

<style scoped>
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
  @import "../common/css/common.css";

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul{
    list-style: none;
  }
  /*li{*/
    /*display: inline-block;*/
    /*width:200px;*/
    /*height:30px;*/
    /*line-height: 30px;*/
    /*border-right: beige 1px solid;*/
    /*text-align: center;*/
    /*cursor: pointer;*/
  /*}*/
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .header{
    height: 50px;
    line-height: 50px;
    background-color: beige;
    width: 100%;
  }
  .header>.logo{float: left}
  .header>.home{float: right;width: 100px}
  .header>.user{float: right;width: 100px}
  .fooster{
    height: 50px;
    line-height: 50px;
    background-color: beige;
    width: 100%;
    bottom: 0;
  }
  .nav{
    width:10%;
    float: left;
    min-height: 500px;
    background: aqua;
  }
  .condotion{
    width: 75%;
    margin:0 auto;
    /*float: right;*/
    min-height: 50px;
  }
  .content{
    width: 75%;
    margin:0 auto;
    /*float: right;*/
    min-height: 650px;
    /*background: aquamarine;*/
  }
  .content2{
    width: 100%;
    margin:0 auto;
    min-height: 650px;
    /*background: aquamarine;*/
  }
  .myfade{
    display: none;
  }
  .router-link-active{
      color:red;
  }

</style>
