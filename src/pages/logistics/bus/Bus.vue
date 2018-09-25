<template>
  <div class="display1">
    <button class="btn1 "  v-bind:class="{ active: isActive }">车辆管理</button>
    <router-link to="/logistics/driverlist"><button class="btn1 btn2"  >司机管理</button></router-link>
    <router-link to="/logistics/Travelrecord"><button class="btn1 btn2"  >出行记录</button></router-link>
    <div class="display2">
      <div class="col-md-12">
        <div>
          <table>
            <tr>
              <th>序号
              </th>
              <th>车辆名称
                <input class="input1" v-model="busName" placeholder="搜索" style="font-size:14px;">
              </th>
              <th>车牌号
                <input class="input1" v-model="plateNum" placeholder="输入" style="font-size:14px;">
              </th>
              <th>车辆类型
                <select v-model="busType"  style="font-size:14px;">
                  <option disabled value="">选择</option>
                  <option value="1" >小轿车</option>
                  <option value="2">客车</option>
                  <option value="3">越野车</option>
                  <option value="4">其它</option>
                </select>
              </th>
              <th>座位数
                <input class="input1" v-model="seatNum" placeholder="输入" style="font-size:14px;">
              </th>
              <th>行程安排
                <div class="block;">
                  <el-date-picker style="width: 220px" size="small" v-model="timequantum" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                  </el-date-picker>
                </div>
              </th>
              <th>修改</th>
              <th>删除</th>
            </tr>
            <tr v-if="flag==0" v-for="(bus,index) in businfo">
              <td>{{index+1}}</td>
              <td>{{bus.BUSNAME}}</td>
              <td>{{bus.PLATENUM}}</td>
              <td>{{bus.BUSTYPE}}</td>
              <td>{{bus.SEATNUM}}</td>
              <td v-if="bus.OUTTIME==null">暂无行程</td>
              <td v-if="bus.OUTTIME!=null">
                {{bus.OUTTIME}}
                <el-popover placement="right" width="400" trigger="click">
                  <table v-if="flag1==1">
                    <tr>
                      <td>车牌号</td>
                      <td>{{schedule[2]['PLATENUM']}}</td>
                    </tr>
                    <tr>
                      <td>
                        使用日期:
                      </td>
                      <td>{{schedule[0]['USEDATA']}}</td>
                    </tr>
                    <tr>
                      <td>
                        使用原因:
                      </td>
                      <td>{{schedule[0]['USEREASON']}}</td>
                    </tr>
                    <tr>
                      <td>
                        出行地点:
                      </td>
                      <td>{{schedule[0]['OUTPLACE']}}</td>
                    </tr>
                    <tr>
                      <td>
                        出行司机:
                      </td>
                      <td>{{schedule[1]['DRIVERNAME']}}</td>
                    </tr>
                    <tr>
                      <td>
                        司机电话:
                      </td>
                      <td>{{schedule[1]['TEL']}}</td>
                    </tr>
                    <tr>
                      <td>
                        乘客人数:
                      </td>
                      <td>{{schedule[0]['PASSAGENUM']}}</td>
                    </tr>
                    <tr>
                      <td>
                        安排人:
                      </td>
                      <td>{{schedule[0]['ARRANGERID']}}</td>
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
                <span v-on:click="deletebus(bus.PLATENUM)" ><i class="el-icon-delete"></i>
                </span>
              </td>
            </tr>
            <tr v-if="flag==1" v-for="(bus,index) in businfo">
              <td>{{index+1}}</td>
              <td>{{bus.BUSNAME}}</td>
              <td>{{bus.PLATENUM}}</td>
              <td>{{bus.BUSTYPE}}</td>
              <td>{{bus.SEATNUM}}</td>
              <td v-if="bus.OUTTIME==null">暂无行程</td>
              <td v-if="bus.OUTTIME!=null">
                {{bus.OUTTIME}}
                <el-popover placement="right" width="400" trigger="click">
                  <table v-if="flag1==1">
                    <tr>
                      <td>车牌号</td>
                      <td>{{schedule[2]['PLATENUM']}}</td>
                    </tr>
                    <tr>
                      <td>
                        使用日期:
                      </td>
                      <td>{{schedule[0]['USEDATA']}}</td>
                    </tr>
                    <tr>
                      <td>
                        使用原因:
                      </td>
                      <td>{{schedule[0]['USEREASON']}}</td>
                    </tr>
                    <tr>
                      <td>
                        出行地点:
                      </td>
                      <td>{{schedule[0]['OUTPLACE']}}</td>
                    </tr>
                    <tr>
                      <td>
                        出行司机:
                      </td>
                      <td>{{schedule[1]['DRIVERNAME']}}</td>
                    </tr>
                    <tr>
                      <td>
                        司机电话:
                      </td>
                      <td>{{schedule[1]['TEL']}}</td>
                    </tr>
                    <tr>
                      <td>
                        乘客人数:
                      </td>
                      <td>{{schedule[0]['PASSAGENUM']}}</td>
                    </tr>
                    <tr>
                      <td>
                        安排人:
                      </td>
                      <td>{{schedule[0]['ARRANGERID']}}</td>
                    </tr>
                  </table>
                  <span class="el-icon-document" style="padding: 5px 18px" slot="reference" v-on:click="sheduleview(bus.ID)"></span>
                </el-popover>
              </td>
              <td>
                <router-link :to="{path:'logistics/AlterBus',query:{busId:bus.ID}}"><i class="el-icon-edit"></i></router-link>
                <router-view/>
              </td>
              <td>
                <span v-on:click="deletebus(bus.PLATENUM)" ><i class="el-icon-delete"></i>
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
          <li class="page-item" v-if="currentpage1!=1"><a class="page-link" href="#" v-on:click="prepage1(busName,plateNum,busType,seatNum,timequantum,currentpage1)">上一页1</a></li>
          <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage1 == index} ">
            <a class="page-link" href="#" v-on:click="pageChange1(busName,plateNum,busType,seatNum,timequantum,index)">{{index}}</a>
          </li>
          <li class="page-item" v-if="currentpage1!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage1(busName,plateNum,busType,seatNum,timequantum,currentpage1)">下一页1</a></li>
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
        schedule:[],
        busName:'',
        plateNum:'',
        busType:'',
        seatNum:'',
        timequantum:'',
        flag:0,
        flag1:0,
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
        // startTime1: '',
        // endTime1:'',
        // startTime2: '',
        // endTime2:'',
        isActive: true,
      }
    },
    methods: {
      getpagedata:function(){
        let that=this;
        this.$http.get('/yii/logistics/bus/page?page=1').then(function (res) {
          console.log(res.data.data);
          that.businfo=res.data.data[0];
          that.totlepage=res.data.data[1];
        })
      },
      alterbus:function(plateNum){
        let that=this;
        this.$http.post('/yii/logistics/bus/alterbusdata',{PLATENUM:plateNum}).then(function (res) {
          console.log(res.data);
          location.reload();
        })
      },
      deletebus:function(plateNum){
        let that=this;
        this.$http.post('/yii/logistics/bus/deletebusdata',{PLATENUM:plateNum}).then(function (res) {
          console.log(res.data);
          location.reload();
        })
      },
      search:function(busName,plateNum,busType,seatNum,timequantum){
        this.flag=1;
        console.log(busName);
        console.log(plateNum);
        console.log(busType);
        console.log(seatNum);
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
        }).catch(function (error) {
          console.log(error);
        });
      },
      sheduleview(busInfoId){
        let that=this;
        this.$http.post('/yii/logistics/schedule/getbusschedule',{ID:busInfoId}).then(function (res) {
          console.log(res.data);
          that.schedule=[];
          that.schedule=res.data.data;
          console.log(that.schedule[2]['PLATENUM']);
          that.flag1=1;
        }).catch(function (error) {
          console.log(error);
        });

      },
      prepage:function(page){//上一页
        page--;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        let that=this;
        this.$http.get('/yii/logistics/bus/page',{
          params: {
            page: page
          }
        }).then(function (res) {
          console.log(res.data.data);
          that.businfo=res.data.data[0];
          that.totlepage=res.data.data[1];
        })
      },
      prepage1:function(busName,plateNum,busType,seatNum,timequantum,page){//下一页
        page--;
        if (this.currentpage1 != page) {
          this.currentpage1 = page;
        }
        console.log(page);
        let that=this;
        this.$http.get('/yii/logistics/bus/querybusdata', {
          params: {
            BUSNAME: busName,
            PLATENUM:plateNum,
            BUSTYPE:busType,
            SEATNUM:seatNum,
            // TEL:inputtel,
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
      nextpage:function(page){//下一页
        page++;
        if (this.currentpage != page) {
          this.currentpage = page;
          // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
        }
        console.log(page);
        let that=this;
        console.log(this.flag);
        this.$http.get('/yii/logistics/bus/page',{
          params: {
            page: page
          }
        }).then(function (res) {
          console.log(res.data.data);
          that.businfo=res.data.data[0];
          that.totlepage=res.data.data[1];
        })
      },
      nextpage1:function(busName,plateNum,busType,seatNum,timequantum,page){//下一页
        page++;
        if (this.currentpage1 != page) {
          this.currentpage1 = page;
        }
        console.log(page);
        let that=this;
        this.$http.get('/yii/logistics/bus/querybusdata', {
          params: {
            BUSNAME: busName,
            PLATENUM:plateNum,
            BUSTYPE:busType,
            SEATNUM:seatNum,
            // TEL:inputtel,
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
      pageChange: function(page){//分页
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        let that=this;
        this.$http.get('/yii/logistics/bus/page',{
          params: {
            page: page
          }
        }).then(function (res) {
          console.log(res.data.data);
          that.businfo=res.data.data[0];
          that.totlepage=res.data.data[1];
        })
      },
      pageChange1:function(busName,plateNum,busType,seatNum,timequantum,page){//下一页
        if (this.currentpage1 != page) {
          this.currentpage1 = page;
        }
        let that=this;
        this.$http.get('/yii/logistics/bus/querybusdata', {
          params: {
            BUSNAME: busName,
            PLATENUM:plateNum,
            BUSTYPE:busType,
            SEATNUM:seatNum,
            // TEL:inputtel,
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
      // this.axios.post("http://api.komavideo.com/news/list").then(body => {
      //   this.content = body.data;
      // });//测试
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
  .top{
    background: #e0e0e0;
  }
</style>
