<template>
  <div class="display1">
    <router-link to="/logistics/restaurant">
      <button class="btn1 btn2" >餐厅管理</button>
    </router-link>
    <button class="btn1"  v-bind:class="{ active: isActive }">使用记录</button>
    <div class="display2">
      <div class="col-md-12">
        <table>
          <tr>
            <th>会议名称</th>
            <th>餐厅名称</th>
            <th>使用理由</th>
            <th>起始日期</th>
            <th>结束日期</th>
            <th>负责人名称</th>
            <th>负责人电话</th>
          </tr>
          <tr v-for="restaurant in restaurantList" :key="restaurant.id">
            <td>{{restaurant.conferenceName}}</td>
            <td>{{restaurant.restaurantName}}</td>
            <td>{{restaurant.useReason}}</td>
            <td>{{restaurant.useStartDate}}</td>
            <td>{{restaurant.useEndDate}}</td>
            <td>{{restaurant.arrangerName}}</td>
            <td>{{restaurant.arrangerPhone}}</td>
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
      <!--<div class="col-md-12">-->
        <!--<button class="btn3 icon-sousuo">搜索</button>-->
      <!--</div>-->
    </div>
  </div>

</template>

<script>
  export default {
    name: 'bus',
    data() {
      return {
        restaurantList: [
          {
            id: 1,
            conferenceId: '1',
            conferenceName: '第一次会议',
            restaurantId:"1",
            restaurantName:"一食堂",
            useReason:"参会",
            useStartDate:"2019-09-10",
            useEndDate:"2019-09-12",
            arrangerName:"陈1",
            arrangerPhone:"152123454"
          },
          {
            id: 2,
            conferenceId: '1',
            conferenceName: '第一次会议',
            restaurantId:"1",
            restaurantName:"一食堂",
            useReason:"参会",
            useStartDate:"2019-09-10",
            useEndDate:"2019-09-12",
            arrangerName:"陈1",
            arrangerPhone:"152123454"
          },
          {
            id: 3,
            conferenceId: '1',
            conferenceName: '第一次会议',
            restaurantId:"1",
            restaurantName:"一食堂",
            useReason:"参会",
            useStartDate:"2019-09-10",
            useEndDate:"2019-09-12",
            arrangerName:"陈1",
            arrangerPhone:"152123454"
          },
          {
            id: 4,
            conferenceId: '1',
            conferenceName: '第一次会议',
            restaurantId:"1",
            restaurantName:"一食堂",
            useReason:"参会",
            useStartDate:"2019-09-10",
            useEndDate:"2019-09-12",
            arrangerName:"陈1",
            arrangerPhone:"152123454"
          }
        ],
        currentpage: 1,//当前页
        totlepage: 1,//总页数
        visiblepage:5,//可见页数
        isActive:true
      }
    },
    methods: {
      getHotelInfo:function(){
        //这里写请求的代码
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
      seeHotelRoom:function (id) {
        this.$router.push({ name: 'seeHotelRoom', params: { hotelId: id }})
      },
      delHotel:function (id) {
        //写删除酒店请求
        this.getHotelInfo();
      },
      addHotel:function () {
        this.$router.push({ path: '/logistics/seeHotelRoom'})
      }
    },
    mounted() {
      this.getHotelInfo();
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
  table{
    border-collapse: collapse;
    width:100%;
    margin-top: 10px;
    margin-left: 20px;
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
  .btn3{
    width:80px;
    padding:7px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#338FFC ;
    margin-left: 15px;
    margin-right: 15px;
    margin-top:13px;
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
    margin-top: 13px;
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
