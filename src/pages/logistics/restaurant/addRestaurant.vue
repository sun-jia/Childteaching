<template>
  <div class="display1">
    <button class="btn1 btn2" >
      添加餐厅
      <router-link to="/logistics/restaurant" v-bind:style="{ fontSize: '14px' }">
        (返回列表)
      </router-link>
    </button>
    <div class="display2">
      <div class="col-md-12">
        <h3>
          餐厅名称：
          <input type="text" v-model="restaurant.name" />
        </h3>
        <div class="restaurantContainer">
          <div class="restaurantType">餐厅地址</div>
          <div class="restaurantContent">
            <input type="text" v-model="restaurant.site" />
          </div>
        </div>
        <hr>
        <div class="restaurantContainer">
          <div class="restaurantType">餐厅容纳人数</div>
          <div class="restaurantContent">
            <input type="text" v-model="restaurant.maxNum" />
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
        restaurant: {
          name:"",
          site:"",
          maxNum:""
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
  .restaurantType{
    width: 10%;
    display:inline-block;
    line-height: 30px;
    min-height: 30px;
    background: #eee;
    margin: 0;
  }
  .restaurantContent{
    width: 70%;
    display:inline-block;
    line-height: 30px;
    min-height: 60px;
    margin: 0;
  }
</style>
