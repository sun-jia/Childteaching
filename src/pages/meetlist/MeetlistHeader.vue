<template>
  <el-dropdown size="medium" style="float:right;" split-button type="primary">
    <!--<span class="el-dropdown-link">-->
    <!--页面菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
    <!--</span>-->
    页面菜单
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item><router-link to="/meetlist/AddInformation">会议准备</router-link></el-dropdown-item>
      <el-dropdown-item><router-link to="/meetlist/AddPrepareInfor">会议筹备</router-link></el-dropdown-item>
      <el-dropdown-item><router-link to="/meetlist/AddPrograssInfor">会议进行</router-link></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
    export default {
        name: "MeetlistHeader"
    }
</script>

<style scoped>

</style>
