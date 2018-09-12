<template>
  <div class="display1">
    <button class="btn1 "  v-bind:class="{ active: isActive }">已经发布</button>
    <router-link to="/meetlist/History"><button class="btn1 btn2"  >历史会议</button></router-link>
    <div class="display2">
      <div>
        <div class="meeting" >
          <span style="color:#fff;">搜索会议：</span>
          <el-select
            v-model="inputmeet"
            filterable
            multiple
            remote
            reserve-keyword
            size="small"
            placeholder="请输入会议关键词"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <button class="btn3 icon-sousuo" v-on:click="search()">搜索</button>
        </div>
          <table id="moneyStatistics">
            <tr>
              <th>
                会议名称
              </th>
              <th>会议ID
                <input class="input1" v-model="conferenceid" placeholder="输入会议ID" style="font-size:14px;width:120px;font-weight:lighter;">
              </th>
              <th>
                <div class="block" >
                  <span class="demonstration">会议日期</span>
                  <el-date-picker
                    v-model="value"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    size="small"
                    format="yyyy-MM-dd HH:mm:ss "
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                  <i v-show="datesort" class="sort icon-paixushengxu"  v-on:click="dateup()"></i>
                  <i v-show="!datesort" class="sort icon-paixujiangxu"  v-on:click="datedown()"></i>
                </div>
              </th>
              <th>会议宣传</th>
              <th>后勤管理</th>
              <th>财务管理</th>
            </tr>
            <tr v-for="item in conference">
              <td>{{item.conferenceID}}</td>
              <td>{{item.conferenceName}}</td>
              <td>{{item.conferenceDate}}</td>
              <td style="color:#00AAFF;">添加</td>
              <td style="color:#00AAFF;"><el-button type="text" @click="dialogFormVisible = true">添加 </el-button></td>
              <td style="color:#00AAFF;">查看</td>
            </tr>
          </table>

        <el-dialog title="添加后勤信息" :visible.sync="dialogFormVisible">
          <el-form :model="logisticsForm">
            <div>
                <button class="btn5" v-on:click="hotelsShow" v-bind:class="{ activeTwo: isActiveOne }">酒店</button>
                <button class="btn4"  v-on:click="restaurantsShow" v-bind:class="{ activeTwo: isActiveTwo }">餐厅</button>
                <button class="btn4" v-on:click="dirversShow" v-bind:class="{ activeTwo: isActiveThree }">司机</button>
                <button class="btn6" v-on:click="carsShow" v-bind:class="{ activeTwo: isActiveFour }">车辆</button>
              <div class="dirverAdd" v-show="dirverShow">
                <span class="search icon-sousuo">
                  <input class="input2 " v-model="hotelInfor" placeholder="输入关键词" style="font-size:14px;width:120px;font-weight:lighter;">
                 </span>
                  <br>
                <el-table
                  ref="multipleTableOne"
                  :data="dirvers"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="dirverHandleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="tel"
                    label="联系方式"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                  <el-button @click="toggleSelectionOne()" style="margin-left:10px;">取消选择</el-button>
                </div>
                <div class="page">
                  <ul class="pagination pagination-sm"><!--分页-->
                    <li class="page-item" v-if="logCurrentpage!=1"><a class="page-link" href="#" v-on:click="prepageLog(logCurrentpage)">上一页</a></li>
                    <li class="page-item" v-for="index in pagenumsLog" v-bind:class="{ active: logCurrentpage == index} ">
                      <a class="page-link" href="#" v-on:click="pageChangeLog(index)">{{index}}</a>
                    </li>
                    <li class="page-item" v-if="logCurrentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpageLog(logCurrentpage)">下一页</a></li>
                    <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
                  </ul>
                </div>
              </div>
              <!--{{this.logisticsForm.dirvers}}-->

              <div class="resAdd" v-show="resShow">
                <span class="search icon-sousuo">
                  <input class="input2 " v-model="resInfor" placeholder="输入关键词" style="font-size:14px;width:120px;font-weight:lighter;">
                 </span>
                <br>
                <el-table
                  ref="multipleTableTwo"
                  :data="restaurants"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="resHandleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="饭店名称"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="tel"
                    label="联系方式"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                  <!--<el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>-->
                  <el-button @click="toggleSelectionTwo()" style="margin-left:10px;">取消选择</el-button>
                </div>
                <div class="page">
                  <ul class="pagination pagination-sm"><!--分页-->
                    <li class="page-item" v-if="logCurrentpage!=1"><a class="page-link" href="#" v-on:click="prepageLog(logCurrentpage)">上一页</a></li>
                    <li class="page-item" v-for="index in pagenumsLog" v-bind:class="{ active: logCurrentpage == index} ">
                      <a class="page-link" href="#" v-on:click="pageChangeLog(index)">{{index}}</a>
                    </li>
                    <li class="page-item" v-if="logCurrentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpageLog(logCurrentpage)">下一页</a></li>
                    <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
                  </ul>
                </div>
              </div>
              <!--{{this.logisticsForm.restaurants}}-->

              <div class="hotelAdd" v-show="hotelShow">
                <span class="search icon-sousuo">
                  <input class="input2 " v-model="hotelInfor" placeholder="输入关键词" style="font-size:14px;width:120px;font-weight:lighter;">
                 </span>
                <br>
                <el-table
                  ref="multipleTableThree"
                  :data="hotels"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="hotelHandleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="酒店名称"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="tel"
                    label="联系方式"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                  <!--<el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>-->
                  <el-button @click="toggleSelectionThree()" style="margin-left:10px;">取消选择</el-button>
                </div>
                <div class="page">
                  <ul class="pagination pagination-sm"><!--分页-->
                    <li class="page-item" v-if="logCurrentpage!=1"><a class="page-link" href="#" v-on:click="prepageLog(logCurrentpage)">上一页</a></li>
                    <li class="page-item" v-for="index in pagenumsLog" v-bind:class="{ active: logCurrentpage == index} ">
                      <a class="page-link" href="#" v-on:click="pageChangeLog(index)">{{index}}</a>
                    </li>
                    <li class="page-item" v-if="logCurrentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpageLog(logCurrentpage)">下一页</a></li>
                    <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
                  </ul>
                </div>
              </div>
              <!--{{this.logisticsForm.hotels}}-->

              <div class="carAdd" v-show="carShow">
                <span class="search icon-sousuo">
                  <input class="input2 " v-model="carInfor" placeholder="输入关键词" style="font-size:14px;width:120px;font-weight:lighter;">
                 </span>
                <br>
                <el-table
                  ref="multipleTableFour"
                  :data="cars"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="carHandleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="车名"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="tel"
                    label="联系方式"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                  <!--<el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>-->
                  <el-button @click="toggleSelectionFour()" style="margin-left:10px;">取消选择</el-button>
                </div>
                <div class="page">
                  <ul class="pagination pagination-sm"><!--分页-->
                    <li class="page-item" v-if="logCurrentpage!=1"><a class="page-link" href="#" v-on:click="prepageLog(logCurrentpage)">上一页</a></li>
                    <li class="page-item" v-for="index in pagenumsLog" v-bind:class="{ active: logCurrentpage == index} ">
                      <a class="page-link" href="#" v-on:click="pageChangeLog(index)">{{index}}</a>
                    </li>
                    <li class="page-item" v-if="logCurrentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpageLog(logCurrentpage)">下一页</a></li>
                    <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
                  </ul>
                </div>
              </div>
              <!--{{this.logisticsForm.cars}}-->
              <!--{{this.logisticsForm}}-->
            </div>
          </el-form>
          <!--{{logisticsForm.dirvers}}-->
          <!--{{form.checkedModels}}-->
          <!--{{form.duty}}-->
          <div slot="footer" class="dialog-footer">
            <el-button  type="info"  @click="concel()">取消</el-button>
            <el-button type="primary" v-on:click="submit()" >确定</el-button>
          </div>
        </el-dialog>

          <div class="page">
            <ul class="pagination pagination-sm"><!--分页-->
              <li class="page-item" v-if="currentpage!=1"><a class="page-link" href="#" v-on:click="prepage(currentpage)">上一页</a></li>
              <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage == index} ">
                <a class="page-link" href="#" v-on:click="pageChange(index)">{{index}}</a>
              </li>
              <li class="page-item" v-if="currentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage(currentpage)">下一页</a></li>
              <li class="page-item"><a class="page-link"  href="#" >共<i>{{totlepage}}</i>页</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data(){
          return{
            isActive: true,
            conference:[
              {
                conferenceID:1001,
                conferenceName:'会议1',
                conferenceDate:'2018-01-24'
             },
              {
                conferenceID:1002,
                conferenceName:'会议2',
                conferenceDate:'2017-10-02'
              },
              {
                conferenceID:1003,
                conferenceName:'会议31',
                conferenceDate:'2018-08-21'
              },
            ],
            dirvers:[
              {
                id:'001',
                name:'张三',
                tel:'10086',
              },
              {
                id:'002',
                name:'李四',
                tel:'10086',
              },
              {
                id:'003',
                name:'王五',
                tel:'10086',
              }
            ],
            restaurants:[
              {
                id:'001',
                name:'饭店一',
                tel:'10086',
              },
              {
                id:'002',
                name:'饭店二',
                tel:'10086',
              },
              {
                id:'003',
                name:'饭店三',
                tel:'10086',
              }
            ],
            hotels:[
              {
                id:'001',
                name:'酒店一',
                tel:'10086',
              },
              {
                id:'002',
                name:'酒店二',
                tel:'10086',
              },
              {
                id:'003',
                name:'酒店三',
                tel:'10086',
              }
            ],
            cars:[
              {
                id:'001',
                name:'汽车一',
                tel:'10086',
              },
              {
                id:'002',
                name:'汽车二',
                tel:'10086',
              },
              {
                id:'003',
                name:'汽车三',
                tel:'10086',
              }
            ],
            conferenceid:'',
            currentpage: 1,//当前页
            datesort: true,//日期排序
            // dirverChecked:['001','002','003'],//模拟司机编号
            // hotelChecked:['001','002','003'],//模拟酒店编号
            // resChecked:['001','002','003'],//模拟饭店编号
            // carChecked:['001','002','003'],//模拟汽车编号
            logCurrentpage:1,//当前页
            logisticsForm: {
              hotels:[],
              restaurants:[],
              cars:[],
              dirvers:[],
            // item:'',
          },
            formLabelWidth: '120px',
            hotelShow:true,
            isActive: true,
            isActiveOne: true,
            isActiveTwo: false,
            isActiveThree: false,
            isActiveFour: false,
            resShow:false,
            dirverShow:false,
            carShow:false,
            dirverInfor:'',//司机搜索
            resInfor:'',//饭店搜索
            hotelInfor:'',//酒店搜索
            carInfor:'',//汽车搜索
            inputmeet:'',
            loading: false,
            dialogFormVisible:false,
            options: [],
            pickerOptions: {
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
            states:["会议1","会议2","会议3","会议4","会议5","会议6","会议7"],
            totlepage: 28,//总页数
            type: 1,//排序类型，默认日期降序，2为日期升序
            value:'',
            visiblepage: 10,//可见页数
          }
      },
      methods:{
        hotelsShow:function(){
          this.hotelShow=true;
          this.resShow=false;
          this.dirverShow=false;
          this.carShow=false;
          this.isActiveOne= true;
          this.isActiveTwo= false;
          this.isActiveThree= false;
          this.isActiveFour= false;
          console.log(this.isActiveOne);
          console.log(this.isActiveTwo);
        },
        restaurantsShow:function(){
          this.hotelShow=false;
          this.resShow=true;
          this.dirverShow=false;
          this.carShow=false;
          this.isActiveOne= false;
          this.isActiveTwo= true;
          this.isActiveThree= false;
          this.isActiveFour= false;
          console.log(this.isActiveOne);
          console.log(this.isActiveTwo);
        },
        dirversShow:function(){
          this.hotelShow=false;
          this.resShow=false;
          this.dirverShow=true;
          this.carShow=false;
          this.isActiveOne= false;
          this.isActiveTwo= false;
          this.isActiveThree= true;
          this.isActiveFour= false;
          console.log(this.isActiveOne);
          console.log(this.isActiveTwo);
        },
        carsShow:function(){
          this.hotelShow=false;
          this.resShow=false;
          this.dirverShow=false;
          this.carShow=true;
          this.isActiveOne= false;
          this.isActiveTwo= false;
          this.isActiveThree= false;
          this.isActiveFour= true;
          console.log(this.isActiveOne);
          console.log(this.isActiveTwo);
        },
        //取消
        concel:function(){

       },
        //确定
        submit:function(){

        },
        dateup:function () {//日期升序
          this.type=2;
          console.log(this.type);
          this.datesort=!this.datesort;
          console.log(this.datesort);
        },
        datedown:function () {//日期降序
          this.type=1;
          this.datesort=!this.datesort;
          console.log(this.datesort);
        },
        pageChange: function(page){//分页
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(this.currentpage );
        },
        prepage:function(page){//上一页
          page--;
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
        },
        nextpage:function(page){//下一页
          page++;
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
        },
        pageChangeLog: function(page){//分页
          if (this.logCurrentpage != page) {
            this.logCurrentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(this.logCurrentpage );
        },
        prepageLog:function(page){//上一页
          page--;
          if (this.logCurrentpage != page) {
            this.logCurrentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
        },
        nextpageLog:function(page){//下一页
          page++;
          if (this.logCurrentpage != page) {
            this.logCurrentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
        },
        remoteMethod(query) {
          if (query !== '') {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options = this.list.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.options = [];
          }
        },
        //搜索
        search:function(){

        },
        //取消选中
        toggleSelectionOne(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTableOne.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTableOne.clearSelection();
          }
        },
        toggleSelectionTwo(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTableTwo.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTableTwo.clearSelection();
          }
        },
        toggleSelectionThree(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTableThree.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTableThree.clearSelection();
          }
        },
        toggleSelectionFour(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTableFour.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTableFour.clearSelection();
          }
        },
        //获得多选框选中的数据
        dirverHandleSelectionChange(val) {
          this.logisticsForm.dirvers = val;
        },
        resHandleSelectionChange(val) {
          this.logisticsForm.restaurants = val;
        },
        hotelHandleSelectionChange(val) {
          this.logisticsForm.hotels = val;
        },
        carHandleSelectionChange(val) {
          this.logisticsForm.cars = val;
        },

      },
      mounted() {
        this.list = this.states.map(item => {
          return { value: item, label: item };
        });
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
        },
        pagenumsLog: function(){//分页
          //初始化前后页边界
          let lowPage = 1;
          let highPage = this.totlepage;
          let pageArr = [];
          if(this.totlepage > this.visiblepage){//总页数超过可见页数时，进一步处理；
            let subVisiblePage = Math.ceil(this.visiblepage/2);
            if(this.logCurrentpage > subVisiblePage && this.logCurrentpage < this.totlepage - subVisiblePage +1){//处理正常的分页
              lowPage = this.logCurrentpage - subVisiblePage;
              highPage = this.logCurrentpage + subVisiblePage -1;
            }else if(this.logCurrentpage <= subVisiblePage){//处理前几页的逻辑
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
  .activeTwo{
    background: #1E7CCF;
  }
  .dirverAdd{
    border:1px solid #BFBFBF;
    border-radius: 8px;
  }
  .resAdd{
    border:1px solid #BFBFBF;
    border-radius: 8px;
  }
  .hotelAdd{
    border:1px solid #BFBFBF;
    border-radius: 8px;
  }
  .carAdd{
    border:1px solid #BFBFBF;
    border-radius: 8px;
  }
  .display1{
    /*padding-left:20px;*/
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
  table{
    border-collapse: collapse;
    width:95%;
    margin-top: 10px;
    margin-left: 0px;
  }
  th{
    font-size: 14px;
    border:solid 1px #ccc;
    font-weight: bold;
    padding:5px;
    background-color: #F1F1F1;
    text-align: center;
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
  .input2{
    float:right;
    border:1px solid #338FFC;
    border-radius: 5px;
    color:#000;
    width:190px;
  }
  .element.style {
    font-size: 14px;
    width: 190px;
    height: 30px;
    font-weight: lighter;
    margin-right: 10px;
  }
  .btn3{
    width:80px;
    padding:5px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#338FFC ;
    float: right;
    margin-left: 5px;
  }
  .btn4{
    width:80px;
    padding:5px;
    font-size: 16px;
    border-radius: 5px;
    border:1px solid #fff;
    color:white;
    background-color:#338FFC ;
    /*float: right;*/
    /*margin-left: 5px;*/
  }
  .btn4:hover{
    background-color:#1E7CCF;
  }
  .btn5{
    width:80px;
    padding:5px;
    font-size: 16px;
    border-radius: 5px;
    border:1px solid #fff;
    color:white;
    background-color:#338FFC ;
    /*float: right;*/
    /*margin-left: 5px;*/
  }
  .btn5:hover{
    background-color:#1E7CCF;
  }
  .btn6{
    width:80px;
    padding:5px;
    font-size: 16px;
    border-radius: 5px;
    border:1px solid #fff;
    color:white;
    background-color:#338FFC ;
    /*float: right;*/
    /*margin-left: 5px;*/
  }
  .btn6:hover{
    background-color:#1E7CCF;
  }
  .page{
    text-align: center;
  }
  /*.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{*/
    /*width:360px !important;*/
  /*}*/
  .search{
    /*width:160px;*/
    background-color: #00AAFF;
    border-radius: 5px;
    width: 20%;
    padding:5px;
    color:#fff;
    font-weight:bold;
    float:right;
    margin-right:10px;
    margin-bottom:10px;
    margin-top:5px;
  }
  .sort{
    color:#1C93FC;
  }
  .sort:hover{
    color:#5CB0FA;
  }
</style>
