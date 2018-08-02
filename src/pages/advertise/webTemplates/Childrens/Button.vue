<template>
    <div>
      <div v-for="(item,index) in datalist" :key="index" class="a"><a>{{item}}</a></div>
    </div>
</template>

<script>
    export default {
      name: "Button",
      data(){
          return{
             datalist:["个人代表注册","团队代表注册","论文投稿通道"]
          }
      }
    }
</script>

<style scoped>
  .a{background-color: #ff8003;margin-bottom: 10px;font-size: 1.7em;text-align: center;color: white;height: 70px;line-height: 70px;}
</style>
