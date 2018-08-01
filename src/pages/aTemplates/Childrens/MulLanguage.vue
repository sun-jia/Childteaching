<template>
  <div id="language">
     <div class="top">
       <span class="a">Language:</span>
       <a class="b active">简体中文</a>
       <a class="c">English</a>
     </div>

  </div>
</template>

<script>
    export default {
        name: "mulLanguage"
    }
</script>

<style scoped>
  .top{text-align: right;line-height: 40px;height: 40px;font-size: 0.9em}
  .a{padding-left: 38px;background: url("../../../common/img/language.png") left 0px no-repeat;display: inline-block;}
  .b{padding-left: 20px;background: url("../../../common/img/language.png") -10px -40px no-repeat;display: inline-block;}
  .c{padding-left: 20px;background: url(../../../common/img/language.png) -10px -80px no-repeat;line-height: 38px;display: inline-block;}
  .active{border-bottom: red solid 2px}
</style>
