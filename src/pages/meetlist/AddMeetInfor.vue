<template>
  <div class="display  col-md-12">
    <!--顶部-->
    <div class="top">
      <span>会议筹备信息填写</span>
      <hr>
    </div>
    <div class="left col-md-10">
      <!--模块负责人-->
      <div id="halfHeight1" index="01" class="d_jump" title="负责人信息">
        <div class="listname">负责人<i class="el-icon-menu" style="padding-left:5px;"></i></div>
        <div class="dutyPerson">
          <table>
            <tr>
              <th>总负责人</th>
              <th>财务负责人</th>
              <th>后勤负责人</th>
              <th>宣传负责人</th>
              <th>交互负责人</th>
            </tr>
            <tr v-for="item in duty">
              <td>{{item.leader}}</td>
              <td>{{item.propaganda}}</td>
              <td>{{item.logistics}}</td>
              <td>{{item.propaganda}}</td>
              <td>{{item.Interaction}}</td>
            </tr>
          </table>
        </div>
      </div>
      <hr>
      <!--财务管理-->
      <div id="halfHeight2" index="02" class="d_jump" title="财务管理信息填写">
        <div class="listname">财务管理<i class="el-icon-menu" style="padding-left:5px;"></i></div>
        <div class="meet">
          <span>专家出场总费用预算:<input class="input" v-model="expertFee" />元</span><br>
          <span>专家人数:<input class="input" v-model="expertFee" />人</span>
          <!--<span>-->
          <button class="btn2">确定</button>
          <button class="btn1">取消</button>
          <!--</span>-->
        </div>
      </div>
      <hr>
      <!--后勤管理-->
      <div id="fullHeight1" index="03" class="d_jump" title="后勤管理信息填写">
        <div class="listname">后勤管理<i class="el-icon-menu" style="padding-left:5px;"></i></div>
        <div class="logistic">
          <div class="col-md-1">
            <button class="btn4" v-on:click="hotelsShow" v-bind:class="{ active: isActiveOne }">酒店</button><br>
            <button class="btn4" v-on:click="restaurantsShow" v-bind:class="{ active: isActiveTwo }">餐厅</button><br>
            <button class="btn4" v-on:click="dirversShow" v-bind:class="{ active: isActiveThree }">司机</button><br>
            <button class="btn4" v-on:click="carsShow" v-bind:class="{ active: isActiveFour }">车辆</button><br>
          </div>
          <div class="col-md-11">
            <button class="btn2">确定</button>
            <button class="btn1">取消</button>
          </div>
        </div>
      </div>
      <hr>
    </div>
    <div class="right col-md-2">
      <div class="ancherFixed">
        <div style="height:76px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher1}" v-on:click="isActiveAncher1=true;isActiveAncher2=false;isActiveAncher3=false;isActiveAncher4=false;jump(0)"></el-button>
          <span style="padding-top:0px;font-size: 16px;" v-bind:class="{textActive:isActiveAncher1 }">负责人信息</span><br>
          <div style="width: 3px; height: 50px; background-color: #DFDFDF;margin-left:11px;"></div>
        </div>
        <div style="height:86px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher2}" v-on:click="isActiveAncher1=false;isActiveAncher2=true;isActiveAncher3=false;isActiveAncher4=false;jump(1)"></el-button>
          <span style="font-size: 16px;" v-bind:class="{textActive:isActiveAncher2 }">填写财务管理信息</span><br>
          <div style="width: 3px; height: 60px; background-color: #DFDFDF;margin-left:11px;"></div>
        </div>
        <div style="height:106px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher3 }"  v-on:click="isActiveAncher1=false;isActiveAncher2=false;isActiveAncher3=true;isActiveAncher4=false;jump(2)"></el-button>
          <span style="padding-top:5px;font-size: 16px;" v-bind:class="{textActive:isActiveAncher3 }">填写后勤管理信息</span><br>
        </div>
      </div>
    </div>
    <div class="bottom col-md-12">
      已到达底部<i class="icon-jiantoushang"></i>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AddMeetInfor",
    data(){
      return{
        duty:[
          {
            leader:'老大',
            propaganda:'张三',
            logistics:'李四',
            finance:'王五',
            Interaction:'赵六'
          },
          {
            leader:'老大',
            propaganda:'张五',
            logistics:'李六',
            finance:'王三',
            Interaction:'赵四'
          },
        ] ,
        expertFee:'',//专家费用
        hotelShow:true,
        isActiveWeb: true,
        isActiveH5: false,
        isActiveOne: true,
        isActiveTwo: false,
        isActiveThree: false,
        isActiveFour: false,
        isActiveAncher1:true,//锚点
        isActiveAncher2:false,//锚点
        isActiveAncher3:false,//锚点
        isActiveAncher4:false,//锚点
        resShow:false,
        dirverShow:false,
        carShow:false,
        websShow:true,
        h5sShow:false,
        fullHeight: document.documentElement.clientHeight,//网页高度
      }
        },
      methods:{
        hotelsShow:function(){
          this.hotelShow=true;
          this.resShow=false;
          this.dirverShow=false;
          this.carShow=false;
          this.isActiveOne= true;
          this.isActiveTwo= false;
          this.isActiveThree= false;
          this.isActiveFour= false;
          console.log(this.hotelShow);
          // console.log(this.isActiveTwo);
        },
        restaurantsShow:function(){
          this.hotelShow=false;
          this.resShow=true;
          this.dirverShow=false;
          this.carShow=false;
          this.isActiveOne= false;
          this.isActiveTwo= true;
          this.isActiveThree= false;
          this.isActiveFour= false;
          console.log(this.isActiveOne);
          console.log(this.isActiveTwo);
        },
        dirversShow:function(){
          this.hotelShow=false;
          this.resShow=false;
          this.dirverShow=true;
          this.carShow=false;
          this.isActiveOne= false;
          this.isActiveTwo= false;
          this.isActiveThree= true;
          this.isActiveFour= false;
          console.log(this.isActiveOne);
          console.log(this.isActiveTwo);
        },
        carsShow:function(){
          this.hotelShow=false;
          this.resShow=false;
          this.dirverShow=false;
          this.carShow=true;
          this.isActiveOne= false;
          this.isActiveTwo= false;
          this.isActiveThree= false;
          this.isActiveFour= true;
          console.log(this.isActiveOne);
          console.log(this.isActiveTwo);
        },
        webShow:function () {
          // let web=document.getElementById("web");
          this.isActiveWeb=true;
          this.isActiveH5=false;
          this.websShow=true;
          this.h5sShow=false;
          console.log( this.websShow);
          console.log( this.h5sShow);
        },
        h5Show:function(){
          this.isActiveWeb=false;
          this.isActiveH5=true;
          this.websShow=false;
          this.h5sShow=true;
          console.log( this.websShow);
          console.log( this.h5sShow);
        },
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
        console.log(this.fullHeight);
        //设置各部分的高度
        document.getElementById('halfHeight1').style.height=(this.fullHeight/3)+'px';
        document.getElementById('halfHeight2').style.height=(this.fullHeight/3)+'px';
        document.getElementById('fullHeight1').style.height=(this.fullHeight)+'px';
        document.getElementById('fullHeight2').style.height=(this.fullHeight)+'px';
        console.log(document.getElementById('halfHeight1').style.height);
      },
    }
</script>

<style scoped>
  /*.add{*/
    /*border:1px solid #BFBFBF;*/
    /*border-radius: 8px;*/
    /*width:80%;*/
    /*padding-left:10px;*/
  /*}*/
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
  .btn1{
    width:80px;
    padding:5px;
    font-size: 16px;
    border-radius: 5px;
    border:1px solid #A7A7A7;
    color:white;
    background-color:#A7A7A7 ;
    float: right;
    margin-right: 5px;
    margin-top:10px;
    margin-bottom:20px;
  }
  .btn1:hover{
    background-color:#BABABA;
  }
  .btn2{
    width:80px;
    padding:5px;
    font-size: 16px;
    border-radius: 5px;
    border:1px solid #2789DF;
    color:white;
    background-color:#2789DF ;
    float: right;
    margin-right: 200px;
    margin-top:10px;
    margin-bottom:20px;
  }
  .btn2:hover{
    background-color:#5AA6E9;
  }
  .btn4{
    width:80px;
    padding:5px;
    font-size: 16px;
    border-radius: 5px;
    border:1px solid #fff;
    color:white;
    background-color:#BABABA ;
    /*float: right;*/
    /*margin-left: 5px;*/
  }
  .btn4:hover{
    background-color:#1E7CCF;
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
  table{
    border-collapse: collapse;
    width:83%;
    margin-top: 10px;
    margin-left: 0px;
    margin-bottom: 10px;
  }
  th{
    font-size: 14px;
    border:solid 1px #ccc;
    font-weight: bold;
    padding:5px;
    background-color: #F1F1F1;
    text-align: center;
  }
  table,td{
    border:solid 1px #ccc;
    padding:12px;
    text-align: center;
    font-size:14px;
  }

</style>
