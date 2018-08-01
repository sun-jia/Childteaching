<template>
  <div>
  <el-row :gutter="25" class="mt30">
       <el-col :span="18" :offset="4">
         <router-link :to="{path:mypath}">制作网站</router-link>
       </el-col>
  </el-row>
  <el-row :gutter="25" class="mt30">
    <el-col :span="18" :offset="4">
      <router-link :to="{path:mysite}">我的网站</router-link>
    </el-col>
  </el-row>
  </div>
</template>

<script>
    export default {
        name: "SelectTemp",
        data(){
           return{
               mypath:'/selectTemp',
               mysite:'/result'
           }
        }
    }
</script>

<style scoped>
  .mt30{margin-top: 30px;}
</style>
