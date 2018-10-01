<template>
  <div >
    <div class="top">
      <span class="">填写房间信息信息</span>
      <hr>
    </div>
    <div class="form">
      <span >酒店名称：</span> <br>
      <span >房间号码：<input v-model="hotelTel" placeholder=""></span> <br>
      <span >房间类型：<input v-model="charger" placeholder=""></span> <br>
      <span >容纳人数：<input v-model="position" placeholder=""></span> <br>
      <span >房间价格：<input v-model="position" placeholder=""></span> <br>
    </div>
    <button  class="btn2 icon-huanyihuan" v-on:click="reset()">重置</button>
    <button  class="btn1 icon-duigou"  v-on:click="submit(hotelName,hotelTel,charger,position)">确认</button>
  </div>
</template>

<script>
    export default {
      name: "Addroom",
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

</style>
