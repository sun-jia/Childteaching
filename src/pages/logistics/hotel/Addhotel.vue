<template>
  <div >
    <div class="top">
      <span class="">填写酒店信息</span>
      <hr>
    </div>
    <div class="form">
      <span >酒店名称：<input v-model="hotelName" placeholder=""></span> <br>
      <span >联系电话：<input v-model="hotelTel" placeholder=""></span> <br>
      <span >负责人：<input v-model="charger" placeholder=""></span> <br>
      <span >酒店位置：<input v-model="position" placeholder=""></span> <br>
    </div>
    <button  class="btn2 icon-huanyihuan" v-on:click="reset()">重置</button>
    <button  class="btn1 icon-duigou"  v-on:click="submit(hotelName,hotelTel,charger,position)">确认</button>
  </div>
</template>

<script>
    export default {
      name: "Addhotel",
      data(){
        return {
          hotelName:'',
          hotelTel:'',
          charger:'',
          position:'',
        }
      },
      methods:{
        reset:function(){
          this.hotelName='';
          this.hotelTel='';
          this.charger='';
          this.position='';
        },
        submit:function (hotelName,hotelTel,charger,position) {
          console.log(hotelName,hotelTel,charger,position);
          if (hotelName!=''&&hotelTel!=''&&charger!=''&&position!=''){
            this.$http.post('/yii/logistics/hotel/inserthoteldata', {
                name:hotelName,
                tel:hotelTel,
                charger:charger,
                position:position
            }).then(function(res){
              alert("酒店信息添加成功！");
              window.location.href = '/logistics/hotel'
            });
          }else {
            if (hotelName==''){
              alert("酒店名称不能为空！");
            }else if (hotelTel==''){
              alert("联系号码不能为空！");
            }else if (charger==''){
              alert("负责人不能为空！");
            }else if (position==''){
              alert("酒店位置不能为空！");
            }
          }
        }
      }
    }
</script>

<style scoped>
  .top{
    font-size: 20px;
    font-weight: bold;
    padding-top:20px;
    padding-left: 20px;
  }
  .form{
    padding:20px 0px 20px 20px;
    border:solid 1px #EBEBEC;
    background-color: #F7F7F7;
    width:90%;
    font-size: 16px;
  }
  input{
    width:110px;
    margin-top: 8px;
    font-size: 14px;
  }
  select{
    margin-top: 8px;
    font-size: 14px;
  }
  .btn1{
    width:80px;
    padding:7px;
    font-size: 16px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#338FFC ;
    margin-left: 20px;
    margin-top: 15px;
    /*margin-bottom: 5px;*/
  }
  .btn1:hover{
    background-color:#5FA7FE;
  }
  .btn2{
    width:80px;
    padding:7px;
    font-size: 16px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#898989;
    /*float: right;*/
    margin-left: 20px;
    margin-top: 5px;
    /*margin-bottom: 5px;*/
  }
  .btn2:hover{
    background-color:#A5A5A5;
  }
</style>
