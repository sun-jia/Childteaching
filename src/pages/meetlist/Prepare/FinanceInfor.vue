<template>
  <div id="fullHeight1" index="02" class="d_jump" title="财务管理信息填写">
    <div class="listname">财务管理<i class="el-icon-menu" style="padding-left:5px;"></i></div>
    <div class="meet">
      <!--<span>专家人数:<input class="input" v-model="expertFee" />人</span><br><br>-->
      <span >专家出场总费用预算:<input class="input" v-model="expertFee" />元</span>
      <button class="btn2" >确定</button>
      <button class="btn1" >取消</button><br><br>
      <el-table
        :data="expert"
        border
        style="width:80%"
        height="300">
        <el-table-column
          fixed
          prop="name"
          label="姓名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="职称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="company"
          label="单位"
          width="240">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系电话"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="deleteRow()" type="text" size="small">移除</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="icon-jiajianzujianjiahao"  style="margin-left:10px;font-size:14px;color:#2798FC;margin-top:20px;" @click="expertDialogVisible = true">新增</el-button>
    </div>
    <!--专家新增对话框-->
    <el-dialog
      title="填写专家信息"
      :visible.sync="expertDialogVisible"
      width="35%">
      <el-form :model="newExpertForm"  ref="form">
        <el-form-item label="姓名">
          <el-input v-model="newExpertForm.name" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="职称">
          <el-select v-model="newExpertForm.grade" placeholder="请选择职称">
            <el-option label="助教" value="1"></el-option>
            <el-option label="讲师" value="2"></el-option>
            <el-option label="副教授" value="3"></el-option>
            <el-option label="教授" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="newExpertForm.company" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="newExpertForm.tel" style="width:300px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
              <el-button @click="expertDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="expertDialogVisible = false">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "FinanceInfor",
      data(){
        return{
          expert:[
            {
              id:'001',
              name:'专家一',
              grade:'助教',
              company:'华中师范大学',
              tel:'10086',
            },
            {
              id:'002',
              name:'专家二',
              grade:'助教',
              company:'北京师范大学',
              tel:'10086',
            },
            {
              id:'003',
              name:'专家三',
              grade:'讲师',
              company:'北大',
              tel:'10086',
            },
            {
              id:'004',
              name:'专家四',
              grade:'副教授',
              company:'清华',
              tel:'10086',
            },
            {
              id:'005',
              name:'专家五',
              grade:'教授',
              company:'中国传媒大学',
              tel:'10086',
            }
          ],//专家
          expertFee:'',//专家费用
          expertDialogVisible:false,
          newExpertForm:{
            name:'',
            grade:'',//职称,1为助教、2为讲师、3为副教授、4为教授
            company:'',
            tel:'',
          },
          fullHeight: document.documentElement.clientHeight,//网页高度
        }
      },
      methods:{
        deleteRow:function () {
          
        }
      },
      mounted: function () {
        // console.log(this.fullHeight);
        //设置各部分的高度
        // document.getElementById('fullHeight1').style.height=(this.fullHeight)+'px';
      },
    }
</script>

<style scoped>
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
  .input{
    border:1px solid #338FFC;
    border-radius: 5px;
    color:#000;
    width:90px;
    margin-left:5px;
    margin-right:5px;
  }
</style>
