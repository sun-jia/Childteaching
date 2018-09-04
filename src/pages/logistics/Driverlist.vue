<template>
  <div class="display1">
    <router-link  to="/logistics/bus"> <button class="btn1 " >车辆管理</button></router-link>
    <button class="btn1 btn2"  v-bind:class="{ active: isActive }">司机管理</button>
    <router-link  to="/logistics/Travelrecord"> <button class="btn1 " >出行记录</button></router-link>
    <div class="display2">
      <table>
        <tr>
          <th style="width: 40px">序号</th>
          <th style="width: 30px">姓名
            <br/>
            <input class="input1" v-model="inputname" placeholder="搜索" style="font-size:14px;">
          </th>
          <th style="width: 25px">性别
            <br/>
            <select v-model="inputsex"  style="font-size:14px;">
              <option disabled value="">选择</option>
              <option value="0" >男</option>
              <option value="1">女</option>
            </select>
          </th>
          <th style="width: 30px">年龄
            <br/>
            <input class="input1" v-model="inputage" placeholder="搜索" style="font-size:14px;">
          </th>
          <th style="width: 180px">身份证号
            <input  v-model="inputidentity" placeholder="搜索" style="font-size:14px;width:180px;">
          </th>
          <th style="width: 180px">电话号码
            <input  v-model="inputidentity" placeholder="搜索" style="font-size:14px;width:180px;">
          </th>
          <th style="width: 120px">行程安排
           <div class="block;">
               <el-date-picker style="width: 220px" size="small" v-model="timequantum" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
               </el-date-picker>
           </div>
          </th>
          <th style="width: 50px">修改</th>
          <th style="width: 50px">删除</th>
        </tr>
        <tr v-if="flag==0" v-for="(driver,index) in driverinfo">
          <td>{{(currentpage-1)*8+index+1}}</td>
          <td>{{driver.DRIVERNAME}}</td>
          <td v-if='driver.SEX==0'>男</td>
          <td v-if='driver.SEX==1'>女</td>
          <td>{{driver.AGE}}</td>
          <td>{{driver.IDNUMBER}}</td>
          <td>{{driver.TEL}}</td>
          <td v-if="driver.OUTTIME==null">暂无行程</td>
          <td v-if="driver.OUTTIME!=null">
            {{driver.OUTTIME}}
            <el-popover placement="right" width="400" trigger="click">
              <table v-if="flag1==1">
                <tr>
                  <td>车牌号</td>
                  <td>{{driverschedule[2]['PLATENUM']}}</td>
                </tr>
                <tr>
                  <td>
                    使用日期:
                  </td>
                  <td>{{driverschedule[0]['USEDATA']}}</td>
                </tr>
                <tr>
                  <td>
                    使用原因:
                  </td>
                  <td>{{driverschedule[0]['USEREASON']}}</td>
                </tr>
                <tr>
                  <td>
                    出行地点:
                  </td>
                  <td>{{driverschedule[0]['OUTPLACE']}}</td>
                </tr>
                <tr>
                  <td>
                    出行司机:
                  </td>
                  <td>{{driverschedule[1]['DRIVERNAME']}}</td>
                </tr>
                <tr>
                  <td>
                    司机电话:
                  </td>
                  <td>{{driverschedule[1]['TEL']}}</td>
                </tr>
                <tr>
                  <td>
                    乘客人数:
                  </td>
                  <td>{{driverschedule[0]['PASSAGENUM']}}</td>
                </tr>
                <tr>
                  <td>
                    安排者:
                  </td>
                  <td>{{driverschedule[0]['ARRANGERID']}}</td>
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
        <tr v-if="flag==1" v-for="(driver,index) in driverinfo">
          <td>{{(currentpage1-1)*8+index+1}}</td>
          <td>{{driver.DRIVERNAME}}</td>
          <td v-if='driver.SEX==0'>男</td>
          <td v-if='driver.SEX==1'>女</td>
          <td>{{driver.AGE}}</td>
          <td>{{driver.IDNUMBER}}</td>
          <td>{{driver.TEL}}</td>
          <td v-if="driver.OUTTIME==null">暂无行程</td>
          <td v-if="driver.OUTTIME!=null">
            {{driver.OUTTIME}}
            <el-popover placement="right" width="400" trigger="click">
              <table v-if="flag1==1">
                <tr>
                  <td>车牌号</td>
                  <td>{{driverschedule[2]['PLATENUM']}}</td>
                </tr>
                <tr>
                  <td>
                    使用日期:
                  </td>
                  <td>{{driverschedule[0]['USEDATA']}}</td>
                </tr>
                <tr>
                  <td>
                    使用原因:
                  </td>
                  <td>{{driverschedule[0]['USEREASON']}}</td>
                </tr>
                <tr>
                  <td>
                    出行地点:
                  </td>
                  <td>{{driverschedule[0]['OUTPLACE']}}</td>
                </tr>
                <tr>
                  <td>
                    出行司机:
                  </td>
                  <td>{{driverschedule[1]['DRIVERNAME']}}</td>
                </tr>
                <tr>
                  <td>
                    司机电话:
                  </td>
                  <td>{{driverschedule[1]['TEL']}}</td>
                </tr>
                <tr>
                  <td>
                    乘客人数:
                  </td>
                  <td>{{driverschedule[0]['PASSAGENUM']}}</td>
                </tr>
                <tr>
                  <td>
                    安排者:
                  </td>
                  <td>{{driverschedule[0]['ARRANGERID']}}</td>
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
          <button class="btn3 icon-sousuo" v-on:click="search(inputname,inputsex,inputage,inputidentity,inputtel,timequantum,flag)">搜索</button>
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
          <li class="page-item" v-if="currentpage1!=1"><a class="page-link" href="#" v-on:click="prepage1(inputname,inputsex,inputage,inputidentity,inputtel,currentpage1)">上一页1</a></li>
          <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage1 == index} ">
            <a class="page-link" href="#" v-on:click="pageChange1(inputname,inputsex,inputage,inputidentity,inputtel,index)">{{index}}</a>
          </li>
          <li class="page-item" v-if="currentpage1!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage1(inputname,inputsex,inputage,inputidentity,inputtel,currentpage1)">下一页1</a></li>
          <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import myDatepicker from 'vue-datepicker2'; //引入对应的组件
  export default {
    name: 'invoice',
    data() {
      return {
        driverinfo: [],
        driverschedule:[],
        inputname: '',//输入姓名
        inputsex: '',//输入性别
        inputage: '',//输入年龄
        inputidentity: '',//输入身份证号
        inputtel: '',//输入电话号码
        flag:0,
        flag1:0,
        visible2: false,
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
      getpagedata:function(){
        let that=this;
        this.$http.get('/yii/logistics/driver/page?page=1').then(function (res) {
          console.log(res.data.data[0]);
          that.driverinfo=res.data.data[0];
          that.totlepage=res.data.data[1];
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
        let that=this;
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
            TEL:inputtel
          }
        }).then(res => {
          console.log(res.data.data);
          this.driverinfo = res.data.data[0];
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
        this.$http.get('/yii/logistics/driver/page',{
          params: {
            page: page
          }
        }).then(function (res) {
          console.log(res.data.data);
          that.driverinfo=res.data.data[0];
          that.totlepage=res.data.data[1];
        })
      },
      pageChange1: function(inputname,inputsex,inputage,inputidentity,inputtel,page){//分页
        console.log(inputname);
        console.log(page);
        if (this.currentpage1 != page) {
          this.currentpage1 = page;
          // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
        }
        let that=this;
        this.$http.get('/yii/logistics/driver/querydriverdata', {
          params: {
            DRIVERNAME: inputname,
            SEX:inputsex,
            AGE:inputage,
            IDNUMBER:inputidentity,
            TEL:inputtel,
            page:page
          }
        }).then(res => {
          console.log(res.data.data);
          this.driverinfo = res.data.data[0];
          this.totlepage=res.data.data[1];
        }).catch(function (error) {
          console.log(error);
        });
      },
      prepage:function(page){//上一页
        page--;
        if (this.currentpage != page) {
          this.currentpage = page;
          // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
        }
        console.log(page);
        let that=this;
        this.$http.get('/yii/logistics/driver/page',{
          params: {
            page: page
          }
        }).then(function (res) {
          console.log(res.data.data);
          that.driverinfo=res.data.data[0];
          that.totlepage=res.data.data[1];
        })
      },
      prepage1:function(inputname,inputsex,inputage,inputidentity,inputtel,page){//下一页
        page--;
        if (this.currentpage1 != page) {
          this.currentpage1 = page;
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
            page:page
          }
        }).then(res => {
          console.log(res.data.data);
          this.driverinfo = res.data.data[0];
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
        this.$http.get('/yii/logistics/driver/page',{
          params: {
            page: page
          }
        }).then(function (res) {
          console.log(res.data.data);
          that.driverinfo=res.data.data[0];
          that.totlepage=res.data.data[1];
        })
      },
      nextpage1:function(inputname,inputsex,inputage,inputidentity,inputtel,page){//下一页
        page++;
        if (this.currentpage1 != page) {
          this.currentpage1 = page;
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
            page:page
          }
        }).then(res => {
          console.log(res.data.data);
          this.driverinfo = res.data.data[0];
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
