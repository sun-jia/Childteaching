<template>
  <div class="display1">
    <button class="btn1 "  v-bind:class="{ active: isActive }">餐厅管理</button>
    <router-link to="/logistics/historyRestaurant">
      <button class="btn1 btn2"  >使用记录</button>
    </router-link>
    <div class="display2">
      <div class="col-md-12">
        <table>
          <tr>
            <th>餐厅名称</th>
            <th>餐厅电话</th>
            <th>负责人</th>
            <th>地理位置</th>
            <th>容纳人数</th>
            <th>操作</th>
          </tr>
          <tr v-for="restaurant in restaurantList" :key="restaurant.id">
            <td>{{restaurant.name}}</td>
            <td>{{restaurant.tel}}</td>
            <td>{{restaurant.charger}}</td>
            <td>{{restaurant.position}}</td>
            <td>{{restaurant.capacity}}</td>
            <td>
              <span v-on:click="delRestaurantInfo(restaurant.id)" ><i class="delete icon-changyonggoupiaorenshanchu" ></i></span>
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
      <div class="col-md-12">
        <button class="btn4 icon-jiajianzujianjiahao" v-on:click="addRestaurantInfo()">添加餐厅</button>
        <button class="btn3 icon-sousuo">搜索</button>
      </div>
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
            name: '一食堂',
            tel: 12345678,
            charger: "陈一",
            money: 100,
            position: "桂园路",
            capacity:120
          },
          {
            id: 2,
            name: '二食堂',
            tel: 12345678,
            charger: "陈二",
            money: 123,
            position: "桂园路",
            capacity:120
          },
          {
            id: 3,
            name: '三食堂',
            tel: 12345678,
            charger: "陈三",
            money: 132,
            position: "桂园路",
            capacity:120
          },
          {
            id: 4,
            name: '四食堂',
            tel: 12345678,
            charger: "陈四",
            money: 121,
            position: "桂园路",
            capacity:120
          }
        ],
        currentpage: 1,//当前页
        totlepage: 1,//总页数
        visiblepage:5,//可见页数
        isActive:true
      }
    },
    methods: {
      getRestaurantInfo:function(){
        //这里写请求的代码
      },
      pageChange: function(page){//分页
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.getRestaurantInfo();
      },
      prepage:function(page){//上一页
        page--;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.getRestaurantInfo();
      },
      nextpage:function(page){//上一页
        page++;
        if (this.currentpage != page) {
          this.currentpage = page;
        }
        this.getRestaurantInfo();
      },
      delRestaurantInfo:function (id) {
        //写删除酒店请求
        this.getRestaurantInfo();
      },
      addRestaurantInfo:function () {
        this.$router.push({ path: '/logistics/addRestaurant'})
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
