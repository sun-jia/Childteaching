<template>
  <div id="halfHeight1" index="01" class="d_jump" title="负责人信息">
    <div class="listname">负责人<i class="el-icon-menu" style="padding-left:5px;"></i></div>
    <div class="dutyPerson">
      <table>
        <tr>
          <th v-for="item in duty">{{ item.moduleName }}</th>
        </tr>
        <tr>
          <td v-for="item in duty">{{ item.userName }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "infor-lead",
    props:["propdata"],
    data(){
      return{
        duty:this.propdata.module
      }
    },
    watch: {
      propdata: {
        handler(newValue, oldValue) {
          console.log(newValue)
          this.duty=newValue.module;
        },
        deep: true
      }
    },
  }
</script>

<style lang="scss" scoped="scoped" type="text/css">
  .dutyPerson{
    height:100px;
  }
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
