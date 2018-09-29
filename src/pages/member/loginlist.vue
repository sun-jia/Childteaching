<template>
  <div class="display1">
   <router-link  to="/member/list"> <button class="btn1 " >成员信息列表</button></router-link>
   <button class="btn1 btn2"  v-bind:class="{ active: isActive }">成员登入列表</button>
   <div class="display2">
     <div class="searchuser">
      <button class="btn3 icon-sousuo" v-on:click="searchu(inputuser1,value3)">搜索</button>
      <button type="button" class="btn4 icon-daochu" id="export-table" v-on:click="exportUserExcel(inputuser1,value3)">导出</button>
      <router-link to="/member/add"><button class="btn3">添加成员</button></router-link>
    </div>
    <router-view/>
    <table >
      <tr>
        <th>用户名<input class="input1" v-model="inputuser1" placeholder="搜索用户" style="font-size:14px;width:80px"></th>
        <th>密码</th>
        <th>令牌</th>
        <th>类别</th>
        <th>更新时间</th>
        <th>创建时间</th>
        <th>密码修改</th>
        <th>删除用户</th>
      </tr>
      <tr v-for=" user in userList">
        <td>{{user.username}}</td>
        <td>{{user.password_hash}}</td>
        <td>{{user.access_token}}</td>
        <td>{{user.kind}}</td>
        <td>{{user.updated_at}}</td>
        <td>{{user.created_at}}</td>
        <td style="color: #00AAFF"><el-button type="text" v-on:click="jump(user.id)">密码修改</el-button></td>
        <td>
          <span v-on:click="deletechange(user.username)" ><i class="delete icon-changyonggoupiaorenshanchu" ></i></span>
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
      <li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>
    </ul>
  </div>
</div>

</div>

</template>

<script>

 import passchange from './passchange'
 export default {

  data () {


    return {
      userList:[


      {

        username: '张子璇',
        password_hash: 123456,
        access_token:123456,
        kind:1,
        updated_at:'2015/10/11',
        created_at:'2018/09/10',
        status:'10'


      },
      {

        username: '章紫萱',
        password_hash: 123456,
        access_token:123456,
        kind:1,
        updated_at:'2012/10/11',
        created_at:'2018/09/10',
        status:'10'


      },
      {

       username: '张子轩',
       password_hash: 123456,
       access_token:123456,
       kind:1,
       updated_at:'2015/12/11',
       created_at:'2018/09/10',
       status:'10'


     }

     ],
     currentpage:1,
     isActive: true,
     totlepage: 9,
     value3:'',
     endTime: '',
     startTime: '',
     visiblepage: 10,
     inputuser1:'',
     showcom: false
   }
 },

 components:{



 },
    //方法中可以设置数据处理和数据的获取等等
    methods: {
      getMember () {
        this.$http.get('/yii/user/list')//代替http://localhost:3000/list
        .then((res) => {
          console.log(res.data)
          this.userList = res.data
        }, (err) => {
          console.log(err)
        })
      },
      jump:function(a1)
      {

      this.$router.push({path:'/member/passchange',query:{id:a1}});

      },
      searchu: function (a1, a2) {
        if(a2.length!=0){
          this.startTime=a2[0];
          this.endTime=a2[1];
        }
        console.log(this.startTime);
        let fd = new FormData();
          fd.append('username', a1);//传用户名
          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          this.$http.post('/yii/user/querydata', fd).then(body => {
            this.userList = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.userList);
          })
        },
        deletechange: function (a) {
          var msg = "您确定要删除吗？";  
          if (confirm(msg)==true){  
           return true;
           console.log(a);
           this.axios.get("/yii/member/deletedata?id="+a).then(function(res){
            console.log(res.data);
            if(res.data==1){
             location.reload();
           }
         })
           .catch(function (error) {
            console.log(error);
          });  
         }else{  
          return false;  
        }  

      },
        pageChange: function(page){//分页
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          if(a6.length!=0){
            this.startTime=a6[0];
            this.endTime=a6[1];
          }
          console.log(this.startTime);
          let fd = new FormData();

          fd.append('page', this.currentpage);//传当前页

          this.$http.post('/yii/member/querydata', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.userList);
          })
        },
        prepage:function(page){//上一页
          page--;
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          if(a6.length!=0){
            this.startTime=a6[0];
            this.endTime=a6[1];
          }
          console.log(this.startTime);
          let fd = new FormData();

          fd.append('page', this.currentpage);//传当前页

          // console.log(fd.getAll('NAME'));
          // console.log(fd.getAll('ENDDATE'));
          this.$http.post('/yii/member/querydata', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.userList);
          })
        },
        nextpage:function(page){//下一页


          page++;
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          if(a6.length!=0){
            this.startTime=a6[0];
            this.endTime=a6[1];
          }

          // console.log(this.startTime);
          let fd = new FormData();

          fd.append('page', this.currentpage);//传当前页


          this.$http.post('/yii/member/querydata', fd).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.userList);
          })
        },
        exportUserExcel(a1, a2) {
          if(a2.length!=0){
            this.startTime=a2[0];
            this.endTime=a2[1];
          }
          let fd = new FormData();

          fd.append('username', a1);//传用户名

          fd.append('STARTDATE', this.startTime);//传开始时间
          fd.append('ENDDATE', this.endTime);//传结束时间
          fd.append('page', this.currentpage);//传当前页
          fd.append('type',this.type);//传类型
          this.$http.post('/yii/user/expormember', fd).then(body => {
            this.excelData = body.data.data;
            console.log(this.excelData);
            require.ensure([], () => {
              const { export_json_to_excel } = require('@/excel/Export2Excel.js');//引入文件
              const tHeader = [ '用户名','密码', '令牌','类别','更新时间','创建时间'];
              // 上面设置Excel的表格第一行的标题
              const filterVal = [ 'username', 'password_hash','access_token','kind','updated_at','created_at'];
              // 上面的index、phone_Num、school_Name是tableData里对象的属性
              const list = this.excelData;  //把data里的tableData存到list
              // console.log(list);
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, '成员登入表单');
            })
          })
        },
        formatJson(filterVal, jsonData) {
          console.log(jsonData);
          return jsonData.map(v => filterVal.map(j => v[j]));
        },





      },
    //生命周期钩子中可以进行初始数据的获取
    created(){
      this.getMember()
    },
    //组件被激活时调用
    // activated(){
    //   this.getMember()
    // }
    // 
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
      text-align: center;
      
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
  .delete:hover{
    color:#C1C1C2
  }
  .display2{
    border:solid 2px  #e0e0e0;
    height: 500px;
    /*text-align: center;*/
    width: 98%;
    padding-left:2px;
    padding-right:2px;
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
.active{
  background: #e0e0e0;
}
.btn2{
  margin-left: 0px;
}
.page{
  text-align: center;
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
</style>

