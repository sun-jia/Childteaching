<template>
  <div class="display1">
    <router-link  to="/money"> <button class="btn1 " >订单管理</button></router-link>
    <button class="btn1 btn2"  v-bind:class="{ active: isActive }">发票管理</button>
    <!--<button class="btn3 icon-sousuo">搜索</button>-->
    <div class="display2">
        <div class="meeting" >
          <span style="color:#fff;">搜索会议：</span><input  v-model="inputmeeeting2" placeholder="输入会议名称" style="font-size:14px;width:300px;font-weight: lighter">
        </div>
        <button class="btn3 icon-sousuo" v-on:click="searcha()">搜索</button>
        <router-link to="/neworder"><button class="btn4 icon-jiajianzujianjiahao" > 新建发票</button></router-link>
        <router-view/>
        <table >
          <tr>
            <th>姓名
              <input class="input1" v-model="inputname2" placeholder="搜索姓名" style="font-size:14px;">
              <!--<p>{{inputname2}}</p>//测试-->
            </th>
            <th>身份证号
              <input  v-model="inputidentity2" placeholder="输入身份证号" style="font-size:14px;width:200px;">
              <!--<p>{{inputidentity2}}</p>//测试-->
            </th>
            <th>单位
              <input class="input1" v-model="inputcompany" placeholder="搜索单位" style="font-size:14px;">
              <!--<p>{{inputcompany}}</p>//测试-->
            </th>
            <th>金额
              <input class="input1" v-model="inputmoney2" placeholder="输入金额" style="font-size:14px;">
              <!--<p>{{inputmoney2}}</p>//测试-->
              <i v-show="moneysort" class="sort icon-paixushengxu" v-on:click="moneyup()"></i>
              <i v-show="!moneysort" class="sort icon-paixujiangxu" v-on:click="moneydown()"></i>
            </th>
            <th>收款明细
              <select v-model="kindselected2"  style="font-size:14px;">
                <option disabled value="">选择</option>
                <option value="1" >住宿</option>
                <option value="2">会费</option>
              </select>
              <!--<p>{{kindselected}}</p>//测试-->
            </th>
            <th>日期
              <date-picker  v-model="startTime2" :option="option"   ></date-picker>--
              <date-picker  v-model="endTime2" :option="option" :limit="limit" ></date-picker>
              <!--<p>开始日期{{startTime}}结束日期{{endTime}}</p>//测试-->
              <i v-show="datesort" class="sort icon-paixushengxu" v-on:click="dateup()"></i>
              <i v-show="!datesort" class="sort icon-paixujiangxu" v-on:click="datedown()"></i>
            </th>
          </tr>
          <tr v-for="detial in invoiceDel">
            <td>{{detial.name}}</td>
            <td>{{detial.IDENTITY}}</td>
            <td>{{detial.company}}</td>
            <td>{{detial.amount}}</td>
            <td>{{detial.accounts}}</td>
            <td>{{detial.date}}</td>
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
    import myDatepicker from 'vue-datepicker2'; //引入对应的组件
    export default {
      name: 'invoice',
      data() {
        return {
          invoiceDel: [
            {name: 'ring', IDENTITY: 25544885, company: '华中师范大学', amount: 200, accounts: '住宿', date: '20180725'},
            {name: 'ling', IDENTITY: 25435885, company: '北京师范大学', amount: 500, accounts: '会费', date: '20180830'},
            {name: 'xu', IDENTITY: 15674885, company: '华东师范大学', amount: 400, accounts: '住宿', date: '20180727'}
          ],
          moneysort:true,//金额排序
          datesort:true,//日期排序
          showmoney: true,
          showinvoice: false,
          showFirstText:true,//显示上一页
          showNextText:true,//显示下一页
          inputmeeeting2:'',//输入会议名称
          inputname2: '',//输入姓名
          inputidentity2: '',//输入身份证号
          inputcompany: '',//发票单位
          inputmoney2: '',//输入金额
          kindselected2: '',//费用下拉列表
          payselected2: '',//支付下拉列表
          startTime2: '',
          endTime2: '',
          isActive:true,
          type:1,//排序类型，默认日期降序，2为日期升序，3为金额降序，4为金额升序
          currentpage: 1,//当前页
          totlepage: 28,//总页数
          visiblepage:10,//可见页数
          option: {
            type: 'day',
            week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            format: 'YYYY-MM-DD',
            placeholder: '选择日期',
            inputStyle: {
              'display': 'inline-block',
              'padding': '3px',
              'line-height': '22px',
              'font-size': '14px',
              'border': '2px solid #fff',
              'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
              'border-radius': '2px',
              'color': '#5F5F5F',
              'width': '90px',
            },
            color: {
              header: '#ccc',
              headerText: '#f00'
            },
            buttons: {
              ok: 'Ok',
              cancel: 'Cancel'
            },
            overlayOpacity: 0.5, // 0.5 as default
            dismissible: true // as true as default
          },
          timeoption: {
            type: 'min',
            week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            format: 'YYYY-MM-DD HH:mm'
          },
          multiOption: {
            type: 'multi-day',
            week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            format: "YYYY-MM-DD HH:mm"
          },
          limit: [
            //   {
            //   type: 'weekday',
            //   available: [1, 2, 3, 4, 5]
            // },
            {
              type: 'fromto',
              from: this.start,
              to: this.nowTime,
            }],
          dateBodyClass: 'date-body'
        }
      },
      methods: {
        deletechange: function (a) {
          console.log(a);
          this.axios.get("http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/deletedata?DATAID="+a).then(function(res){
            console.log(res.data);
            if(res.data==1){
              location.reload();
            }
          })
            .catch(function (error) {
              console.log(error);
            });
        },
        searcha: function (a1, a2, a3, a4, a5, a6, a7) {
          let fd = new FormData();
          fd.append('NAME', a1);//传姓名
          fd.append('IDENTITY', a2);//传身份证号
          fd.append('MONEY', a3);//传金额
          fd.append('ACCOUNT_TYPE', a4);//传收款类型
          fd.append('ACCOUNT_MODE', a5);//传收款方式
          fd.append('STRTDATE', a6);//传开始时间
          fd.append('ENDDATE', a7);//传结束时间
          this.$http.post('http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/querydata', fd).then(body => {
            this.details = body.data.data;
          })
        },
        moneyup:function(){//金额升序
          this.type=4;
          this.moneysort=!this.moneysort;
          console.log(this.moneysort);
          this.axios.get("http://192.168.1.100/clubApi/backend/web/index.php/finance/page?page="+this.currentpage+"&&type="+this.type).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
          })
        },
        moneydown:function(){//金额降序
          this.type=3;
          this.moneysort=!this.moneysort;
          console.log(this.moneysort);
          this.axios.get("http://192.168.1.100/clubApi/backend/web/index.php/finance/page?page="+this.currentpage+"&&type="+this.type).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
          })
        },
        dateup:function () {//日期升序
          this.type=2;
          console.log(this.type);
          this.datesort=!this.datesort;
          console.log(this.datesort);
          this.axios.get("http://192.168.1.100/clubApi/backend/web/index.php/finance/page?page="+this.currentpage+"&&type="+this.type).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
          })
        },
        datedown:function () {//日期降序
          this.type=1;
          this.datesort=!this.datesort;
          console.log(this.datesort);
          this.axios.get("http://192.168.1.100/clubApi/backend/web/index.php/finance/page?page="+this.currentpage+"&&type="+this.type).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
          })
        },
        pageChange: function(page){//分页
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          this.axios.get("http://192.168.1.100/clubApi/backend/web/index.php/finance/page?page="+page+"&&type="+this.type).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.details);
          })//测试
        },
        prepage:function(page){//上一页
          page--;
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          this.axios.get("http://192.168.1.100/clubApi/backend/web/index.php/finance/page?page="+page+"&&type="+this.type).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.details);
          })//测试
        },
        nextpage:function(page){//上一页
          page++;
          if (this.currentpage != page) {
            this.currentpage = page;
            // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
          }
          console.log(page);
          this.axios.get("http://192.168.1.100/clubApi/backend/web/index.php/finance/page?page="+page+"&&type="+this.type).then(body => {
            this.details = body.data.data.pageall;
            this.totlepage = body.data.data.totlepage;
            console.log(this.details);
          })//测试
        },
      },
      components: {
        'date-picker': myDatepicker
      },
      mounted() {
        this.axios.get("http://192.168.1.100/clubApi/backend/web/index.php/finance/page?page=1&&type="+this.type).then(body => {
          this.details = body.data.data.pageall;
          this.totlepage = body.data.data.totlepage;
          console.log(this.details);
        })//测试
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
    padding:5px;
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
    width:80px;
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
    margin-left: 15px;
    margin-top:13px;
    /*margin-bottom: 5px;*/
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
    float: right;
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
