<template>
  <div class="display1">
    <router-link  to="/logistics/bus"> <button class="btn1 " >车辆管理</button></router-link>
    <router-link  to="/logistics/driverlist"> <button class="btn1 " >车辆管理</button></router-link>
    <button class="btn1 btn2"  v-bind:class="{ active: isActive }">出行记录</button>
    <div class="display2">
      <table>
        <tr>
          <th style="width: 40px">序号</th>
          <th style="width: 300px">出行司机
            <i v-show="driverSort" class="sort icon-paixushengxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,1)"></i>
            <i v-show="!driverSort" class="sort icon-paixujiangxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,2)"></i>
            <div>
              <input v-model="driverName" placeholder="搜索" style="font-size:14px;width:90px;">
            </div>
          </th>
          <th placeholder="搜索" style="font-size:14px;width:110px;">联系方式
            <i v-show="telSort" class="sort icon-paixushengxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,3)"></i>
            <i v-show="!telSort" class="sort icon-paixujiangxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,4)"></i>
            <input  v-model="driverTel" placeholder="搜索" style="font-size:14px;width:110px;">
          </th>
          <th style="width: 130px">车牌号
            <i v-show="plateSort" class="sort icon-paixushengxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,5)"></i>
            <i v-show="!plateSort" class="sort icon-paixujiangxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,6)"></i>
            <div>
              <input class="input1" v-model="plateNum" placeholder="搜索" style="font-size:14px;width: 100px;">
            </div>
          </th>
          <th style="width: 100px">出行时间
            <div class="block;">
              <el-date-picker style="width: 200px" size="small" v-model="timequantum" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
          </th>
          <th style="width: 90px">出行地点
            <i v-show="placeSort" class="sort icon-paixushengxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,7)"></i>
            <i v-show="!placeSort" class="sort icon-paixujiangxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,8)"></i>
            <input class="input1" v-model="outPlace" placeholder="搜索" style="font-size:14px;width: 120px">
          </th>
          <th style="width: 90px">出行事由
            <i v-show="reasonSort" class="sort icon-paixushengxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,9)"></i>
            <i v-show="!reasonSort" class="sort icon-paixujiangxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,10)"></i>
            <input  v-model="useReason" placeholder="搜索" style="font-size:14px;width:120px;">
          </th>
          <th placeholder="搜索" style="font-size:14px;width:80px;">乘客信息
            <i v-show="passageSort" class="sort icon-paixushengxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,11)"></i>
            <i v-show="!passageSort" class="sort icon-paixujiangxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,12)"></i>
            <input  v-model="passageNum" placeholder="搜索" style="font-size:14px;width:100px;">
          </th>
          <th placeholder="搜索" style="font-size:14px;width:80px;">安排人员
            <i v-show="arrangerSort" class="sort icon-paixushengxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,13)"></i>
            <i v-show="!arrangerSort" class="sort icon-paixujiangxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,14)"></i>
            <input  v-model="arranger" placeholder="搜索" style="font-size:14px;width:100px;">
          </th>
        </tr>
        <tr v-for="(schedule,index) in scheduleinfo">
          <td>{{(currentpage-1)*10+index+1}}</td>
          <td>{{schedule.DRIVERNAME}}</td>
          <td>{{schedule.TEL}}</td>
          <td>{{schedule['PLATENUM']}}</td>
          <td>{{schedule.USEDATA}}</td>
          <td>{{schedule.OUTPLACE}}</td>
          <td>{{schedule.USEREASON}}</td>
          <td>{{schedule.PASSAGENUM}}</td>
          <td>{{schedule.ARRANGERID}}</td>
        </tr>
      </table>
      <div style="text-align: center">
        <span>
          <button class="btn3 icon-sousuo" v-on:click="search(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger)">搜索</button>
        </span>
      </div>
      <div class="page">
        <ul class="pagination pagination-sm"><!--分页-->
          <li class="page-item" v-if="currentpage!=1"><a class="page-link" href="#" v-on:click="prepage(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger,currentpage)">上一页</a></li>
          <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage==index} ">
            <a class="page-link" href="#" v-on:click="pageChange(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger,index)">{{index}}</a>
          </li>
          <li class="page-item" v-if="currentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger,currentpage)">下一页</a></li>
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
        scheduleinfo:[],
        moneysort:true,//金额排序
        datesort:true,//日期排序
        showmoney: true,
        showinvoice: false,
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
        visible2: false,
        isActive:true,
        type:0,//排序类型，默认日期降序，2为日期升序，3为金额降序，4为金额升序
        currentpage: 1,//当前页
        totlepage: '',//总页数
        visiblepage:10,//可见页数
        driverSort:true,
        telSort:true,
        plateSort:true,
        placeSort:true,
        reasonSort:true,
        passageSort:true,
        arrangerSort:true,
        sortType:0,
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
        })
      },
      search:function(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger){
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
          console.log(res.data.data);
          this.scheduleinfo = res.data.data[0];
          this.totlepage=res.data.data[1];
        }).catch(function (error) {
          console.log(error);
        });
      },
      sort:function(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger,sortType){
        this.sortType=sortType;
        if(sortType==1||sortType==2){
          this.driverSort=!this.driverSort;
          this.telSort=true;
          this.plateSort=true;
          this.placeSort=true;
          this.reasonSort=true;
          this.passageSort=true;
          this.arrangerSort=true;
        }else if(sortType==3||sortType==4){
          this.telSort=!this.telSort;
          this.driverSort=true;
          this.plateSort=true;
          this.placeSort=true;
          this.reasonSort=true;
          this.passageSort=true;
          this.arrangerSort=true;
        }else if(sortType==5||sortType==6){
          this.plateSort=!this.plateSort;
          this.driverSort=true;
          this.telSort=true;
          this.placeSort=true;
          this.reasonSort=true;
          this.passageSort=true;
          this.arrangerSort=true;
        }else if(sortType==7||sortType==8){
          this.placeSort=!this.placeSort;
          this.driverSort=true;
          this.telSort=true;
          this.plateSort=true;
          this.reasonSort=true;
          this.passageSort=true;
          this.arrangerSort=true;
        }else if(sortType==9||sortType==10){
          this.reasonSort=!this.reasonSort;
          this.driverSort=true;
          this.telSort=true;
          this.plateSort=true;
          this.placeSort=true;
          this.passageSort=true;
          this.arrangerSort=true;
        }else if(sortType==11||sortType==12){
          this.passageSort=!this.passageSort;
          this.driverSort=true;
          this.telSort=true;
          this.plateSort=true;
          this.placeSort=true;
          this.reasonSort=true;
          this.arrangerSort=true;
        }else if(sortType==13||sortType==14){
          this.arrangerSort=!this.arrangerSort;
          this.driverSort=true;
          this.telSort=true;
          this.plateSort=true;
          this.placeSort=true;
          this.reasonSort=true;
          this.passageSort=true;
        }
        this.$http.get('/yii/logistics/schedule/coupletquery', {
          params: {
            PLATENUM: plateNum,
            OUTPLACE:outPlace,
            USEREASON:useReason,
            DRIVERNAME:driverName,
            TEL:driverTel,
            PASSAGENUM:passageNum,
            ARRANGERID:arranger,
            sortType:sortType,
            page:1
          }
        }).then(res => {
          this.currentpage=1;
          this.scheduleinfo = res.data.data[0];
          this.totlepage = res.data.data[1];
        })
      },
      // driversheduleview(driverInfoId){
      //   console.log(driverInfoId);
      //   let that=this;
      //   this.$http.post('/yii/logistics/schedule/getdriverschedule',{ID:driverInfoId}).then(function (res) {
      //     console.log(res.data);
      //     that.driverschedule=[];
      //     that.driverschedule=res.data.data;
      //   }).catch(function (error) {
      //     console.log(error);
      //   });
      // },
      pageChange: function(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger,page){//分页
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        console.log(page);
        this.$http.get('/yii/logistics/schedule/coupletquery', {
          params: {
            PLATENUM: plateNum,
            OUTPLACE:outPlace,
            USEREASON:useReason,
            DRIVERNAME:driverName,
            TEL:driverTel,
            PASSAGENUM:passageNum,
            ARRANGERID:arranger,
            sortType:this.sortType,
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

      prepage:function(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger,page){//上一页
        page--;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        console.log(page);
        // console.log(this.sortType);
        this.$http.get('/yii/logistics/schedule/coupletquery', {
          params: {
            PLATENUM: plateNum,
            OUTPLACE:outPlace,
            USEREASON:useReason,
            DRIVERNAME:driverName,
            TEL:driverTel,
            PASSAGENUM:passageNum,
            ARRANGERID:arranger,
            sortType:this.sortType,
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
      nextpage:function(plateNum,timequantum,outPlace,useReason,driverName,driverTel,passageNum,arranger,page){//下一页
        page++;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        console.log(page);
        // console.log(this.sortType);
        this.$http.get('/yii/logistics/schedule/coupletquery', {
          params: {
            PLATENUM: plateNum,
            OUTPLACE:outPlace,
            USEREASON:useReason,
            DRIVERNAME:driverName,
            TEL:driverTel,
            PASSAGENUM:passageNum,
            ARRANGERID:arranger,
            sortType:this.sortType,
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
