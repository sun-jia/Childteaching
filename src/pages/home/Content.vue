<template>
  <div>
    <div class="meauPanel" v-for="item in userList">
      <router-link :to="{ path:item.path , query:{ name:item.name }}">
        <div>
          <span>{{ item.name }}</span>
          <span>{{ item.num }}</span>
        </div>
      </router-link>

    </div>
    <div class="clean"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userList:[
          {
            "id": 1,
            "name": "会议进行",
            "path":"/meetList",
            "num": "10"
          },
          {
            "id": 2,
            "name": "会议编辑",
            "path": "/meetEdit",
            "num": "2"
          },
          {
            "id": 3,
            "name": "后勤管理",
            "path": "/logistics",
            "num": "1"
          },
          {
            "id": 4,
            "name": "财务管理",
            "path": "/finance",
            "num": "12w"
          },
          {
            "id": 5,
            "name": "宣传管理",
            "path": "/advertise",
            "num": "2"
          },
          {
            "id": 6,
            "name": "成员管理",
            "path": "/member",
            "num": "12"
          },
          {
            "id": 7,
            "name": "系统管理",
            "path": "/system",
            "num": "12"
          },
          {
            "id": 8,
            "name": "数据管理",
            "path": "/statics",
            "num": "12"
          }
        ]
      }
    },
    //方法中可以设置数据处理和数据的获取等等
    // methods: {
    //   getUser () {
    //     this.$http.get('/api/list')//代替http://localhost:3000/list
    //       .then((res) => {
    //         console.log(res.data)
    //         this.userList = res.data
    //       }, (err) => {
    //         console.log(err)
    //       })
    //   }
    // },
    // created(){
    //   this.getUser();
    // }
  }
</script>

<style scoped>
.meauPanel{
  text-align: center;
  line-height: 250px;
  width: 250px;
  height: 250px;
  float: left;
  border: 1px solid #ccc;
  background:#fff;
  margin: 10px;
}
</style>
