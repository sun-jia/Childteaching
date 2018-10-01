<template>
  <div class="display1">
    <button class="btn1 btn2" >
      添加房间
      <router-link to="/logistics/hotel" v-bind:style="{ fontSize: '14px' }">
        (返回列表)
      </router-link>
    </button>
    <div class="display2">
      <div class="col-md-12">
        <h3>
          酒店名称：
          <input type="text" v-model="roomList.hotelName" />
        </h3>
        <div class="roomContainer">
          <div class="roomType">单人间</div>
          <div class="roomContent">
            <input type="text" v-model="roomList.siginalList" />
          </div>
        </div>
        <hr>
        <div class="roomContainer">
          <div class="roomType">双人标间</div>
          <div class="roomContent">
            <input type="text" v-model="roomList.dobuleList" />
          </div>
        </div>
        <hr>
        <div class="roomContainer">
          <div class="roomType">大床房</div>
          <div class="roomContent">
            <input type="text" v-model="roomList.bigList" />
          </div>
        </div>
        <hr>
        <div class="roomContainer">
          <div class="roomType">三人房</div>
          <div class="roomContent">
            <input type="text" v-model="roomList.threeList" />
          </div>
        </div>
      </div>
      <button class="btn3">保存</button>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'bus',
    data() {
      return {
        roomList: {
          hotelName:"",
          siginalList:[],
          dobuleList:[],
          bigList:[],
          threeList:[]
        },
        isActive:true
      }
    },
    methods: {
      getHotelInfo:function(){
        //这里写请求的代码
      },
    },
  }
</script>

<style scoped>
  input{
    padding: 0 10px;
    margin: 0;
    height: 28px;
    line-height: 28px;
    width: 50%;
  }
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
    margin: 0;
  }
</style>
