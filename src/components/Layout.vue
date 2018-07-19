<template>
  <div>
    <div class="header">
      <div class="logo">会议管理系统</div>
      <div class="user">陈敏</div>
      <div class="home">
        <router-link :to="{ path:headerMeau.path , query:{ name:headerMeau.name }}" tag="a" >
          {{ headerMeau.name }}
        </router-link>
      </div>
      <div class="clean"></div>
    </div>
    <div class="nav">
      <ul>
        <router-link v-for="item in meauList" :to="{ path:item.path, query:{ name:item.name }}" tag="li"  :key="item.id">
          {{ item.name }}
        </router-link>
      </ul>
    </div>
    <div class="condotion">
      {{meauCondition}}
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="clean"></div>
    <div class="fooster">i am fooster</div>
  </div>
</template>

<script>
  export default {
    name: 'Layout',
    data(){
      return{
        meauCondition:this.$route.query.name,
        headerMeau:{
          name: '首页',
          path: 'home',
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
    }
  }
</script>

<style>
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
  li{
    display: inline-block;
    width:200px;
    height:30px;
    line-height: 30px;
    border-right: beige 1px solid;
    text-align: center;
    cursor: pointer;
  }
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
    width:20%;
    float: left;
    min-height: 500px;
    background: aqua;
  }
  .condotion{
    width: 75%;
    float: right;
    min-height: 50px;
  }
  .content{
    width: 75%;
    float: right;
    min-height: 450px;
    background: aquamarine;
  }
</style>
