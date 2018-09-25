<template>

  <div class="display1">
   <button class="btn1"  v-bind:class="{ active: isActive }">成员信息列表</button>
   <router-link to="/member/loginlist"><button class="btn1 btn2"  >成员登入列表</button></router-link>
   <div class="display2">
     <div class="searchmem">
      <button class="btn3 icon-sousuo" v-on:click="searchmem(inputname,inputusername,rankselected,sexselected,inputdepart,inputjob,inputadmin,partyselected,value3)">搜索</button>
      <button type="button" class="btn4 icon-daochu" id="export-table" v-on:click="export2Excel(inputname,inputusername,rankselected,sexselected,inputdepart,inputjob,inputadmin,partyselected,value3)">导出</button>
      <router-link to="/member/add"><button class="btn3">添加成员</button></router-link>
    </div>

    <router-view/>

    <table id="memberStastics" >
      <tr>

        <th>姓名 <input class="input1" v-model="inputname" placeholder="搜索姓名" style="font-size:12px;width:80px"></th>
        <th>用户名<input class="input1" v-model="inputusername" placeholder="搜索用户" style="font-size:12px;width:80px"></th>
        <th>等级
          <select v-model="rankselected"  style="font-size:12px;">
            <option disabled value="" selected="selected">选择</option>
            <option value="1" >1级</option>
            <option value="2">2级</option>
            <option value="3">3级</option>
            <option value="4">4级</option>
            <option value="null">空</option>
          </select>

        </th>
        <th>性别<select v-model="sexselected"  style="font-size:12px;">
          <option disabled value="">选择</option>
          <option value="1" >男</option>
          <option value="2">女</option></select></th>
          <th>部门<input class="input1" v-model="inputdepart" placeholder="搜索部门" style="font-size:12px;width:80px"></th>
          <th>职位<input class="input1" v-model="inputjob" placeholder="搜索职位" style="font-size:12px;width:80px"></th>
          <th>权限<input class="input1" v-model="inputadmin" placeholder="搜索权限" style="font-size:12px;width:80px"></th>
          <th>党员
            <select v-model="partyselected"  style="font-size:12px;">
              <option disabled value="">选择</option>
              <option value="1" >是</option>
              <option value="2">否</option></select></th>
              <th><div class="block" >
                <span class="demonstration">日期</span>
                <el-date-picker
                class="input-class"
                v-model="value3"
                type="datetimerange"
                :picker-options="pickerOptions2"
                range-separator="——"
                start-placeholder="开始"
                end-placeholder="结束"
                align="right"
                size="12px"
                format="yyyy-MM-dd HH:mm:ss "
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
              <i v-show="datesort" class="sort icon-paixushengxu"  v-on:click="dateup(inputname,inputusername,rankselected,sexselected,inputdepart,inputjob,inputadmin,partyselected,value3)"></i>
              <i v-show="!datesort" class="sort icon-paixujiangxu"  v-on:click="datedown(inputname,inputusername,rankselected,sexselected,inputdepart,inputjob,inputadmin,partyselected,value3)"></i>
            </div></th>
            <th>备注</th>
          </tr>
          <tr v-for=" member in memberList">
            <td>{{member.NAME}}</td>
            <td>{{member.USER}}</td>
            <td v-if='member.RANK==1'>1级</td>
            <td v-if='member.RANK==2'>2级</td>
            <td v-if='member.RANK==3'>3级</td>
            <td v-if='member.RANK==4'>4级</td>
            <td v-if='member.SEX==1'>男</td>
            <td v-if='member.SEX==2'>女</td>
            <td>{{member.DEPARTMENT}}</td>
            <td>{{member.JOB}}</td>
            <td>{{member.ADMINLEVEL}}</td>
            <td v-if='member.ISPARTY==1'>是</td>
            <td v-if='member.ISPARTY==2'>否</td>
            <td>{{member.TIMES}}</td>
            <td>{{member.REMARKS}}</td>
          </tr>
        </table>
        <div class="page">
          <ul class="pagination pagination-sm"><!--分页-->
            <li class="page-item" v-if="currentpage!=1"><a class="page-link" href="#" v-on:click="prepage(currentpage,inputname,inputusername,rankselected,sexselected,inputdepart,inputjob,inputadmin,partyselected,value3)">上一页</a></li>
            <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage == index} ">
              <a class="page-link" href="#" v-on:click="pageChange(index,inputname,inputusername,rankselected,sexselected,inputdepart,inputjob,inputadmin,partyselected,value3)">{{index}}</a>
            </li>
            <li class="page-item" v-if="currentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage(currentpage,inputname,inputusername,rankselected,sexselected,inputdepart,inputjob,inputadmin,partyselected,value3)">下一页</a></li>
            <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
          </ul>
        </div>
      </div>
    </div>

  </template>

  <script>


    export default {
      data () {
        return {
          memberList:[


          {
            ID: 1,
            NAME: '张子萱',
            USER: '心晴',
            RANK:1,
            SEX: 2,
            DEPARTMENT: '研发部',
            JOB: '研发组长',
            ADMINLEVEL:'ALL',
            ISPARTY: 1,
            TIMES:'2018/12/4',
            REMARKS:'null'

          },
          {
            ID: 2,
            NAME: '章紫萱',
            USER: '小不点',
            RANK:4,
            SEX: 2,
            DEPARTMENT: '研发部',
            JOB: '研发职员',
            ADMINLEVEL:'ALL',
            ISPARTY: 1,
            TIMES:'2018/12/13',
            REMARKS:'null'

          },
          {
            ID: 3,
            NAME: '张子轩',
            USER: '绿巨人',
            RANK:2,
            SEX: 1,
            DEPARTMENT: '研发部',
            JOB: '研发职员',
            ADMINLEVEL:'ALL',
            ISPARTY: 2,
            TIMES:'2018/3/4',
            REMARKS:'null'

          }

          ],
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
          inputname: '',
          inputadmin: '',
          inputdepart: '',
          inputjob: '',
          inputusername: '',
          currentpage:1,
          isActive: true,
          totlepage: 25,
          value3: '',
          type: 1,//排序类型，默认日期降序，2为日期升序
          rankselected: '',
          partyselected: '',
          sexselected: '',
          datesort: true,//日期排序
          endTime: '',
          startTime: '',
          visiblepage: 10,
          list: [],
          loading: false,
          states:["会议1","会议2","会议3","会议4","会议5","会议6","会议7"],
          loading: false,
          options2: [],

        }

      },


      components:{

      },
      mounted() {

       /* params: {
          NAME:null,
          USER:null,
          RANK:null,
          SEX:null,
          DEPARTMENT:null,
          JOB:null,
          ADMINLEVEL:null,
          ISPARTY:null,
          STARTDATE:null,
          page:1,
          type:1

        }*/
        this.axios.get("/yii/member/member/getmemberdata").then(body => {
          //this.memberList = body.data.data;
          this.memberList = body.data.data.pageall;
          this.totlepage = body.data.data.totlepage;
          console.log(this.memberList);
        });//测试
        console.log(this.startTime);
        this.list = this.states.map(item => {
          return { value: item, label: item };
        });


      },




    //方法中可以设置数据处理和数据的获取等等
    methods: {

      searchmem: function (a1, a2, a3,a4, a5, a6,a7,a8,a9) {
        if(a9.length!=0){
          this.startTime=a9[0];
          this.endTime=a9[1];
        }
        console.log(this.startTime);
        let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USER', a2);//传用户名
          fd.append('RANK', a3);//传等级
          fd.append('SEX', a4);//传性别
          fd.append('DEPARTMENT', a5);//传部门
          fd.append('JOB', a6);//传工作
          fd.append('ADMINLEVEL', a7);//传权限
          fd.append('ISPARTY', a8);//传入党
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          this.$http.post('/yii/member/member/getmemberdata', fd).then(body => {
            this.memberList = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.memberList);
          })
        },
      dateup:function (a1, a2, a3,a4, a5, a6,a7,a8,a9) {//日期升序
        this.type=2;
        console.log(this.type);
        this.datesort=!this.datesort;
        console.log(this.datesort);
        if(a9.length!=0){
          this.startTime=a9[0];
          this.endTime=a9[1];
        }
        console.log(this.startTime);
        let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USER', a2);//传用户名
          fd.append('RANK', a3);//传等级
          fd.append('SEX', a4);//传性别
          fd.append('DEPARTMENT', a5);//传部门
          fd.append('JOB', a6);//传工作
          fd.append('ADMINLEVEL', a7);//传权限
          fd.append('ISPARTY', a8);//传入党
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          this.$http.post('/yii/member/member/getmemberdata', fd).then(body => {
            this.memberList = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.memberList);
          })
        },
        datedown:function (a1, a2, a3,a4, a5, a6,a7,a8,a9) {//日期降序
          this.type=1;
          this.datesort=!this.datesort;
          console.log(this.datesort);
          if(a9.length!=0){
            this.startTime=a9[0];
            this.endTime=a9[1];
          }
          console.log(this.startTime);
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USER', a2);//传用户名
          fd.append('RANK', a3);//传等级
          fd.append('SEX', a4);//传性别
          fd.append('DEPARTMENT', a5);//传部门
          fd.append('JOB', a6);//传工作
          fd.append('ADMINLEVEL', a7);//传权限
          fd.append('ISPARTY', a8);//传入党
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          // console.log(fd.getAll('NAME'));
          // console.log(fd.getAll('ENDDATE'));
          this.$http.post('/yii/member/member/getmemberdata', fd).then(body => {
            this.memberList = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.memberList);
          })
        },

      pageChange: function(page,a1, a2,a3, a4, a5,a6,a7,a8,a9){//分页
        if (this.currentpage != page) {
          this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          if(a9.length!=0){
            this.startTime=a9[0];
            this.endTime=a9[1];
          }
          console.log(this.startTime);
          let fd = new FormData();

          fd.append('page', this.currentpage);//传当前页
          fd.append('NAME', a1);//传姓名
          fd.append('USER', a2);//传用户名
          fd.append('RANK', a3);//传等级
          fd.append('SEX', a4);//传性别
          fd.append('DEPARTMENT', a5);//传部门
          fd.append('JOB', a6);//传工作
          fd.append('ADMINLEVEL', a7);//传权限
          fd.append('ISPARTY', a8);//传入党
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型

          this.$http.post('/yii/member/member/getmemberdata', fd).then(body => {
            this.memberList = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.memberList);
          })
        },
        prepage:function(page,a1, a2,a3, a4, a5,a6,a7,a8,a9){//上一页
          page--;
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          if(a9.length!=0){
            this.startTime=a9[0];
            this.endTime=a9[1];
          }
          console.log(this.startTime);
          let fd = new FormData();

          fd.append('page', this.currentpage);//传当前页
           fd.append('NAME', a1);//传姓名
          fd.append('USER', a2);//传用户名
          fd.append('RANK', a3);//传等级
          fd.append('SEX', a4);//传性别
          fd.append('DEPARTMENT', a5);//传部门
          fd.append('JOB', a6);//传工作
          fd.append('ADMINLEVEL', a7);//传权限
          fd.append('ISPARTY', a8);//传入党
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型

          // console.log(fd.getAll('NAME'));
          // console.log(fd.getAll('ENDDATE'));
          this.$http.post('/yii/member/member/getmemberdata', fd).then(body => {
            this.memberList = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.memberList);
          })
        },
        nextpage:function(page,a1, a2,a3, a4, a5,a6,a7,a8,a9){//下一页


          page++;
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          if(a9.length!=0){
            this.startTime=a9[0];
            this.endTime=a9[1];
          }

          // console.log(this.startTime);
          let fd = new FormData();

          fd.append('page', this.currentpage);//传当前页
           fd.append('NAME', a1);//传姓名
          fd.append('USER', a2);//传用户名
          fd.append('RANK', a3);//传等级
          fd.append('SEX', a4);//传性别
          fd.append('DEPARTMENT', a5);//传部门
          fd.append('JOB', a6);//传工作
          fd.append('ADMINLEVEL', a7);//传权限
          fd.append('ISPARTY', a8);//传入党
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型


          this.$http.post('/yii/member/member/getmemberdata', fd).then(body => {
            this.memberList = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.memberList);
          })
        },
        export2Excel(a1, a2, a3,a4, a5, a6,a7,a8,a9) {
          if(a9.length!=0){
            this.startTime=a9[0];
            this.endTime=a9[1];
          }
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('USER', a2);//传用户名
          fd.append('RANK', a3);//传等级
          fd.append('SEX', a4);//传性别
          fd.append('DEPARTMENT', a5);//传部门
          fd.append('JOB', a6);//传工作
          fd.append('ADMINLEVEL', a7);//传权限
          fd.append('ISPARTY', a8);//传入党
          fd.append('STARTDATE', this.startTime);//传开始时间


          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          this.$http.post('/yii/member/member/getmemberdata', fd).then(body => {
            this.excelData = body.data.data;
            console.log(this.excelData);
            require.ensure([], () => {
              const { export_json_to_excel } = require('@/excel/Export2Excel.js');//引入文件
              const tHeader = ['姓名', '用户名','等级', '性别','部门','职位','权限','党员','日期'];
              // 上面设置Excel的表格第一行的标题
              const filterVal = [ 'NAME', 'USER','RANK','SEX','DEPARTMENT','JOB','ADMINLEVEL','ISPARTY','TIMES'];
              // 上面的index、phone_Num、school_Name是tableData里对象的属性
              const list = this.excelData;  //把data里的tableData存到list
       const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, '成员信息表单');
            })
          })
        },
        formatJson(filterVal, jvp) {
          console.log(jsonData);
           console.log(1111111111);
          return jvp.map(v => filterVal.map(j => v[j]));
        },
        remoteMethod(query) {
          if (query !== '') {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options2 = this.list.filter(item => {
                return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.options2 = [];
          }
        }

      },
    //生命周期钩子中可以进行初始数据的获取
    created(){

    },
    //组件被激活时调用
    // activated(){
    //   this.getMember()
    // }
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
      }
    }
  </script>

  <style scoped>
    .sort{
      float:right;


    }
    table{
      border-collapse: collapse;
      width:100%;
      margin-top: 10px;

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
   .display1{
    padding-left:5px;
    padding-top:10px;
  }
  .display2{
    border:solid 2px  #e0e0e0;
    height: 500px;
    /*text-align: center;*/
    width: 98%;
    padding-left:5px;
    padding-right:5px;
    background-color:  #fff;
  }
  .sort{
    color:#1C93FC;
  }
  .sort:hover{
    color:#5CB0FA;
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
   width: 150px;
   /*margin-right: 0px;*/
 }
 .btn1:hover{
  background: #e0e0e0;
}
.input-class{

  width: 150px;
  height: 30px;

}
.active{
  background: #e0e0e0;
}
.btn2{
  margin-left: 0px;
}
.btn3{
  width:80px;
  padding:7px;
  font-size: 14px;
  border-radius: 3px;
  border:none;
  color:white;
  background-color:#338FFC ;
  float: left;
  margin-left: 5px;
  margin-top:10px;
  margin-bottom: 5px;
}
.btn3:hover{
  background-color:#5FA7FE;
}
.btn4{
  width:90px;
  padding:7px;
  font-size: 14px;
  border-radius: 3px;
  border:none;
  color:white;
  background-color:#FA4E28 ;
  float: left;
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 5px;
}
.btn4:hover{
  background-color:#FC6F4F;
}
.page{
  text-align: center;
}
@media screen and (min-width: 640px) {
  .dispaly1{
    width: 60%;
  }
}

@media screen and (min-width: 900px) {
  .dispaly1{
    width: 50%;
  }
}

@media screen and (min-width: 1200px) {
  .dispaly1{
    width: 35%;
  }
}

@media screen and (min-width: 1400px) {
  .dispaly1{
    width: 30%;
  }
}

@media screen and (min-width: 1500px) {
  .dispaly1{
    width: 25%;
  }
}
</style>

