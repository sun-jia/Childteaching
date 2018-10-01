<template>
  <div class="display1">
    <router-link  to="/bus"> <button class="btn1 " >酒店管理</button></router-link>
    <button class="btn1 btn2"  v-bind:class="{ active: isActive }">订单管理</button>
    <div class="display2">
      <div class="meeting" >
        <span style="color:#fff;">搜索会议：</span><input  v-model="hotelLoc" placeholder="输入会议名称" style="font-size:14px;width:300px;font-weight: lighter">
      </div>
      <button class="btn3 icon-sousuo" v-on:click="">搜索</button>
      <router-link to="/logistics/hotel/addhotel">
        <button class="btn4 icon-jiajianzujianjiahao" > 酒店添加</button>
      </router-link>
      <table >
        <tr>
          <th>序号</th>
          <th>酒店名称
            <input  v-model="hotelName" placeholder="搜索" style="font-size:14px;width:200px;">
          </th>
          <th>酒店位置
            <input class="input1" v-model="hotelLoc" placeholder="搜索" style="font-size:14px;">
          </th>
          <th>房间信息
            <input class="input1" v-model="hotelManager" placeholder="搜索" style="font-size:14px;">
          </th>
          <th>负责人
            <input class="input1" v-model="hotelManager" placeholder="搜索" style="font-size:14px;">
          </th>
          <th>联系电话
            <input class="input1" v-model="hotelTel" placeholder="搜索" style="font-size:14px;">
          </th>
          <th>房间添加</th>
          <th>修改</th>
          <th>删除</th>
        </tr>
        <tr v-for="(hotel,index) in hotelInfo">
          <td>{{(currentpage-1)*8+index+1}}</td>
          <td>{{hotel.name}}</td>
          <td>{{hotel.position}}</td>
          <td v-if="roomInfo[(currentpage-1)*8+index].length==0">尚无可用房间</td>
          <td v-if="roomInfo[(currentpage-1)*8+index].length!=0">
            <router-link :to="{path:'/logistics/hotel/Roomlist',query:{hotelId:hotel.id,hotelName:hotel.name}}">房间详情</router-link>
            <!--<el-popover placement="right" width="800" trigger="click">-->
              <!--<table>-->
                <!--<tr>-->
                  <!--<th>序号</th>-->
                  <!--<th>房间号码</th>-->
                  <!--<th>房间类型</th>-->
                  <!--<th>容纳人数</th>-->
                  <!--<th>房间价格</th>-->
                <!--</tr>-->
                <!--<tr v-for="(room,index) in roomInfos">-->
                  <!--<td>{{index+1}}</td>-->
                  <!--<td>{{room.roomNumber}}</td>-->
                  <!--<td>{{room.type}}</td>-->
                  <!--<td>{{room.capacity}}</td>-->
                  <!--<td>{{room.price}}</td>-->
                <!--</tr>-->
              <!--</table>-->
              <!--<span class="el-icon-document" style="padding: 5px 18px" slot="reference" v-on:click="roomView(hotel.id)"></span>-->
            <!--</el-popover>-->
          </td>
          <td>{{hotel.charger}}</td>
          <td>{{hotel.tel}}</td>
          <td>
            <router-link :to="{path:'/logistics/hotel/Alterhotel',query:{hotelId:hotel.id,hotelName:hotel.name}}"><i class="el-icon-plus"></i></router-link>
          </td>
          <td>
            <router-link :to="{path:'/logistics/hotel/Addroom',query:{hotelId:hotel.id}}"><i class="el-icon-edit"></i></router-link>
          </td>
          <td>
            <i v-on:click="deleteHotelData(hotel.id)" class="el-icon-delete"></i>
          </td>
        </tr>
      </table>
      <!--<div class="page">-->
        <!--<ul class="pagination pagination-sm">&lt;!&ndash;分页&ndash;&gt;-->
          <!--<li class="page-item" v-if="currentpage!=1"><a class="page-link" href="#" v-on:click="prepage(currentpage)">上一页</a></li>-->
          <!--<li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage == index} ">-->
            <!--<a class="page-link" href="#" v-on:click="pageChange(index)">{{index}}</a>-->
          <!--</li>-->
          <!--<li class="page-item" v-if="currentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage(currentpage)">下一页</a></li>-->
          <!--<li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>-->
        <!--</ul>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import myDatepicker from 'vue-datepicker2'; //引入对应的组件
  export default {
    name: 'bus',
    data() {
      return {
        hotelInfo:[],
        roomInfo:[],
        roomInfos:[],
        hotelName:'',
        hotelManager:'',
        hotelTel:'',
        hotelLoc:'',
        currentpage:1,
        totalpage:'',
        isActive:true
      }
    },
    methods: {
      getHotelData:function(){
        this.$http.get('/yii/logistics/hotel/gethoteldata?page=1').then(res => {
          console.log(res.data);
          this.hotelInfo = res.data.data[0];
          this.totalpage=res.data.data[1];
          this.roomInfo=res.data.data[2];
        }).catch(function (error) {
          console.log(error);
        });
      },
      deleteHotelData:function (hotelId) {
        console.log(hotelId);
        this.$http.post('/yii/logistics/hotel/deletehoteldata', {id: hotelId}).then(function (res) {
          location.reload();
        })
      },
      roomView(hotelId){
        let that=this;
        this.$http.post('/yii/logistics/room/getroomdata',{hotelId:hotelId}).then(function (res) {
          // that.roomInfo=[];
          console.log(res.data);
          that.roomInfos=res.data.data;
          console.log(that.roomInfo);
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    components: {
      'date-picker': myDatepicker
    },
    mounted() {
      this.getHotelData();
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
