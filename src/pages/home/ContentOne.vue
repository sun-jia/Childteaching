<template>
  <div>
    <div class="meauPanel" v-for="item in userList">
      <div>{{ item.name }}</div>
      <div>{{ item.num }}</div>
    </div>
    <div class="clean"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userList:[]
      }

    },
    //方法中可以设置数据处理和数据的获取等等
    methods: {
      getUser () {
        this.$http.get('/api/list')//代替http://localhost:3000/user
          .then((res) => {
            console.log(res.data)
            this.userList = res.data
          }, (err) => {
            console.log(err)
          })
      }
    },
    //生命周期钩子中可以进行初始数据的获取
    created(){
      this.getUser()
    }
  }
</script>

<style scoped>
.meauPanel{
  width: 250px;
  height: 250px;
  float: left;
}
</style>
