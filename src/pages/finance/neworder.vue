<template>
  <div >
    <div class="top">
      <span class="">填写订单信息</span>
      <hr>
    </div>
    <div class="form">
        <span >输入会议名称：<input v-model="conference" placeholder=""></span> <br>
        <span >输入姓名：<input v-model="name" placeholder="如张三"></span> <br>
        <span  style="margin-top: 10px;">输入身份证号：<input v-model="identity" placeholder="共18位" style="width:200px;"></span><br>
        <span >
          收款类型：
          <select v-model="account_type"  style="font-size:14px;">
            <option disabled value="">选择</option>
            <option value="1" >住宿</option>
            <option value="2">会费</option>
            <option value="3" >服务费</option>
            <option value="4">停车费</option>
          </select>
        </span ><br>
        <span >金额：<input v-model="money" placeholder="">元</span><br>
        <span >
          支付方式：
          <select v-model="account_mode"  style="font-size:16px;">
            <option disabled value="">选择</option>
            <option value="1" >支付宝</option>
            <option value="2">微信</option>
            <option value="3">银联</option>
            <option value="4">线下</option>
          </select>
        </span><br>
        <span>
          收款日期：
          <date-picker  v-model="date" :option="option"   ></date-picker>
        </span>
    </div>
    <button  class="btn2 icon-huanyihuan" v-on:click="reset()">重置</button>
    <button  class="btn1 icon-duigou"  v-on:click="submit(name,identity,account_type,money,account_mode,date)">确认</button>
  </div>
</template>

<script>
    import myDatepicker from 'vue-datepicker2'; //引入对应的组件
    export default {
        name: "neworder",
      data(){
        return {
          conference:'',
          name:'',
          identity:'',
          money:'',
          account_type:'',
          account_mode:'',
          date:'',
          option: {
            type: 'day',
            week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            format: 'YYYY-MM-DD',
            placeholder: '选择日期',
            inputStyle: {
              'display': 'inline-block',
              'padding': '3px',
              'line-height': '22px',
              'font-size': '14px',
              'border': '2px solid #fff',
              'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
              'border-radius': '2px',
              'color': '#5F5F5F',
              'width':'110px',
              'margin':'8px',
            },
            color: {
              header: '#ccc',
              headerText: '#f00'
            },
            buttons: {
              ok: 'Ok',
              cancel: 'Cancel'
            },
            overlayOpacity: 0.5, // 0.5 as default
            dismissible: true // as true as default
          },
          timeoption: {
            type: 'min',
            week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            format: 'YYYY-MM-DD HH:mm'
          },
          multiOption: {
            type: 'multi-day',
            week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            format:"YYYY-MM-DD HH:mm"
          },
          // limit: [
            //   {
            //   type: 'weekday',
            //   available: [1, 2, 3, 4, 5]
            // },
            // {
            //   type: 'fromto',
            //   from: this.start,
            //   to:this.nowTime,
            // }
            // ],
          dateBodyClass: 'date-body'
        }
        },
      components: {
        'date-picker': myDatepicker
      },
      methods:{
          reset:function(){
            this.name='';
            this.identity='';
            this.account_type='';
            this.money='';
            this.account_mode='';
            this.date='';
          },
          submit:function (name,identity,account_type,money,account_mode,date) {
            let fd = new FormData();
            fd.append('CONFERENCE', name);//传会议名称
            fd.append('NAME', name);//传姓名
            fd.append('IDENTITY', identity);//传身份证号
            fd.append('MONEY', account_type);//传金额
            fd.append('ACCOUNT_TYPE', money);//传消费类型
            fd.append('ACCOUNT_MODE', account_mode);//传支付方式
            fd.append('STRTDATE', date);//传日期
            this.$http.post('http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/querydata', fd).then
              (function(res){
                console.log(res.data);
              });
            // 添加响应拦截器
            this.axios.interceptors.response.use(function (response) {
              // 对响应数据做点什么
              return response;
              window.location.href ='#';
            }, function (error) {
              // 对响应错误做点什么
              return Promise.reject(error);
            });
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
