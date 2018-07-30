<template>
  <div id="display">
      <span class="style first"><router-link  to="/money">订单管理</router-link></span><br/>
      <span class="style second"><router-link to="/invoice">发票管理</router-link></span>
      <router-view/>
  </div>
</template>

<script>
    // import './assets/finance.css'
    export default {
        name: "Index"
    }
</script>

<style scoped>
    #display{
      text-align:center;
      vertical-align:middle;
    }
    .style{
      border:solid 1px #F6F7F7;
      border-radius: 8px;
      background-color: #E4E5E5;
      color:#53C9EF;
      width:200px;
      height:70px;
      font-size: 28px;
      padding:15px;
      text-underline: none;
    }
  .first{
    position: absolute;
    top: 40%;
    left: 50%;
    margin-top: -70px;  /* 设置margin-left / margin-top 为自身高度的一半 */
    margin-left: -107px;
  }
    .second{
      position: absolute;
      top: 40%;
      left: 50%;
      margin-top: 20px;  /* 设置margin-left / margin-top 为自身高度的一半 */
      margin-left: -107px;
    }
</style>
