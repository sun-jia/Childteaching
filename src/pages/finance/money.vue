<template>
  <div class="display1">
    <button class="btn1 " v-on:click="moneymanagement">订单管理</button>
    <button class="btn1 btn2" v-on:click="invoicemanagement">发票管理</button>
    <!--<button class="btn3 icon-sousuo">搜索</button>-->
    <div class="display2">
      <!--<div class="col-md-12">-->
        <!--<button class="btn3 icon-sousuo">搜索</button>-->
      <!--</div>-->
      <div class="col-md-12">
        <div v-show="showmoney">
              <table>
                <tr>
                  <th>姓名
                    <input class="input1" v-model="inputname1" placeholder="搜索姓名" style="font-size:14px;">
                    <!--<p>{{inputname1}}</p>//测试-->
                  </th>
                  <th>身份证号
                    <input class="input1" v-model="inputidentity1" placeholder="搜索身份证号" style="font-size:14px;">
                    <!--<p>{{inputidentity1}}</p>//测试-->
                  </th>
                  <th>金额
                    <input class="input1" v-model="inputmoney1" placeholder="输入金额" style="font-size:14px;">
                    <!--<p>{{inputmoney1}}</p>//测试-->
                  </th>
                  <th>收款明细
                       <select v-model="kindselected1"  style="font-size:14px;">
                          <option disabled value="">选择</option>
                          <option value="1" >住宿</option>
                          <option value="2">会费</option>
                       </select>
                       <!--<p>{{kindselected}}</p>//测试-->
                  </th>
                  <th>支付方式
                    <select v-model="payselected1"  style="font-size:14px;">
                      <option disabled value="">选择</option>
                      <option value="1" >支付宝</option>
                      <option value="2">微信</option>
                      <option value="3">银联</option>
                    </select>
                  </th>
                  <th>日期
                    <date-picker  v-model="startTime1" :option="option"   ></date-picker>--
                    <date-picker  v-model="endTime1" :option="option" :limit="limit" ></date-picker>
                    <!--<p>开始日期{{startTime}}结束日期{{endTime}}</p>//测试-->
                  </th>
                  <th>删除订单</th>
                </tr>
                <tr v-for="detial in details">
                  <td>{{detial.NAME}}</td>
                  <td>{{detial.IDENTITY}}</td>
                  <td>{{detial.MONEY}}</td>
                  <td v-if='detial.ACCOUNT_TYPE==1'>住宿</td>
                  <td v-if='detial.ACCOUNT_TYPE==2'>会费</td>
                  <td v-if='detial.ACCOUNT_MODE==1'>支付宝</td>
                  <td v-if='detial.ACCOUNT_MODE==2'>微信</td>
                  <td v-if='detial.ACCOUNT_MODE==3'>银联</td>
                  <td>{{detial.ACCOUNT_DATE}}</td>
                  <td>
                    <span v-on:click="deletechange(detial.ID)" ><i class="icon-changyonggoupiaorenshanchu"  ></i></span>
                  </td>
                </tr>
              </table>
          <router-link to="/neworder"><button class="btn4 icon-jiajianzujianjiahao" > 新建订单</button></router-link>
          <router-view/>
            </div>
            <div v-show="showinvoice">
              <table >
                <tr>
                  <th>姓名
                    <input class="input1" v-model="inputname2" placeholder="搜索姓名" style="font-size:14px;">
                    <!--<p>{{inputname2}}</p>//测试-->
                  </th>
                  <th>身份证号
                    <input class="input1" v-model="inputidentity2" placeholder="搜索身份证号" style="font-size:14px;">
                    <!--<p>{{inputidentity2}}</p>//测试-->
                  </th>
                  <th>单位
                    <input class="input1" v-model="inputcompany" placeholder="搜索单位" style="font-size:14px;">
                    <!--<p>{{inputcompany}}</p>//测试-->
                  </th>
                  <th>金额
                    <input class="input1" v-model="inputmoney2" placeholder="输入金额" style="font-size:14px;">
                    <!--<p>{{inputmoney2}}</p>//测试-->
                  </th>
                  <th>收款明细
                    <select v-model="kindselected2"  style="font-size:14px;">
                      <option disabled value="">选择</option>
                      <option value="1" >住宿</option>
                      <option value="2">会费</option>
                    </select>
                    <!--<p>{{kindselected}}</p>//测试-->
                  </th>
                  <th>日期
                    <date-picker  v-model="startTime2" :option="option"   ></date-picker>--
                    <date-picker  v-model="endTime2" :option="option" :limit="limit" ></date-picker>
                    <!--<p>开始日期{{startTime}}结束日期{{endTime}}</p>//测试-->
                  </th>
                </tr>
                <tr v-for="detial in invoiceDel">
                  <td>{{detial.name}}</td>
                  <td>{{detial.IDENTITY}}</td>
                  <td>{{detial.company}}</td>
                  <td>{{detial.amount}}</td>
                  <td>{{detial.accounts}}</td>
                  <td>{{detial.date}}</td>
                </tr>
              </table>
           </div>
      </div>
      <button class="btn3 icon-sousuo" v-on:click="searcha(inputname1,inputidentity1,inputmoney1,kindselected1,payselected1,startTime1,endTime1,inputname2,inputidentity1,inputcompany,inputmoney2,kindselected2,startTime2,endTime2)">搜索</button>
      <!--{{content}}-->
      <!--测试-->
    </div>
  </div>

</template>

<script>
  // import 'babel-polyfill'; //因为使用了es6的一些方法，需要babel垫片，如果你项目中已有相关兼容性方案，可忽略
  import myDatepicker from 'vue-datepicker2'; //引入对应的组件
  // import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue';
    var moment = require('moment');
    let nowTime=moment().format();//当前时间
    console.log(nowTime);
    console.log(this.starTime);
    let start=this.starTime;
    // start=start.toString();
    console.log(start);
    export default {
        name: 'money',
      data(){
        return {
          details: [
            {ID:1, NAME: 'ring',IDENTITY:12345678, MONEY: 200, ACCOUNT_TYPE: 1, ACCOUNT_MODE:1,ACCOUNT_DATE: '20180725'},
            {ID:2, NAME: 'ling',IDENTITY:12568678,  MONEY: 300, ACCOUNT_TYPE: 2,ACCOUNT_MODE:2, ACCOUNT_DATE: '20180725'},
            {ID:3, NAME: 'xu',IDENTITY:1456678,  MONEY: 400, ACCOUNT_TYPE: 1, ACCOUNT_MODE:3,ACCOUNT_DATE: '20180725'}
          ],
          invoiceDel:[
            {name: 'ring',IDENTITY:25544885,company:'华中师范大学', amount: 200, accounts: '住宿', date: '20180725'},
            {name: 'ling',IDENTITY:25435885,company:'北京师范大学', amount: 500, accounts: '会费', date: '20180830'},
            {name: 'xu',IDENTITY:15674885,company:'华东师范大学', amount: 400, accounts: '住宿',date: '20180727'}
          ],
          // content:"",//传值测试
          showmoney:true,
          showinvoice:false,
          inputname1:'',//输入姓名
          inputidentity1:'',//输入身份证号
          inputmoney1:'',//输入金额
          kindselected1: '',//费用下拉列表
          payselected1:'',//支付下拉列表
          inputname2:'',//输入姓名
          inputidentity2:'',//输入身份证号
          inputcompany:'',//发票单位
          inputmoney2:'',//输入金额
          kindselected2: '',//费用下拉列表
          payselected2:'',//支付下拉列表
          startTime1: '',
          endTime1:'',
          startTime2: '',
          endTime2:'',
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
              'width':'90px',
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
          limit: [
          //   {
            //   type: 'weekday',
            //   available: [1, 2, 3, 4, 5]
            // },
            {
              type: 'fromto',
              from: this.start,
              to:this.nowTime,
            }],
          dateBodyClass: 'date-body'
        }
      },
      methods: {
        moneymanagement: function(){
            this.showmoney=true;
            this.showinvoice=false;
        },
        invoicemanagement: function(){
            this.showmoney=false;
            this.showinvoice=true;
        },
        deletechange:function (a) {
           console.log(a);
        },
        searcha:function (a1,a2,a3,a4,a5,a6,b1,b2,b3,b4,b5,b6) {
          // this.axios.post("http://api.komavideo.com/news/list").then(body => {
          //   this.content = body.data;
          // });//测试
          // console.log(a1);
          // console.log(a2);
          // console.log(a3);
          // console.log(a4);
          // console.log(a5);
          // console.log(a6);
          // console.log(b1);
          // console.log(b2);
          // console.log(b3);
          // console.log(b4);
          // console.log(b5);
          // console.log(b6);
        },
        // neworder:function () {
        //
        // }
      },
      components:{
        'date-picker': myDatepicker
      },
      mounted() {
        // this.axios.post("http://api.komavideo.com/news/list").then(body => {
        //   this.content = body.data;
        // });//测试
      }
    }
    // console.log(moment().month(4).format());

</script>

<style scoped>
  .display1{
    padding-left:20px;
    padding-top:10px;
  }
  .display2{
    border:solid 2px  #e0e0e0;
    height: 500px;
    text-align: center;
    width: 98%;
    padding-left:10px;
    padding-right:10px;
    background-color:  #fff;
  }
  table{
    border-collapse: collapse;
    width:100%;
    margin-top: 10px;
    margin-left: 20px；
  }
  th{
    font-size: 14px;
    border:solid 1px #ccc;
    font-weight: bold;
    padding:5px;
    background-color: #F1F1F1;
  }
   table,td{
     border:solid 1px #ccc;
     padding:5px;
     text-align: center;
     font-size:14px;
   }
   .btn1{
     font-size: 20px;
     padding: 10px 10px;
     border-top-left-radius: 3px;
     border-top-right-radius: 3px;
     border: 1px solid #ccc;
     cursor: pointer;
     background: #f0f0f0;
     margin-bottom: -1px;
     /*margin-right: 0px;*/
   }
  .btn1:hover{
    background: #e0e0e0;
  }
  .btn1:active{
    background: #e0e0e0;
  }
  .btn2{
    margin-left: 0px;
  }
  .input1{
    width:80px;
  }
  .btn3{
    width:80px;
    padding:10px;
    font-size: 15px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#338FFC ;
    float: right;
    margin-right: 15px;
    margin-top: 5px;
    /*margin-bottom: 5px;*/
  }
  .btn3:hover{
    background-color:#5FA7FE;
  }
  .btn4{
    width:100px;
    padding:10px;
    font-size: 15px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#FA4E28 ;
    float: left;
    /*margin-left: 15px;*/
    margin-top: 5px;
    /*margin-bottom: 5px;*/
  }
  .btn4:hover{
    background-color:#FC6F4F;
  }
</style>
