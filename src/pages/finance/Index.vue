<template>
  <div class="display1">
    <button class="btn1 "  v-bind:class="{ active: isActive }">财务管理</button>
    <router-link to="/finance/invoice"><button class="btn1 btn2"  >发票管理</button></router-link>
    <!--<button class="btn3 icon-sousuo">搜索</button>-->
    <div class="display2">
      <!--<div class="col-md-12">-->
        <!--<button class="btn3 icon-sousuo">搜索</button>-->
      <!--</div>-->
      <div class="col-md-12">
        <div>
              <div class="meeting" >
                <span style="color:#fff;">搜索会议：</span><input  v-model="inputmeeeting1" placeholder="输入会议名称" style="font-size:14px;width:300px;font-weight:lighter">
              </div>
              <button class="btn3 icon-sousuo" v-on:click="searcha(inputname1,inputidentity1,inputmoney1,inputmeeeting1,payselected1,value3)">搜索</button>
              <button type="button" class="btn4 icon-daochu1" id="export-table" v-on:click="export2Excel(inputname1,inputidentity1,inputmoney1,inputmeeeting1,payselected1,value3)">导出</button>
          <!--<router-link to="/fiance/neworder"><button class="btn4 icon-jiajianzujianjiahao" > 新建订单</button></router-link>-->
               <router-view/>
              <table id="moneyStatistics">
                <tr>
                  <th>姓名
                    <input class="input1" v-model="inputname1" placeholder="搜索姓名" style="font-size:14px;">
                    <!--<p>{{inputname1}}</p>//测试-->
                  </th>
                  <th>身份证号
                    <input class="input1" v-model="inputidentity1" placeholder="输入身份证号" style="font-size:14px;width:120px">
                    <!--<p>{{inputidentity1}}</p>//测试-->
                  </th>
                  <th>金额
                    <input class="input1" v-model="inputmoney1" placeholder="输入金额" style="font-size:14px;">
                    <!--<p>{{inputmoney1}}</p>//测试-->
                    <i v-show="moneysort" class="sort icon-paixushengxu" v-on:click="moneyup(inputname1,inputidentity1,inputmoney1,inputmeeeting1,payselected1,value3)"></i>
                    <i v-show="!moneysort" class="sort icon-paixujiangxu" v-on:click="moneydown(inputname1,inputidentity1,inputmoney1,inputmeeeting1,payselected1,value3)"></i>
                  </th>
                  <th>
                    <select v-model="payselected1"  style="font-size:14px;">
                      <option disabled value="">选择</option>
                      <option value="1" >支付宝</option>
                      <option value="2">微信</option>
                      <option value="3">银联</option>
                      <option value="4">线下</option>
                      <option value="null">空</option>
                    </select>
                  </th>
                  <th>
                    <div class="block" >
                      <span class="demonstration">日期</span>
                      <el-date-picker
                        v-model="value3"
                        type="datetimerange"
                        :picker-options="pickerOptions2"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        size="small"
                        format="yyyy-MM-dd HH:mm:ss "
                        value-format="yyyy-MM-dd HH:mm:ss">
                      </el-date-picker>
                      <i v-show="datesort" class="sort icon-paixushengxu"  v-on:click="dateup(inputname1,inputidentity1,inputmoney1,inputmeeeting1,payselected1,value3)"></i>
                      <i v-show="!datesort" class="sort icon-paixujiangxu"  v-on:click="datedown(inputname1,inputidentity1,inputmoney1,inputmeeeting1,payselected1,value3)"></i>
                    </div>
                    <!--{{value3}}-->
                  </th>
                  <th>删除订单</th>
                </tr>
                <tr v-for="detial in details">
                  <td>{{detial.NAME}}</td>
                  <td>{{detial.USERID}}</td>
                  <td>{{detial.MONEY}}</td>
                  <td v-if='detial.ACCOUNT_MODE==1'>支付宝</td>
                  <td v-if='detial.ACCOUNT_MODE==2'>微信</td>
                  <td v-if='detial.ACCOUNT_MODE==3'>银联</td>
                  <td v-if='detial.ACCOUNT_MODE==4'>线下</td>
                  <td>{{detial.ACCOUNT_DATE}}</td>
                  <td>
                    <span v-on:click="deletechange(detial.USERID)" ><i class="delete icon-changyonggoupiaorenshanchu" ></i></span>
                  </td>
                </tr>
              </table>
              <div class="page">
                  <ul class="pagination pagination-sm"><!--分页-->
                     <li class="page-item" v-if="currentpage!=1"><a class="page-link" href="#" v-on:click="prepage(currentpage,inputname1,inputidentity1,inputmoney1,inputmeeeting1,payselected1,value3)">上一页</a></li>
                     <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage == index} ">
                        <a class="page-link" href="#" v-on:click="pageChange(index,inputname1,inputidentity1,inputmoney1,inputmeeeting1,payselected1,value3)">{{index}}</a>
                     </li>
                     <li class="page-item" v-if="currentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage(currentpage,inputname1,inputidentity1,inputmoney1,inputmeeeting1,payselected1,value3)">下一页</a></li>
                     <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
                  </ul>
              </div>
            </div>
      </div>
    </div>
  </div>

</template>

<script>
 // import FileSaver from 'file-saver';
  //import XLSX from 'xlsx';
    var moment = require('moment');
    let nowTime=moment().format();//当前时间
    console.log(nowTime);
    console.log(this.starTime);
    let start=this.starTime;
    // start=start.toString();
    console.log(start);
    export default {
      name: 'money',
      data() {
        return {
          details: [
            {
              ID: 1,
              NAME: 'ring',
              IDENTITY: 12345678,
              MONEY: 200,
              ACCOUNT_TYPE: 1,
              ACCOUNT_MODE: 1,
              ACCOUNT_DATE: '20180725'
            },
            {
              ID: 2,
              NAME: 'ling',
              IDENTITY: 12568678,
              MONEY: 300,
              ACCOUNT_TYPE: 2,
              ACCOUNT_MODE: 2,
              ACCOUNT_DATE: '20180725'
            },
            {
              ID: 3,
              NAME: 'xu',
              IDENTITY: 1456678,
              MONEY: 400,
              ACCOUNT_TYPE: 1,
              ACCOUNT_MODE: 3,
              ACCOUNT_DATE: '20180725'
            }
          ],
          invoiceDel: [
            {name: 'ring', IDENTITY: 25544885, company: '华中师范大学', amount: 200, accounts: '住宿', date: '20180725'},
            {name: 'ling', IDENTITY: 25435885, company: '北京师范大学', amount: 500, accounts: '会费', date: '20180830'},
            {name: 'xu', IDENTITY: 15674885, company: '华东师范大学', amount: 400, accounts: '住宿', date: '20180727'}
          ],
          pickerOptions2: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          content: "",//传值测试
          currentpage: 1,//当前页
          datesort: true,//日期排序
          endTime: '',
          excelData:'',//导出数据
          inputmeeeting1: '',//输入会议名称
          inputname1: '',//输入姓名
          inputidentity1: '',//输入身份证号
          inputmoney1: '',//输入金额
          isActive: true,
          moneysort: true,//金额排序
          payselected1: '',//支付下拉列表
          showmoney: true,
          showinvoice: false,
          showFirstText: true,//显示上一页
          showNextText: true,//显示下一页
          startTime: '',
          totlepage: 28,//总页数
          type: 1,//排序类型，默认日期降序，2为日期升序，3为金额降序，4为金额升序
          visiblepage: 10,//可见页数
          value3: '',//时间数组
        }
      },
      methods: {
        deletechange: function (a) {
          console.log(a);
          this.axios.get("http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/deletedata?USERID="+a).then(function(res){
            console.log(res.data);
            if(res.data==1){
               location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        },
        searcha: function (a1, a2, a3,a4, a5, a6) {
          if(a6.length!=0){
            this.startTime=a6[0];
            this.endTime=a6[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('MONEY', a3);//传金额
          fd.append('CONFERENCEID', a4);//传会议ID
          fd.append('ACCOUNT_MODE', a5);//传收款方式
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          this.$http.post('http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/querydata', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.details);
          })
        },
        moneyup:function(a1, a2, a3,a4, a5, a6){//金额升序
          this.type=4;
          this.moneysort=!this.moneysort;
          if(a6.length!=0){
            this.startTime=a6[0];
            this.endTime=a6[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('MONEY', a3);//传金额
          fd.append('CONFERENCEID', a4);//传会议ID
          fd.append('ACCOUNT_MODE', a5);//传收款方式
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          console.log(fd.getAll('type'));
          this.$http.post('http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/querydata', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.details);
          })
        },
        moneydown:function(a1, a2, a3,a4, a5, a6){//金额降序
          this.type=3;
          this.moneysort=!this.moneysort;
          console.log(this.moneysort);
          if(a6.length!=0){
            this.startTime=a6[0];
            this.endTime=a6[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('MONEY', a3);//传金额
          fd.append('CONFERENCEID', a4);//传会议ID
          fd.append('ACCOUNT_MODE', a5);//传收款方式
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          console.log(fd.getAll('type'));
          this.$http.post('http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/querydata', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.details);
          })
        },
        dateup:function (a1, a2, a3,a4, a5, a6) {//日期升序
          this.type=2;
          console.log(this.type);
          this.datesort=!this.datesort;
          console.log(this.datesort);
          if(a6.length!=0){
            this.startTime=a6[0];
            this.endTime=a6[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('MONEY', a3);//传金额
          fd.append('CONFERENCEID', a4);//传会议ID
          fd.append('ACCOUNT_MODE', a5);//传收款方式
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          this.$http.post('http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/querydata', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.details);
          })
        },
        datedown:function (a1, a2, a3,a4, a5, a6) {//日期降序
            this.type=1;
            this.datesort=!this.datesort;
            console.log(this.datesort);
          if(a6.length!=0){
            this.startTime=a6[0];
            this.endTime=a6[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('MONEY', a3);//传金额
          fd.append('CONFERENCEID', a4);//传会议ID
          fd.append('ACCOUNT_MODE', a5);//传收款方式
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          // console.log(fd.getAll('NAME'));
          // console.log(fd.getAll('ENDDATE'));
          this.$http.post('http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/querydata', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.details);
          })
        },
        pageChange: function(page,a1, a2, a3,a4, a5, a6){//分页
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          if(a6.length!=0){
            this.startTime=a6[0];
            this.endTime=a6[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('MONEY', a3);//传金额
          fd.append('CONFERENCEID', a4);//传会议ID
          fd.append('ACCOUNT_MODE', a5);//传收款方式
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          // console.log(fd.getAll('NAME'));
          // console.log(fd.getAll('ENDDATE'));
          this.$http.post('http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/querydata', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.details);
          })
        },
        prepage:function(page,a1, a2, a3,a4, a5, a6){//上一页
          page--;
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          if(a6.length!=0){
            this.startTime=a6[0];
            this.endTime=a6[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('MONEY', a3);//传金额
          fd.append('CONFERENCEID', a4);//传会议ID
          fd.append('ACCOUNT_MODE', a5);//传收款方式
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          // console.log(fd.getAll('NAME'));
          // console.log(fd.getAll('ENDDATE'));
          this.$http.post('http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/querydata', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.details);
          })
        },
        nextpage:function(page,a1, a2, a3,a4, a5, a6){//下一页
          console.log(a1);
          console.log(a2);
          console.log(a3);
          console.log(a4);
          console.log(a5);

          page++;
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          if(a6.length!=0){
            this.startTime=a6[0];
            this.endTime=a6[1];
          }

          // console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('MONEY', a3);//传金额
          fd.append('CONFERENCEID', a4);//传会议ID
          fd.append('ACCOUNT_MODE', a5);//传收款方式
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          console.log(fd.getAll('NAME'));
          console.log(fd.getAll('STARTDATE'));
          console.log(fd.getAll('ENDDATE'));
          this.$http.post('http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/querydata', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.details);
          })
        },
        export2Excel(a1, a2, a3, a4,a5) {
          if(a4.length!=0){
            this.startTime=a4[0];
            this.endTime=a4[1];
          }
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('MONEY', a3);//传金额
          fd.append('CONFERENCEID', a4);//传会议ID
          fd.append('ACCOUNT_MODE', a5);//传收款方式
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('type',this.type);//传类型
          this.$http.post('http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/exportfinance', fd).then(body => {
            this.excelData = body.data.data;
            console.log(this.excelData);
            require.ensure([], () => {
              const { export_json_to_excel } = require('@/excel/Export2Excel.js');//引入文件
              const tHeader = ['姓名', '身份证号','交易金额', '会议ID','支付方式','日期'];
              // 上面设置Excel的表格第一行的标题
              const filterVal = [ 'NAME', 'USERID','MONEY','CONFERENCEID','ACCOUNT_MODE','ACCOUNT_DATE'];
              // 上面的index、phone_Num、school_Name是tableData里对象的属性
              const list = this.excelData;  //把data里的tableData存到list
              // console.log(list);
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, '财务表单');
            })
          })//传数据
        },
        formatJson(filterVal, jsonData) {
          console.log(jsonData);
          return jsonData.map(v => filterVal.map(j => v[j]));
        },
      },
      components: {
      },
      mounted() {
        this.axios.get("http://192.168.1.100/clubApi/backend/web/index.php/finance/page?page=1&&type="+this.type).then(body => {
          this.details = body.data.data.pageall;
          this.totlepage = body.data.data.totlepage;
          console.log(this.details);
        })//测试
      },
      computed: {
        //计算属性：返回页码数组，这里会自动进行脏检查，不用$watch();
        pagenums: function(){//分页
          //初始化前后页边界
          let lowPage = 1;
          let highPage = this.totlepage;
          let pageArr = [];
          if(this.totlepage > this.visiblepage){//总页数超过可见页数时，进一步处理；
            let subVisiblePage = Math.ceil(this.visiblepage/2);
            if(this.currentpage > subVisiblePage && this.currentpage < this.totlepage - subVisiblePage +1){//处理正常的分页
              lowPage = this.currentpage - subVisiblePage;
              highPage = this.currentpage + subVisiblePage -1;
            }else if(this.currentpage <= subVisiblePage){//处理前几页的逻辑
              lowPage = 1;
              highPage = this.visiblepage;
            }else{//处理后几页的逻辑
              lowPage = this.totlepage - this.visiblepage + 1;
              highPage = this.totlepage;
            }
          }
          //确定了上下page边界后，要准备压入数组中了
          while(lowPage <= highPage){
            pageArr.push(lowPage);
            lowPage ++;
          }
          return pageArr;
        }
      },
    }
</script>

<style scoped>
  .display1{
    padding-left:20px;
    padding-top:10px;
  }
  .display2{
    border:solid 2px  #e0e0e0;
    height: 500px;
    /*text-align: center;*/
    width: 98%;
    padding-left:10px;
    padding-right:10px;
    background-color:  #fff;
  }
  .meeting{
    float:left;
    margin:10px 0 10px 0;
    font-weight: bold;
    background-color: #00AAFF;
    border:solid 1px #00AAFF;
    border-radius: 5px;
    width: 40%;
    padding:5px;
  }
  .sort{
    color:#1C93FC;
  }
  .sort:hover{
    color:#5CB0FA;
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
     font-size: 18px;
     padding: 10px 10px;
     border-top-left-radius: 3px;
     border-top-right-radius: 3px;
     border: 1px solid #ccc;
     cursor: pointer;
     background: #f0f0f0;
     margin-bottom: -1px;
     color:#000;
     /*margin-right: 0px;*/
   }
  .btn1:hover{
    background: #e0e0e0;
  }
  .active{
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
    padding:7px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#338FFC ;
    float: left;
    margin-left: 15px;
    margin-top:13px;
    /*margin-bottom: 5px;*/
  }
  .btn3:hover{
    background-color:#5FA7FE;
  }
  .btn4{
    width:90px;
    padding:7px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#FA4E28 ;
    float: right;
    /*margin-left: 15px;*/
    margin-top: 13px;
    /*margin-bottom: 5px;*/
  }
  .btn4:hover{
    background-color:#FC6F4F;
  }
  .delete:hover{
    color:#C1C1C2
  }
  .page{
    text-align: center;
  }
  .top{
    background: #e0e0e0;
  }
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
    width:360px !important;
  }
</style>
