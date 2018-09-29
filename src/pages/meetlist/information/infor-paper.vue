<template>
  <div index="05" class="d_jump fullHeight" title="论文接收信息填写">
    <div class="listname">论文投稿<i class="el-icon-menu" style="padding-left:5px;vertical-align: center"></i></div>
    <div style="margin-top: 10px;">
      <el-form :model="paperForm">
        <el-form-item label="论文">
          <span>报告数量</span><el-input placeholder="填入论文主题数量" v-model="topicNum" style="width:120px;"></el-input>
          <span class="el-icon-circle-plus" style="color:#00AAFF" v-on:click="topicAdd()">增加</span>
          <span class="el-icon-remove" style="color:#00AAFF" v-on:click="topicRemove()">减少</span>
        </el-form-item>
        <div>
          <el-form-item label="" v-for="key in parseInt(topicNum)">
            <span style="font-weight: bold;padding-right:10px;">主题{{key}}</span>
            <el-input v-model="paperForm.topic[key-1]" style="width:200px;"></el-input>&nbsp&nbsp
            <el-button @click="paperReset(key-1)">重置</el-button>
          </el-form-item>
          <el-form-item label="邮箱">
            <span>邮箱数量</span><el-input placeholder="填入邮箱" v-model="emailNum" style="width:120px;"></el-input>
            <span class="el-icon-circle-plus" style="color:#00AAFF" v-on:click="emailAdd()">增加</span>
            <span class="el-icon-remove" style="color:#00AAFF" v-on:click="emailRemove()">减少</span>
          </el-form-item>
          <el-form-item label="" v-for="index in parseInt(emailNum)">
            <span style="font-weight: bold;padding-right:10px;">邮箱{{index}}</span>
            <el-input v-model="paperForm.email[index-1]" style="width:200px;margin-left: 5px;"></el-input>
            <el-button @click="emailReset(index-1)">重置</el-button>
          </el-form-item>
          <el-form-item label="投稿日期">
            <el-date-picker
              v-model="paperForm.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <!--{{paperForm}}-->
          <el-button type="primary" v-on:click="paperSubmit()">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "infor-paper",
      data(){
          return{
            paperForm:{
              topic:[],
              date:'',
              email:[],
            },
            topicNum:0,
            emailNum:1,
          }
      },
      methods:{
          //主题重置
        paperReset:function (val) {
          this.$set(this.paperForm.topic,val,"");
        },
        //邮箱重置
        emailReset:function(val){
          this.$set(this.paperForm.email,val,"");
        },
        //提交
        paperSubmit:function(){

        },
        //主题增加
        topicAdd:function () {
          this.topicNum++;
        },
        //主题减少
        topicRemove:function () {
          this.topicNum--;
          this.paperForm.topic.pop()
        },
        //邮箱增加
        emailAdd:function () {
          this.emailNum++
        },
        //邮箱减少
        emailRemove:function () {
          this.emailNum--
          this.paperForm.email.pop()
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
