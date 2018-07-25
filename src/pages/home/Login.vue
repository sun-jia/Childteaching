<template>
    <div>
      <input type="text" name="username" v-model="username"/>
      <br>
      <input type="text" name="password" v-model="password"/>
      <br>
      <input type="button" value="登入" v-on:click="getLogin"/>
    </div>
</template>

<script>
    export default {
      name: "Login",
      data(){
        return{
          username:"",
          password:""
        }
      },
      methods: {
        getLogin () {
          this.$http.post('/yii/index/login',{ username:this.username,password:this.password })
            .then((res) => {
              console.log(res.data)
              if(res.data.data!=null){
                this.$store.dispatch('login',res.data.data)
                alert(res.data.message);
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

</style>
