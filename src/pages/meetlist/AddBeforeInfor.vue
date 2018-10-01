<template>
  <div class="display  col-md-12">
    <!--顶部-->
    <div class="top col-md-12">
      <span>{{ meetInfo.name }}---会议筹备信息填写</span>
      <MeetlistHeader></MeetlistHeader>
      <hr>
    </div>
    <div class="left col-md-10">
      <!--模块负责人-->
      <info-lead v-bind:propdata="meetInfo"></info-lead>
      <hr>
      <!--后勤管理-->
      <Logistics v-if="isLogistics"></Logistics>
      <hr v-if="isLogistics">
      <!--专家安排-->
      <ProfessorArrange v-if="isProfessor"></ProfessorArrange>
      <hr v-if="isProfessor">
      <!--会议行程-->
      <MeetingProcess v-if="isScene"></MeetingProcess>
      <hr v-if="isScene">
      <!--论文筛选-->
      <PaperSelect v-if="isContribute"></PaperSelect>
      <hr v-if="isContribute">
      <!--财务管理-->
      <FinanceInfor v-if="isPay"></FinanceInfor>
      <hr v-if="isPay">
    </div>
    <div class="right col-md-2">
      <div class="ancherFixed">
        <div class="ancherStation">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher==1}" v-on:click="isActiveAncher=1;jump('leader')"></el-button>
          <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==1 }">负责人信息</span><br>
          <div class="ancherLine"></div>
        </div>
        <div class="ancherStation" v-show="isLogistics">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher==2}" v-on:click="isActiveAncher=2;jump('logistics')"></el-button>
          <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==2 }">填写后勤管理信息</span><br>
          <div class="ancherLine"></div>
        </div>
        <div class="ancherStation" v-show="isProfessor">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher==3}" v-on:click="isActiveAncher=3;jump('professor')"></el-button>
          <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==3 }">专家出行安排</span><br>
          <div class="ancherLine"></div>
        </div>
        <div class="ancherStation" v-show="isScene">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher==4}" v-on:click="isActiveAncher=4;jump('scene')"></el-button>
          <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==4 }">填写会议进程信息</span><br>
          <div class="ancherLine"></div>
        </div>
        <div class="ancherStation" v-show="isContribute">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher==5}" v-on:click="isActiveAncher=5;jump('contribute')"></el-button>
          <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==5 }">论文筛选</span><br>
          <div class="ancherLine"></div>
        </div>
        <div class="ancherStation" v-show="isPay">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher==6}" v-on:click="isActiveAncher=6;jump('pay')"></el-button>
          <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==6 }">显示缴费信息</span><br>
        </div>
      </div>
    </div>
    <div class="bottom col-md-12">
      已到达底部<i class="icon-jiantoushang"></i>
    </div>
  </div>
</template>

<script>
    import lead from './information/infor-lead';
    import FinanceInfor from "./Prepare/FinanceInfor";
    import Logistics from "./Prepare/Logistics";
    import MeetingProcess from "./Prepare/MeetingProcess";
    import MeetlistHeader from "./MeetlistHeader";
    import PaperSelect from "./Prepare/PaperSelect";
    import ProfessorArrange from "./Prepare/ProfessorArrange";
    import { mapGetters } from 'vuex';
    export default {
      name: "AddBeforeInfor",
      props:["meetId"],
      components: {
        PaperSelect,
        MeetlistHeader,
        MeetingProcess,
        Logistics,
        FinanceInfor,
        "info-lead":lead,
        ProfessorArrange
      },
      data(){
          return{
            isContribute:false,
            isLogistics:false,
            isPay:false,
            isProfessor:false,
            isAdvertise:false,
            isScene:false,
            dotList:[],

            contribute:{},
            logistics:{},
            pay:{},
            professor:{},
            scene:{},

            meetInfo:{},
            isActiveAncher:1
          }
        },
      methods:{
        jump (index) {
          let jump = document.querySelectorAll('.d_jump');

          if(index=='leader')
            index=0;
          else if(index=='advertise')
            index=jump.length-1;
          else
            index=this.dotList.indexOf(index)+1;

          console.log(this.dotList)
          console.log(index)
          // 用 class="d_jump" 添加锚点

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
        trimSpace:function(array){
          for(var i = 0 ;i<array.length;i++) {
            if(array[i] == "" || typeof(array[i]) == "undefined") {
              array.splice(i,1);
              i= i-1;
            }
          }
          return array;
        },
        getInformation:function () {
          let data={
            userId:this.$store.getters.getUser,
            meetId:this.meetId?this.meetId:this.$store.getters.getMeetId
          };
          this.$http.post('/yii/meetlist/before/index',data)
            .then((res) => {
              if(res.data.data!=null){
                if(res.data.data.contribute){
                  this.isContribute=true;
                  this.contribute=res.data.data.contribute!="empty"?res.data.data.contribute:{};
                  this.dotList[4]="contribute";
                }
                if(res.data.data.logistics){
                  this.isLogistics=true;
                  this.logistics=res.data.data.logistics!="empty"?res.data.data.logistics:{};
                  this.dotList[1]="logistics";
                }
                if(res.data.data.pay){
                  this.isPay=true;
                  this.pay=res.data.data.pay!="empty"?res.data.data.pay:{};
                  this.dotList[5]="pay";
                }
                if(res.data.data.professor){
                  this.isProfessor=true;
                  this.professor=res.data.data.professor!="empty"?res.data.data.professor:{};
                  this.dotList[2]="professor";
                }
                if(res.data.data.scene){
                  this.isScene=true;
                  this.scene=res.data.data.scene!="empty"?res.data.data.scene:{};
                  this.dotList[3]="scene";
                }

                this.dotList=this.trimSpace(this.dotList);
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
        this.getInformation()
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
              this.dotList = [];
              this.isContribute = false;
              this.isLogistics = false;
              this.isPay = false;
              this.isProfessor = false;
              this.isAdvertise = false;
              this.isScene = false;
              this.$store.dispatch('setMeetId', newValue)
              this.getInformation();
            }
          },
          deep: true
        }
      }
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
