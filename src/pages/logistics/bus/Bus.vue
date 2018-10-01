<template>
  <div class="display1">
    <button class="btn1 "  v-bind:class="{ active: isActive }">车辆管理</button>
    <router-link to="/logistics/driverlist"><button class="btn1 btn2"  >司机管理</button></router-link>
    <router-link to="/logistics/Travelrecord"><button class="btn1 btn2"  >出行记录</button></router-link>
    <div class="display2">
      <div class="col-md-12" style="align-content: center">
        <div>
          <table style="width: auto;margin: auto;margin-top: 20px">
            <tr>
              <th style="width: 50px">序号</th>
              <th style="width: 100px">车牌号
                <i v-show="busSort" class="sort icon-paixushengxu" v-on:click="sort(busName,plateNum,busType,seatNum,timequantum,1)"></i>
                <i v-show="!busSort" class="sort icon-paixujiangxu" v-on:click="sort(busName,plateNum,busType,seatNum,timequantum,2)"></i>
                <div>
                  <input class="input1" v-model="plateNum" placeholder="输入" style="font-size:14px;width:120px">
                </div>
              </th>
              <th style="width: 80px">车辆名称
                <i v-show="plateSort" class="sort icon-paixushengxu" v-on:click="sort(busName,plateNum,busType,seatNum,timequantum,3)"></i>
                <i v-show="!plateSort" class="sort icon-paixujiangxu" v-on:click="sort(busName,plateNum,busType,seatNum,timequantum,4)"></i>
                <div>
                  <input class="input1" v-model="busName" placeholder="搜索" style="font-size:14px;width:110px;">
                </div>
              </th>
              <th style="width: 100px;">车辆类型
                <i v-show="busTypeSort" class="sort icon-paixushengxu" v-on:click="sort(busName,plateNum,busType,seatNum,timequantum,5)"></i>
                <i v-show="!busTypeSort" class="sort icon-paixujiangxu" v-on:click="sort(busName,plateNum,busType,seatNum,timequantum,6)"></i>
                <div>
                  <select v-model="busType"  style="font-size:14px;">
                    <option disabled value="">选择</option>
                    <option value="1" >小轿车</option>
                    <option value="2">客车</option>
                    <option value="3">越野车</option>
                    <option value="4">其它</option>
                  </select>
                </div>
              </th>
              <th style="width: 90px;">座位数
                <i v-show="seatSort" class="sort icon-paixushengxu" v-on:click="sort(busName,plateNum,busType,seatNum,timequantum,7)"></i>
                <i v-show="!seatSort" class="sort icon-paixujiangxu" v-on:click="sort(busName,plateNum,busType,seatNum,timequantum,8)"></i>
                <div>
                  <input class="input1" v-model="seatNum" placeholder="输入" style="font-size:14px;width: 80px">
                </div>
              </th>
              <th style="width: 120px;">行程安排
                <!--<i v-show="driverSort" class="sort icon-paixushengxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,1)"></i>-->
                <!--<i v-show="!driverSort" class="sort icon-paixujiangxu" v-on:click="sort(driverName,driverTel,plateNum,timequantum,outPlace,useReason,passageNum,arranger,2)"></i>-->
                <div class="block;">
                  <el-date-picker style="width: 250px" size="small" v-model="timequantum" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                  </el-date-picker>
                </div>
              </th>
              <th style="width: 60px;">修改</th>
              <th style="width: 60px;">删除</th>
            </tr>
            <tr v-for="(bus,index) in businfo">
              <td>{{(currentpage-1)*8+index+1}}</td>
              <td>{{bus.PLATENUM}}</td>
              <td>{{bus.BUSNAME}}</td>
              <td v-if="bus.BUSTYPE==1">小轿车</td>
              <td v-if="bus.BUSTYPE==2">客车</td>
              <td v-if="bus.BUSTYPE==3">越野车</td>
              <td v-if="bus.BUSTYPE==4">其它</td>
              <td>{{bus.SEATNUM}}</td>
              <td v-if="outInfo[(currentpage-1)*8+index].length==0">暂无行程</td>
              <td v-if="outInfo[(currentpage-1)*8+index].length!=0">
                查看行程
                <el-popover placement="right" width="800" trigger="click">
                  <table>
                    <tr>
                      <th>序号</th>
                      <th>会议ID</th>
                      <th>车辆名称</th>
                      <th>车牌号</th>
                      <th>使用日期</th>
                      <th>使用原因</th>
                      <th>出行地点</th>
                      <th>司机姓名</th>
                      <th>联系电话</th>
                      <th>乘客数量</th>
                    </tr>
                    <tr v-for="(schedule,index) in scheduleInfo">
                      <td>{{index+1}}</td>
                      <td>{{schedule.CONFERENCEID}}</td>
                      <td>{{schedule.BUSNAME}}</td>
                      <td>{{schedule.PLATENUM}}</td>
                      <td>{{schedule.USEDATA}}</td>
                      <td>{{schedule.USEREASON}}</td>
                      <td>{{schedule.OUTPLACE}}</td>
                      <td>{{driInfo[index]['DRIVERNAME']}}</td>
                      <td>{{driInfo[index]['TEL']}}</td>
                      <td>{{schedule.PASSAGENUM}}</td>
                    </tr>
                  </table>
                  <span class="el-icon-document" style="padding: 5px 18px" slot="reference" v-on:click="sheduleview(bus.ID)"></span>
                </el-popover>
              </td>
              <td>
                <router-link :to="{path:'/logistics/Alterbus',query:{busId:bus.ID}}"><i class="el-icon-edit"></i></router-link>
                <router-view/>
              </td>
              <td>
                <span v-on:click="deletebus(bus.ID)" ><i class="el-icon-delete"></i>
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div style="text-align: center">
        <span>
          <router-link to="/logistics/Addbus"><button class="btn4 icon-jiajianzujianjiahao" >添加车辆信息</button></router-link>
          <button class="btn3 icon-sousuo" v-on:click="search(busName,plateNum,busType,seatNum,timequantum)">搜索</button>
        </span>
      </div>
      <div class="page">
        <ul class="pagination pagination-sm"><!--分页-->
          <li class="page-item" v-if="currentpage!=1"><a class="page-link" href="#" v-on:click="prepage(busName,plateNum,busType,seatNum,timequantum,currentpage)">上一页</a></li>
          <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage == index} ">
            <a class="page-link" href="#" v-on:click="pageChange(busName,plateNum,busType,seatNum,timequantum,index)">{{index}}</a>
          </li>
          <li class="page-item" v-if="currentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage(busName,plateNum,busType,seatNum,timequantum,currentpage)">下一页</a></li>
          <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import myDatepicker from 'vue-datepicker2'; //引入对应的组件
  var moment = require('moment');
  let nowTime=moment().format();//当前时间
  console.log(nowTime);
  console.log(this.starTime);
  let start=this.starTime;
  // start=start.toString();
  console.log(start);
  export default {
    name: 'Bus',
    data(){
      return {
        businfo:[],
        outInfo:[],
        scheduleInfo:[],
        busName:'',
        plateNum:'',
        busType:'',
        seatNum:'',
        timequantum:'',
        sortType:0,
        busSort:true,
        plateSort:true,
        busTypeSort:true,
        seatSort:true,
        currentpage: 1,//当前页
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
        isActive: true,
      }
    },
    methods: {
      getpagedata:function(){
        let that=this;
        this.$http.get('/yii/logistics/bus/page?page=1').then(function (res) {
          that.businfo=res.data.data[0];
          that.totlepage=res.data.data[1];
          that.outInfo=res.data.data[2];
          console.log(that.outInfo);
        })
      },
      deletebus:function(busId){
        console.log(busId);
        let that=this;
        this.$http.post('/yii/logistics/bus/deletebusdata',{ID:busId}).then(function (res) {
          console.log(res.data);
          location.reload();
        })
      },
      search:function(busName,plateNum,busType,seatNum,timequantum){
        this.flag=1;
        this.$http.get('/yii/logistics/bus/querybusdata', {
          params: {
            BUSNAME: busName,
            PLATENUM:plateNum,
            BUSTYPE:busType,
            SEATNUM:seatNum
            // OUTTIME:timequantum
          }
        }).then(res => {
          console.log(res.data);
          this.businfo = res.data.data[0];
          this.totlepage=res.data.data[1];
          this.outInfo=res.data.data[2];
        }).catch(function (error) {
          console.log(error);
        });
      },
      sheduleview(busInfoId){
        let that=this;
        this.$http.post('/yii/logistics/bus/getbusschedule',{ID:busInfoId}).then(function (res) {
          console.log(res.data);
          that.scheduleInfo=[];
          that.scheduleInfo=res.data.data[0];
          that.driInfo=res.data.data[2];
          that.flag1=1;
        }).catch(function (error) {
          console.log(error);
        });
      },
      sort(busName,plateNum,busType,seatNum,timequantum,sortType){
        this.sortType=sortType;
        if(sortType==1||sortType==2){
          this.busSort=!this.busSort;
          this.plateSort=true;
          this.busTypeSort=true;
          this.seatSort=true;
        }else if(sortType==3||sortType==4){
          this.plateSort=!this.plateSort;
          this.busSort=true;
          this.busTypeSort=true;
          this.seatSort=true;
        }else if(sortType==5||sortType==6){
          this.busTypeSort=!this.busTypeSort;
          this.busSort=true;
          this.plateSort=true;
          this.seatSort=true;
        }else if(sortType==7||sortType==8){
          this.seatSort=!this.seatSort;
          this.busSort=true;
          this.plateSort=true;
          this.busTypeSort=true;
        }
        this.$http.get('/yii/logistics/bus/querybusdata', {
          params: {
            BUSNAME: busName,
            PLATENUM:plateNum,
            BUSTYPE:busType,
            SEATNUM:seatNum,
            sortType:this.sortType,
            page:1
          }
        }).then(res => {
          this.currentpage=1;
          this.businfo = res.data.data[0];
          this.totlepage=res.data.data[1];
          this.outInfo=res.data.data[2];
        })
      },
      prepage:function(busName,plateNum,busType,seatNum,timequantum,page){//下一页
        page--;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.$http.get('/yii/logistics/bus/querybusdata', {
          params: {
            BUSNAME: busName,
            PLATENUM:plateNum,
            BUSTYPE:busType,
            SEATNUM:seatNum,
            sortType:this.sortType,
            page:page
          }
        }).then(res => {
          console.log(res.data.data);
          this.businfo = res.data.data[0];
          this.totlepage=res.data.data[1];
          this.outInfo=res.data.data[2];
        }).catch(function (error) {
          console.log(error);
        });
      },
      nextpage:function(busName,plateNum,busType,seatNum,timequantum,page){//下一页
        page++;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.$http.get('/yii/logistics/bus/querybusdata', {
          params: {
            BUSNAME: busName,
            PLATENUM:plateNum,
            BUSTYPE:busType,
            SEATNUM:seatNum,
            sortType:this.sortType,
            page:page
          }
        }).then(res => {
          console.log(res.data.data);
          this.businfo = res.data.data[0];
          this.totlepage=res.data.data[1];
          this.outInfo=res.data.data[2];
        }).catch(function (error) {
          console.log(error);
        });
      },
      pageChange:function(busName,plateNum,busType,seatNum,timequantum,page){//下一页
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        let that=this;
        this.$http.get('/yii/logistics/bus/querybusdata', {
          params: {
            BUSNAME: busName,
            PLATENUM:plateNum,
            BUSTYPE:busType,
            SEATNUM:seatNum,
            sortType:this.sortType,
            page:page
          }
        }).then(res => {
          console.log(res.data.data);
          this.businfo = res.data.data[0];
          this.totlepage=res.data.data[1];
        }).catch(function (error) {
          console.log(error);
        });
      },
    },
    components:{
      'date-picker': myDatepicker
    },
    mounted() {
      this.getpagedata();
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
  .bus{
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
    /*float: left;*/
    margin-left: 15px;
    margin-top:13px;
    /*margin-bottom: 5px;*/
  }
  .btn3:hover{
    background-color:#5FA7FE;
  }
  .btn4{
    width:130px;
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
  .top{
    background: #e0e0e0;
  }
</style>
