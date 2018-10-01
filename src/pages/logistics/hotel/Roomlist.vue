<template>
  <div class="display1">
    <!--<router-link  to="/logistics/bus"> <button class="btn1 " >车辆管理</button></router-link>-->
    <button class="btn1 btn2"  v-bind:class="{ active: isActive }">房间信息</button>
    <!--<router-link  to="/logistics/Travelrecord"> <button class="btn1 " >出行记录</button></router-link>-->
    <div class="display2">
      <table>
        <tr>
          <th>序号</th>
          <th>房间号</th>
          <th>房间类型</th>
          <th>容纳人数</th>
          <th>价格</th>
          <th>修改</th>
          <th>删除</th>
        </tr>
        <tr v-for="(room,index) in roomInfo">
          <td>{{(currentpage-1)*8+index+1}}</td>
          <td>{{room.roomNumber}}</td>
          <td>{{room.type}}</td>
          <td>{{room.capacity}}</td>
          <td>{{room.price}}</td>
          <td>
            <router-link :to="{path:'/logistics/hotel/Alterroom',query:{id:room.id}}"><i class="el-icon-edit"></i></router-link>
            <router-view/>
          </td>
          <td>
            <!--<i v-on:click="deletedriver(driver.ID)" class="el-icon-delete"></i>-->
          </td>
        </tr>
      </table>
      <div style="text-align: center">
        <!--<span>-->
          <!--<router-link to="/logistics/adddriver"><button class="btn4 icon-jiajianzujianjiahao" >添加司机信息</button></router-link>-->
          <!--<button class="btn3 icon-sousuo" v-on:click="search(inputname,inputsex,inputage,inputidentity,inputtel,timequantum)">搜索</button>-->
        <!--</span>-->
      </div>
      <!--<div class="page">-->
        <!--<ul class="pagination pagination-sm">&lt;!&ndash;分页&ndash;&gt;-->
          <!--<li class="page-item" v-if="currentpage!=1"><a class="page-link" href="#" v-on:click="prepage(inputname,inputsex,inputage,inputidentity,inputtel,currentpage)">上一页</a></li>-->
          <!--<li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage==index} ">-->
            <!--<a class="page-link" href="#" v-on:click="pageChange(inputname,inputsex,inputage,inputidentity,inputtel,index)">{{index}}</a>-->
          <!--</li>-->
          <!--<li class="page-item" v-if="currentpage!=totlepage"><a class="page-link"  href="#"  v-on:click="nextpage(inputname,inputsex,inputage,inputidentity,inputtel,currentpage)">下一页</a></li>-->
          <!--<li class="page-item"><a class="page-link"  href="#">共<i>{{totlepage}}</i>页</a></li>-->
        <!--</ul>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
    import myDatepicker from 'vue-datepicker2'; //引入对应的组件
    var id;
    var hotelName;
    export default {
      name: "Roomlist",
      data() {
        return {
          roomInfo:[],
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
        getRoomData: function (id) {
          this.$http.post('/yii/logistics/room/getroomdata',{
            hotelId: id
          }).then(res => {
            this.roomInfo = res.data.data;
            console.log(this.roomInfo);
          }).catch(function (error) {
            console.log(error);
          });
        },
      },
      components:{
        'date-picker': myDatepicker
      },
      mounted() {
        id=this.$route.query.hotelId;
        // hotelName=this.$route.query.hotelName;
        console.log(id);
        this.getRoomData(id);
      }
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
  .top{
    background: #e0e0e0;
  }
</style>
