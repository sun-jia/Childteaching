<template>
  <div class="display1">
    <router-link to="/meetlist"><button class="btn1 btn2"  >会议准备</button></router-link>
    <button class="btn1 btn2"   v-bind:class="{ active: isActive }" >会议筹备</button>
    <router-link to="/meetlist/Progress"><button class="btn1 btn2"  >进行会议</button></router-link>
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
              会议ID
            </th>
            <th>
              会议名称
            </th>
            <th>
              <div class="block" >
                <el-date-picker
                  v-model="startDate"
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
                <i v-show="startDateSort" class="sort icon-paixushengxu"  v-on:click="startDateUp()"></i>
                <i v-show="!startDateSort" class="sort icon-paixujiangxu"  v-on:click="startDateDown()"></i>
              </div>
            </th>
            <th>
              <div class="block" >
                <el-date-picker
                  v-model="endDate"
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
                <i v-show="endDateSort" class="sort icon-paixushengxu"  v-on:click="endDateUp()"></i>
                <i v-show="!endDateSort" class="sort icon-paixujiangxu"  v-on:click="endDateDown()"></i>
              </div>
            </th>
            <th>会议信息添加</th>
          </tr>
          <tr v-for="item in conference" :ket="item.conferenceID">
            <td>{{item.conferenceID}}</td>
            <td>{{item.conferenceName}}</td>
            <td>{{item.conferenceDate}}</td>
            <td>{{item.conferenceEndDate}}</td>
            <td style="color:#00AAFF;">
              <router-link :to="{ name:'addBeforeInfor', params:{ meetId: item.conferenceID}}">
                编辑
              </router-link>
            </td>
          </tr>
        </table>

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
    import { mapGetters } from 'vuex'
    export default {
      name: "prepare",
      data(){
        return{
          isActive: true,
          list:[],//用于检索会议名称
          options: [],//检索结果存放
          inputmeet:'',//检索关键字
          loading: false,//检索时候的等待状态

          conference:[
            // {
            //   conferenceID:1001,
            //   conferenceName:'会议1',
            //   conferenceDate:'2018-01-24'
            // }
          ],
          // conferenceid:'',
          // logCurrentpage:1,//当前页
          logisticsForm: {
            hotels:[],
            restaurants:[],
            cars:[],
            dirvers:[],
          },
          // formLabelWidth: '120px',
          // hotelShow:true,
          // resShow:false,
          // dirverShow:false,
          // carShow:false,

          //时间插件的格式样式属性控制
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
          currentpage: 1,//当前页
          totlepage: 28,//总页数
          visiblepage: 10,//可见页数

          startDateSort: true,//日期排序的图标显示
          endDateSort: true,//日期排序的图标显示
          type: 'id',//排序类型，默认日期降序，2为日期升序
          sort:"asc",//排序类别

          startDate:'',
          endDate:'',
        }
      },
      methods:{
        //取消
        concel:function(){

        },
        //确定
        submit:function(){

        },
        startDateUp:function () {//日期升序
          this.type='startDate';
          this.startDateSort=!this.startDateSort;
          this.sort="asc";
          this.getMeetList();
        },
        startDateDown:function () {//日期降序
          this.type='startDate';
          this.startDateSort=!this.startDateSort;
          this.sort="desc";
          this.getMeetList();
        },
        endDateUp:function () {//日期升序
          this.type='endDate';
          this.endDateSort=!this.endDateSort;
          this.sort="asc";
          this.getMeetList();
        },
        endDateDown:function () {//日期降序
          this.type='endDate';
          this.endDateSort=!this.endDateSort;
          this.sort="desc";
          this.getMeetList();
        },
        pageChange: function(page){//分页
          if (this.currentpage != page) {
            this.currentpage = page;
            this.getMeetList();
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(this.currentpage );
        },
        prepage:function(page){//上一页
          page--;
          if (this.currentpage != page) {
            this.currentpage = page;
            this.getMeetList();
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
        },
        nextpage:function(page){//下一页
          page++;
          if (this.currentpage != page) {
            this.currentpage = page;
            this.getMeetList();
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
        getMeetList (page,type,kind) {
          let data={
            userId:this.$store.getters.getUser,
            kind:1,
            page:this.currentpage,
            sortType:this.type,
            sortKind:this.sort
          };
          this.conference=[];
          this.$http.post('/yii/meetlist/index/get-meet-list',data)
            .then((res) => {
              if(res.data.data!=null){
                let model=res.data.data.models;
                this.currentpage=res.data.data.page;
                this.totlepage=res.data.data.total;
                for(let item in model){
                  this.conference.push({
                      conferenceID:model[item].id,
                      conferenceName:model[item].name,
                      conferenceDate:model[item].startDate,
                      conferenceEndDate:model[item].endDate
                  })
                  this.list.push({ value: model[item].id, label: model[item].name });
                }
              }else{
                alert(res.data.message);
              }
            }, (err) => {
              console.log(err)
            })
        }
      },
      mounted() {
        this.getMeetList();
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
        ...mapGetters([
          'getUser',
        ])
      }
    }

</script>

<style scoped>
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
    padding:15px;
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
