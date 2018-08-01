<template>
  <div class="page">
    <div class="loginwarrp">
      <div class="logo">会务管理系统</div>
      <div class="login_form">
          <li class="login-item">
            <span>用户名：</span>
            <input type="text" id="username" name="username" class="login_input" v-model="username">
            <span id="count-msg" class="error"></span>
          </li>
          <li class="login-item">
            <span>密　码：</span>
            <input type="password" id="password" name="password" class="login_input" v-model="password">
            <span id="password-msg" class="error"></span>
          </li>
          <div class="clearfix"></div>
          <li class="login-sub">
            <input type="button"  value="登录" v-on:click="getLogin"/>
          </li>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../common/js/login.js'

  export default {
    name: "Login",
    data(){
      return{
        username:"",
        password:"",
      }
    },
    methods: {
      getLogin () {
        this.$http.post('/yii/index/login',{ username:this.username,password:this.password })
          .then((res) => {
            console.log(res.data)
            if(res.data.data!=null){
              this.$store.dispatch('login',res.data.data)
              alert(res.data.message)
              this.$store.dispatch('showByLogin')
              this.$router.push('/home/index');
            }else{
              alert(res.data.message);
            }
          }, (err) => {
            console.log(err)
          })
      }
    },
  }

</script>

<style scoped>
  @import "../../common/css/login.css";
</style>
