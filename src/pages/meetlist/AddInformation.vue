<template>
    <div class="display col-md-12">
        <!--顶部-->
        <div class="top col-md-12">
          <span>会议准备信息填写</span>
         <MeetlistHeader></MeetlistHeader>
          <hr>
        </div>

        <div class="left col-md-10">
          <!--模块负责人-->
          <info-lead v-bind:propdata="meetInfo"></info-lead>
          <hr>
          <!--财务管理-->
          <info-finance v-bind:propdata="pay"></info-finance>
          <hr>
          <!--后勤管理-->
          <info-logistics  v-bind:propdata="logistics"></info-logistics>
          <hr>
          <!--会议宣传-->
          <info-advertise></info-advertise>
          <hr>
          <!--论文接收-->
          <infor-paper></infor-paper>
          <hr>
          <div class="nextStep">
            <span class="nextStepSpan">进入筹备阶段<i class="icon-processing"></i></span>
          </div>
        </div>
        <div class="right col-md-2">
          <div class="ancherFixed">
            <div style="height:76px;">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher1}" v-on:click="isActiveAncher1=true;isActiveAncher2=false;isActiveAncher3=false;isActiveAncher4=false;jump(0)"></el-button>
              <span style="padding-top:0px;font-size: 16px;vertical-align:-webkit-baseline-middle;" v-bind:class="{textActive:isActiveAncher1 }">负责人信息</span><br>
              <div style="width: 3px; height: 50px; background-color: #DFDFDF;margin-left:11px;"></div>
            </div>
            <div style="height:86px;">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher2}" v-on:click="isActiveAncher1=false;isActiveAncher2=true;isActiveAncher3=false;isActiveAncher4=false;isActiveAncher5=false;jump(1)"></el-button>
              <span style="font-size: 16px;vertical-align:-webkit-baseline-middle;" v-bind:class="{textActive:isActiveAncher2 }">填写财务管理信息</span><br>
              <div style="width: 3px; height: 60px; background-color: #DFDFDF;margin-left:11px;"></div>
            </div>
            <div style="height:106px;">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher3 }"  v-on:click="isActiveAncher1=false;isActiveAncher2=false;isActiveAncher3=true;isActiveAncher4=false;isActiveAncher5=false;jump(2)"></el-button>
              <span style="padding-top:5px;font-size: 16px;vertical-align:-webkit-baseline-middle;" v-bind:class="{textActive:isActiveAncher3 }">填写后勤管理信息</span><br>
              <div style="width: 3px; height: 80px; background-color: #DFDFDF;margin-left:11px;"></div>
            </div>
            <div style="height:106px;">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher4 }"  v-on:click="isActiveAncher1=false;isActiveAncher2=false;isActiveAncher3=false;isActiveAncher4=true;isActiveAncher5=false;jump(3)"></el-button>
              <span style="padding-top:5px;font-size: 16px;vertical-align:-webkit-baseline-middle;" v-bind:class="{textActive:isActiveAncher4}">填写宣传管理信息</span><br>
              <div style="width: 3px; height: 80px; background-color: #DFDFDF;margin-left:11px;"></div>
            </div>
            <div style="height:26px;">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher5 }"  v-on:click="isActiveAncher1=false;isActiveAncher2=false;isActiveAncher3=false;isActiveAncher4=false;isActiveAncher5=true;jump(4)"></el-button>
              <span style="padding-top:5px;font-size: 16px;vertical-align:-webkit-baseline-middle;" v-bind:class="{textActive:isActiveAncher5}">论文投稿信息</span><br>
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
  import { mapGetters } from 'vuex';
  import MeetlistHeader from "./MeetlistHeader";
  import InforPaper from "./information/infor-paper";

  export default {
    name: "AddInformation",
    props:["meetId"],
    components:{
      InforPaper,
      MeetlistHeader,
      "info-lead":lead,
      "info-finance":finance,
      "info-logistics":logistics,
      "info-advertise":advertise
    },
    data(){
        return{
          // formLabelWidth: '120px',
          isActiveAncher1:true,//锚点
          isActiveAncher2:false,//锚点
          isActiveAncher3:false,//锚点
          isActiveAncher4:false,//锚点
          isActiveAncher5:false,//锚点
          contribute:{},
          logistics:{},
          pay:{},
          professor:{},
          meetInfo:{},
          isContribute:false,
          isLogistics:false,
          isPay:false,
          isProfessor:false,
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
      getInformation:function () {
        let data={
          userId:this.$store.getters.getUser,
          meetId:this.meetId
        };
        this.$http.post('/yii/meetlist/prepare/index',data)
          .then((res) => {
            if(res.data.data!=null){
              this.contribute=res.data.data.contribute;
              this.logistics=res.data.data.logistics;
              this.pay=res.data.data.pay;
              this.professor=res.data.data.professor;
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
      // console.log(this.fullHeight);
       //设置各部分的高度
      document.getElementById('halfHeight1').style.minHeight=(this.fullHeight/3)+'px';
      document.getElementById('halfHeight2').style.minHeight=(this.fullHeight/3)+'px';
      document.getElementById('fullHeight1').style.minHeight=(this.fullHeight)+'px';
      document.getElementById('fullHeight2').style.minHeight=(this.fullHeight)+'px';
      document.getElementById('fullHeight3').style.minHeight=(this.fullHeight)+'px';
      // console.log(document.getElementById('halfHeight1').style.height)
      this.getInformation();
    },
    ...mapGetters([
      'getUser',
    ]),
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
          this.getInformation();
        },
        deep: true
      }
    },
  }
</script>

<style scoped>
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
