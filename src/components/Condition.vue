<template>
  <div class="condition">
    {{pathName}}
  </div>
</template>

<script>
  import { startCanvas , stopCanvas } from  '../common/js/canvas-particle.js'

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
          const user = this.$store.state.mutations.user;
          console.log(user);
          if(path=='/home/login' ){
            this.$store.dispatch('hideByLogin');
            let config = {
              vx: 4,
              vy: 4,
              height: 2,
              width: 2,
              count: 100,
              color: "121, 162, 185",
              stroke: "100, 200, 180",
              dist: 6000,
              e_dist: 20000,
              max_conn: 10
            }
            startCanvas(config);
          }else{

            if(this.$store.getters.getAccessToken==""){
              alert("请先登入")
              this.$router.push("/home/login");
            }
            stopCanvas();

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
  .condition{
    width: 75%;
    margin:0 auto;
    /*float: right;*/
    min-height: 50px;
  }
</style>
