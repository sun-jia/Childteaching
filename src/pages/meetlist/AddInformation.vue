<template>
    <div class="display col-md-12">
        <!--顶部-->
        <div class="top col-md-12">
          <span>{{ meetInfo.name }}---会议准备信息填写</span>
             <MeetlistHeader></MeetlistHeader>
          <hr>
        </div>

        <div class="left col-md-10">
          <!--模块负责人-->
          <info-lead v-bind:propdata="meetInfo"></info-lead>
          <hr>
          <!--财务管理-->
          <info-finance v-if="isPay" v-bind:propdata="pay"></info-finance>
          <hr v-if="isPay">
          <!--专家管理-->
          <info-professor v-if="isProfessor" v-bind:propdata="professor"></info-professor>
          <hr v-if="isProfessor">
          <!--后勤管理-->
          <info-logistics v-if="isLogistics" v-bind:propdata="logistics"></info-logistics>
          <hr v-if="isLogistics">
          <!--论文接收-->
          <infor-paper v-if="isContribute" v-bind:propdata="contribute"></infor-paper>
          <hr v-if="isContribute">
          <!--会议宣传-->
          <info-advertise></info-advertise>
          <hr>
          <div class="nextStep">
            <span class="nextStepSpan">进入筹备阶段<i class="icon-processing"></i></span>
          </div>
        </div>
        <div class="right col-md-2">
          <div class="ancherFixed">
            <div class="ancherStation">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher==1}" v-on:click="isActiveAncher=1;jump('leader')"></el-button>
              <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==1 }">负责人信息</span><br>
              <div class="ancherLine"></div>
            </div>
            <div class="ancherStation" v-show="isPay">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher==2}" v-on:click="isActiveAncher=2;jump('pay')"></el-button>
              <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==2 }">填写财务管理信息</span><br>
              <div class="ancherLine"></div>
            </div>
            <div class="ancherStation" v-show="isProfessor">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher==6 }"  v-on:click="isActiveAncher=6;jump('professor')"></el-button>
              <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==6 }">填写出席专家信息</span><br>
              <div class="ancherLine"></div>
            </div>
            <div class="ancherStation" v-show="isLogistics">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher==3 }"  v-on:click="isActiveAncher=3;jump('logistics')"></el-button>
              <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==3 }">填写后勤管理信息</span><br>
              <div class="ancherLine"></div>
            </div>
            <div class="ancherStation" v-show="isContribute">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher==4 }"  v-on:click="isActiveAncher=4;jump('contribute')"></el-button>
              <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==4}">论文投稿信息</span><br>
              <div class="ancherLine"></div>
            </div>
            <div class="ancherStation">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher==5 }"  v-on:click="isActiveAncher=5;jump('advertise')"></el-button>
              <span class="ancherName"  v-bind:class="{textActive:isActiveAncher==5}">填写宣传管理信息</span><br>
            </div>
          </div>
        </div>

        <div class="bottom col-md-12">
          已到达底部
        </div>
  </div>
</template>

<script>
  import lead from './information/infor-lead';
  import finance from './information/infor-finance';
  import logistics from './information/infor-logistics';
  import advertise from './information/infor-advertise';
  import professor from './information/infor-professor';
  import MeetlistHeader from "./MeetlistHeader";
  import InforPaper from "./information/infor-paper";
  import { mapGetters } from 'vuex';
  export default {
    name: "AddInformation",
    props:["meetId"],
    components:{
      InforPaper,
      MeetlistHeader,
      "info-lead":lead,
      "info-finance":finance,
      "info-logistics":logistics,
      "info-advertise":advertise,
      'info-professor':professor
    },
    data(){
        return{
          isActiveAncher:1,//锚点
          contribute:{},
          logistics:{},
          pay:{},
          professor:{},
          meetInfo:{},
          isContribute:false,
          isLogistics:false,
          isPay:false,
          isProfessor:false,
          isAdvertise:false,
          dotList:[]
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
        this.$http.post('/yii/meetlist/prepare/index',data)
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
                this.dotList[3]="logistics";
              }
              if(res.data.data.pay){
                this.isPay=true;
                this.pay=res.data.data.pay!="empty"?res.data.data.pay:{};
                this.dotList[1]="pay";
              }
              if(res.data.data.professor){
                this.isProfessor=true;
                this.professor=res.data.data.professor!="empty"?res.data.data.professor:{};
                this.dotList[2]="professor";
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
      meetInfo: {
        handler(newValue, oldValue) {
        },
        deep: true
      },
      pay: {
        handler(newValue, oldValue) {
        },
        deep: true
      },
      meetId: {
        handler(newValue, oldValue) {
          if(newValue){
            this.dotList=[],
            this.isContribute=false;
            this.isLogistics=false;
            this.isPay=false;
            this.isProfessor=false;
            this.isAdvertise=false;
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
   .display{
     background-color:#fff;
     margin-top:20px;
     min-height: 600px;
   }
   .left{
     background-color:#fff;
     padding-left: 10%;
   }
   .right{
     background-color:#fff;
   }
  .nextStep{
    text-align: center;
    font-size:20px;
    padding-top:50px;
  }
  .nextStepSpan{
    border:solid 1px #C9C8C8 ;
    border-radius: 8px;
    padding:10px 20px 10px 20px;
    background-color: #F2F2F2;
  }
  .nextStepSpan:hover{
    background-color: #fff;
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
