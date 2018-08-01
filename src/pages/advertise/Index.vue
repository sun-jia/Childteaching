<template>
  <el-row>
       <el-col :span="18">
         <router-link :to="{path:mypath}">制作网站</router-link>
       </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "SelectTemp",
        data(){
           return{
               mypath:'/selectTemp'
           }
        }
    }
</script>

<style scoped>

</style>
