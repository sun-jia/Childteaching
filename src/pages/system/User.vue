<template>
  <div class="display1">
    <button class="btn1 active">用户管理</button>
    <div class="display2">
      <div class="col-md-12">
        <div>
          <div class="user">
            <span style="color:#fff;">搜索用户：</span>
            <input v-model="inputname" placeholder="输入用户名称" style="font-size:14px;width:300px;font-weight:lighter">
          </div>
          <button class="btn3 icon-sousuo" v-on:click="searchuserlist()">
            搜索
          </button>
          <button type="button" class="btn4 icon-daochu" id="export-table" v-on:click="export2Excel()">导出
          </button>
          <router-view/>
          <table id="userStatistics">
            <tr>
              <th>用户名
                <input class="input" v-model="inputuser" placeholder="搜索用户" style="font-size:14px;">
              </th>
              <th>姓名
                <input class="input" v-model="inputname" placeholder="搜索姓名" style="font-size:14px;">
              </th>
              <th>性别
                <select v-model="sexselected" style="font-size:14px;">
                  <option disabled value="">选择</option>
                  <option value="1">男</option>
                  <option value="2">女</option>
                  <option value="null">空</option>
                </select>
              </th>
              <th>年龄
                <input class="input" v-model="inputage" placeholder="输入年龄" style="font-size:14px;">
                <i v-show="agesort" class="sort icon-paixushengxu" v-on:click="ageup()"></i>
                <i v-show="!agesort" class="sort icon-paixujiangxu" v-on:click="agedown()"></i>
              </th>
              <th>手机号
                <input class="input" v-model="cardid" placeholder="输入手机号" style="font-size:14px;width:120px">
              </th>
              <th>备注</th>
              <th>删除用户</th>
            </tr>
            <tr v-for="user in userList">
              <td>{{user.USER}}</td>
              <td>{{user.NAME}}</td>
              <td>{{user.SEX}}</td>
              <td>{{user.AGE}}</td>
              <td>{{user.CARDID}}</td>
              <td>{{user.REMARKS}}</td>
              <td>
                <span v-on:click="deletechange(user.USER)"><i class="delete icon-changyonggoupiaorenshanchu"></i></span>
              </td>
            </tr>
          </table>
          <div class="page">
            <ul class="pagination pagination-sm"><!--分页-->
              <li class="page-item" v-if="currentpage!=1">
                <a class="page-link" href="#" v-on:click="prepage()">上一页</a>
              </li>
              <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage == index} ">
                <a class="page-link" href="#" v-on:click="pageChange(index)">{{index}}</a>
              </li>
              <li class="page-item" v-if="currentpage!=totlepage"><a class="page-link" href="#" v-on:click="nextpage()">下一页</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">共<i>{{totlepage}}</i>页</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {
        //用户列表
        userList: [
          {
            USER:1,
            NAME:"陈1",
            SEX:"男",
            AGE:12,
            CARDID:1,
            REMARKS:""
          }
        ],
        //导出数据
        excelData: [],
        //用户属性
        cardid: '',
        inputuser: '',
        inputname: '',//输入姓名
        sexselected: '',//输入性别
        inputage: '',//输入年龄
        inputcardid: '',//输入手机号
        inputremarks: '',//输入备注
        //时间检索
        startTime: '',
        endTime: '',
        //排序相关
        datesort: true,//日期排序
        agesort: true,//金额排序
        type: 4,//排序类型，默认日期降序，2为日期升序，3为金额降序，4为金额升序
        time: '',//排序类型，默认日期降序，2为日期升
        //翻页相关
        currentpage: 1,//当前页
        totlepage: 10,//总页数
        visiblepage: 10,//可见页数
      }

    },
    created: function () {
      this.getuserList();
    },
    methods: {
      //所有查找用户的请求
      getUserInfor:function(){
        // this.$http.get('/yii/system/system/getuserdata')//代替http://localhost:3000/list
        //   .then((res) => {
        //     this.userList = res.data.data;
        //     console.log(res.data);
        //   }, (err) => {
        //     console.log(err);
        //   })
      },
      searchUserInfo:function(){
        if (a7.length != 0) {
          this.startTime = this.time[0];
          this.endTime = this.time[1];
        }
        let fd = new FormData();
        fd.append('USER', this.inputuser);
        fd.append('NAME', this.inputname);//传姓名
        fd.append('SEX', this.sexselected);//传性别
        fd.append('AGE', this.inputage);//传年龄
        fd.append('CARDID', this.cardid);
        fd.append('REMARKS', this.inputremarks);//传备注
        // fd.append('STARTDATE', this.startTime);//传开始时间
        //fd.append('ENDDATE', this.endTime);//传结束时间
        fd.append('page', this.currentpage);//传当前页
        fd.append('type', this.type);//传类型
        // this.$http.post('/aaa/system/system/querydata', fd).then(body => {
        //   this.userList = body.data.data;
        //   this.totlepage = body.data.data.totlepage;
        //   console.log(this.userList);
        // })
      },
      getuserList: function () {
        this.getUserInfor();
      },
      deletechange: function (a) {
        console.log(a);
        this.axios.get("/aaa/system/system/deleteuserdata?USER=" + a).then(function (res) {
          console.log(res.data);
          if (res.data == 1) {
            location.reload();
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      searchuserlist: function () {
        this.searchUserInfo()
      },
      ageup: function () {//年龄升序
        this.type = 4;
        this.agesort = !this.agesort;

      },
      agedown: function () {//年龄降序
        this.type = 3;
        this.agesort = !this.agesort;
        this.searchUserInfo()
      },
      pageChange: function (page) {//分页
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.searchUserInfo()
      },
      prepage: function (page, a1, a2, a3, a4, a5, a6, a7) {//上一页
        page--;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.searchUserInfo()
      },
      nextpage: function (page) { //下一页
        page++;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.searchUserInfo()
      },
      export2Excel() {
        if (a5.length != 0) {
          this.startTime = a5[0];
          this.endTime = a5[1];
        }
        let fd = new FormData();
        fd.append('USER', a1);
        fd.append('NAME', a2);//传姓名
        fd.append('SEX', a3);//传性别
        fd.append('AGE', a4);//传年龄
        fd.append('CARDID', a5);//传手机号
        fd.append('REMARKS', a6);//传备注
        fd.append('STARTDATE', this.startTime);//传开始时间
        fd.append('ENDDATE', this.endTime);//传结束时间
        fd.append('page', this.currentpage);//传当前页
        fd.append('type', this.type);//传类型
        this.$http.post('/aaa/system/system/exportuserdata', fd).then(body => {
          this.excelData = body.data.data;
          console.log(this.excelData);
          require.ensure([], () => {
            const {export_json_to_excel} = require('@/excel/Export2Excel.js');//引入文件
            const tHeader = ['ID', '姓名', '性别', '年龄', '联系方式', '备注'];
            // 上面设置Excel的表格第一行的标题
            const filterVal = ['USER', 'NAME', 'SEX', 'AGE', 'CARDID', 'REMARKS'];
            // 上面的index、phone_Num、school_Name是tableData里对象的属性
            const list = this.excelData;  //把data里的tableData存到list
            console.log(list);
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '用户表单');
          })
        })//传数据
      },
      formatJson(filterVal, jsonData) {
        //console.log(jsonData);
        return jsonData.map(v => filterVal.map(j => v[j]));
      }
    },
    computed: {
      //计算属性：返回页码数组，这里会自动进行脏检查，不用$watch();
      pagenums: function () {//分页
        //初始化前后页边界
        let lowPage = 1;
        let highPage = this.totlepage;
        let pageArr = [];
        if (this.totlepage > this.visiblepage) {//总页数超过可见页数时，进一步处理；
          let subVisiblePage = Math.ceil(this.visiblepage / 2);
          if (this.currentpage > subVisiblePage && this.currentpage < this.totlepage - subVisiblePage + 1) {//处理正常的分页
            lowPage = this.currentpage - subVisiblePage;
            highPage = this.currentpage + subVisiblePage - 1;
          }
          else if (this.currentpage <= subVisiblePage) {//处理前几页的逻辑
            lowPage = 1;
            highPage = this.visiblepage;
          }
          else {
            //处理后几页的逻辑
            lowPage = this.totlepage - this.visiblepage + 1;
            highPage = this.totlepage;
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
  .display1 {
    /* padding-left:20px;*/
    padding-top: 10px;
  }

  .display2 {
    border: solid 2px #e0e0e0;
    height: 500px;
    /*text-align: center;*/
    width: 98%;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #fff;
  }

  .user {
    float: left;
    margin: 10px 0 10px 0;
    font-weight: bold;
    background-color: #00AAFF;
    border: solid 1px #00AAFF;
    border-radius: 5px;
    width: 40%;
    padding: 5px;
  }

  .sort {
    color: #1C93FC;
  }

  .sort:hover {
    color: #5CB0FA;
  }

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
    /*margin-right: 0px;*/
  }

  .btn1:hover {
    background: #e0e0e0;
  }

  .active {
    background: #e0e0e0;
  }

  .btn2 {
    margin-left: 0px;
  }

  .input {
    width: 80px;
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
    margin-left: 15px;
    margin-top: 13px;
    /*margin-bottom: 5px;*/
  }

  /* .btn3:hover{
     background-color:#5FA7FE;
   }*/
  .btn4 {
    width: 90px;
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: #FA4E28;
    float: right;
    /*margin-left: 15px;*/
    margin-top: 20px;
    /*margin-bottom: 5px;*/
  }

  .btn4:hover {
    background-color: #FC6F4F;
  }

  .delete:hover {
    color: #C1C1C2
  }

  .page {
    text-align: center;
  }

  .top {
    background: #e0e0e0;
  }

  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
    width: 360px !important;
  }
</style>
