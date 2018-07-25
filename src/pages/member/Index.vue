<template>
  <div>
    member
    <SideMeau post-title="hello!"></SideMeau>
  </div>

</template>

<script>
  import SideMeau from './SideMeau.vue'

  export default {
    data () {
      return {
        memberList:[]
      }
    },
    components:{
      SideMeau
    },
    //方法中可以设置数据处理和数据的获取等等
    methods: {
      getMember () {
        this.$http.get('/yii/member/list')//代替http://localhost:3000/list
          .then((res) => {
            console.log(res.data)
            this.memberList = res.data
          }, (err) => {
            console.log(err)
          })
      }
    },
    //生命周期钩子中可以进行初始数据的获取
    created(){
      this.getMember()
    },
    //组件被激活时调用
    // activated(){
    //   this.getMember()
    // }
  }
</script>

<style scoped>

</style>

