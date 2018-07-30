<template>
  <div >
    <div>
      <span>交易信息</span>
      <hr>
    </div>
    <div class="form">
         <span class="span">输入姓名：<input v-model="name" placeholder="如张三"></span><br>
         <span class="span">输入身份证号：<input v-model="identity" placeholder="共18位"></span><br>
        <span class="span">
          收款类型
          <select v-model="account_type"  style="font-size:14px;">
            <option disabled value="">选择</option>
            <option value="1" >住宿</option>
            <option value="2">会费</option>
          </select>
        </span class="span"><br>
        <span class="span">金额：<input v-model="money" placeholder="">元</span><br>
        <span class="span">
          支付方式
          <select v-model="account_mode"  style="font-size:14px;">
            <option disabled value="">选择</option>
            <option value="1" >支付宝</option>
            <option value="2">微信</option>
            <option value="3">银联</option>
          </select>
        </span><br>
        <span class="span">
          收款日期
          <date-picker  v-model="date" :option="option"   ></date-picker>
        </span>
    </div>
  </div>
</template>

<script>
    import myDatepicker from 'vue-datepicker2'; //引入对应的组件
    export default {
        name: "neworder",
      data(){
        return {
          name:'',
          identity:'',
          money:'',
          account_type:'',
          account_mode:'',
          date:'',
          option: {
            type: 'day',
            week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            format: 'YYYY-MM-DD',
            placeholder: '选择日期',
            inputStyle: {
              'display': 'inline-block',
              'padding': '3px',
              'line-height': '22px',
              'font-size': '14px',
              'border': '2px solid #fff',
              'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
              'border-radius': '2px',
              'color': '#5F5F5F',
              'width':'90px',
            },
            color: {
              header: '#ccc',
              headerText: '#f00'
            },
            buttons: {
              ok: 'Ok',
              cancel: 'Cancel'
            },
            overlayOpacity: 0.5, // 0.5 as default
            dismissible: true // as true as default
          },
          timeoption: {
            type: 'min',
            week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            format: 'YYYY-MM-DD HH:mm'
          },
          multiOption: {
            type: 'multi-day',
            week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            format:"YYYY-MM-DD HH:mm"
          },
          // limit: [
            //   {
            //   type: 'weekday',
            //   available: [1, 2, 3, 4, 5]
            // },
            // {
            //   type: 'fromto',
            //   from: this.start,
            //   to:this.nowTime,
            // }
            // ],
          dateBodyClass: 'date-body'
        }
        },
      components: {
        'date-picker': myDatepicker
      }
    }
</script>

<style scoped>
  .form{
    padding:20px 0px 20px 20px;
    border:solid 1px #EBEBEC;
    background-color: #F7F7F7;
  }
  .span{
     margin-top:10px;
     /*padding-top:10px;*/
  }
</style>
