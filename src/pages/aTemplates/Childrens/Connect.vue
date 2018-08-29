<template>
  <div>
      <div class="a">{{title}}</div>
      <div v-for="item in linklist" class="b"  v-html=item></div>
  </div>
</template>

<script>
    export default {
        name: "Connect",
        data(){
        return{
          title:"联系我们",
          linklist:["<strong>网站注册、缴费、投稿咨询</strong>","邮箱：cnsc2019@126.com","电话：010-8929 2552-831"
            ,"联系地址：北京市大兴区金星西路星创大厦501","中国营养学会秘书处","邮箱：meeting@cnsoc.org",
            "电话：010—83554781","联系地址：北京市朝阳区建国门外大街甲14号北京广播大厦1405"]
        }
      },
      props:{
        connect:{
          type:String
        }
      },
      watch:{
        connect:{
          handler(newValue, oldValue){
            // console.log(newValue.split(';'))

            this.linklist=newValue.split('；')

          },
          deep:true
        }
      }
    }
</script>

<style scoped>
  .a{background: url(../../../common/img/panelt.png) left center no-repeat;padding-left: 10px;line-height: 48px;
    font-size: 18px;margin-top: 20px;color: #000;padding: 0px 15px}
  .b{padding-left: 15px;margin-bottom: 5px;}

</style>
