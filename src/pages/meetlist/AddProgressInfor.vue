<template>
  <div class="display  col-md-12">
    <!--顶部-->
    <div class="top col-md-12">
      <span>{{ meetInfo.name }}---会议进行中</span>
      <MeetlistHeader></MeetlistHeader>
      <hr>
    </div>

    <div class="left col-md-10">
      <!--模块负责人-->
      <info-lead v-bind:propdata="meetInfo"></info-lead>
      <hr>
      <!--公告-->
      <Announcement></Announcement>
      <hr>
      <!--私信-->
      <PrivateLetter></PrivateLetter>
      <hr>
      <!--资料-->
     <Resource></Resource>
      <hr>
      <!--交互-->
     <Interacion></Interacion>
      <hr>
    </div>
    <div class="right col-md-2">
      <div class="ancherFixed">
        <div class="ancherStation">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher==1}" v-on:click="isActiveAncher=1;jump(0)"></el-button>
          <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==1 }">负责人信息</span><br>
          <div class="ancherLine"></div>
        </div>
        <div class="ancherStation">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher==2}" v-on:click="isActiveAncher=2;jump(1)"></el-button>
          <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==1 }">会议公告</span><br>
          <div class="ancherLine"></div>
        </div>
        <div class="ancherStation">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher==3}" v-on:click="isActiveAncher=3;jump(2)"></el-button>
          <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==3 }">私信用户</span><br>
          <div class="ancherLine"></div>
        </div>
        <div class="ancherStation">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher==4}" v-on:click="isActiveAncher=4;jump(3)"></el-button>
          <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==4 }">会议资料</span><br>
          <div class="ancherLine"></div>
        </div>
        <div class="ancherStation">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher==5}" v-on:click="isActiveAncher=5;jump(4)"></el-button>
          <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==5 }">会议交互</span><br>
        </div>
      </div>
    </div>
    <div class="bottom col-md-12">
      已到达底部<i class="icon-jiantoushang"></i>
    </div>
  </div>
</template>

<script>
    import MeetlistHeader from "./MeetlistHeader";
    import Announcement from "./Progress/Announcement";
    import Resource from "./Progress/Resource";
    import Interacion from "./Progress/Interacion";
    import PrivateLetter from "./Progress/PrivateLetter";
    import lead from './information/infor-lead';
    import { mapGetters } from 'vuex';

    export default {
      name: 'AddProgressInfor',
      props:["meetId"],
      components: {
        PrivateLetter,
        Interacion,
        Resource,
        Announcement,
        MeetlistHeader,
        "info-lead":lead,
      },
      data () {
         return {
           isActiveAncher:1,//锚点
           notices:{},
           material:{},
           message:{},
           interact:{},
           meetInfo:{}
         }
      },
      methods: {
        jump (index) {
          let jump = document.querySelectorAll('.d_jump');
          let total = jump[index].offsetTop
          let distance = document.documentElement.scrollTop || document.body.scrollTop
          // 平滑滚动，时长500ms，每10ms一跳，共50跳
          let step = total / 50
          if (total > distance) {
            smoothDown()
          } else {
            let newTotal = distance - total
            step = newTotal / 50
            smoothUp()
          }
          function smoothDown () {
            if (distance < total) {
              distance += step
              document.body.scrollTop = distance
              document.documentElement.scrollTop = distance
              setTimeout(smoothDown, 10)
            } else {
              document.body.scrollTop = total
              document.documentElement.scrollTop = total
            }
          }
          function smoothUp () {
            if (distance > total) {
              distance -= step
              document.body.scrollTop = distance
              document.documentElement.scrollTop = distance
              setTimeout(smoothUp, 10)
            } else {
              document.body.scrollTop = total
              document.documentElement.scrollTop = total
            }
          }
        },
        getInformation:function () {
          let data={
            userId:this.$store.getters.getUser,
            meetId:this.meetId?this.meetId:this.$store.getters.getMeetId
          };
          this.$http.post('/yii/meetlist/progress/index',data)
            .then((res) => {
              if(res.data.data!=null){
                if(res.data.data.notices){
                  this.notices=res.data.data.notices!="empty"?res.data.data.notices:{};
                }
                if(res.data.data.message){
                  this.message=res.data.data.message!="empty"?res.data.data.message:{};
                }
                if(res.data.data.material){
                  this.material=res.data.data.material!="empty"?res.data.data.material:{};
                }
                if(res.data.data.interact){
                  this.interact=res.data.data.interact!="empty"?res.data.data.interact:{};
                }
                this.meetInfo=res.data.data.meet;

              }else{
                alert(res.data.message);
              }
            }, (err) => {
              console.log(err)
            })
        }
      },
      mounted: function () {
        this.getInformation();
      },
      computed: {
        //映射
        ...mapGetters([
          "getMeetId",
          "getUser"
        ])
      },
      watch: {
        meetId: {
          handler(newValue, oldValue) {
            if(newValue){
              this.$store.dispatch('setMeetId',newValue)
              this.getInformation();
            }
          },
          deep: true
        }
      },
    }
</script>

<style scoped>
  hr{
    margin: 40px 0px;
  }
  .ancherStation{
    height: 76px;
  }
  .ancherName{
    padding-top:5px;font-size: 16px;vertical-align:-webkit-baseline-middle;
  }
  .ancherLine{
    width: 3px; height: 50px; background-color: #DFDFDF;margin-left:11px;
  }
  .halfHeight{
    min-height: 150px;
    height: auto;
  }
  .fullHeight{
    min-height: 300px;
    height: auto;
  }
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
    width:60px;
    padding:8px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#338FFC ;
    /*float: right;*/
    /*margin-left: 15px;*/
    /*margin-top: 20px;*/
    /*margin-bottom: 5px;*/
  }
  .btn2:hover{
    background-color:#5FA7FE;
  }
  .btn3{
    width:60px;
    padding:8px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#B9B9B9 ;
  }
  .btn3:hover{
    background-color:#CACACA;
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
  .el-table th{
    text-align: center;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    float:left;
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
