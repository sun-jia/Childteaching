<template>
    <div id="order">
      <button class="btn1" >订单明细</button>
      <div class="display">
        <div class="meeting" >
          <span style="color:#fff;">搜索会议：</span><input  v-model="inputmeetingID" placeholder="输入会议名称" style="font-size:14px;width:300px;font-weight:lighter">
        </div>
        <button class="btn3 icon-sousuo" v-on:click="searcha(inputname,inputidentity,inputmeetingID,value2)">搜索</button>
        <button type="button" class="btn4 icon-daochu1" id="export-table" v-on:click="export2Excel(inputname,inputidentity,inputmeetingID,value2)">导出</button>
        <table>
          <tr>
            <th>订单号
            </th>
            <th>姓名
              <input class="input1" v-model="inputname" placeholder="搜索姓名" style="font-size:14px;">
              <!--<p>{{inputname1}}</p>//测试-->
            </th>
            <th>身份证号
              <input class="input1" v-model="inputidentity" placeholder="输入身份证号" style="font-size:14px;width:120px">
              <!--<p>{{inputidentity1}}</p>//测试-->
            </th>
            <th>会议名称
              <input class="input1" v-model="inputmeetingID" placeholder="输入会议ID" style="font-size:14px;width:120px">
            </th>
            <th>
              <div class="block" >
                <span class="demonstration">日期</span>
                <el-date-picker
                  v-model="value2"
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
                <i v-show="datesort" class="sort icon-paixushengxu" style="color:#1C93FC; "  v-on:click="dateup(inputname,inputidentity,inputmeetingID,value2)"></i>
                <i v-show="!datesort" class="sort icon-paixujiangxu" style="color:#1C93FC; " v-on:click="datedown(inputname,inputidentity,inputmeetingID,value2)"></i>
             {{value2}}
              </div>
            </th>
            <th>订单状态</th>
            <th>订单详情</th>
          </tr>
          <tr v-for="detial in details">
            <td>{{detial.ORDER_NUMBER}}</td>
            <td>{{detial.NAME}}</td>
            <td>{{detial.USERID}}</td>
            <td>{{detial.CONFERENCEID}}</td>
            <td>{{detial.CREATE_TIME}}</td>
            <td v-if='detial.STATUS==1'>等待支付</td>
            <td v-if='detial.STATUS==2'>支付成功</td>
            <td v-if='detial.STATUS==9'>支付失败</td>
            <td v-if='detial.STATUS==0'>订单取消</td>
            <td v-if='detial.STATUS==3'>已开发票</td>
            <td v-if='detial.STATUS==-1'>订单失效</td>
            <td style="color: #00AAFF"><el-button type="text" @click="open5(detial.ORDER_NUMBER,detial.NAME,detial.USERID,detial.CONFERENCEID,detial.MONEY,detial.TYPE,detial.CREATE_TIME,detial.STATUS)">详情查看</el-button></td>
          </tr>
        </table>
        <div class="page">
          <ul class="pagination pagination-sm"><!--分页-->
            <li class="page-item" v-if="currentpage!=1"><a class="page-link" href="#" v-on:click="prepage(currentpage,inputname,inputidentity,inputmeetingID,value2)">上一页</a></li>
            <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage == index} ">
              <a class="page-link" href="#" v-on:click="pageChange(index,inputname,inputidentity,inputmeeeting,value2)">{{index}}</a>
            </li>
            <li class="page-item" v-if="currentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage(currentpage,inputname,inputidentity,inputmeetingID,value2)">下一页</a></li>
            <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    import myDatepicker from 'vue-datepicker2'; //引入对应的组件
    export default {
      name: "Orderlist",
      data() {
        return {
          details: [
            {
              ORDER_NUMBER: 1234,
              NAME: 'ring',
              USERID: 12345678,
              CONFERENCEID: '世博',
              CREAT_TIME: '20180725',
              STATUS: 1,
            },
            {
              ORDER_NUMBER: 1234,
              NAME: 'xu',
              USERID: 123456,
              CONFERENCEID: '世',
              CREAT_TIME: '20180727',
              STATUS: 3,
            },
            {
              ORDER_NUMBER: 1234,
              NAME: 'ring',
              USERID: 1234567878,
              CONFERENCEID: '亚运',
              CREATE_TIME: '20180729',
              STATUS: 9,
            }
          ],
          eachifo:{
            ORDER_NUMBER: 1234,
            NAME: 'ring',
            USERID: 1234567878,
            CONFERENCEID: '亚运',
            TYPE:'支付宝',
            MONEY:300,
            CREATE_TIME: '20180729',
            STATUS: 9,
          },
          currentpage: 1,//当前页
          datesort: true,//日期排序
          endTime: '',
          excelData:'',//导出数据
          inputidentity: '',//输入身份证号
          inputmeeeting: '',//输入会议名称
          inputmeetingID:'',//输入会议ID
          inputname: '',//输入姓名
          startTime: '',
          totlepage: 28,//总页数
          type: 1,//排序类型，默认日期降序，2为日期升序
          visiblepage: 10,//可见页数
          value2:'',//时间数组
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
        }
      },
      methods: {
        searcha: function (a1, a2, a3, a4) {
          console.log(a3);
          if(a4.length!=0){
            this.startTime=a4[0];
            this.endTime=a4[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('CONFERENCEID', a3);//传会议ID
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          console.log(fd.getAll('CONFERENCEID'));
          this.$http.post('/yii/finance/certificate/querydatac', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
          })
        },
        dateup:function (a1, a2, a3,a4) {//日期升序
          this.type=2;
          console.log(this.type);
          this.datesort=!this.datesort;
          console.log(this.datesort);
          if(a4.length!=0){
            this.startTime=a4[0];
            this.endTime=a4[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('CONFERENCEID', a3);//传会议ID
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          this.$http.post('/yii/finance/certificate/querydatac', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
          })
        },
        datedown:function (a1, a2, a3,a4) {//日期降序
          this.type=1;
          this.datesort=!this.datesort;
          console.log(this.datesort);
          if(a4.length!=0){
            this.startTime=a4[0];
            this.endTime=a4[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('CONFERENCEID', a3);//传会议ID
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          this.$http.post('/yii/finance/certificate/querydatac', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
          })
        },
        pageChange: function (page,a1, a2, a3, a4) {//分页
          if (this.currentpage != page) {
            this.currentpage = page;
          }
          console.log(page);
          if(a4.length!=0){
            this.startTime=a4[0];
            this.endTime=a4[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('CONFERENCEID', a3);//传会议ID
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          this.$http.post('/yii/finance/certificate/querydatac', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
          })
        },
        prepage: function (page,a1, a2, a3, a4) {//上一页
          page--;
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          if(a4.length!=0){
            this.startTime=a4[0];
            this.endTime=a4[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('CONFERENCEID', a3);//传会议ID
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          this.$http.post('/yii/finance/certificate/querydatac', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
          })
        },
        nextpage: function (page,a1, a2, a3, a4) {//上一页
          page++;
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          if(a4.length!=0){
            this.startTime=a4[0];
            this.endTime=a4[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('CONFERENCEID', a3);//传会议ID
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          this.$http.post('/yii/finance/certificate/querydatac', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
          })
        },
        export2Excel(a1, a2, a3, a4) {
          if(a4.length!=0){
            this.startTime=a4[0];
            this.endTime=a4[1];
          }
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USERID', a2);//传身份证号
          fd.append('CONFERENCEID', a3);//传会议ID
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('type',this.type);//传类型
          this.$http.post('/yii/finance/certificate/exportdata', fd).then(body => {
            this.excelData = body.data.data;
            console.log(this.excelData);
            require.ensure([], () => {
              const { export_json_to_excel } = require('@/excel/Export2Excel.js');//引入文件
              const tHeader = ['订单号','姓名', '身份证号', '会议ID','交易金额','支付方式','订单日期','订单状态'];
              // 上面设置Excel的表格第一行的标题
              const filterVal = ['ORDER_NUMBER', 'NAME', 'USERID','CONFERENCEID','MONEY','TYPE','CREATE_TIME','STATUS'];
              // 上面的index、phone_Num、school_Name是tableData里对象的属性
              const list = this.excelData;  //把data里的tableData存到list
              // console.log(list);
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, '订单列表');
            })
          })//传数据
        },
        formatJson(filterVal, jsonData) {
          console.log(jsonData);
          return jsonData.map(v => filterVal.map(j => v[j]));
        },
        open5(ordernumber,name,userid,conferenceid,money,type,createtime,status) {
          // console.log(ordernumber);
          if(type==null){
            type='等待支付';
          }
          if(type==1){
            type='微信';
          }
          if(type==2){
            type='支付宝';
          }
          if(type==3){
            type='银联';
          }
          if(status==1){
            status='等待支付';
          }
          if(status==2){
            status='支付成功';
          }
          if(status==9){
            status='支付失败';
          }
          if(status==0){
            status='订单取消';
          }
          if(status==3){
            status='已开发票';
          }
          if(status==-1){
            status='订单失效';
          }
          const h = this.$createElement;
          this.$msgbox({
            title: '订单详情',
            message: h('p', null, [
              h('span', null, '订单号 '),
              h('i', { style: 'color: teal' }, ordernumber),
              h('br'),
              h('span', null, '姓名 '),
              h('i', { style: 'color: teal' }, name),
              h('br'),
              h('span', null, '身份证号 '),
              h('i', { style: 'color: teal' }, userid),
              h('br'),
              h('span', null, '会议名称 '),
              h('i', { style: 'color: teal' }, conferenceid),
              h('br'),
              h('span', null, '交易金额'),
              h('i', { style: 'color: teal' }, money),
              h('br'),
              h('span', null, '支付方式 '),
              h('i', { style: 'color: teal' }, type),
              h('br'),
              h('span', null, '订单日期'),
              h('i', { style: 'color: teal' }, createtime),
              h('br'),
              h('span', null, '订单状态'),
              h('i', { style: 'color: teal' }, status),
            ]),
            confirmButtonText: '返回',
          }).then(action => {
            this.$message({
              type: 'info',
              message: '已返回订单页面'
            });
          });
        },
      },
      components: {
      },
      mounted() {
        this.axios.get("/yii/finance/page/querycertif?page=1").then(body => {
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

<style>
  #order{
    /*padding-left:20px;*/
    padding-top:20px;
  }
  .display{
    border:solid 2px  #e0e0e0;
    height: 600px;
    /*text-align: center;*/
    width: 98%;
    /*padding-left:10px;*/
    padding-right:10px;
    background-color:  #fff;
  }
  table{
    border-collapse: collapse;
    width:100%;
    margin-top: 10px;
    /*margin-left: 20px;*/
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
  .input1{
    width:80px;
  }
  .btn1{
    font-size: 18px;
    padding: 6px 6px;
    width:100px;
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
  .page{
    text-align: center;
  }
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
    width:360px !important;
  }
</style>
