<template>
<div>
   <div class="a">{{title}}</div>
  <div class="b">
    <li v-for="item in linklist"><a href="#">{{item}}</a><img src="../../../common/img/new.gif"></li>
  </div>
</div>
</template>

<script>
    export default {
        name: "Dynamic",
      data(){
        return{
          title:"会议动态",
          linklist:["2018年河南省肠外肠内营养学术年会的通知"]
        }
      },
      props:{
        dynamic:{
          type:Array
        }
      },
      watch:{
        dynamic:{
          handler(newValue, oldValue){
            // console.log(newValue)
            var newlist=[];
            newValue.forEach(function (elem) {
                newlist.push(elem.text)
            })
            // console.log(newlist)
            this.linklist=newlist
          },
          deep:true
        }
      }

    }
</script>

<style scoped>
  .a{background: url(../../../common/img/panelt.png) left center no-repeat;padding-left: 10px;line-height: 48px;
    font-size: 18px;margin-top: 20px;color: #000;padding: 0px 15px}
  .b{color: red;}
   li{padding-left: 20px;}
  .b img{padding-left: 5px;}
   a{list-style: none;text-decoration: none;color: red}
</style>
