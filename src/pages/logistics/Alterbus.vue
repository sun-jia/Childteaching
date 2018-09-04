<template>
  <div >
    <div class="top">
      <span class="">修改车辆信息</span>
      <hr>
    </div>
    <div class="form">
      <span >车辆名称：<input v-model="businfo.BUSNAME"></span> <br>
      <span >车牌号码：<input v-model="businfo.PLATENUM"></span> <br>
      <span >
          车辆类型：
          <select v-model="businfo.BUSTYPE"  style="font-size:14px;">
            <option disabled value="">选择</option>
            <option value="1" >轿车</option>
            <option value="2">客车</option>
            <option value="3" >越野车</option>
            <option value="4">其它</option>
          </select>
        </span ><br>
      <span >座位数：<input v-model="businfo.SEATNUM"></span> <br>
    </div>
    <button  class="btn2 icon-huanyihuan" v-on:click="reset()">重置</button>
    <button  class="btn1 icon-duigou"  v-on:click="submit(businfo.BUSNAME,businfo.PLATENUM,businfo.BUSTYPE,businfo.SEATNUM)">确认</button>
  </div>
</template>

<script>
  import myDatepicker from 'vue-datepicker2';
  var busId;
  export default {
    name: "Alterbus",
    data(){
      return {
        businfo:{
          busName:'',
          plateNum:'',
          busType:'',
          seatNum:'',
        }
      }
    },
    methods:{
      geteditdata:function(busId){
        let that=this;
        this.$http.post('/yii/logistics/bus/geteditbusdata',{ID:busId}).then(function (res) {
          console.log(res.data.data);
          that.businfo=res.data.data;
        })
      },
      reset:function(){
        this.busName='';
        this.plateNum='';
        this.busType='';
        this.seatNum='';
      },

      submit:function (busName,plateNum,busType,seatNum) {
        console.log(busId);
        console.log(busName);
        if (busName!=''&&plateNum!=''&&busType!=''&&seatNum!=''){
          let fd = new FormData();
          fd.append('ID', busId);
          fd.append('BUSNAME', busName);
          fd.append('PLATENUM', plateNum);
          fd.append('BUSTYPE', busType);
          fd.append('SEATNUM', seatNum);
          let that=this;
          this.$http.post('/yii/logistics/bus/alterbusdata', fd).then
          (function(res){
            console.log(res.data);
            if(res.data.data==1){
              alert("车辆信息修改成功！");
              that.$router.push('/logistics/bus') ;
            }
          }).catch(function (error) {
            console.log(error);
          });
        }else {
          if (busName==''){
            alert("车辆名称不能为空！");
          }else if (plateNum==''){
            alert("车牌号码不能为空！");
          }else if (busType==''){
            alert("车牌类型不能为空！");
          }else if (seatNum==''){
            alert("座位数不能为空！");
          }
        }
      },
    },
    components:{
      'date-picker': myDatepicker
    },
    mounted() {
      busId=this.$route.query.busId;
      console.log(busId);
      this.geteditdata(busId);
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
