<template>
  <!-- NAVBAR -->
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="brand">
      <router-link  :to="{ path:'/home/index'}">会务管理系统</router-link>
        <!--<img src="../common/images/logo-dark.png" alt="Klorofil Logo" class="img-responsive logo">-->
    </div>
    <div class="container-fluid">
      <div class="navbar-btn">
        <button type="button" class="btn-toggle-fullwidth"><i class="lnr lnr-arrow-left-circle"></i></button>
      </div>
      <form class="navbar-form navbar-left">
        <div class="input-group">
          <input type="text" value="" class="form-control" placeholder="Search dashboard...">
          <span class="input-group-btn"><button type="button" class="btn btn-primary">Go</button></span>
        </div>
      </form>
      <div id="navbar-menu" style="float: right">
        <ul class="nav navbar-nav navbar-right">
          <!--<li class="dropdown">-->
            <!--<a href="#" class="dropdown-toggle icon-menu" data-toggle="dropdown">-->
              <!--<i class="lnr lnr-alarm"></i>-->
              <!--<span class="badge bg-danger">1</span>-->
            <!--</a>-->
            <!--&lt;!&ndash; 未读消息 &ndash;&gt;-->
            <!--<ul class="dropdown-menu notifications">-->
              <!--<li>-->
                <!--<a href="#" class="notification-item">-->
                <!--<span class="dot bg-warning"></span>-->
                  <!--System space is almost full</a>-->
              <!--</li>-->
              <!--<li><a href="#" class="more">See all notifications</a></li>-->
            <!--</ul>-->
          <!--</li>-->
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="lnr lnr-question-circle"></i>
              <span>Help</span>
              <i class="icon-submenu lnr lnr-chevron-down"></i>
            </a>
            <ul class="dropdown-menu">
              <li><a href="#">使用手册</a></li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="../common/images/user.png" class="img-circle" alt="Avatar">
              <span>{{ userName }}</span>
              <i class="icon-submenu lnr lnr-chevron-down"></i></a>
            <ul class="dropdown-menu">
              <li><a href="#"><i class="lnr lnr-user"></i> <span>个人中心</span></a></li>
              <li v-on:click="logout"><a href="#"><i class="lnr lnr-exit"></i> <span>退出登入</span></a></li>
            </ul>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Header",
    props: ['userName'],
    data() {
      return {
        headerMeau: {
          name: '首页',
          path: '/home',
        }
      }
    },
    methods: {
      logout: function () {
        console.log(this.$store.getters.getAccessToken);
        this.$http.get('/yii/index/logout')
          .then((res) => {
            this.$store.dispatch("logout");
            alert(res.data.message);
            this.$router.push('/home/login');
          }, (err) => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>

  /*.header{*/
  /*height: 50px;*/
  /*line-height: 50px;*/
  /*background-color: #DA4453;*/
  /*width: 100%;*/
  /*}*/
  /*.header>.logo{float: left}*/
  /*.header>.home{float: right;width: 100px}*/
  /*.header>.user{float: right;width: 200px}*/

</style>
