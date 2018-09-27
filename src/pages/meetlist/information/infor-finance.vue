<template>
  <div id="halfHeight2" index="02" class="d_jump" title="财务管理信息填写">
    <div class="listname">财务管理<i class="el-icon-menu" style="padding-left:5px;"></i></div>
    <div class="meet">
      <span>会议注册费用:<input class="input" v-model="payInfo.publishCharge" />元</span><br>
      <span>会议住宿费:<input class="input" v-model="payInfo.AccomodateCharge" />元</span><br>
      <span>会议参会费:<input class="input" v-model="payInfo.participantCharge" />元</span><br>
      <span>收款银行:<input class="input" v-model="payInfo.bank" />元</span><br>
      <span>收款账号:<input class="input" v-model="payInfo.accountId" />元</span><br>
      <span>收款户名:<input class="input" v-model="payInfo.accountName" />元</span><br>
      <span>支付宝账号:<input class="input" v-model="payInfo.aliPayId" />元</span>
      <!--<span>-->
      <button class="btn2">确定</button>
      <button class="btn1">取消</button>
      <!--</span>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "infor-finance",
    props:["propdata"],
    data(){
      return{
        payInfo:this.propdata
      }
    },
    watch: {
      propdata: {
        handler(newValue, oldValue) {
          this.payInfo=newValue;
        },
        deep: true
      }
    },
  }
</script>

<style lang="scss" scoped="scoped" type="text/css">
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
  .meet{
    margin-top:10px;
    margin-left:20px;
    margin-bottom:10px;
    height:100px;
  }
  .input{
    border:1px solid #338FFC;
    border-radius: 5px;
    color:#000;
    width:90px;
    margin-left:5px;
    margin-right:5px;
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
