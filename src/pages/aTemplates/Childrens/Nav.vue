<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="0">今天是{{timeNow |normalTime}}</el-menu-item>

      <el-menu-item  v-for="(item,index) in items"  :key="index" :index="index+1+''">{{item}}</el-menu-item>
      <el-submenu :index="num+'-'+index1" v-for="(item1,index1) in subitems" :key="index1" >
         <template slot="title">{{Object.keys(item1)[0]}}</template>
         <el-menu-item  v-for="(item2,index2) in Object.values(item1)[0]"  :key="index2" :index="num+'-'+index1+index2+1+''">{{item2}}</el-menu-item>
      </el-submenu>

    </el-menu>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        items:["首页","基本信息","征文投稿","学术日程","参会注册","酒店交通"],
        subitems:[{"往届回顾":["第一届","第二届"]},{"往届回顾1":["第一届1","第二届1"]}]
      };
    },
    computed:{
       timeNow:function () {
            let time=new Date();
            return time
       },
       num:function () {
            return this.items.length+1
       }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    props:{
       nav:{
          type:Array
       }
    },
    watch:{
      nav:{
        handler(newValue, oldValue){
          let _this=this
          this.items=[]
          this.subitems=[]
          newValue.forEach(function (elem,item,array) {
               if(elem.children.length==0){
                 _this.items.push(elem.name)
               }else{
                  //有待完善
               }
          })
          console.log(newValue)
          this.name=newValue.name
          this.address=newValue.address
          this.time=newValue.time
        },
        deep:true
      }
    }
  }
</script>

<style scoped>



</style>
