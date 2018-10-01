<template>
  <div class="display1">
    <button class="btn1">权限管理</button>
    <div class="display2">

      <div class="col-md-12">
        <div>
          <div class="user">
            <span style="color:#fff;">搜索管理员：</span>
            <input v-model="inputUser" placeholder="输入管理员名称" style="font-size:14px;width:300px;font-weight:lighter">
          </div>
          <button class="btn3 icon-sousuo" v-on:click="searchUser">检索</button>
          <!--管理员添加-->
          <div class="col-md-3">
            <el-button class="btn5 icon-jiajianzujianjiahao" v-on:click="addPower"> 添加</el-button>
          </div>
          <!--首页表格-->
          <table id="userStatistics">
            <tr>
              <th>用户ID</th>
              <th>姓名</th>
              <th>超级管理员</th>
              <th> 会议管理</th>
              <th> 财务管理</th>
              <th> 宣传模块</th>
              <th> 后勤管理</th>
              <th> 成员管理</th>
              <th> 统计管理</th>
              <th> 系统管理</th>

              <th> 权限修改</th>
              <th> 权限移交</th>
              <th>删除用户</th>
            </tr>
            <tr v-for="user in userPowerList" v-bind:key='user.ID'>
              <td>{{user.USER}}</td>
              <td>{{user.NAME}}</td>
              <td>
                <input type="checkbox" v-model="user.SUPER" checked="user.SUPER==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.MEET" checked="user.MEET==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.FINANCE" checked="user.FINANCE==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.LOGISTICS" checked="user.LOGISTICS==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.ADVERTISE" checked="user.ADVERTISE==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.MEMBER" checked="user.MEMBER==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.STATICS" checked="user.STATICS==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.SYSTEM" checked="user.SYSTEM==1" disabled="true">
              </td>
              <!--权限修改-->
              <td><button class="btn2 " v-on:click="modifyPower"> 修改</button></td>
              <!--权限移交-->
              <td><button class="btn2 " v-on:click="alterPower"> 移交</button></td>
              <td>
                <span v-on:click="deletechange(user.USER)">
                  <i class="delete icon-changyonggoupiaorenshanchu"></i>
                </span>
              </td>
            </tr>
          </table>

          <!--//添加管理员-->
          <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
            <el-form>
              <input type="text" v-model="inputUser">
              <input v-on:click="searchUserList" value="检索" type="button">
              <!--//显示带设置成员列表-->
              <div v-if="myVar==3">
                <table>
                  <thead>
                  <tr>
                    <th>序号</th>
                    <th>工号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>备注</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(user,index) in searchList">
                    <td>{{index+1}}</td>
                    <td>{{user.USER}}</td>
                    <td>{{user.NAME}}</td>
                    <td>{{user.SEX}}</td>
                    <td>{{user.AGE}}</td>
                    <td>{{user.REMARKS}}</td>
                    <td v-on:click='chooseUnAdmin(user)'>选择</td>
                  </tr>
                  </tbody>
                </table>
                <!--//显示查找失败结果-->
                <div v-if="myVar==4">
                  <div>{{ searchResult }}</div>
                </div>
                <!--//显示权限添加-->
                <div v-if="myVar==5">
                  <div>
                    <span>工号：1111</span>
                    <span>姓名：陈</span>
                  </div>
                  <div>
                    <table>
                      <thead>
                      <tr>
                        <th>会议管理</th>
                        <th>财务管理</th>
                        <th>宣传模块</th>
                        <th>后勤管理</th>
                        <th>成员管理</th>
                        <th>统计管理</th>
                        <th>系统管理</th>
                        <th>权限管理</th>
                      </tr>
                      <tr>
                        <th><input type="checkbox" v-on:click="checktf(1)"></th>
                        <th><input type="checkbox" v-on:click="checktf(2)"></th>
                        <th><input type="checkbox" v-on:click="checktf(3)"></th>
                        <th><input type="checkbox" v-on:click="checktf(4)"></th>
                        <th><input type="checkbox" v-on:click="checktf(5)"></th>
                        <th v-if="mypower=='super'"><input type="checkbox" v-on:click="checktf(6)"></th>
                        <th v-if="mypower=='super'"><input type="checkbox" v-on:click="checktf(7)"></th>
                        <th v-if="mypower=='super'"><input type="checkbox" v-on:click="checktf(9)"></th>
                        <th><input type="checkbox" v-on:click="checktf(8)"></th>
                      </tr>
                      </thead>
                    </table>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="closeModal">取消
                    </button>
                    <button type="button" class="btn btn-primary" v-on:click="saveAdmin" data-dismiss="modal">
                      确定
                    </button>
                  </div>
                </div>
              </div>
            </el-form>
          </el-dialog>
          <div class="page">
            <ul class="pagination pagination-sm"><!--分页-->
              <li class="page-item" v-if="currentpage!=1"><a class="page-link" href="#" v-on:click="prepage(currentpage)">上一页</a></li>
              <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage == index} ">
                <a class="page-link" href="#" v-on:click="pageChange(index)">{{index}}</a>
              </li>
              <li class="page-item" v-if="currentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage(currentpage)">下一页</a></li>
              <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Button from "../advertise/webTemplates/Childrens/Button";
  export default {
    name: "power",
    components: {Button},
    data() {
      return {
        form:{
          USER:"",
          NAME: "",
          MEET:"",
          FINANCE:"",
          LOGISTICS:"",
          ADVERTISE:"",
          MEMBER:"",
          STATICS:"",
          SYSTEM:"",
          SUPER:"",
        },
        userPowerList: [
          {
            ID:1,
            USER:12232,
            NAME: "张三",
            MEET:"",
            FINANCE:"",
            LOGISTICS:"",
            ADVERTISE:"",
            MEMBER:"",
            STATICS:"",
            SYSTEM:"",
            SUPER:"",
            STATUS:""
          },
          {
            ID:2,
            USER:1234232,
            NAME: "李三",
            MEET:"",
            FINANCE:"",
            LOGISTICS:"",
            ADVERTISE:"",
            MEMBER:"",
            STATICS:"",
            SYSTEM:"",
            SUPER:"",
            STATUS:""
          }
        ],
        searchList:[
          {
            ID:1,
            NAME: "张三",
            USER: 45795478,
            DEPARTMENT: "教育学院",
            JOB: "文员",
            ADMINLEVEL: "科级",
            ISPARTY: "1"
          },
          {
            ID:2,
            NAME: "李四",
            USER: 45795478,
            DEPARTMENT: "教育学院",
            JOB: "文员",
            ADMINLEVEL: "科级",
            ISPARTY: "1"
          }
        ],
        //分页相关
        currentpage: 1, // 当前页
        totlepage: 1, // 总页数
        visiblepage: 5, // 可见页数
        //检索内容
        inputUser:"",

        searchResult:"",
        dialogFormVisible: false,
        myVar: 1,
        //当前用户权限
        mypower: 'super',
      };
    },
    methods: {

      getuserList: function () {
        this.$http.get('/aaa/system/system/getuserdata')//代替http://localhost:3000/list
          .then((res) => {
            this.userList = res.data.data;
            console.log(res.data);
          }, (err) => {
            console.log(err);
          })
      },
      addPower() {
        this.dialogFormVisible = true;
      },
      searchUser: function () {
        // let fd = new FormData();
        // fd.append('USER', this.inputname);
        // this.$http.post('/aaa/system/system/querydata', fd).then(body => {
        //   this.userList = body.data.data;
        //   this.totlepage = body.data.data.totlepage;
        //   console.log(this.userList);
        // })
      },
      searchUserList: function () {
        // let fd = new FormData();
        // fd.append('USER', this.inputname);
        this.myVar=3;
      },
      modifyPower: function () {
        this.dialogFormVisible = true;
        this.myVar=5;
        console.log(this.myVar)
      },
      alterPower: function () {
        this.dialogFormVisible = true;
        this.myVar=3;
      },
      checktf: function () {

      },
      //选择要设置为管理员的成员
      chooseUnAdmin:function (userChoose) {
        this.myVar=5;
      },
      //关闭弹窗
      closeModal:function () {
        this.dialogFormVisible = false;
      },
      //保存管理员的设置操作
      saveAdmin:function () {
        this.dialogFormVisible = false;
      },
      pageChange: function(page){//分页
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.getHotelInfo();
      },
      prepage:function(page){//上一页
        page--;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.getHotelInfo();
      },
      nextpage:function(page){//上一页
        page++;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.getHotelInfo();
      },
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
          } else if (this.currentpage <= subVisiblePage) {//处理前几页的逻辑
            lowPage = 1;
            highPage = this.visiblepage;
          } else {//处理后几页的逻辑
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
  };
</script>

<style scoped>
  .display1 {
    /*  padding-left: 20px;*/
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
    background-color: #00aaff;
    border: solid 1px #00aaff;
    border-radius: 5px;
    width: 40%;
    padding: 5px;
  }

  .sort {
    color: #1c93fc;
  }

  .sort:hover {
    color: #5cb0fa;
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
    background-color: #f1f1f1;
  }

  table,
  td {
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
    background-color: #338ffc;
    color: white;
    border: none;
    border-radius: 3px;

  }

  .input1 {
    width: 80px;
  }

  .btn3 {
    width: 80px;
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: #338ffc;
    float: left;
    margin-left: 15px;
    margin-top: 13px;
    /*margin-bottom: 5px;*/
  }

  .btn3:hover {
    background-color: #5fa7fe;
  }

  .btn4 {
    width: 90px;
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: #fa4e28;
    float: right;
    /*margin-left: 15px;*/
    margin-top: 13px;
    /*margin-bottom: 5px;*/
  }

  .btn4:hover {
    background-color: #fc6f4f;
  }

  .btn5 {
    width: 66px;
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: #338ffc;
    float: right;
    margin-left: 15px;
    margin-top: 13px;
    /*margin-bottom: 5px;*/
  }

  .delete:hover {
    color: #c1c1c2;
  }

  .page {
    text-align: center;
  }

  .top {
    background: #e0e0e0;
  }

  .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 360px !important;
  }
</style>
