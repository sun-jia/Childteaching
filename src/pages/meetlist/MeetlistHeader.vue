<template>
  <el-dropdown size="medium" style="float:right;" split-button type="primary">
    <!--<span class="el-dropdown-link">-->
    <!--页面菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
    <!--</span>-->
    页面菜单
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item><router-link :to="{ name: 'addInformation', params: { meetId: getMeetId }}">会议准备</router-link></el-dropdown-item>
      <el-dropdown-item><router-link :to="{ name: 'addBeforeInfor', params: { meetId: getMeetId }}">会议筹备</router-link></el-dropdown-item>
      <el-dropdown-item><router-link :to="{ name: 'addProgressInfo', params: { meetId: getMeetId }}">会议进行</router-link></el-dropdown-item>
      <el-dropdown-item><router-link :to="{ name: 'meetSummary', params: { meetId: getMeetId }}">会议总结</router-link></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "MeetlistHeader",
    computed: {
      //映射
      ...mapGetters([
        "getMeetId"
      ])
    }
  }
</script>

<style scoped>

</style>
