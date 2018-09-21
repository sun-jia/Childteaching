<template>
  <div class="display1">
    <button class="btn1 " v-bind:class="{ active: isActive }">权限管理</button>
    <div class="display2">

      <div class="col-md-12">
        <div>
          <div class="user">
            <span style="color:#fff;">搜索管理员：</span>
            <input v-model="inputusername" placeholder="输入管理员名称" style="font-size:14px;width:300px;font-weight:lighter">
          </div>

          <button class="btn3 icon-sousuo" v-on:click="searcha(inputuserid,inputusername,sexselected,inputage,limits,inputremarks,value3)">搜索</button>
          <table id="userStatistics">
            <tr>
              <th>序号</th>
              <th>ID
                <input class="input1" v-model="inputuserid" placeholder="搜索ID" style="font-size:14px;">
              </th>
              <th>姓名
                <input class="input1" v-model="inputusername" placeholder="搜索姓名" style="font-size:14px;"></th>

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
                <i v-show="agesort" class="sort icon-paixushengxu" v-on:click="ageup(inputuserid,inputusername,sexselected,inputage,inputphonenumber,limits,inputremarks,value3)"></i>
                <i v-show="!agesort" class="sort icon-paixujiangxu" v-on:click="agedown(inputuserid,inputusername,sexselected,inputage,inputphonenumber,limits,inputremarks,value3)"></i>
              </th>
              <th>超级管理员

              </th>
              <th> 通知管理 </th>
              <th> 课程管理 </th>
              <th> 用户管理 </th>
              <th> 统计管理 </th>
              <th> 部门中心 </th>
              <th> 系统设置 </th>
              <th> 权限管理 </th>
              <th>删除用户</th>
            </tr>

            <tr v-for="user in userList" v-bind:key='user.ID'>
              <td>{{user.ID}}</td>
              <td>{{user.USERID}}</td>
              <td>{{user.USERNAME}}</td>
              <td>{{user.SEX}}</td>
              <td>{{user.AGE}}</td>

              <td>
                <!-- {{user.REMARKS}} -->
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" checked v-if="user.REMARKS">
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" v-else>
              </td>
              <td>
                <!-- {{user.REMARKS}} -->
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" checked v-if="user.REMARKS">
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" v-else>
              </td>
              <td>
                <!-- {{user.REMARKS}} -->
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" checked v-if="user.REMARKS">
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" v-else>
              </td>
              <td>
                <!-- {{user.REMARKS}} -->
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" checked v-if="user.REMARKS">
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" v-else>
              </td>
              <td>
                <!-- {{user.REMARKS}} -->
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" checked v-if="user.REMARKS">
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" v-else>
              </td>
              <td>
                <!-- {{user.REMARKS}} -->
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" checked v-if="user.REMARKS">
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" v-else>
              </td>
              <td>
                <!-- {{user.REMARKS}} -->
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" checked v-if="user.REMARKS">
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" v-else>
              </td>
              <td>
                <!-- {{user.REMARKS}} -->
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" checked v-if="user.REMARKS">
                <input type="checkbox" @change="inputChange(user.ID,'REMARKS',$event)" v-else>
              </td>
              <td>

              </td>
              <td>
                <span v-on:click="deletechange(user.USERID)">
                  <i class="delete icon-changyonggoupiaorenshanchu"></i>
                </span>
              </td>
            </tr>
          </table>
          <div class="page">
            <ul class="pagination pagination-sm">
              <!--分页-->
              <li class="page-item" v-if="currentpage!=1">
                <a class="page-link" href="#" v-on:click="prepage(currentpage,inputuserid,inputusername,sexselected,inputage,inputphonenumber,limits,inputremarks,value3)">上一页</a>
              </li>
              <li class="page-item" v-for="index in pagenums" :key="index" v-bind:class="{ active: currentpage == index} ">
                <a class="page-link" href="#" v-on:click="pageChange(index,inputuserid,inputusername,sexselected,inputage,inputphonenumber,limits,inputremarks,value3)">{{index}}</a>
              </li>
              <li class="page-item" v-if="currentpage!=totlepage">
                <a class="page-link" href="#" v-on:click="nextpage(currentpage,inputuserid,inputusername,sexselected,inputage,inputphonenumber,limits,inputremarks,value3)">下一页</a>
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
            ID: 1,
            USERID: 45795478,
            USERNAME: "张三",
            SEX: "男",
            AGE: "18",
            PHONENUMBER: "110",
            LIMITS: 9,
            REMARKS: "NULL"
          },
          {
            ID: 2,
            USERID: 45795478,
            USERNAME: "李四",
            SEX: "男",
            AGE: "20",
            PHONENUMBER: "119",
            REMARKS: "NULL"
          },
          {
            ID: 3,
            USERID: 45795478,
            USERNAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            PHONENUMBER: "114",
            REMARKS: "NULL"
          },
          {
            ID: 4,
            USERID: 45795478,
            USERNAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            PHONENUMBER: "114",
            REMARKS: "NULL"
          },
          {
            ID: 5,
            USERID: 45795478,
            USERNAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            PHONENUMBER: "114",
            REMARKS: "NULL"
          },
          {
            ID: 6,
            USERID: 45795478,
            USERNAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            PHONENUMBER: "114",
            REMARKS: "NULL"
          },
          {
            ID: 7,
            USERID: 45795478,
            USERNAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            PHONENUMBER: "114",
            REMARKS: "NULL"
          },
          {
            ID: 8,
            USERID: 45795478,
            USERNAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            PHONENUMBER: "114",
            REMARKS: "NULL"
          },
          {
            ID: 9,
            USERID: 45795478,
            USERNAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            PHONENUMBER: "114",
            REMARKS: "NULL"
          },
          {
            ID: 10,
            USERID: 45795478,
            USERNAME: "王二麻子",
            SEX: "男",
            AGE: "28",
            PHONENUMBER: "114",
            REMARKS: "NULL"
          }
        ],
        content: "", // 传值测试
        currentpage: 1, // 当前页
        datesort: true, // 日期排序
        endTime: "",
        excelData: "", // 导出数据
        inputuserid: "", // 输入用户名称
        inputusername: "", // 输入姓名
        inputsex: "", // 输入性别
        inputage: "", // 输入年龄
        inputphonenumber: "", // 输入手机号
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
        value3: "" // 排序类型，默认日期降序，2为日期升序
      };
    },
    methods: {
      inputChange(id, type, e) {
        console.log(e.target.checked);
        var _checked = e.target.checked;
        var _list = JSON.parse(JSON.stringify(this.userList));
        _list.map(item => {
          if (item.ID == id) {
            item[type] = _checked;
          }
        });
        this.userList = _list;
        console.log(this.userList);
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
