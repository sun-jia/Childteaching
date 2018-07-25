<template>
  <div class="condotion">
    {{pathName}}
  </div>
</template>

<script>
    export default {
      name: "Condition",
      data(){
        return{
          pathName:""
        }
      },
      watch:{
        $route(to,from){
          this.pathName=this.$route.query.name
          this.siderChange(this.$route.path);
        }
      },
      methods:{
        siderChange(path){
          console.log(path);
          if(path=='/home/login' ){
            this.$store.dispatch('hideByLogin')
          }else{
            console.log(this.$store.getters.getAccessToken);
            if(this.$store.getters.getAccessToken==""){
              alert("请先登入")
              this.$router.push("/home/login");
            }

            if(path!='/home'&&path!='/home/index' ) {
              this.$store.dispatch('showSider')
            }else{
              this.$store.dispatch('hideSider')
            }
          }
        }
      },
      created(){
        this.siderChange(this.$route.path);
        if(this.$route.path!='/home/login' ){
          this.pathName=this.$route.query.name;
        }
      }
    }
</script>

<style scoped>
  .condotion{
    width: 75%;
    margin:0 auto;
    /*float: right;*/
    min-height: 50px;
  }
</style>
