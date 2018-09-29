<template>
  <div class="display  col-md-12">
    <!--顶部-->
    <div class="top col-md-12">
      <span>会议筹备信息填写</span>
      <MeetlistHeader></MeetlistHeader>
      <hr>
    </div>
    <div class="left col-md-10">
      <!--模块负责人-->
      <DutyPersonInfor></DutyPersonInfor>
      <hr>
      <!--财务管理-->
      <FinanceInfor></FinanceInfor>
      <hr>
      <!--后勤管理-->
     <Logistics></Logistics>
      <hr>
      <!--会议行程-->
      <MeetingProcess></MeetingProcess>
      <!--论文筛选-->
      <PaperSelect></PaperSelect>
    </div>
    <div class="right col-md-2">
      <div class="ancherFixed">
        <div style="height:76px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher1}" v-on:click="isActiveAncher1=true;isActiveAncher2=false;isActiveAncher3=false;isActiveAncher4=false;isActiveAncher5=false;jump(0)"></el-button>
          <span style="padding-top:0px;font-size: 16px;vertical-align:bottom;" v-bind:class="{textActive:isActiveAncher1 }">负责人信息</span><br>
          <div style="width: 3px; height: 50px; background-color: #DFDFDF;margin-left:11px;"></div>
        </div>
        <div style="height:86px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher2}" v-on:click="isActiveAncher1=false;isActiveAncher2=true;isActiveAncher3=false;isActiveAncher4=false;isActiveAncher5=false;jump(1)"></el-button>
          <span style="font-size: 16px;vertical-align:bottom;" v-bind:class="{textActive:isActiveAncher2 }">填写财务管理信息</span><br>
          <div style="width: 3px; height: 60px; background-color: #DFDFDF;margin-left:11px;"></div>
        </div>
        <div style="height:106px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher3 }"  v-on:click="isActiveAncher1=false;isActiveAncher2=false;isActiveAncher3=true;isActiveAncher4=false;isActiveAncher5=false;jump(2)"></el-button>
          <span style="padding-top:5px;font-size: 16px;vertical-align:bottom;" v-bind:class="{textActive:isActiveAncher3 }">填写后勤管理信息</span><br>
          <div style="width: 3px; height: 80px; background-color: #DFDFDF;margin-left:11px;"></div>
        </div>
        <div style="height:106px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher4 }"  v-on:click="isActiveAncher1=false;isActiveAncher2=false;isActiveAncher3=false;isActiveAncher4=true;isActiveAncher5=false;jump(3)"></el-button>
          <span style="padding-top:5px;font-size: 16px;vertical-align:bottom;" v-bind:class="{textActive:isActiveAncher4}">填写会议进程信息</span><br>
          <div style="width: 3px; height: 80px; background-color: #DFDFDF;margin-left:11px;"></div>
        </div>
        <div style="height:26px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher5 }"  v-on:click="isActiveAncher1=false;isActiveAncher2=false;isActiveAncher3=false;isActiveAncher4=false;isActiveAncher5=true;jump(4)"></el-button>
          <span style="padding-top:5px;font-size: 16px;vertical-align:bottom;" v-bind:class="{textActive:isActiveAncher4}">论文筛选</span><br>
        </div>
      </div>
    </div>
    <div class="bottom col-md-12">
      已到达底部<i class="icon-jiantoushang"></i>
    </div>
  </div>
</template>

<script>
    import DutyPersonInfor from "./Prepare/DutyPersonInfor";
    import FinanceInfor from "./Prepare/FinanceInfor";
    import Logistics from "./Prepare/Logistics";
    import MeetingProcess from "./Prepare/MeetingProcess";
    import MeetlistHeader from "./MeetlistHeader";
    import PaperSelect from "./Prepare/PaperSelect";
    export default {
        name: "AddMeetInfor",
      components: {PaperSelect, MeetlistHeader, MeetingProcess, Logistics, FinanceInfor, DutyPersonInfor},
      data(){
      return{
        isActiveAncher1:true,//锚点
        isActiveAncher2:false,//锚点
        isActiveAncher3:false,//锚点
        isActiveAncher4:false,//锚点
        isActiveAncher5:false,//锚点
        fullHeight: document.documentElement.clientHeight,//网页高度
      }
        },
      methods:{
        jump (index) {
          // 用 class="d_jump" 添加锚点
          let jump = document.querySelectorAll('.d_jump');
          let total = jump[index].offsetTop
          let distance = document.documentElement.scrollTop || document.body.scrollTop;
          // 平滑滚动，时长500ms，每10ms一跳，共50跳
          let step = total / 50;
          if (total > distance) {
            smoothDown()
          } else {
            let newTotal = distance - total;
            step = newTotal / 50;
            smoothUp()
          }
          function smoothDown () {
            if (distance < total) {
              distance += step;
              document.body.scrollTop = distance;
              document.documentElement.scrollTop = distance;
              setTimeout(smoothDown, 10)
            } else {
              document.body.scrollTop = total;
              document.documentElement.scrollTop = total;
            }
          }
          function smoothUp () {
            if (distance > total) {
              distance -= step;
              document.body.scrollTop = distance;
              document.documentElement.scrollTop = distance;
              setTimeout(smoothUp, 10)
            } else {
              document.body.scrollTop = total;
              document.documentElement.scrollTop = total;
            }
          }
        },
      },
      mounted: function () {
        // console.log(this.fullHeight);
        //设置各部分的高度
        document.getElementById('halfHeight1').style.height=(this.fullHeight/3)+'px';
        // document.getElementById('halfHeight2').style.height=(this.fullHeight/3)+'px';
        document.getElementById('fullHeight1').style.height=(this.fullHeight)+'px';
        document.getElementById('fullHeight2').style.height=(this.fullHeight)+'px';
        document.getElementById('fullHeight3').style.height=(this.fullHeight)+'px';
        document.getElementById('fullHeight4').style.height=(this.fullHeight)+'px';
      },
    }
</script>

<style scoped>
  .add{
    border:1px solid #BFBFBF;
    border-radius: 8px;
    width:80%;
    padding-left:10px;
  }
  .anchor{
    background-color:#00AAFF;
    border-color:#00AAFF;
  }
  .anchor:hover{
    background-color:#00AAFF;
    border-color:#00AAFF;
  }
  .textActive{
    color:#00AAFF;
  }
  .ancherFixed{
    position: fixed;
  }

  .active{
    background-color: #1E7CCF;
  }
  .bottom{
    background-color: #0C8BFA;
    font-size:18px;
    text-align: center;
    color:#fff;
  }
  .display{
    background-color:#fff;
    margin-top:20px;

  }
  .dutyPerson{
    height:100px;
  }
  .listname{
    font-size:18px;
    font-wight:bold;
    color:#fff;
    background-color:#097FC7;
    width:20%;
    height:40px;
    border:solid 1px #097FC7;
    border-radius: 4px;
    padding-top:5px;
    padding-left:3px;
  }
  .left{
    background-color:#fff;
    padding-left: 10%;
  }
  .right{
    background-color:#fff;
  }
  .meet{
    margin-top:10px;
    margin-left:20px;
    margin-bottom:10px;
    height:100px;
  }
  .input{
    border:1px solid #338FFC;
    border-radius: 5px;
    color:#000;
    width:90px;
    margin-left:5px;
    margin-right:5px;
  }
  .logistic{
    margin-top:20px;
    /*margin-left:20px;*/
    margin-bottom:20px;
    height:550px;
  }
  .el-scrollbar__wrap {
    overflow-y: hidden;
  }
  .top{
    text-align: center;
    font-size: 22px;
    padding-top:20px;
    padding-bottom:20px;
  }
  .el-table th{
    text-align: center;
  }
</style>
