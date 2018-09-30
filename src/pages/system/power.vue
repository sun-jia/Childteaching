<template>
  <div class="display1">
    <button class="btn1 " v-bind:class="{ active: isActive }">权限管理</button>
    <div class="display2">

      <div class="col-md-12">
        <div>
          <div class="user">
            <span style="color:#fff;">搜索管理员：</span>
            <input v-model="inputname" placeholder="输入管理员名称" style="font-size:14px;width:300px;font-weight:lighter">
          </div>
          <button class="btn3 icon-sousuo" v-on:click="searcha(inputuser,inputname,sexselected,inputage,limits,inputremarks,value3)">检索</button>

          <!---->
<!--管理员添加-->
          <div class="col-md-3">
            <el-button class="btn5 icon-jiajianzujianjiahao"  v-on:click="addinit" > 添加</el-button>
            <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
              <el-form :model="form"  ref="form">
                <input type="text" v-model="inputname">
                <input type="button" class="btn4" value="检索" v-on:click="searchuserlist(inputuser,inputname,sexselected,inputage,inputcardid,inputremarks,value3)"  />
                <div v-if="myVar==3">
                  <table>
                    <thead>
                    <tr>
                      <th>序号</th>
                      <th>
                        <span>工号</span>
                      </th>
                      <th>姓名</th>
                      <th>
                        <span>性别</span>
                      </th>
                      <th>
                        <span>年龄</span>
                      </th>
                      <th>
                        <span>备注</span>
                      </th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in userList">
                      <td>{{$index+1}}</td>
                      <td>{{user.CARDID}}</td>
                      <td>{{user.NAME}}</td>
                      <td>{{user.SEX}}</td>
                      <td>{{user.AGE}}</td>
                      <td>{{user.REMARKS}}</td>
                      <td v-on:click='checkunadmin(user.cardid,user.name)'>选择</td>
                    </tr>
                    </tbody>
                  </table>
                  <div v-if="myVar==4">
                    <div -model="errorinfo_gtunad">
                      {{errorinfo_gtunad}}
                    </div>
                  </div>
                  <div v-if="myVar==5">
                    <div v-model="toadmin">
                      <span>工号：{{user.cardid}}</span>
                      <span>姓名：{{user.name}}</span>
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
                          <th v-if="result.mypower=='super'">权限管理</th>
                        </tr>
                        <tr>
                          <th>
                            <input type="checkbox" v-on:click="checktf(1)">
                          </th>
                          <th>
                            <input type="checkbox" v-on:click="checktf(2)">
                          </th>
                          <th>
                            <input type="checkbox" v-on:click="checktf(3)">
                          </th>
                          <th>
                            <input type="checkbox" v-on:click="checktf(4)">
                          </th>
                          <th>
                            <input type="checkbox" v-on:click="checktf(5)">

                          </th>
                          <th v-if="result.mypower=='super'">
                            <input type="checkbox" v-on:click="checktf(6)">
                          </th>
                          <th v-if="result.mypower=='super'">
                            <input type="checkbox" v-on:click="checktf(7)">
                          </th>
                          <th v-if="result.mypower=='super'">
                            <input type="checkbox" v-on:click="checktf(9)">
                          </th>
                          <th>
                            <input type="checkbox" v-on:click="checktf(8)">
                          </th>
                        </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="closemodal()">取消
                      </button>
                      <button type="button" class="btn btn-primary" v-on:click="goaddadmin()" data-dismiss="modal">
                        确定
                      </button>
                    </div>
                  </div>

</div>
                </el-form>
                </el-dialog>
  </div>
<!---->
          <table id="userStatistics">
            <tr>
              <th>用户ID
                <input class="input1" v-model="inputuser" placeholder="搜索用户ID" style="font-size:14px;">
              </th>
              <th>姓名
                <input class="input1" v-model="inputname" placeholder="搜索姓名" style="font-size:14px;"></th>

              <th>性别
                <select v-model="sexselected" style="font-size:14px;">
                  <option disabled value="">选择</option>
                  <option value="1">男</option>
                  <option value="2">女</option>
                  <option value="null">空</option>
                </select>
              </th>
              <th>年龄
                <input class="input1" v-model="inputage" placeholder="输入年龄" style="font-size:14px;">
                <!--<p>{{inputage}}</p>//测试-->
                <i v-show="agesort" class="sort icon-paixushengxu" v-on:click="ageup(input,inputname,sexselected,inputage,inputcardid,limits,inputremarks,value3)"></i>
                <i v-show="!agesort" class="sort icon-paixujiangxu" v-on:click="agedown(inputuser,inputname,sexselected,inputage,inputcardid,limits,inputremarks,value3)"></i>
              </th>
              <th>超级管理员</th>
              <th> 会议管理 </th>
              <th> 财务管理 </th>
              <th> 宣传模块 </th>
              <th> 后勤管理 </th>
              <th> 成员管理 </th>
              <th> 统计管理 </th>
              <th> 系统管理 </th>
              <th> 权限管理 </th>
              <th> 权限修改 </th>
              <th> 权限移交 </th>
              <th>删除用户</th>
            </tr>

            <tr v-for="user in userList" v-bind:key='user.ID'>
              <td>{{user.USER}}</td>
              <td>{{user.NAME}}</td>
              <td>{{user.SEX}}</td>
              <td>{{user.AGE}}</td>

              <td>
                <input type="checkbox" v-model="user.super" checked="user.super==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.meet" checked="user.meet==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.finance" checked="user.finance==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.logistics" checked="user.logistics==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.advertise" checked="user.advertise==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.member" checked="user.member==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.statics" checked="user.statics==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.system" checked="user.system==1" disabled="true">
              </td>
              <td>
                <input type="checkbox" v-model="user.super" checked="user.super==1" disabled="true">
              </td>


              <!--权限修改-->
              <td>

                <button class="btn2 "  v-on:click="modify" > 修改</button>
                <el-dialog title="权限修改" :visible.sync="dialogFormVisible">
                  <el-form :model="form"  ref="form">
                    <input type="text" v-model="inputname">
                    <div v-if="myVar==3">
                      <table>
                        <thead>
                        <tr>
                          <th>序号</th>
                          <th>
                            <span>工号</span>
                          </th>
                          <th>姓名</th>
                          <th>
                            <span>性别</span>
                          </th>
                          <th>
                            <span>年龄</span>
                          </th>
                          <th>
                            <span>备注</span>
                          </th>
                          <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="user in userList">
                          <td>{{$index+1}}</td>
                          <td>{{user.CARDID}}</td>
                          <td>{{user.NAME}}</td>
                          <td>{{user.SEX}}</td>
                          <td>{{user.AGE}}</td>
                          <td>{{user.REMARKS}}</td>
                          <td v-on:click='checkunadmin(user.cardid,user.name)'>选择</td>
                        </tr>
                        </tbody>
                      </table>
                      <div v-if="myVar==4">
                        <div -model="errorinfo_gtunad">
                          {{errorinfo_gtunad}}
                        </div>
                      </div>
                      <div v-if="myVar==5">
                        <div v-model="toadmin">
                          <span>工号：{{user.cardid}}</span>
                          <span>姓名：{{user.name}}</span>
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
                              <th v-if="result.mypower=='super'">权限管理</th>
                            </tr>
                            <tr>
                              <th>
                                <input type="checkbox" v-on:click="checktf(1)">
                              </th>
                              <th>
                                <input type="checkbox" v-on:click="checktf(2)">
                              </th>
                              <th>
                                <input type="checkbox" v-on:click="checktf(3)">
                              </th>
                              <th>
                                <input type="checkbox" v-on:click="checktf(4)">
                              </th>
                              <th>
                                <input type="checkbox" v-on:click="checktf(5)">

                              </th>
                              <th v-if="result.mypower=='super'">
                                <input type="checkbox" v-on:click="checktf(6)">
                              </th>
                              <th v-if="result.mypower=='super'">
                                <input type="checkbox" v-on:click="checktf(7)">
                              </th>
                              <th v-if="result.mypower=='super'">
                                <input type="checkbox" v-on:click="checktf(9)">
                              </th>
                              <th>
                                <input type="checkbox" v-on:click="checktf(8)">
                              </th>
                            </tr>
                            </thead>
                          </table>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="closemodal()">取消
                          </button>
                          <button type="button" class="btn btn-primary" v-on:click="goaddadmin()" data-dismiss="modal">
                            确定
                          </button>
                        </div>
                      </div>

                    </div>
                  </el-form>
                </el-dialog>
              </td>

              <!--权限移交-->
              <td>

                <button class="btn2 "  v-on:click="addinit" > 添加</button>
                <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
                  <el-form :model="form"  ref="form">
                    <input type="text" v-model="inputname">
                    <input type="button" class="btn4" value="检索" v-on:click="searchuserlist(inputuser,inputname,sexselected,inputage,inputcardid,inputremarks,value3)"  />
                    <div v-if="myVar==3">
                      <table>
                        <thead>
                        <tr>
                          <th>序号</th>
                          <th>
                            <span>工号</span>
                          </th>
                          <th>姓名</th>
                          <th>
                            <span>性别</span>
                          </th>
                          <th>
                            <span>年龄</span>
                          </th>
                          <th>
                            <span>备注</span>
                          </th>
                          <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="user in userList">
                          <td>{{$index+1}}</td>
                          <td>{{user.CARDID}}</td>
                          <td>{{user.NAME}}</td>
                          <td>{{user.SEX}}</td>
                          <td>{{user.AGE}}</td>
                          <td>{{user.REMARKS}}</td>
                          <td v-on:click='checkunadmin(user.cardid,user.name)'>选择</td>
                        </tr>
                        </tbody>
                      </table>
                      <div v-if="myVar==4">
                        <div -model="errorinfo_gtunad">
                          {{errorinfo_gtunad}}
                        </div>
                      </div>
                      <div v-if="myVar==5">
                        <div v-model="toadmin">
                          <span>工号：{{user.cardid}}</span>
                          <span>姓名：{{user.name}}</span>
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
                              <th v-if="result.mypower=='super'">权限管理</th>
                            </tr>
                            <tr>
                              <th>
                                <input type="checkbox" v-on:click="checktf(1)">
                              </th>
                              <th>
                                <input type="checkbox" v-on:click="checktf(2)">
                              </th>
                              <th>
                                <input type="checkbox" v-on:click="checktf(3)">
                              </th>
                              <th>
                                <input type="checkbox" v-on:click="checktf(4)">
                              </th>
                              <th>
                                <input type="checkbox" v-on:click="checktf(5)">

                              </th>
                              <th v-if="result.mypower=='super'">
                                <input type="checkbox" v-on:click="checktf(6)">
                              </th>
                              <th v-if="result.mypower=='super'">
                                <input type="checkbox" v-on:click="checktf(7)">
                              </th>
                              <th v-if="result.mypower=='super'">
                                <input type="checkbox" v-on:click="checktf(9)">
                              </th>
                              <th>
                                <input type="checkbox" v-on:click="checktf(8)">
                              </th>
                            </tr>
                            </thead>
                          </table>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="closemodal()">取消
                          </button>
                          <button type="button" class="btn btn-primary" v-on:click="goaddadmin()" data-dismiss="modal">
                            确定
                          </button>
                        </div>
                      </div>

                    </div>
                  </el-form>
                </el-dialog>
              </td>
              <td>
                <span v-on:click="deletechange(user.user)">
                  <i class="delete icon-changyonggoupiaorenshanchu"></i>
                </span>
              </td>
            </tr>
          </table>

          <div class="page">
            <ul class="pagination pagination-sm">
              <!--分页-->
              <li class="page-item" v-if="currentpage!=1">
                <a class="page-link" href="#" v-on:click="prepage(currentpage,inputuser,inputname,sexselected,inputage,inputcardid,limits,inputremarks,value3)">上一页</a>
              </li>
              <li class="page-item" v-for="index in pagenums" :key="index" v-bind:class="{ active: currentpage == index} ">
                <a class="page-link" href="#" v-on:click="pageChange(index,inputuser,inputname,sexselected,inputage,inputcardid,limits,inputremarks,value3)">{{index}}</a>
              </li>
              <li class="page-item" v-if="currentpage!=totlepage">
                <a class="page-link" href="#" v-on:click="nextpage(currentpage,inputuser,inputname,sexselected,inputage,inputcardid,limits,inputremarks,value3)">下一页</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">共
                  <i>{{totlepage}}</i>页</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var moment = require("moment");
  let nowTime = moment().format(); // 当前时间
  console.log(nowTime);
  console.log(this.starTime);
  let start = this.starTime;
  // start=start.toString();
  console.log(start);

  // import FileSaver from 'file-saver';
  // import XLSX from 'xlsx';
  export default {
    name: "power",
    data() {
      return {
        userList: [
          {
            USER: 45795478,
            NAME: "张三",
            SEX: "男",
            AGE: "18",
            CARDID: "110",
            LIMITS: 9,
            REMARKS: "NULL"
          },
          {

            USER: 45795478,
            NAME: "李四",
            SEX: "男",
            AGE: "20",
            CARDID: "119",
            REMARKS: "NULL"
          },
          {

            USER: 45795478,
            NAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            CARDID: "114",
            REMARKS: "NULL"
          },
          {

            USER: 45795478,
            NAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            CARDID: "114",
            REMARKS: "NULL"
          },
          {

            USER: 45795478,
            NAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            CARDID: "114",
            REMARKS: "NULL"
          },
          {

            USER: 45795478,
            NAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            CARDID: "114",
            REMARKS: "NULL"
          },
          {

            USER: 45795478,
            NAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            CARDID: "114",
            REMARKS: "NULL"
          },
          {

            USER: 45795478,
            NAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            CARDID: "114",
            REMARKS: "NULL"
          },
          {

            USER: 45795478,
            NAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            CARDID: "114",
            REMARKS: "NULL"
          },
          {

            USER: 45795478,
            NAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            CARDID: "114",
            REMARKS: "NULL"
          }
        ],
        content: "", // 传值测试
        currentpage: 1, // 当前页
        datesort: true, // 日期排序
        endTime: "",
        excelData: "", // 导出数据
        inputuser: "", // 输入用户名称
        inputname: "", // 输入姓名
        inputsex: "", // 输入性别
        inputage: "", // 输入年龄
        inputcardid: "", // 输入手机号
        inputremarks: "", // 输入备注
        isActive: true,
        pagenums: [],
        agesort: true, // 金额排序
        sexselected: "", // 支付下拉列表
        showage: true,
        // showinvoice: false,
        showFirstText: true, // 显示上一页
        showNextText: true, // 显示下一页
        startTime: "",
        totlepage: 10, // 总页数
        type: 1, // 排序类型，默认日期降序，2为日期升序，3为金额降序，4为金额升序
        visiblepage: 10, // 可见页数
        value3: "" ,// 排序类型，默认日期降序，2为日期升序

        dialogFormVisible: false,
        myVar:'',
        mypower:'',

        form: {
          conferenceDate: [],
          endTime:'',
          name: '',
          checkAll: false,
          checkedModels: [],
          duty: {
            propaganda:'',
            logistics:'',
            finance:'',
            Interaction:'',
          },
        },
      };
    },
    methods: {

      getuserList :function(){
        this.$http.get('/aaa/system/system/getuserdata')//代替http://localhost:3000/list
          .then((res) => {
            this.userList=res.data.data;
            console.log(res.data);
          }, (err) => {
            console.log(err);
          })
      },
      addinit(){
        this.dialogFormVisible = true;
        this.form.name='';
        this.form.checkAll= false;
        this.form.checkedModels=[];
        this.form.duty.propaganda = '';
        this.form.duty.logistics = '';
        this.form.duty.finance = '';
        this.form.duty.Interaction = '';
      },
      searchuserlist: function (a1,a2,a3,a4,a5,a6,a7) {
        /* if(a7.length!=0){
           this.startTime=a7[0];
           this.endTime=a7[1];
         }
       console.log(this.startTime);*/
        let fd = new FormData();
        fd.append('USER', a1);
        fd.append('NAME', a2);//传姓名
        fd.append('SEX', a3);//传性别
        fd.append('AGE', a4);//传年龄
        fd.append('CARDID', a5);
        fd.append('REMARKS', a6);//传备注
        // fd.append('STARTDATE', this.startTime);//传开始时间
        //fd.append('ENDDATE', this.endTime);//传结束时间
        fd.append('page', this.currentpage);//传当前页
        fd.append('type',this.type);//传类型
        this.$http.post('/aaa/system/system/querydata', fd).then(body => {
          this.userList = body.data.data;
          this.totlepage = body.data.data.totlepage;
          console.log(this.userList);
        })
      },
      modify:function () {
        this.dialogFormVisible = true;
        this.form.name='';
        this.form.checkAll= false;
        this.form.checkedModels=[];
        this.form.duty.propaganda = '';
        this.form.duty.logistics = '';
        this.form.duty.finance = '';
        this.form.duty.Interaction = '';
      },
      tomodify:function () {

      },
      result:function () {

      },
      checktf:function () {

      },
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
    background-color:#338ffc;
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
  .btn5{
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
