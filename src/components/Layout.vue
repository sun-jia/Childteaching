<template>
  <div>
    <LoadView v-show="loading"></LoadView>

    <Header v-show="showByLogin" v-bind:user-name="getUserName"></Header>

    <Nav v-show="showSider"></Nav>

    <Condition v-show="showByLogin"></Condition>

    <div v-bind:class="{ 'content': showByLogin, 'login_content': !showByLogin }">
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
  import $ from 'jquery'

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
    },
  }
</script>

<style>
  @import "../common/css/common.css";
  @import "../common/css/reset.css";

  .login_content{
    width: 100%;
  }

  .content{
    width: 75%;
    margin:0 auto;
    min-height: 450px;
    background: aquamarine;
  }


</style>
