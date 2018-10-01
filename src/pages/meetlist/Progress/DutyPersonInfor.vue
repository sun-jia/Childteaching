<template>
  <div class="halfHeight d_jump" index="01"  title="负责人信息">
    <div class="listname">负责人<i class="el-icon-menu" style="padding-left:5px;"></i></div>
    <div class="dutyPerson">
      <table>
        <tr>
          <th>总负责人</th>
          <th>财务负责人</th>
          <th>后勤负责人</th>
          <th>宣传负责人</th>
          <th>交互负责人</th>
        </tr>
        <tr v-for="item in duty">
          <td>{{item.leader}}</td>
          <td>{{item.propaganda}}</td>
          <td>{{item.logistics}}</td>
          <td>{{item.propaganda}}</td>
          <td>{{item.Interaction}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "dutyPersonInfor",
      data(){
        return{
          duty:[
            {
              leader:'老大',
              propaganda:'张三',
              logistics:'李四',
              finance:'王五',
              Interaction:'赵六'
            },
            {
              leader:'老大',
              propaganda:'张五',
              logistics:'李六',
              finance:'王三',
              Interaction:'赵四'
            },
          ] ,
          fullHeight: document.documentElement.clientHeight,//网页高度
        }
      },
      mounted: function () {
        // console.log(this.fullHeight);
        //设置各部分的高度
        // document.getElementById('halfHeight1').style.height=(this.fullHeight/3)+'px';
      },
    }
</script>

<style scoped>
  .listname{
    font-size:18px;
    font-wight:bold;
    color:#fff;
    background-color:#097FC7;
    width:20%;
    height:40px;
    border:solid 1px #097FC7;
    border-radius: 4px;
    padding-top:5px;
    padding-left:3px;
  }
  table{
    border-collapse: collapse;
    width:83%;
    margin-top: 10px;
    margin-left: 0px;
    margin-bottom: 10px;
  }
  th{
    font-size: 14px;
    border:solid 1px #ccc;
    font-weight: bold;
    padding:5px;
    background-color: #F1F1F1;
    text-align: center;
  }
  table,td{
    border:solid 1px #ccc;
    padding:12px;
    text-align: center;
    font-size:14px;
  }
</style>
