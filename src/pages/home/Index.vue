<template>
  <div>
    <div class="side-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
.side-content{
  width: 100%;
  display: inline-block;
}
</style>
