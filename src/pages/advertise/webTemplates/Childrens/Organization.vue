<template>
  <div>
    <div class="a">{{title}}</div>
    <div class="b"><strong>主办单位:</strong></div>
    <div v-for="item in linklist" class="b">{{item}}</div>
  </div>
</template>

<script>
    export default {
      name: "Organization",
      data(){
        return{
          title:"组织结构",
          linklist:["中国营养学会","亚太临床营养学会 "]
        }
      },
      props:{
        organization:{
          type:Array
        }
      },
      watch:{
        organization:{
          handler(newValue, oldValue){
            // console.log(newValue)
            var temp=newValue.slice()
            temp.shift();
            this.linklist=temp
          },
          deep:true
        }
      }
    }
</script>

<style scoped>
  .a{background: url(../../../../common/img/panelt.png) left center no-repeat;padding-left: 10px;line-height: 48px;
    font-size: 18px;margin-top: 20px;color: #000;padding: 0px 15px}
  .b{padding-left: 15px;margin-bottom: 5px;}
  /*b:first-child{font-weight:bold;}*/
</style>
