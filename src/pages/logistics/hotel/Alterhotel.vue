<template>
  <div >
    <div class="top">
      <span class="">修改酒店信息</span>
      <hr>
    </div>
    <div class="form">
      <span >酒店名称：<input v-model="hotelInfo.name"></span> <br>
      <span >酒店位置：<input v-model="hotelInfo.position"></span> <br>
      <span >负责人：<input v-model="hotelInfo.charger"></span> <br>
      <span >联系电话：<input v-model="hotelInfo.tel"></span> <br>
    </div>
    <button  class="btn2 icon-huanyihuan" v-on:click="reset()">重置</button>
    <button  class="btn1 icon-duigou"  v-on:click="submit(hotelInfo.id,hotelInfo.name,hotelInfo.position,hotelInfo.charger,hotelInfo.tel)">确认</button>
  </div>
</template>

<script>
  import myDatepicker from 'vue-datepicker2';
  var hotelId;
    export default {
      name: "Alterhotel",
      data(){
        return {
          hotelInfo:[],
          name:'',
          position:'',
          charger:'',
          tel:'',
        }
      },
      methods:{
        geteditdata:function(hotelId){
          let that=this;
          this.$http.post('/yii/logistics/hotel/getedithoteldata',{id:hotelId}).then(function (res) {
            that.hotelInfo=res.data.data;
          })
        },
        reset:function(){
          this.name='';
          this.position='';
          this.charger='';
          this.tel='';
        },

        submit:function (id,name,position,charger,tel) {
          if (name!=''&&position!=''&&charger!=''&&tel!=''){
            this.$http.post('/yii/logistics/hotel/alterhoteldata', {
              id,id,
              name:name,
              position,position,
              charger:charger,
              tel:tel
            }).then
            (function(res){
              if(res.data.data==1){
                alert("酒店信息修改成功！");
                window.location.href = '/logistics/hotel'
              }
            }).catch(function (error) {
              console.log(error);
            });
          }else {
            if (name==''){
              alert("酒店名称不能为空！");
            }else if (position==''){
              alert("酒店位置不能为空！");
            }else if (charger==''){
              alert("负责人不能为空！");
            }else if (tel==''){
              alert("联系电话不能为空！");
            }
          }
        },
      },
      components:{
        'date-picker': myDatepicker
      },
      mounted() {
        hotelId=this.$route.query.hotelId;
        console.log(hotelId);
        this.geteditdata(hotelId);
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

