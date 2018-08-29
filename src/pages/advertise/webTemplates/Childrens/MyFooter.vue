<template>
   <div class="a">
     <div class="b">{{datalist[0]}}</div>
   </div>
</template>

<script>
    export default {
         data(){
            return{
              datalist:["大会官方网站内容未经允许，禁止拷贝或转载本站内容，禁止建立类似会议注册页面，否则追究法律责任！"]
            }
         }
    }
</script>

<style scoped>
  .a{border-top: 5px solid #0389fe;}
  .b{text-align: center;margin: 25px 0px;}
</style>
