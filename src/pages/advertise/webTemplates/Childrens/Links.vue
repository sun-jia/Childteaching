<template>
  <div>
    <div class="a">{{title}}</div>
    <div v-for="item in linklist" class="b"><a href="#">{{item}}</a></div>
  </div>
</template>

<script>
    export default {
        data(){
          return{
          title:"友情链接",
          linklist:["中国医学会"]
        }
        },
      props:{
        links:{
          type:Array
        }
      },
      watch:{
        links:{
          handler(newValue, oldValue){

            this.linklist=newValue
          },
          deep:true
        }
      }
    }
</script>

<style scoped>
  .a{background: url(../../../../common/img/panelt.png) left center no-repeat;padding-left: 10px;line-height: 48px;
    font-size: 18px;margin-top: 20px;color: #000;padding: 0px 15px}
  a{text-decoration: none;padding-left: 20px;}
  a:hover{color: blue;}
  .b{margin-top: 5px;}
</style>
