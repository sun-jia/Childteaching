<template>
  <div id="display">
    <div class="list col-md-9">
      <div class="listname">会议编辑<i class="el-icon-menu" style="padding-left:5px;"></i></div>
      <div class="fold">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title" >
              <p class="name">进行中<i class="name icon-jinxingzhong2"></i></p>
            </template>
            <div class="meetDispaly" v-for="item in meeting">
              {{item.conferenceName}}
              <span class="see"><button class="btn icon-faxian" v-on:click="seeMeet(item.conferenceName,item.conferenceDate,item.duty.propaganda,item.duty.logistics,item.duty.finance,item.duty.Interaction)">查看</button></span>
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <p class="name">已发布<i class="name icon-weibofang-xue"></i></p>
            </template>
            <div class="meetDispaly" v-for="item in  release">
              {{item.conferenceName}}
              <span class="see"><button class="btn icon-changyonggoupiaorenshanchu" v-on:click="deleteMeet()">删除</button></span>
              <span class="see"><button class="btn icon-shouhuodizhiyebianji" v-on:click="editMeet(item.conferenceNameid)">编辑</button></span>
              <span class="see"><button class="btn icon-faxian" v-on:click="seeMeet(item.conferenceName,item.duty.propaganda,item.duty.logistics,item.duty.finance,item.duty.Interaction)">查看</button></span>
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <p class="name">已保存<i class="name icon-baocun3 "></i></p>
            </template>
            <div class="meetDispaly" v-for="item in  save">
              {{item.conferenceName}}
              <span class="see"><button class="btn icon-changyonggoupiaorenshanchu" v-on:click="deleteMeet()">删除</button></span>
              <span class="see"><button class="btn icon-shouhuodizhiyebianji" v-on:click="editMeet(item.conferenceNameid)">编辑</button></span>
              <span class="see"><button class="btn icon-fabu" v-on:click="releaseMeet()">发布</button></span>
              <span class="see"><button class="btn icon-faxian" v-on:click="seeMeet(item.conferenceName,item.conferenceDate,item.duty.propaganda,item.duty.logistics,item.duty.finance,item.duty.Interaction)">查看</button></span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

    </div>
    <div class="col-md-3">
      <el-button class="btn4 icon-jiajianzujianjiahao"  v-on:click="addMeet" > 新建订单</el-button>
      <el-dialog title="新建会议" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="会议名称" :label-width="formLabelWidth" prop="name">
            <el-input placeholder="输入会议名称" v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="会议时间" :label-width="formLabelWidth"  prop="conferenceData">
            <el-date-picker
              v-model="form.conferenceDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="需要启用的模块" :label-width="formLabelWidth">
            <el-checkbox :indeterminate="isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <!--<div style="margin: 15px 0;"></div>-->
            <el-checkbox-group v-model="form.checkedModels"  @change="handleCheckedModelChange">
              <el-checkbox   v-for="model in models" :label="model" :key="model">{{model}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div v-show="duty">
            <el-form-item  label="会议各项负责人" :label-width="formLabelWidth">
              <div v-for="item in form.checkedModels">{{item}}
                <el-input v-if="item=='会议宣传'" placeholder="输入姓名" v-model="form.duty.propaganda" auto-complete="off" :label-width="formLabelWidth"></el-input>
                <el-input v-if="item=='后勤管理'" placeholder="输入姓名" v-model="form.duty.logistics" auto-complete="off"></el-input>
                <el-input v-if="item=='财务管理'" placeholder="输入姓名" v-model="form.duty.finance" auto-complete="off"></el-input>
                <el-input v-if="item=='会议交互'" placeholder="输入姓名" v-model="form.duty.Interaction" auto-complete="off"></el-input>
              </div>
            </el-form-item>
          </div>
        </el-form>
        <!--{{form.checkedModels}}-->
        <!--{{form.duty}}-->
        <div slot="footer" class="dialog-footer">
          <el-button class="btn3" type="info"  @click="concel()">取消</el-button>
          <el-button type="primary" v-on:click="reset" class="btn2 icon-huanyihuan">重置</el-button>
          <el-button type="primary" class="btn2 icon-baocun2" v-on:click="saveMeet(form)">保存</el-button>
          <el-button type="primary" class="btn2 icon-fabu1" v-on:click="releaseMeet(form)">发布</el-button>
        </div>
      </el-dialog>


      <el-dialog  title="修改会议" :visible.sync="dialogFormEditVisible">
        <el-form :model="form">
          <el-form-item label="会议名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" placeholder="" value="form.conferenceNameid" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="会议时间" :label-width="formLabelWidth" prop="conferenceData">
            <el-date-picker
              v-model="form.conferenceDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="需要启用的模块" :label-width="formLabelWidth">
            <el-checkbox :indeterminate="isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <!--<div style="margin: 15px 0;"></div>-->
            <el-checkbox-group v-model="form.checkedModels"  @change="handleCheckedModelChange">
              <el-checkbox   v-for="model in models" :label="model" :key="model">{{model}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div v-show="duty">
            <el-form-item  label="会议各项负责人" :label-width="formLabelWidth">
              <!--{{meeting}}-->
              <div v-for="item in form.checkedModels">{{item}}
                <el-input v-if="item=='会议宣传'" placeholder="输入姓名" v-model="form.duty.propaganda" auto-complete="off" :label-width="formLabelWidth"></el-input>
                <el-input v-if="item=='后勤管理'" placeholder="输入姓名" v-model="form.duty.logistics" auto-complete="off"></el-input>
                <el-input v-if="item=='财务管理'" placeholder="输入姓名" v-model="form.duty.finance" auto-complete="off"></el-input>
                <el-input v-if="item=='会议交互'" placeholder="输入姓名" v-model="form.duty.Interaction" auto-complete="off"></el-input>
              </div>
            </el-form-item>
          </div>
        </el-form>
        <!--{{form}}-->
        <!--{{form.checkedModels}}-->
        <!--{{form.duty}}-->
        <div slot="footer" class="dialog-footer">
          <el-button class="btn3" type="info"  @click="concel()">取消</el-button>
          <el-button type="primary" v-on:click="reset" class="btn2 icon-huanyihuan">重置</el-button>
          <el-button type="primary" class="btn2 icon-baocun2" @click="saveMeet(form)">保存</el-button>
          <el-button type="primary" class="btn2 icon-fabu1" @click="releaseMeet(form)">发布</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    const modelOptions = ['会议宣传', '后勤管理', '财务管理','会议交互'];
    export default {
        name: "Index",
        data() {
          return {
             meeting:[
               { conferenceName:'会议1',
                 conferenceNameid:'1001',
                 conferenceDate:['2018-02-12 15:20:30','2018-02-16 19:20:30'],
                 modelOptions:['会议宣传', '后勤管理', '财务管理','会议交互'],
                 duty: {
                   propaganda:'张三',
                   logistics:'李四',
                   finance:'王五',
                   Interaction:'赵六'
                 },
               },
               {conferenceName:'会议2',
                 conferenceNameid:'1002',
                 modelOptions:['会议宣传', '后勤管理', '财务管理','会议交互'],
                 duty: {
                   propaganda:'张三',
                   logistics:'李四',
                   finance:'王五',
                   Interaction:'赵六'
                 },
               },
               {conferenceName:'会议3',
                 conferenceNameid:'1003',
                 modelOptions:['会议宣传','会议交互'],
                 duty: {
                   propaganda:'张三',
                   logistics:'李四',
                   finance:'王五',
                   Interaction:'赵六'
                 },
               }
             ],
            release:[
              {conferenceName:'会议4',
                conferenceNameid:'1004',
                modelOptions:['会议宣传', '财务管理','会议交互'],
                duty: {
                  propaganda:'张三',
                  logistics:'李四',
                  finance:'王五',
                  Interaction:'赵六'
                },
              },
              {conferenceName:'会议5',
                conferenceNameid:'1005',
                modelOptions:['会议宣传', '后勤管理', '财务管理'],
                duty: {
                  propaganda:'张三',
                  logistics:'李四',
                  finance:'',
                  Interaction:'赵六'
                },
              },
            ],
            save:[
              {conferenceName:'会议6',
                conferenceNameid:'1006',
                duty: {
                  propaganda:'张三',
                  logistics:'李四',
                  finance:'王五',
                  Interaction:'赵六'
                },
              }
            ],
            models: modelOptions,
            isIndeterminate: true,
            dialogFormEditVisible:false,
            dialogFormVisible: false,
            duty:false,
            form: {
              conferenceDate: [],
              endTime:'',
              name: '',
              checkAll: false,
              checkedModels: [],
              duty: {
                propaganda:'',
                logistics:'',
                finance:'',
                Interaction:'',
              },
            },
            formLabelWidth: '120px',
            // item:'',
            rules: {
              name: [
                { required: true, message: '请输入会议名称', trigger: 'blur' },
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              conferenceData: [
                { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
              ],
            }
          }
        },
      methods:{
        //新建会议
        addMeet(){
          this.dialogFormVisible = true;
          this.form.name='';
          this.form.checkAll= false;
          this.form.checkedModels=[];
          this.form.duty.propaganda = '';
          this.form.duty.logistics = '';
          this.form.duty.finance = '';
          this.form.duty.Interaction = '';
        },
        //取消编辑
        concel(){
          this.dialogFormVisible = false;
          this.dialogFormEditVisible = false;
          this.$message({
            showClose: true,
            message: '恭喜你，已取消成功',
            type: 'success'
          })
        },
            //编辑会议
        editMeet(conferenceNameid){
          // console.log(conferenceNameid);
          this.dialogFormEditVisible=true;
          this.meeting.modelOptions= ['会议宣传','后勤管理' ,'财务管理','会议交互'];
          this.form.name='会议';
          this.form.conferenceDate=['2018-02-12 15:20:30','2018-02-16 19:20:30'],
          this.form.duty.propaganda = '张三';
          this.form.duty.logistics = '李四';
          this.form.duty.finance = '王五';
          this.form.duty.Interaction = '赵六';
          this.form.checkedModels=this.meeting.modelOptions;
          //如果全选则显示负责人部分
          this.form.checkAll = (this.meeting.modelOptions.length==modelOptions.length) ? true : false;
          // console.log(this.form.checkAll);
          if(this.meeting.modelOptions.length!=0||this.form.checkAll){
            this.duty=true;
          }
        },
        //删除会议
        deleteMeet(){

        },
        //保存编辑
        saveMeet(formName){
          console.log(formName);
          this.dialogFormVisible = false;
          this.dialogFormEditVisible = false;
          // this.$refs[formName].validate((valid) => {
          //   if (valid) {
          //     alert('submit!');
          //   } else {
          //     console.log('error submit!!');
          //     return false;
          //   }
          // });
          this.$message({
            showClose: true,
            message: '恭喜你，已保存成功',
            type: 'success'
          });
          this.$router.go(0);
        },
        //查看会议
        seeMeet(conferenceName,conferenceDate,propaganda,logistics,finance,Interaction){
          // console.log(conferenceName);
          // console.log(conferenceDate);
          const h = this.$createElement;
          this.$msgbox({
            title: '会议详情',
            message: h('p', null, [
              h('span', null, '会议名称 '),
              h('i', { style: 'color: teal;margin-left:10px;' }, conferenceName),
              h('br'),
              h('span', null, '会议时间 '),
              h('i', { style: 'color: teal;margin-left:10px;' }, conferenceDate[0]+'—'+conferenceDate[1]),
              h('br'),
              h('span', { style: 'font-weight:bold;text-align:center;font-size:16px;' }, '模块负责人 '),
              h('br'),
              h('span', null, '会议宣传:'),
              h('i', { style: 'color: teal;margin-left:10px;' }, propaganda),
              h('br'),
              h('span', null, '后勤管理:'),
              h('i', { style: 'color: teal;margin-left:10px;' }, logistics),
              h('br'),
              h('span', null, '财务管理:'),
              h('i', { style: 'color: teal;margin-left:10px;' }, finance),
              h('br'),
              h('span', null, '会议互动:'),
              h('i', { style: 'color: teal;margin-left:10px;' }, Interaction),
            ]),
            confirmButtonText: '返回',
          }).then(action => {
            this.$message({
              type: 'info',
              message: '已返回主页面'
            });
          });
        },
        // submitForm(formName) {
        //   this.$refs[formName].validate((valid) => {
        //     if (valid) {
        //       alert('submit!');
        //     } else {
        //       console.log('error submit!!');
        //       return false;
        //     }
        //   });
        // },
        //发布会议
        releaseMeet(formName){
          this.dialogFormVisible = false;
          this.dialogFormEditVisible = false;
          // this.$refs[formName].validate((valid) => {
          //   if (valid) {
          //     alert('submit!');
          //   } else {
          //     console.log('error submit!!');
          //     return false;
          //   }
          // });
          this.$message({
            showClose: true,
            message: '恭喜你，已发布成功',
            type: 'success'
          });
          this.$route.replace("../pages/meetedit/Index");
          this.$router.go(0);
        },
        reset(){
          this.form.duty.propaganda='';
          this.form.duty.logistics='';
          this.form.duty.finance='';
          this.form.duty.Interaction='';
        },
        handleCheckAllChange(val) {
          this.meeting.checkedModels=this.form.checkedModels = val ? modelOptions : [];
          this.isIndeterminate = false;
          let checkedCount = this.form.checkedModels.length;
          if( checkedCount == 0){
            this.duty=false;
          }else{
            this.duty=true;
          }
        },
        handleCheckedModelChange(value) {
          let checkedCount = value.length;
          console.log(checkedCount);
          console.log(this.models.length);
          this.form.checkAll = checkedCount === this.models.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.models.length;
          if( checkedCount == 0){
            this.duty=false;
          }else{
            this.duty=true;
          }
        }
      }
    }
</script>

<style scoped>
 #display{
  margin-top:20px;
   border:solid 2px  #e0e0e0;
   height: 600px;
   /*text-align: center;*/
   width: 98%;
   padding-left:10px;
   padding-right:10px;
   background-color:  #fff;
 }
  .list{
    /*width:70%;*/
    padding-top:20px;
    padding-left:20px;
  }
  .listname{
    font-size:18px;
    font-wight:bold;
    color:#fff;
    background-color:#097FC7;
    width:100%;
    height:40px;
    border:solid 1px #097FC7;
    border-radius: 4px;
    padding-top:5px;
    padding-left:3px;
  }
  .name{
    font-size:16px;
    padding-left:8px;
  }
  .fold{
    /*border-left:solid 1px #EBECED;*/
    border:solid 1px #EBECED;
    /*padding-left:5px;*/
  }
  .meetDispaly{
    font-size:15px;
    padding-left:15px;
    border-bottom:solid 1px #fff;
    padding-top:5px;
    padding-bottom:5px;
    background-color:#F4F5F6;
  }
 .meetDispaly:hover{
   background-color:#EFEFEF;
 }
  .see{
    float:right;
    padding-right: 15px;
    font-size: 14px;
  }
  .btn{
    border:none;
    background-color:#F4F5F6;
    box-shadow: none;
    padding:0px 3px 0px 3px;
  }
 .btn:hover{
   background-color:#EFEFEF;
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
   width:90px;
   padding:10px;
   font-size: 14px;
   border-radius: 3px;
   border:none;
   color:white;
   background-color:#338FFC ;
   float: right;
   /*margin-left: 15px;*/
   margin-top: 20px;
   /*margin-bottom: 5px;*/
 }
 .btn4:hover{
   background-color:#5FA7FE;
 }



</style>
