<template>
  <div class="display1">
    <button class="btn1">
      个人信息
      <router-link :to="{ path: '/member/list' }">
        （返回列表）
      </router-link>
    </button>
    <div class="display2">
      <div class="showList">
        <p v-for="(value, key) in data">
          {{ value }}
        </p>
      </div>
      <div class="showBtn">修改</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MemberInfo",
    props:["data"]

  }
</script>

<style lang="scss" scoped="scoped" type="text/css">

  p{
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    width: 300px;
    padding: 0 10px;
    margin: 10px 0;
  }
  .display1 {
    padding-left: 5px;
    padding-top: 10px;
  }
  .display2 {
    border: solid 2px #e0e0e0;
    height: 500px;
    width: 98%;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #fff;
  }
  .showList{
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    align-content: flex-start
  }
  .showBtn{
    margin-top: 30px;
  }
  .btn1 {
    font-size: 18px;
    padding: 10px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    color: #000;
    width: auto;
    /*margin-right: 0px;*/
  }
</style>
