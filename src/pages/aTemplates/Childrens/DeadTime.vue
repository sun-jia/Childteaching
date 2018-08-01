<template>
    <div>
      <div class="a">距离大会开幕还有</div>
       <div>
          <ul class="b clearfix">
            <li>{{deadDay}}</li>
            <li>{{deadHour}}</li>
            <li>{{deadMinute}}</li>
            <li>{{deadSecond}}</li>
          </ul>
         <!--<div class="clearfix"></div>-->
         <ul class="c clearfix">
           <li>天</li>
           <li>小时</li>
           <li>分钟</li>
           <li>秒</li>
         </ul>
         <!--<div class="clearfix"></div>-->
       </div>
    </div>
</template>

<script>
    export default {
        name: "DeadTime",
        data(){
          return{
              time:"2019-01-03-20-30-40",
              nowtime: new Date()

          }
        },
      watch:{
        deadMinute:function () {

          let S=this.deadMinute

          if(this.nowtime==0){
            S=S-1
          }
          return S
        },
      },
      computed:{
        deadDay:function () {
            let nowy=this.nowtime.getFullYear()+'-'+(this.nowtime.getMonth()+1)+'-'+this.nowtime.getDate()
            let oldYear=this.time.substring(0,10)
            let deadDay=this.DateDiff(nowy,oldYear)
            return deadDay
          },
        deadHour:function () {
          let nowH=parseInt(this.nowtime.getHours())
          let oldH=parseInt(this.time.substring(11,13))
          if(oldH<nowH){
            return 24-nowH+oldH
          }else{
            return oldH-nowH
          }

        },
        deadMinute:function () {

          let nowM=parseInt(this.nowtime.getMinutes())
          let oldM=parseInt(this.time.substring(14,16))
          let S
          if(oldM>nowM){
            S= oldM-nowM
          }else{
            S= oldM+60-nowM
          }
          return S
        },
        deadSecond:function () {
           let nowS=this.nowtime.getSeconds()
           let oldS=parseInt(this.time.substring(17,19))
           let S
           if(oldS<nowS){
              S= oldS+60-nowS
           }else{
              S= oldS-nowS
           }
           return S
        }
      },
        mounted(){
          setInterval(this.getNow,1000)

        },
      methods:{
        DateDiff(sDate1, sDate2) { //sDate1和sDate2是2017-9-25格式
          var aDate, oDate1, oDate2, iDays
          aDate = sDate1.split("-")
          oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为9-25-2017格式
          aDate = sDate2.split("-")
          oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
          iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数
          return iDays
        },
        getNow(){
           this.nowtime=new Date()
        }
      }
    }
</script>

<style scoped>
  .a{background: url(../../../common/img/panelt.png) left center no-repeat;padding-left: 10px;line-height: 48px;
    font-size: 1.2em;margin-top: 20px;color: #000;padding: 0px 15px}
  .b{background: url(../../../common/img/countdown.png) left center no-repeat;width: 284px;
    margin-left: 13px;}
  .b li{height: 50px;line-height:50px;font-size: 1.6em;padding-left:10px;padding-right: 30px;color: white;}
  .c{margin-left: 27px;}
  .c li{height: 25px;line-height:25px;font-size: 1.0em;padding-left:3px;padding-right: 42px;color: black;}
  ul, li {
    list-style-type: none;list-style:none;margin: 0;padding: 0;text-align: center;
   }

   li{float: left;}
  .clearfix:after{clear: both;content: '';display: block}
</style>
