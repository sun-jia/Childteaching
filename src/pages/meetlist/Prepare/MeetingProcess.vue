<template>
  <div id="fullHeight3" index="04" class="d_jump" title="会议进程信息填写">
    <div class="listname">会议宣传<i class="el-icon-menu" style="padding-left:5px;"></i></div>
    <div class="meeting">
      <el-form :model="registeredForm">
        <el-form-item label="会议注册" style="margin-top:10px;">
          <span>时间</span>
          <el-date-picker
            v-model="registeredForm.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <span>地点</span><el-input  placeholder="请输入地点" v-model="registeredForm.position" style="width:200px;"></el-input>
          <br><span>备注</span><el-input type="textarea" :rows="2" placeholder="请输入备注信息" v-model="registeredForm.remarks" style="width:400px;margin-top: 10px;margin-left: 5px;"></el-input>
        </el-form-item>
        <el-button @click="registeredReset">重置</el-button>
        <el-button type="primary" @click="registeredSubmit">确定</el-button>
        {{registeredForm}}
      </el-form>
      <el-form :model="reportForm" style="margin-top:20px;">
        <el-form-item label="会议报告">
          <span>报告数量</span><el-input placeholder="填入会议报告数量" v-model="reportForm.num" style="width:120px;"></el-input>
          <span class="el-icon-circle-plus" style="color:#00AAFF" v-on:click="reportAdd()">增加</span>
          <span class="el-icon-remove" style="color:#00AAFF" v-on:click="reportRemove()">减少</span>
        </el-form-item>
        <div style="padding-bottom:500px;">
          <el-form-item label="" v-for="key in parseInt(reportForm.num)">
            <span style="font-weight: bold;padding-right:10px;">报告{{key}}</span>
            <span>报告主题</span>&nbsp<el-input v-model="reportForm.report.topic[key-1]" style="width:200px;"></el-input>&nbsp&nbsp
            <span>报告时间</span>&nbsp
            <el-date-picker
              v-model="reportForm.report.time[key-1]"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>&nbsp&nbsp
            <span>报告地点</span>&nbsp<el-input v-model="reportForm.report.position[key-1]" style="width:200px;"></el-input>&nbsp&nbsp
            <br><span style="padding-left:50px;">简介</span><el-input type="textarea" :rows="3" placeholder="请输入简介信息" v-model="reportForm.report.Introduction[key-1]" style="width:400px;margin-top: 10px;margin-left: 5px;"></el-input>
            <el-button @click="reportReset(key-1)">重置</el-button>
            <el-button type="primary" v-on:click="reportSubmit()">确定</el-button>
          </el-form-item>
        </div>
        <!--{{reportForm}}-->
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "MeetingProcess",
      data(){
        return{
          registeredForm:{
            time:'',
            position:'',
            remarks:'',//备注信息
          },//会议注册
          reportForm:{
            num:0,//报告数量
            report:{
              topic:[],//主题
              Introduction:[],//简介
              time:[],
              position:[],
            }
          },//报告信息
        }
      },
      methods:{
        //会议注册重置
        registeredReset:function () {
          this.registeredForm.time=[];
          this.registeredForm.position='';
          this.registeredForm.remarks='';
        },
        //会议注册信息提交
        registeredSubmit:function () {

        },
        //报告数量加一
        reportAdd:function(){
          this.reportForm.report.topic[this.reportForm.num]='';
          this.reportForm.report.Introduction[this.reportForm.num]='';
          this.reportForm.report.time[this.reportForm.num]='';
          this.reportForm.report.position[this.reportForm.num]='';
          // console.log(this.reportForm.report.topic[this.reportForm.num]);
          // console.log(this.reportForm.report.Introduction[this.reportForm.num]);
          // console.log(this.reportForm.report.time[this.reportForm.num]);
          // console.log(this.reportForm.num)
          this.reportForm.num++;
        },
        //报告数量减一
        reportRemove:function () {
          if(this. reportForm.num!=0){
            let a=[],b=[],c=[],d=[];
            a=this.reportForm.report.topic;
            b=this.reportForm.report.Introduction;
            c=this.reportForm.report.time;
            d=this.reportForm.report.position;
            //初始化
            this.reportForm.report.topic=[];
            this.reportForm.report.Introduction=[];
            this.reportForm.report.time=[];
            this.reportForm.report.position=[];
            this.reportForm.num--;
            for(let i=0;i<this.reportForm.num;i++){
              this.reportForm.report.topic[i]=a[i];
              this.reportForm.report.Introduction[i]=b[i];
              this.reportForm.report.time[i]=c[i];
              this.reportForm.report.position[i]=d[i];
            }
          }
        },
        //报告信息重置
        reportReset:function (val) {
          this.$set(this.reportForm.report.topic,val,"");
          this.$set(this.reportForm.report.Introduction,val,"");
          this.$set(this.reportForm.report.time,val,"");
          this.$set(this.reportForm.report.position,val,"");
        },
        //报告信息提交
        reportSubmit:function () {

        }
      }
    }
</script>

<style scoped>
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
</style>
