<template>
  <div class="header">
    <div class="logo">会议管理系统</div>
    <div class="user">
      <span>{{ userName }}</span>
      <span style="font-size: 12px" v-on:click="logout">[退出登入]</span>
    </div>
    <div class="home">
      <router-link :to="{ path:headerMeau.path }" tag="a" >
        {{ headerMeau.name }}
      </router-link>
    </div>
    <div class="clean"></div>
  </div>
</template>

<script>
    export default {
      name: "Header",
      props: ['userName'],
      data(){
        return{
          headerMeau:{
            name: '首页',
            path: '/home',
          }
        }
      },
      methods:{
        logout:function () {
          console.log(this.$store.getters.getAccessToken);
          this.$http.get('/yii/index/logout?access_token='+this.$store.getters.getAccessToken)
            .then((res) => {
              console.log(res.data);
              alert(res.data.message);
              this.$store.dispatch("logout");
              this.$router.push('/home/login');
            }, (err) => {
              console.log(err)
            })
        }
      }
    }
</script>

<style scoped>

  .header{
    height: 50px;
    line-height: 50px;
    background-color: beige;
    width: 100%;
  }
  .header>.logo{float: left}
  .header>.home{float: right;width: 100px}
  .header>.user{float: right;width: 200px}

</style>
