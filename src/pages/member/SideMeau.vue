<template>
    <p>
      {{ postTitle }}
      <!--<router-link v-for="item in postItem" :to="{ path: item.path }" tag="li" :key="item.id">-->
        <!--{{ item.name }}/{{ item.path }}-->
      <!--</router-link>-->
    </p>

</template>

<script>

    export default {
      name: "SideMeau",
      data(){
        return{}
      },
      props: ['postTitle'],
      //这里可以对传过来的数据进行二次加工
      computed: {
        // getProp: function () {
        //   console.log(this.postItem);
        //   return this.postItem.get(0).name.trim().toLowerCase()
        // }
      }
    }
</script>

<style scoped>
li{
  height: 40px;
  line-height: 40px;
  border-bottom: aqua 1px solid;
}
</style>
