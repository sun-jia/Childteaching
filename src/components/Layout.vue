<template>
  <div>
    <LoadView v-show="loading"></LoadView>

    <Header v-show="showByLogin" v-bind:user-name="getUserName"></Header>

    <Nav v-show="showSider"></Nav>

    <Condition v-show="showByLogin"></Condition>

    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <Fooster v-show="showByLogin"></Fooster>

  </div>
</template>

<script>
  import LoadView from './Loading'
  import Fooster from './Fooster'
  import Condition from './Condition'
  import Nav from './Nav'
  import Header from './Header'

  import { mapGetters } from 'vuex'

  export default {
    name: 'Layout',

    computed: {
      //映射
      ...mapGetters([
        'getUserName',
        'showByLogin',
        'showSider',   //映射 this.showSider 为 store.getters.showSider
        'loading'   //映射 this.loading 为 store.getters.loading
      ])
    },
    components:{
      LoadView,
      Header,
      Nav,
      Condition,
      Fooster
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

  .content{
    width: 75%;
    margin:0 auto;
    /*float: right;*/
    min-height: 450px;
    background: aquamarine;
  }

</style>
