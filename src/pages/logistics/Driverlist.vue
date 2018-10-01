<template>
  <div class="display1">
    <router-link  to="/logistics/bus"> <button class="btn1 " >车辆管理</button></router-link>
    <button class="btn1 btn2"  v-bind:class="{ active: isActive }">司机管理</button>
    <router-link  to="/logistics/Travelrecord"> <button class="btn1 " >出行记录</button></router-link>
    <div class="display2">
      <table>
        <tr>
          <th>序号</th>
          <th>姓名
            <i v-show="driverSort" class="sort icon-paixushengxu" v-on:click="sort(inputname,inputsex,inputage,inputidentity,inputtel,timequantum,1)"></i>
            <i v-show="!driverSort" class="sort icon-paixujiangxu" v-on:click="sort(inputname,inputsex,inputage,inputidentity,inputtel,timequantum,2)"></i>
            <input class="input1" v-model="inputname" placeholder="搜索" style="font-size:14px;">
          </th>
          <th>性别
            <i v-show="sexSort" class="sort icon-paixushengxu" v-on:click="sort(inputname,inputsex,inputage,inputidentity,inputtel,timequantum,3)"></i>
            <i v-show="!sexSort" class="sort icon-paixujiangxu" v-on:click="sort(inputname,inputsex,inputage,inputidentity,inputtel,timequantum,4)"></i>
            <select v-model="inputsex"  style="font-size:14px;">
              <option disabled value="">选择</option>
              <option value="0" >男</option>
              <option value="1">女</option>
            </select>
          </th>
          <th>年龄
            <i v-show="ageSort" class="sort icon-paixushengxu" v-on:click="sort(inputname,inputsex,inputage,inputidentity,inputtel,timequantum,5)"></i>
            <i v-show="!ageSort" class="sort icon-paixujiangxu" v-on:click="sort(inputname,inputsex,inputage,inputidentity,inputtel,timequantum,6)"></i>
            <input class="input1" v-model="inputage" placeholder="搜索" style="font-size:14px;">
          </th>
          <th>身份证号
            <i v-show="identitySort" class="sort icon-paixushengxu" v-on:click="sort(inputname,inputsex,inputage,inputidentity,inputtel,timequantum,7)"></i>
            <i v-show="!identitySort" class="sort icon-paixujiangxu" v-on:click="sort(inputname,inputsex,inputage,inputidentity,inputtel,timequantum,8)"></i>
            <input  v-model="inputidentity" placeholder="搜索" style="font-size:14px;width:180px;">
          </th>
          <th>电话号码
            <i v-show="telSort" class="sort icon-paixushengxu" v-on:click="sort(inputname,inputsex,inputage,inputidentity,inputtel,timequantum,9)"></i>
            <i v-show="!telSort" class="sort icon-paixujiangxu" v-on:click="sort(inputname,inputsex,inputage,inputidentity,inputtel,timequantum,10)"></i>
            <input  v-model="inputtel" placeholder="搜索" style="font-size:14px;width:180px;">
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

        <tr v-for="(driver,index) in driverinfo">
          <td>{{(currentpage-1)*8+index+1}}</td>
          <td>{{driver.DRIVERNAME}}</td>
          <td v-if='driver.SEX==0'>男</td>
          <td v-if='driver.SEX==1'>女</td>
          <td>{{driver.AGE}}</td>
          <td>{{driver.IDNUMBER}}</td>
          <td>{{driver.TEL}}</td>
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
                  <td>{{busInfo[index].BUSNAME}}</td>
                  <td>{{busInfo[index].PLATENUM}}</td>
                  <td>{{schedule.USEDATA}}</td>
                  <td>{{schedule.USEREASON}}</td>
                  <td>{{schedule.OUTPLACE}}</td>
                  <td>{{schedule.DRIVERNAME}}</td>
                  <td>{{schedule.TEL}}</td>
                  <td>{{schedule.PASSAGENUM}}</td>
                </tr>
              </table>
              <span class="el-icon-document" style="padding: 5px 18px" slot="reference" v-on:click="driversheduleview(driver.ID)"></span>
            </el-popover>
          </td>
          <td>
            <router-link :to="{path:'/logistics/AlterDriver',query:{driverId:driver.ID}}"><i class="el-icon-edit"></i></router-link>
            <router-view/>
          </td>
          <td>
            <i v-on:click="deletedriver(driver.ID)" class="el-icon-delete"></i>
          </td>
        </tr>
      </table>
      <div style="text-align: center">
        <span>
          <router-link to="/logistics/adddriver"><button class="btn4 icon-jiajianzujianjiahao" >添加司机信息</button></router-link>
          <button class="btn3 icon-sousuo" v-on:click="search(inputname,inputsex,inputage,inputidentity,inputtel,timequantum)">搜索</button>
        </span>
      </div>
      <div class="page">
        <ul class="pagination pagination-sm"><!--分页-->
          <li class="page-item" v-if="currentpage!=1"><a class="page-link" href="#" v-on:click="prepage(inputname,inputsex,inputage,inputidentity,inputtel,currentpage)">上一页</a></li>
          <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage==index} ">
            <a class="page-link" href="#" v-on:click="pageChange(inputname,inputsex,inputage,inputidentity,inputtel,index)">{{index}}</a>
          </li>
          <li class="page-item" v-if="currentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage(inputname,inputsex,inputage,inputidentity,inputtel,currentpage)">下一页</a></li>
          <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import myDatepicker from 'vue-datepicker2'; //引入对应的组件
  export default {
    name: 'Driverlist',
    data() {
      return {
        driverinfo: [],
        scheduleInfo:[],
        outInfo:[],
        inputname: '',//输入姓名
        inputsex: '',//输入性别
        inputage: '',//输入年龄
        inputidentity: '',//输入身份证号
        inputtel: '',//输入电话号码
        visible2: false,
        isActive:true,
        driverSort:true,
        sexSort:true,
        ageSort:true,
        telSort:true,
        identitySort:true,
        sortType:0,
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
      getpagedata:function(){
        let that=this;
        this.$http.get('/yii/logistics/driver/page?page=1').then(function (res) {
          console.log(res.data.data[0]);
          that.driverinfo=res.data.data[0];
          that.totlepage=res.data.data[1];
          that.outInfo=res.data.data[2];
        })
      },
      getdriverdata:function(){
        let that=this;
        this.$http.get('/yii/logistics/driver/getdriverdata').then(function (res) {
          console.log(res.data.data);
          that.driverinfo=res.data.data;
        })
      },
      deletedriver:function(driverId){
        this.$http.post('/yii/logistics/driver/deletedriverdata',{ID:driverId}).then(function (res) {
          console.log(res.data);
          location.reload();
        })
      },
      search:function(inputname,inputsex,inputage,inputidentity,inputtel,timequantum){
        this.flag=1;
        console.log(inputname);
        this.$http.get('/yii/logistics/driver/querydriverdata', {
          params: {
            DRIVERNAME: inputname,
            SEX:inputsex,
            AGE:inputage,
            IDNUMBER:inputidentity,
            TEL:inputtel,
          }
        }).then(res => {
          console.log(res.data.data);
          this.driverinfo = res.data.data[0];
          this.totlepage=res.data.data[1];
          this.outInfo=res.data.data[2];
        }).catch(function (error) {
          console.log(error);
        });
      },
      driversheduleview(driverInfoId){
        console.log(driverInfoId);
        let that=this;
        this.$http.post('/yii/logistics/driver/getdriverschedule',{ID:driverInfoId}).then(function (res) {
          console.log(res.data);
          that.scheduleInfo=[];
          that.scheduleInfo=res.data.data[0];
          that.busInfo=res.data.data[2];
          that.flag1=1;
        }).catch(function (error) {
          console.log(error);
        });
      },
      sort(inputname,inputsex,inputage,inputidentity,inputtel,timequantum,sortType){
        this.sortType=sortType;
        if(sortType==1||sortType==2){
          this.driverSort=!this.driverSort;
          this.sexSort=true;
          this.ageSort=true;
          this.telSort=true;
          this.identitySort=true;
        }else if(sortType==3||sortType==4){
          this.sexSort=!this.sexSort;
          this.driverSort=true;
          this.ageSort=true;
          this.telSort=true;
          this.identitySort=true;
        }else if(sortType==5||sortType==6){
          this.ageSort=!this.ageSort;
          this.driverSort=true;
          this.sexSort=true;
          this.telSort=true;
          this.identitySort=true;
        }else if(sortType==7||sortType==8){
          this.identitySort=!this.identitySort;
          this.driverSort=true;
          this.sexSort=true;
          this.ageSort=true;
          this.telSort=true;
        }else if(sortType==9||sortType==10){
          this.telSort=!this.telSort;
          this.driverSort=true;
          this.sexSort=true;
          this.ageSort=true;
          this.identitySort=true;
        }
        this.$http.get('/yii/logistics/driver/querydriverdata', {
          params: {
            DRIVERNAME: inputname,
            SEX:inputsex,
            AGE:inputage,
            IDNUMBER:inputidentity,
            TEL:inputtel,
            sortType:this.sortType,
            page:1
          }
        }).then(res => {
          this.currentpage=1;
          this.driverinfo = res.data.data[0];
          this.totlepage=res.data.data[1];
          this.outInfo=res.data.data[2];
        })
      },
      pageChange: function(inputname,inputsex,inputage,inputidentity,inputtel,page){//分页
        console.log(inputname);
        console.log(page);
        if (this.currentpage!=page) {
          this.currentpage=page;
        }
        this.$http.get('/yii/logistics/driver/querydriverdata', {
          params: {
            DRIVERNAME: inputname,
            SEX:inputsex,
            AGE:inputage,
            IDNUMBER:inputidentity,
            TEL:inputtel,
            sortType:this.sortType,
            page:page
          }
        }).then(res => {
          this.driverinfo = res.data.data[0];
          this.totlepage=res.data.data[1];
          this.outInfo=res.data.data[2];
        }).catch(function (error) {
          console.log(error);
        });
      },
      prepage:function(inputname,inputsex,inputage,inputidentity,inputtel,page){//下一页
        page--;
        if (this.currentpage!=page) {
          this.currentpage=page;
        }
        this.$http.get('/yii/logistics/driver/querydriverdata', {
          params: {
            DRIVERNAME: inputname,
            SEX:inputsex,
            AGE:inputage,
            IDNUMBER:inputidentity,
            TEL:inputtel,
            sortType:this.sortType,
            page:page
          }
        }).then(res => {
          this.driverinfo = res.data.data[0];
          this.totlepage=res.data.data[1];
          this.outInfo=res.data.data[2];
        }).catch(function (error) {
          console.log(error);
        });
      },
      nextpage:function(inputname,inputsex,inputage,inputidentity,inputtel,page){//下一页
        page++;
        if (this.currentpage!=page) {
          this.currentpage=page;
        }
        console.log(page);
        let that=this;
        this.$http.get('/yii/logistics/driver/querydriverdata', {
          params: {
            DRIVERNAME: inputname,
            SEX:inputsex,
            AGE:inputage,
            IDNUMBER:inputidentity,
            TEL:inputtel,
            sortType:this.sortType,
            page:page
          }
        }).then(res => {
          this.driverinfo = res.data.data[0];
          this.totlepage=res.data.data[1];
          this.outInfo=res.data.data[2];
        }).catch(function (error) {
          console.log(error);
        });
      },
    },
    components: {
      'date-picker': myDatepicker
    },
    mounted() {
      this.getpagedata();
    },
    computed: {
      pagenums: function(){//分页
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

</style>
