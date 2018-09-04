<!--suppress ALL -->
<template>
  <div >
    <div class="top">
      <span class="">修改司机信息</span>
      <hr>
    </div>
    <div class="form">
      <span >姓名：<input v-model="driverinfo.DRIVERNAME"></span> <br>
      <span >
          性别：
          <select v-model="driverinfo.SEX"  style="font-size:14px;">
            <option disabled value="">选择</option>
            <option value="0" >男</option>
            <option value="1">女</option>
          </select>
      </span ><br>
      <span >年龄：<input v-model="driverinfo.AGE"></span> <br>
      <span >身份证号：<input v-model="driverinfo.IDNUMBER"></span> <br>
      <span >联系电话：<input v-model="driverinfo.TEL"></span> <br>
    </div>
    <button  class="btn2 icon-huanyihuan" v-on:click="reset()">重置</button>
    <button  class="btn1 icon-duigou"  v-on:click="submit(driverinfo.DRIVERNAME,driverinfo.SEX,driverinfo.AGE,driverinfo.IDNUMBER,driverinfo.TEL)">确认</button>
  </div>
</template>

<script>
  import myDatepicker from 'vue-datepicker2';
  var driverId;
  export default {
    name: "Alterdriver",
    data(){
      return {
        driverinfo:{
          driverName:'',
          sex:'',
          age:'',
          idNumber:'',
          tel:'',
        }
      }
    },
    methods:{
      geteditdriverdata:function(driverId){
        let that=this;
        this.$http.post('/yii/logistics/driver/geteditdriverdata',{ID:driverId}).then(function (res) {
          console.log(res.data.data);
          that.driverinfo=res.data.data;
        })
      },
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
          fd.append('ID', driverId);//传车辆序号
          fd.append('DRIVERNAME', driverName);//传车辆名称
          fd.append('SEX', sex);//传车牌号码
          fd.append('AGE', age);//传车辆类型
          fd.append('IDNUMBER', idNumber);//传座位数
          fd.append('TEL', tel);//传座位数
          this.$http.post('/yii/logistics/driver/alterdriverdata', fd).then
          (function(res){
            console.log(res.data);
            if(res.data.data==1){
              alert("司机信息修改成功！");
              window.location.href = 'driverlist'
            }
          }).catch(function (error) {
            console.log(error);
          });
        }else {
          if (driverName==''){
            alert("姓名不能为空！");
          }else if (sex==''){
            alert("性别不能为空！");
          }else if (age==''){
            alert("年龄不能为空！");
          }else if (idNumber==''){
            alert("身份证号不能为空！");
          }else if (tel==''){
            alert("联系电话不能为空！");
          }
        }
      },
    },
    components:{
      'date-picker': myDatepicker
    },
    mounted() {
      driverId=this.$route.query.driverId;
      console.log(driverId);
      this.geteditdriverdata(driverId);
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
