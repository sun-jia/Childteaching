<template>
  <div class="display1">
    <button class="btn1 btn2" >
      房间管理
      <router-link to="/logistics/hotel" v-bind:style="{ fontSize: '14px' }">
        (返回列表)
      </router-link>
    </button>
    <div class="display2">
      <div class="col-md-12">
        <h3>酒店名称：{{ roomList.hotelName }}</h3>
        <div class="roomContainer">
          <div class="roomType">单人间</div>
          <div class="roomContent">{{ roomList.siginalList.toString() }}</div>
        </div>
        <hr>
        <div class="roomContainer">
          <div class="roomType">双人标间</div>
          <div class="roomContent">{{ roomList.dobuleList.toString() }}</div>
        </div>
        <hr>
        <div class="roomContainer">
          <div class="roomType">大床房</div>
          <div class="roomContent">{{ roomList.bigList.toString() }}</div>
        </div>
        <hr>
        <div class="roomContainer">
          <div class="roomType">三人房</div>
          <div class="roomContent">{{ roomList.threeList.toString() }}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'bus',
    data() {
      return {
        roomList: {
          id: 1,
          hotelId:"1",
          hotelName:"七天",
          siginalList:["101"],
          dobuleList:["202"],
          bigList:["302"],
          threeList:["402"]
        },
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
  .roomType{
    width: 10%;
    display:inline-block;
    line-height: 30px;
    min-height: 30px;
    background: #eee;
    margin: 0;
  }
  .roomContent{
    width: 70%;
    display:inline-block;
    line-height: 30px;
    min-height: 60px;
    border: 1px solid #eee;
    margin: 0;
  }
</style>
