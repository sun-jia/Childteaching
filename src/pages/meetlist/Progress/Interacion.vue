<template>
  <div id="fullHeight3" index="03" class="d_jump" title="会议交互">
    <div class="listname">会议交互<i class="el-icon-menu" style="padding-left:5px;"></i></div>
    <div>
      <el-table
        :data="interaction"
        style="width: 80%"
        height="330">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题"
          width="200">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          width="">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button  type="text" size="small" v-on:click="seeInteraction(scope.row)">查看</el-button>
            <el-button  type="text" size="small" v-on:click="pushInteraction(scope.row)">推送</el-button>
            <el-button type="text" size="small" v-on:click="stopInteraction(scope.row)">停止</el-button>
            <el-button type="text" size="small" v-on:click="deleteInteraction(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top: 10px;" v-on:click="newQuestion=true;">新增问题</el-button>
      <el-button style="margin-top: 10px;">新增问卷</el-button>
      <el-button style="margin-top: 10px;" >新增交互</el-button>
    </div>
    <el-dialog
      title="新增问题"
      :visible.sync="newQuestion"
      width="50%">
      <el-form ref="form" :model="questionForm" label-width="80px">
        <el-form-item label="单选">
          选项数：
          <el-select v-model="singleOptionNum" style="width:100px;margin-left: 5px;margin-right: 5px;">
            <el-option disabled value="">选择</el-option>
            <el-option value="2">2</el-option>
            <el-option value="3">3</el-option>
            <el-option value="4">4</el-option>
            <el-option value="5">5</el-option>
            <el-option value="6">6</el-option>
            <el-option value="7">7</el-option>
            <el-option value="8">8</el-option>
          </el-select>
          <span class="el-icon-circle-plus" style="color:#00AAFF;" v-on:click="singleSelectionAdd(singleOptionNum)">添加</span>
          <span class="el-icon-remove" style="color:#00AAFF" v-on:click="questionConcel(1)">减少</span>
          题目数量:<el-input :disabled="true" v-model="singleNum" style="width:50px;margin-left: 5px;margin-right: 5px;"></el-input>
        </el-form-item>
        <el-form-item label="多选">
          选项数：
          <el-select v-model="multipleOptionNum" style="width:100px;margin-left: 5px;margin-right: 5px;">
            <el-option disabled value="">选择</el-option>
            <el-option value="2">2</el-option>
            <el-option value="3">3</el-option>
            <el-option value="4">4</el-option>
            <el-option value="5">5</el-option>
            <el-option value="6">6</el-option>
            <el-option value="7">7</el-option>
            <el-option value="8">8</el-option>
          </el-select>
          <span class="el-icon-circle-plus" style="color:#00AAFF;" v-on:click="multipleSelectionAdd(multipleOptionNum)">添加</span>
          <span class="el-icon-remove" style="color:#00AAFF" v-on:click="questionConcel(2)">减少</span>
          题目数量:<el-input :disabled="true" v-model="multipleNum" style="width:50px;margin-left: 5px;margin-right: 5px;"></el-input>
        </el-form-item>
        <el-form-item label="填空">
          题目数量:<el-input v-model="inputNum" style="width:50px;margin-left: 5px;margin-right: 5px;"></el-input>
          <span class="el-icon-circle-plus" style="color:#00AAFF" v-on:click="inputQuestionAdd(inputNum)">添加</span>
          <span class="el-icon-remove" style="color:#00AAFF" v-on:click="questionConcel(3)">减少</span>
        </el-form-item>
        <hr>
        <!--单选-->
        <el-form-item label="单选" v-for="key in parseInt(singleNum)" style="margin-top: 10px;">
          问题{{key}}：<el-input v-model="questionForm.singleSelection[key-1].singleSelectionTitle" placeholder="请输入问题" style="width:500px;"></el-input><br>
          <!--选项：-->
          <el-radio-group v-model="questionForm.singleSelection[key-1].singleSelectionItem" v-for="index in parseInt(singleOptionNumber[key-1])">
            <el-radio :label="chooseArr[index-1]">{{chooseArr[index-1]}}<input v-model="questionForm.singleSelection[key-1].singleSelectionOption[index-1]" style="padding:5px;border-radius: 5px;border:1px solid #D2D2D2;margin-left: 5px "><br></el-radio>
            <br>
          </el-radio-group><br>
          <el-button v-on:click="inputReset(1,key-1)" style="margin-top: 5px;">重置</el-button>
        </el-form-item>
        <!--多选-->
        <hr v-show="multipleNum!=0">
        <el-form-item label="多选" v-for="key in parseInt(multipleNum)" style="margin-top: 10px;">
          问题{{singleNum+key}}：<el-input v-model="questionForm.multipleSelection[key-1].multipleSelectionTitle" placeholder="请输入问题" style="width:500px;"></el-input><br>
          <el-checkbox-group v-model="questionForm.multipleSelection[key-1].multipleSelectionItem" v-for="index in parseInt(multipleOptionNumber[key-1])">
            <el-checkbox :label="chooseArr[index-1]"><input v-model="questionForm.multipleSelection[key-1].multipleSelectionOption[index-1]" style="padding:5px;border-radius: 5px;border:1px solid #D2D2D2 "></el-checkbox>
          </el-checkbox-group>
          <el-button v-on:click="inputReset(2,key-1)" style="margin-top: 5px;">重置</el-button>
        </el-form-item>
        <!--填空-->
        <hr v-show="inputNum!=0">
        <el-form-item label="填空" v-for="key in parseInt(inputNum)" >
          问题{{singleNum+multipleNum+key}}：<el-input v-model="questionForm.inputQuestion[key-1].inputQuestionTitle" style="width:500px;" placeholder="请输入问题"></el-input>
          <br>回答：<el-input
          type="textarea"
          :rows="5"
          placeholder="请输入回答"
          v-model="questionForm.inputQuestion[key-1].inputQuestionContent"
          style="width:600px;margin-left: 9px;margin-top: 5px;">
        </el-input><br>
          <el-button v-on:click="inputReset(3,key-1)" style="margin-top: 5px;">重置</el-button>
        </el-form-item>
        <!--{{questionForm}}-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn3" type="info"  @click="newQuestion=false;newQuestionConcel()">取消</el-button>
        <!--<el-button type="primary" v-on:click="reset" class="btn2 icon-huanyihuan">重置</el-button>-->
        <el-button type="primary" class="btn2 icon-baocun2" @click="save(newAnnouncementForm)">保存</el-button>
        <el-button type="primary" class="btn2 icon-fabu1" @click="release(newAnnouncementForm)">推送</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Interacion",
      data(){
          return{
            interaction: [
              {
                name: '问题一',
                time: '2018-06-01 08:00:00'
              },
              {
                name: '问题二',
                time: '2018-06-01 08:00:00'
              },
              {
                name: '问题三',
                time: '2018-06-01 08:00:00'
              },
              {
                name: '问题四',
                time: '2018-06-01 08:00:00'
              }, {
                name: '问题五',
                time: '2018-06-01 08:00:00'
              }
            ],
            addQuestion: true, // 添加问题
            questionForm: {
              singleSelection: [],
              multipleSelection: [],
              inputQuestion: []
            }, // 问题表单
            singleOptionNum: '2', // 单选选项数量
            singleOptionNumber: [], // 所有单选选项数量
            chooseArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], // 选择项
            multipleOptionNum: '3', // 多选选项数量
            multipleOptionNumber:[],//所有单选选项数量
            inputNum: 0, // 填空题数量
            singleNum: 0, /// /单选题目数量
            multipleNum: 0, // 多选题目数量
            newQuestion: false, // 新增互动问题
          }
      },
      methods:{
        // 保存
        save: function (form) {

        },
        // 查看交互
        seeInteraction: function (val) {

        },
        // 推送交互
        pushInteraction: function (val) {

        },
        // 删除交互
        deleteInteraction: function (val) {

        },
        // 添加单选
        singleSelectionAdd: function (val) {
          console.log(val)
          this.singleOptionNumber[this.singleNum] = val
          this.singleNum++
          this.questionForm.singleSelection.push({singleSelectionTitle: '', singleSelectionOption: [],singleSelectionItem:[]})
          console.log(this.singleNum)
        },
        // 添加多选
        multipleSelectionAdd: function (val) {
          console.log(val)
          this.multipleOptionNumber[this.multipleNum] = val
          this.multipleNum++
          this.questionForm.multipleSelection.push({multipleSelectionTitle: '', multipleSelectionOption: [],multipleSelectionItem:[]})

        },
        //添加填空
        inputQuestionAdd:function(val){
          this.inputNum++;
          this.questionForm.inputQuestion.push({inputQuestionTitle: '', inputQuestionContent: ''})
        },
        // 提交
        questionSubmit: function (val) {

        },
        // 取消
        questionConcel: function (val,key) {
          if(val==1&&(this.singleNum>0)){
            this.questionForm.singleSelection.pop()
            this.singleNum--
          }else if(val==2&&(this.multipleNum>0)){
            this.questionForm.multipleSelection.pop()
            this.multipleNum--
          }else if(val==3&&(this.inputNum>0)){
            this.questionForm.inputQuestion.pop()
            this.inputNum--;
          }
        },
        //重置
        inputReset:function (val,index) {
          if(val==1){
            this.questionForm.singleSelection[index].singleSelectionTitle=''
            this.questionForm.singleSelection[index].singleSelectionOption=[]
            this.questionForm.singleSelection[index].singleSelectionItem=[]
          }else if(val==2){
            this.questionForm.multipleSelection[index].multipleSelectionTitle=''
            this.questionForm.multipleSelection[index].multipleSelectionOption=[]
            this.questionForm.multipleSelection[index].multipleSelectionItem=[]
          }else{
            this.questionForm.inputQuestion[index].inputQuestionTitle=''
            this.questionForm.inputQuestion[index].inputQuestionContent=''
          }
        },
        //新建取消
        newQuestionConcel:function () {
          for(let i=this.singleNum;i>0;i--,this.singleNum--){
            this.questionForm.singleSelection.pop()
          }
          for(let j=this.multipleNum;j>0;j--,this.multipleNum--){
            this.questionForm.multipleSelection.pop()
          }

          for(let k=this.inputNum;k>0;k--,this.inputNum--){
            this.questionForm.inputQuestion.pop()
          }
          console.log(this.questionForm)
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
</style>
