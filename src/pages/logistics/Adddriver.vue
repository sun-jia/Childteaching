<template>
  <div >
    <div class="top">
      <span class="">填写司机信息</span>
      <hr>
    </div>
    <div class="form">
      <span>姓 名：<input v-model="driverName" placeholder=""></span> <br>
      <span>性 别：
          <select v-model="sex"  style="font-size:14px;">
            <option disabled value="">选择</option>
            <option value="0" >男</option>
            <option value="1">女</option>
          </select>
        </span ><br>
      <span>年 龄：<input v-model="age" placeholder=""></span> <br>
      <span>身份证号：<input v-model="idNumber" placeholder="" style="width: 160px;"></span> <br>
      <span>联系电话：<input v-model="tel" placeholder="" style="width: 160px;"></span> <br>
    </div>
    <button  class="btn2 icon-huanyihuan" v-on:click="reset()">重置</button>
    <button  class="btn1 icon-duigou"  v-on:click="submit(driverName,sex,age,idNumber,tel)">确认</button>
  </div>
</template>

<script>
  export default {
    name: "Adddriver",
    data(){
      return {
        driverName:'',
        sex:'',
        age:'',
        idNumber:'',
        tel:''
      }
    },
    methods:{
      reset:function(){
        this.driverName='';
        this.sex='';
        this.age='';
        this.idNumber='';
        this.tel='';
      },
      submit:function (driverName,sex,age,idNumber,tel) {
        if (driverName!=''&&sex!=''&&age!=''&&idNumber!=''&&tel!=''){
          let fd = new FormData();
          fd.append('DRIVERNAME', driverName);
          fd.append('SEX', sex);
          fd.append('AGE', age);
          fd.append('IDNUMBER', idNumber);
          fd.append('TEL', tel);
          this.$http.post('/yii/logistics/driver/insertdriverdata', fd).then
          (function(res){
            console.log(res.data);
            alert("司机信息添加成功！");
            window.location.href = 'driverlist'
          });
        }else {
          if (driverName==''){
            alert("姓名不能为空！");
          }else if (sex==''){
            alert("性别不能为空！");
          }else if (age==''){
            alert("年龄类型不能为空！");
          }else if (idNumber==''){
            alert("身份证号不能为空！");
          }else if (tel==''){
            alert("联系电话不能为空！");
          }
        }
      },
    }
  }
</script>

<style scoped>
  .top{
    font-size: 20px;
    font-weight: bold;
    padding-top:20px;
    padding-left: 20px;
  }
  .form{
    padding:20px 0px 20px 20px;
    border:solid 1px #EBEBEC;
    background-color: #F7F7F7;
    width:90%;
    font-size: 16px;
  }
  input{
    width:110px;
    margin-top: 8px;
    font-size: 14px;
  }
  select{
    margin-top: 8px;
    font-size: 14px;
  }
  .btn1{
    width:80px;
    padding:7px;
    font-size: 16px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#338FFC ;
    margin-left: 20px;
    margin-top: 15px;
    /*margin-bottom: 5px;*/
  }
  .btn1:hover{
    background-color:#5FA7FE;
  }
  .btn2{
    width:80px;
    padding:7px;
    font-size: 16px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#898989;
    /*float: right;*/
    margin-left: 20px;
    margin-top: 5px;
    /*margin-bottom: 5px;*/
  }
  .btn2:hover{
    background-color:#A5A5A5;
  }
</style>
