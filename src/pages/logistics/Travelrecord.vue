<template>
  <div class="display1">
    <router-link  to="/logistics/bus"> <button class="btn1 " >车辆管理</button></router-link>
    <router-link  to="/logistics/driverlist"> <button class="btn1 " >车辆管理</button></router-link>
    <button class="btn1 btn2"  v-bind:class="{ active: isActive }">出行记录</button>
    <div class="display2">
      <table>
        <tr>
          <th style="width: 40px">序号</th>
          <th style="width: 30px">车牌号
            <br/>
            <input class="input1" v-model="plateNum" placeholder="搜索" style="font-size:14px;">
          </th>
          <th style="width: 100px">出行时间
            <div class="block;">
              <el-date-picker style="width: 200px" size="small" v-model="timequantum" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
          </th>
          <th style="width: 90px">出行地点
            <br/>
            <input class="input1" v-model="outPlace" placeholder="搜索" style="font-size:14px;width: 120px">
          </th>
          <th style="width: 90px">出行事由
            <input  v-model="useReason" placeholder="搜索" style="font-size:14px;width:120px;">
          </th>
          <th style="width: 60px">出行司机
            <input  v-model="driverName" placeholder="搜索" style="font-size:14px;width:100px;">
          </th>
          <th placeholder="搜索" style="font-size:14px;width:120px;">联系方式
            <input  v-model="driverTel" placeholder="搜索" style="font-size:14px;width:100px;">
          </th>
          <th placeholder="搜索" style="font-size:14px;width:80px;">乘客信息
            <input  v-model="passageNum" placeholder="搜索" style="font-size:14px;width:100px;">
          </th>
          <th placeholder="搜索" style="font-size:14px;width:80px;">安排人员
            <input  v-model="arranger" placeholder="搜索" style="font-size:14px;width:100px;">
          </th>
        </tr>
        <tr v-if="flag==0" v-for="(schedule,index) in scheduleinfo">
          <td>{{(currentpage-1)*8+index+1}}</td>
          <td v-if="businfo[index]==null"></td>
          <td v-if="businfo[index]!=null">{{businfo[index]['PLATENUM']}}</td>
          <td>{{schedule.USEDATA}}</td>
          <td>{{schedule.OUTPLACE}}</td>
          <td>{{schedule.USEREASON}}</td>
          <td v-if="driinfo[index]==null"></td>
          <td v-if="driinfo[index]!=null">{{driinfo[index]['DRIVERNAME']}}</td>
          <td v-if="driinfo[index]==null"></td>
          <td v-if="driinfo[index]!=null">{{driinfo[index]['TEL']}}</td>
          <td>{{schedule.PASSAGENUM}}</td>
          <td>{{schedule.ARRANGERID}}</td>
        </tr>
        <tr v-if="flag==1" v-for="(schedule,index) in scheduleinfo">
          <td>{{(currentpage-1)*8+index+1}}</td>
          <td>{{schedule['PLATENUM']}}</td>
          <td>{{schedule.USEDATA}}</td>
          <td>{{schedule.OUTPLACE}}</td>
          <td>{{schedule.USEREASON}}</td>
          <td>{{schedule.DRIVERNAME}}</td>
          <td>{{schedule.TEL}}</td>
          <td>{{schedule.PASSAGENUM}}</td>
          <td>{{schedule.ARRANGERID}}</td>
        </tr>
      </table>
      <div style="text-align: center">
        <span>
          <button class="btn3 icon-sousuo" v-on:click="search(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger)">搜索</button>
        </span>
      </div>
      <div v-if="flag==0" class="page">
        <ul class="pagination pagination-sm"><!--分页-->
          <li class="page-item" v-if="currentpage!=1"><a class="page-link" href="#" v-on:click="prepage(currentpage)">上一页</a></li>
          <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage == index} ">
            <a class="page-link" href="#" v-on:click="pageChange(index)">{{index}}</a>
          </li>
          <li class="page-item" v-if="currentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage(currentpage)">下一页</a></li>
          <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
        </ul>
      </div>
      <div v-model="flag" v-if="flag==1" class="page">
        <ul class="pagination pagination-sm"><!--分页-->
          <li class="page-item" v-if="currentpage1!=1"><a class="page-link" href="#" v-on:click="prepage1(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger,currentpage1)">上一页1</a></li>
          <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage1 == index} ">
            <a class="page-link" href="#" v-on:click="pageChange1(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger,index)">{{index}}</a>
          </li>
          <li class="page-item" v-if="currentpage1!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage1(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger,currentpage1)">下一页1</a></li>
          <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import myDatepicker from 'vue-datepicker2'; //引入对应的组件
  export default {
    name: 'Travelrecord',
    data() {
      return {
        driinfo: [],
        businfo: [],
        driverschedule:[],
        scheduleinfo:[],
        moneysort:true,//金额排序
        datesort:true,//日期排序
        showmoney: true,
        showinvoice: false,
        showFirstText:true,//显示上一页
        showNextText:true,//显示下一页
        plateNum:'',
        outPlace:'',
        useReason:'',
        driverName:'',
        driverTel:'',
        passageNum:'',
        arranger:'',

        inputname: '',//输入姓名
        inputsex: '',//输入性别
        inputage: '',//输入年龄
        inputidentity: '',//输入身份证号
        inputtel: '',//输入电话号码
        flag:0,
        flag1:0,
        visible2: false,
        kindselected2: '',//费用下拉列表
        payselected2: '',//支付下拉列表
        startTime2: '',
        endTime2: '',
        isActive:true,
        type:1,//排序类型，默认日期降序，2为日期升序，3为金额降序，4为金额升序
        currentpage: 1,//当前页
        currentpage1:1,
        totlepage: '',//总页数
        visiblepage:10,//可见页数

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
        timequantum: '',
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods: {
      getscheduledata:function(){
        let that=this;
        this.$http.get('/yii/logistics/schedule/getscheduledata?page=1').then(function (res) {
          console.log(res.data.data);
          that.scheduleinfo=res.data.data[0];
          that.totlepage=res.data.data[1];
          that.driinfo=res.data.data[2];
          that.businfo=res.data.data[3];
          console.log(that.driinfo);
        })
      },
      search:function(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger){
        this.flag=1;
        this.$http.get('/yii/logistics/schedule/coupletquery', {
          params: {
            PLATENUM: plateNum,
            OUTPLACE:outPlace,
            USEREASON:useReason,
            DRIVERNAME:driverName,
            TEL:driverTel,
            PASSAGENUM:passageNum,
            ARRANGERID:arranger
          }
        }).then(res => {
          console.log(res.data);
          this.scheduleinfo = res.data.data[0];
          this.totlepage=res.data.data[1];
        }).catch(function (error) {
          console.log(error);
        });
      },

      driversheduleview(driverInfoId){
        console.log(driverInfoId);
        let that=this;
        this.$http.post('/yii/logistics/schedule/getdriverschedule',{ID:driverInfoId}).then(function (res) {
          console.log(res.data);
          that.driverschedule=[];
          that.driverschedule=res.data.data;
          that.flag1=1;
        }).catch(function (error) {
          console.log(error);
        });
      },
      statuschange(){
        this.flag1=0;
      },
      pageChange: function(page){//分页
        if (this.currentpage != page) {
          this.currentpage = page;
          // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
        }
        console.log(page);
        let that=this;
        this.$http.get('/yii/logistics/schedule/getscheduledata',{
          params: {
            page: page
          }
        }).then(function (res) {
          console.log(res.data.data);
          that.scheduleinfo=res.data.data[0];
          that.totlepage=res.data.data[1];
          that.driinfo=res.data.data[2];
          that.businfo=res.data.data[3];
        })
      },
      pageChange1: function(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger,page){//分页
        if (this.currentpage1 != page) {
          this.currentpage1 = page;
        }
        let that=this;
        this.$http.get('/yii/logistics/schedule/coupletquery', {
          params: {
            PLATENUM: plateNum,
            OUTPLACE:outPlace,
            USEREASON:useReason,
            DRIVERNAME:driverName,
            TEL:driverTel,
            PASSAGENUM:passageNum,
            ARRANGERID:arranger,
            page:page
          }
        }).then(res => {
          console.log(res.data.data);
          this.sheduleinfo = res.data.data[0];
          this.totlepage=res.data.data[1];
        }).catch(function (error) {
          console.log(error);
        });
      },
      prepage:function(page){//上一页
        page--;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        console.log(page);
        let that=this;
        this.$http.get('/yii/logistics/schedule/getscheduledata',{
          params: {
            page: page
          }
        }).then(function (res) {
          console.log(res.data.data);
          that.scheduleinfo=res.data.data[0];
          that.totlepage=res.data.data[1];
          that.driinfo=res.data.data[2];
          that.businfo=res.data.data[3];
        })
      },
      prepage1:function(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger,page){//上一页
        page--;
        if (this.currentpage1 != page) {
          this.currentpage1 = page;
        }
        console.log(page);
        let that=this;
        this.$http.get('/yii/logistics/schedule/coupletquery', {
          params: {
            PLATENUM: plateNum,
            OUTPLACE:outPlace,
            USEREASON:useReason,
            DRIVERNAME:driverName,
            TEL:driverTel,
            PASSAGENUM:passageNum,
            ARRANGERID:arranger,
            page:page
          }
        }).then(res => {
          console.log(res.data.data);
          this.scheduleinfo = res.data.data[0];
          this.totlepage=res.data.data[1];
        }).catch(function (error) {
          console.log(error);
        });
      },

      nextpage:function(page){//下一页
        page++;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        console.log(page);
        let that=this;
        console.log(this.flag);
        this.$http.get('/yii/logistics/schedule/getscheduledata',{
          params: {
            page: page
          }
        }).then(function (res) {
          console.log(res.data.data);
          that.scheduleinfo=res.data.data[0];
          that.totlepage=res.data.data[1];
          that.driinfo=res.data.data[2];
          that.businfo=res.data.data[3];
        })
      },
      nextpage1:function(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger,page){//下一页
        page++;
        if (this.currentpage1 != page) {
          this.currentpage1 = page;
        }
        console.log(page);
        let that=this;
        this.$http.get('/yii/logistics/schedule/coupletquery', {
          params: {
            PLATENUM: plateNum,
            OUTPLACE:outPlace,
            USEREASON:useReason,
            DRIVERNAME:driverName,
            TEL:driverTel,
            PASSAGENUM:passageNum,
            ARRANGERID:arranger,
            page:page
          }
        }).then(res => {
          console.log(res.data.data);
          this.scheduleinfo = res.data.data[0];
          this.totlepage=res.data.data[1];
        }).catch(function (error) {
          console.log(error);
        });
      },
    },
    components: {
      'date-picker': myDatepicker
    },
    mounted() {
      this.getscheduledata();
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
    padding:3px;
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
    width:70px;
  }
  .btn3{
    width:80px;
    padding:7px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#338FFC ;
    float: right;
    margin-left: 15px;
    margin-top:13px;
    /*margin-bottom: 5px;*/
  }
  .btn3:hover{
    background-color:#5FA7FE;
  }
  .btn4{
    width:110px;
    padding:7px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#FA4E28 ;
    /*float: right;*/
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
</style>
