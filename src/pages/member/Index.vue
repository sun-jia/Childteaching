<template>
  <div class="display1">
    <button class="btn1" v-bind:class="{ active: isActive }">成员信息列表</button>
    <router-link to="/member/add">
      <button class="btn1 ">成员添加</button>
    </router-link>
    <div class="display2">
      <div class="searchmem">
        <button class="btn3 icon-sousuo"
                v-on:click="searchmem()">
          搜索
        </button>
        <button class="btn3">添加成员</button>
        <button class="btn3">批量导入</button>
        <button type="button" class="btn4 icon-daochu" id="export-table" v-on:click="export2Excel()">
          导出
        </button>
      </div>
      <table id="memberStastics">
        <tr>
          <th>姓名 <input class="input1" v-model="inputname" placeholder="搜索姓名" style="font-size:12px;width:80px"></th>
          <th>用户名<input class="input1" v-model="inputusername" placeholder="搜索用户" style="font-size:12px;width:80px">
          </th>
          <th>职称</th>
          <th>性别<select v-model="sexselected" style="font-size:12px;">
            <option disabled value="">选择</option>
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
          </th>
          <th>部门<input class="input1" v-model="inputdepart" placeholder="搜索部门" style="font-size:12px;width:80px"></th>
          <th>职位<input class="input1" v-model="inputjob" placeholder="搜索职位" style="font-size:12px;width:80px"></th>
          <th>行政登记<input class="input1" v-model="inputadmin" placeholder="搜索权限" style="font-size:12px;width:80px"></th>
          <th>是否党员
            <select v-model="partyselected" style="font-size:12px;">
              <option disabled value="">选择</option>
              <option value="1">是</option>
              <option value="2">否</option>
            </select></th>
          <th>
            <div class="block">
              <span class="demonstration">入党日期</span>
            </div>
          </th>
          <th>备注</th>
        </tr>
        <tr v-for=" member in memberList">
          <td>{{member.NAME}}</td>
          <td>{{member.USER}}</td>
          <td>{{ member.RANK }}</td>
          <td v-if='member.SEX==1'>男</td>
          <td v-if='member.SEX==2'>女</td>
          <td>{{member.DEPARTMENT}}</td>
          <td>{{member.JOB}}</td>
          <td>{{member.ADMINLEVEL}}</td>
          <td v-if='member.ISPARTY==1'>是</td>
          <td v-if='member.ISPARTY==2'>否</td>
          <td>{{member.TIMES}}</td>
          <td>
            <router-link :to="{ name: 'memberInfor', params: { data: member }}">
              详情
            </router-link>
          </td>
        </tr>
      </table>
      <div class="page">
        <ul class="pagination pagination-sm"><!--分页-->
          <li class="page-item" v-if="currentpage!=1">
            <span class="page-link"  v-on:click="prepage(currentpage)">上一页</span>
          </li>
          <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage == index} ">
            <span class="page-link"  v-on:click="pageChange(index)">{{ index }}</span>
          </li>
          <li class="page-item" v-if="currentpage!=totalpage">
            <span class="page-link"  v-on:click="nextpage(currentpage)">下一页</span>
          </li>
          <li class="page-item">
            <span class="page-link">共<i>{{totalpage}}</i>页</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        memberList: [],
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
        //基本信息相关
        inputname: '',//姓名
        inputusername: '',//用户名
        rankselected: '',//职称
        sexselected: '',//性别
        inputdepart:"",//部门
        inputjob: '',//职位
        inputadmin: '',//行政级别
        partyselected: '',//是否为党员
        times: [],//入党时间

        //用于切换分页
        isActive: true,
        //翻页相关
        currentpage: 1,
        totalpage: 1,
        visiblepage: 10,
        //排序相关
        sortType:"",//排序类型，默认日期降序，2为日期升序
        sortKind:"asc",

        //时间检索相关
        endTime: '',
        startTime: '',
      }
    },
    mounted() {
      this.getMemberData();
    },

    //方法中可以设置数据处理和数据的获取等等
    methods: {
      getMemberData:function(){
        if (this.times.length != 0) {
          this.startTime = this.times[0];
          this.endTime = this.times[1];
        }
        let fd = new FormData();
        fd.append('page', this.currentpage);//传当前页
        fd.append('NAME', this.inputname);//传姓名
        fd.append('USER', this.inputusername);//传用户名
        fd.append('RANK', this.rankselected);//传等级
        fd.append('SEX', this.sexselected);//传性别
        fd.append('DEPARTMENT', this.inputdepart);//传部门
        fd.append('JOB', this.inputjob);//传工作
        fd.append('ADMINLEVEL', this.inputadmin);//传权限
        fd.append('ISPARTY', this.partyselected);//传入党
        fd.append('STARTDATE', this.startTime);//传开始时间
        fd.append('ENDDATE', this.endTime);//传结束时间
        // fd.append('type', this.type);//传类型
        this.$http.post('/yii/member/member/getmemberdata', fd).then(body => {
          console.log(body.data);
          this.memberList = body.data.data.pageall;
          this.totalpage = body.data.data.totalpage;
        })
      },
      searchmem: function () {
        this.getMemberData();
      },
      pageChange: function (page) {//分页
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.getMemberData();
      },
      prepage: function (page) {//上一页
        page--;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.getMemberData();
      },
      nextpage: function (page) {//下一页
        page++;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.getMemberData();
      },
      export2Excel() {
        if (this.times.length != 0) {
          this.startTime = this.times[0];
          this.endTime = this.times[1];
        }
        let fd = new FormData();
        fd.append('page', this.currentpage);//传当前页
        fd.append('NAME', this.inputname);//传姓名
        fd.append('USER', this.inputusername);//传用户名
        fd.append('RANK', this.rankselected);//传等级
        fd.append('SEX', this.sexselected);//传性别
        fd.append('DEPARTMENT', this.inputdepart);//传部门
        fd.append('JOB', this.inputjob);//传工作
        fd.append('ADMINLEVEL', this.inputadmin);//传权限
        fd.append('ISPARTY', this.partyselected);//传入党
        fd.append('STARTDATE', this.startTime);//传开始时间
        fd.append('ENDDATE', this.endTime);//传结束时间
        // fd.append('type', this.type);//传类型
        this.$http.post('/yii/member/member/getmemberdata', fd).then(body => {
          this.excelData = body.data.data.pageall;
          console.log(this.excelData);
          require.ensure([], () => {
            const {export_json_to_excel} = require('@/excel/Export2Excel.js');//引入文件
            const tHeader = ['姓名', '用户名', '等级', '性别', '部门', '职位', '权限', '党员', '日期'];
            // 上面设置Excel的表格第一行的标题
            const filterVal = ['NAME', 'USER', 'RANK', 'SEX', 'DEPARTMENT', 'JOB', 'ADMINLEVEL', 'ISPARTY', 'TIMES'];
            // 上面的index、phone_Num、school_Name是tableData里对象的属性
            const list = this.excelData;  //把data里的tableData存到list
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '成员信息表单');
          })
        })
      },
      formatJson(filterVal, jvp) {
        return jvp.map(v => filterVal.map(j => v[j]));
      },
    },
    computed: {
      //计算属性：返回页码数组，这里会自动进行脏检查，不用$watch();
      pagenums: function () {//分页
        //初始化前后页边界
        let lowPage = 1;
        let highPage = this.totalpage;
        let pageArr = [];
        if (this.totalpage > this.visiblepage) {//总页数超过可见页数时，进一步处理；
          let subVisiblePage = Math.ceil(this.visiblepage / 2);
          if (this.currentpage > subVisiblePage && this.currentpage < this.totalpage - subVisiblePage + 1) {//处理正常的分页
            lowPage = this.currentpage - subVisiblePage;
            highPage = this.currentpage + subVisiblePage - 1;
          } else if (this.currentpage <= subVisiblePage) {//处理前几页的逻辑
            lowPage = 1;
            highPage = this.visiblepage;
          } else {//处理后几页的逻辑
            lowPage = this.totalpage - this.visiblepage + 1;
            highPage = this.totalpage;
          }
        }
        //确定了上下page边界后，要准备压入数组中了
        while (lowPage <= highPage) {
          pageArr.push(lowPage);
          lowPage++;
        }
        return pageArr;
      }
    }
  }
</script>

<style scoped>
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;

  }

  th {
    font-size: 14px;
    border: solid 1px #ccc;
    font-weight: bold;
    padding: 5px;
    background-color: #F1F1F1;

  }

  table, td {
    border: solid 1px #ccc;
    padding: 5px;
    text-align: center;
    font-size: 14px;
  }

  .display1 {
    padding-left: 5px;
    padding-top: 10px;
  }

  .display2 {
    border: solid 2px #e0e0e0;
    height: 500px;
    /*text-align: center;*/
    width: 98%;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #fff;
  }

  .sort {
    color: #1C93FC;
  }

  .sort:hover {
    color: #5CB0FA;
  }

  .btn1 {
    font-size: 18px;
    padding: 10px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    color: #000;
    width: 150px;
    /*margin-right: 0px;*/
  }

  .btn1:hover {
    background: #e0e0e0;
  }

  .input-class {

    width: 150px;
    height: 30px;

  }

  .active {
    background: #e0e0e0;
  }

  .btn2 {
    margin-left: 0px;
  }

  .btn3 {
    width: 80px;
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: #338FFC;
    float: left;
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .btn3:hover {
    background-color: #5FA7FE;
  }

  .btn4 {
    width: 90px;
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: #FA4E28;
    float: left;
    margin-left: 15px;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .btn4:hover {
    background-color: #FC6F4F;
  }

  .page {
    text-align: center;
  }

</style>

