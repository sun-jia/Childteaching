<template>

  <div>
     <div class="a">重要日期</div>
     <p v-for="(item,index) in dataList" :key="index" >{{item}}</p>

  </div>
</template>

<script>
    export default {
      data(){

        return{
        dataList:["会议日期","2019年9月19-22日","征文投稿截止日期",
          "2019年6月30日","网上注册截止日期:","2019年9月12日",
        "现场报到日期：","2019年09月19日"]
       }

      },
      props:{
        timeinfo:{
          type:Array
        }
      },
      watch:{
        timeinfo:{
          handler(newValue, oldValue){
            // console.log(newValue)
            var first=newValue.slice(0,newValue.length/2);
            var last=newValue.slice(newValue.length/2,newValue.length)

            var i=0;
            this.dataList=[];
            while (i<first.length) {
               this.dataList.push(first[i]);
               this.dataList.push(last[i])
               i++;
            }

          },
          deep:true
        }
      }
    }
</script>

<style scoped>
   .a{background: url(../../../../common/img/panelt.png) left center no-repeat;padding-left: 10px;line-height: 48px;
    font-size: 1.2em;margin-top: 20px;color: #000;padding: 0px 15px}
   p{font-size: 1em;padding-left:15px;margin: 10px 0px;}

   p:nth-child(even) {font-weight: bold;}
</style>
