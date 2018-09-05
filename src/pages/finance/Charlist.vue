<template>
  <div id="display">
    <div>
       <button class="btn5" v-on:click="simple" >简单统计</button>
       <button class="btn5" v-on:click="complex" >复杂统计</button>
       <div class="simple" v-show="s">
         <span style="font-weight: bold;font-size: 18px;">统计对象选择</span><br>
         <button class="btn6" v-on:click="bymoney">金额</button>
         <!--<button class="btn6" v-on:click="bykind">收款类型</button>-->
         <button class="btn6" v-on:click="byway">支付方式</button>
       </div>
       <div class="complex" v-show="p">
         <span style="font-weight: bold;font-size: 18px;">统计对象选择</span><br>
         <span style="font-weight: bold;margin-top: 5px;">自变量X：</span>
         <select v-model="Arguments"  style="font-size:14px;width:150px;">
           <option disabled value="">选择</option>
           <option value="1" >金额</option>
           <option value="2">收款类型</option>
           <option value="3">支付方式</option>
           <option value="4">日期</option>
           <option value="4">会议</option>
           <option value="null">空</option>
         </select>
         <span style="font-weight: bold;margin-left:20px;">因变量Y：</span>
         <select v-model="Dvariable"  style="font-size:14px;width:150px;">
           <option disabled value="">选择</option>
           <option value="1" >金额</option>
           <option value="2">收款类型</option>
           <option value="3">支付方式</option>
           <option value="4">日期</option>
           <option value="4">会议</option>
           <option value="null">空</option>
         </select><br>
         <button class="btn7" v-on:click="statistics(Arguments,Dvariable)">开始统计</button>
       </div>
    </div>
    <div  v-show="visibled">
      <div class="left col-md-2">
        <button class="btn1" v-on:click="line()">折线图</button><br>
        <button class="btn2" v-on:click="bar()">柱状图</button><br>
        <button class="btn3" v-on:click="pie()">饼图</button><br>
        <!--&lt;!&ndash;<button class="btn4" v-on:click="ring()">环形图</button>&ndash;&gt;-->
      </div>
      <div class="right col-md-10">
        <!--<schart class="wrapper" :canvasId="canvasId" :type="type" :data="data" :options="options"></schart>-->
        <div id="myChart" :type="type" :style="{width: '500px', height: '400px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
    // 引入基本模板
    var echarts = require('echarts');
    // let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/bar');
    require('echarts/lib/chart/line');
    require('echarts/lib/chart/pie');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/toolbox');
    export default {
      name: "Charlist",
      data() {
        return {
          Arguments:'',
          Dvariable:'',
          type: 'bar',
          s:true,
          p:false,
          visibled:false,
          key:'',
          value:'',
        }
      },
      mounted(){
        this.drawLine();
      },
      methods: {
        line:function () {
           this.type='line';
           console.log(this.type);
        },
        bar:function () {
          this.type='bar';
          console.log(this.type);
        },
        pie:function () {
          var that=this;
          this.type='pie';
          console.log(this.type);
          // console.log(this.key);
          // console.log(this.value);
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          myChart.setOption({
            title : {
              text: '某站点用户访问来源',
              subtext: '纯属虚构',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:(function(){
                  var res = [];
                  // var len = result.length;
                  for(var i=0;i<that.value.length;i++) {
                    res.push({
                      //通过把result进行遍历循环来获取数据并放入Echarts中
                      name: that.key[i],
                      value: that.value[i]
                    });
                  }
                  return res;
                })()

                  [{
                  value:this.key,
                  name:this.value
                }],
                // [
                //   {value:335, name:'直接访问'},
                //   {value:310, name:'邮件营销'},
                //   {value:234, name:'联盟广告'},
                //   {value:135, name:'视频广告'},
                //   {value:1548, name:'搜索引擎'}
                // ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        },
        // ring:function () {
        //   this.type='ring';
        // },
        simple: function () {
          this.s = true;
          this.p = false;
        },
        complex: function () {
          this.s = false;
          this.p = true;
        },
        bymoney: function () {
          this.visibled = true;
          this.type = 'line';
          this.axios.get("/yii/finance/finance?type=MONEY").then(body => {
           this.data= body.data.data;
           console.log(this.data);
           this.key=this.data.key;
            console.log(this.key);
           this.value=this.data.value;
            console.log(this.value);
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            myChart.setOption({
              title: {text: '金额分布统计'},
              legend: {
                data:['金额分布']
              },
                xAxis: {
                  data: this.key
                },
                series: [{
                  // 根据名字对应到相应的系列
                  name: '金额分布',
                  data: this.value
                }]
              })
         })
        },
        bykind: function () {
          this.visibled = true;
          this.type = 'line';
        },
        byway: function () {
          this.visibled = true;
          this.type = 'line';
          this.axios.get("/yii/finance/finance?type=ACCOUNT_MODE").then(body => {
            this.data= body.data.data;
            console.log(this.data);
            this.key=this.data.key;
            // console.log(this.key);
            this.value=this.data.value;
            // console.log(this.value);
            for(var i=0;i<this.key.length;i++){
              if(this.key[i]==1){
                this.key[i]='支付宝';
              }else if(this.key[i]==2){
                this.key[i]='微信';
              }else if(this.key[i]==3){
                this.key[i]='银联';
              }else{
                this.key[i]='线下';
              }
              console.log(this.key[i]);
            }
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            myChart.setOption({
              title: {text: '支付方式统计'},
              legend: {
                data:['支付方式']
              },
              xAxis: {
                data: this.key
              },
              series: [{
                // 根据名字对应到相应的系列
                name: '支付方式',
                data: this.value
              }]
            })
          })
        },
        statistics: function (a, b) {
          this.visibled = true;
          this.type = 'line';
          // fd.append('', a);//传自变量
          // fd.append('',b);//传因变量
          // this.$http.post('http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/', fd).then(body => {
          //   this.data = body.data.data;
          // })
        },
        drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            // title: {text: '在Vue中使用echarts'},
            tooltip: {},
            toolbox: { //可视化的工具箱
              show: true,
              feature: {
                dataView: { //数据视图
                  show: true
                },
                restore: { //重置
                  show: true
                },
                dataZoom: { //数据缩放视图
                  show: true
                },
                saveAsImage: {//保存图片
                  show: true
                },
                magicType: {//动态类型切换
                  type: ['bar', 'line']
                }
              }
            },
            xAxis: {
              data: []
            },
            yAxis: {},
            series: [{
              // name: '金额',
              type: this.type,//this.type
              data: [],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    //this.data;
              itemStyle: {
                normal: {
                  color: function (params) {
                    var colorList = ['#D4C880', '#D1D1D1', '#01A3D4', '#8EA9C4', '#FB7659', '#4EE8F7', '#F4E33A'];
                    return colorList[params.dataIndex];
                  }
                }
              }//多个颜色柱子}
            }]
          });
        },
      },
    }
</script>

<style scoped>
  #display{
    padding-left:20px;
    padding-top:10px;
    margin-top: 20px;
    border:solid 2px  #e0e0e0;
    height: 700px;
    /*text-align: center;*/
    width: 98%;
    padding-left:10px;
    padding-right:10px;
    background-color:  #fff;
  }
  .wrapper{
    width: 40rem;
    height: 30rem;
  }
  .btn1{
    width:80px;
    padding:7px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#85C1E9 ;
    float: left;
    margin-left: 15px;
    margin-top:13px;
  }
  .btn2{
    width:80px;
    padding:7px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#5DADE2 ;
    float: left;
    margin-left: 15px;
    margin-top:13px;
  }
  .btn3{
    width:80px;
    padding:7px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#3498DB ;
    float: left;
    margin-left: 15px;
    margin-top:13px;
  }
  .btn4{
    width:80px;
    padding:7px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#2E86C1 ;
    float: left;
    margin-left: 15px;
    margin-top:13px;
  }
  .btn5{
    font-size: 18px;
    padding: 6px 6px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    color:#000;
    /*margin-right: 0px;*/
  }
  .btn5:hover{
    background: #e0e0e0;
  }
  .btn6{
    width:80px;
    padding:5px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#338FFC ;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
  }
  .btn7{
    width:80px;
    padding:5px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#338FFC ;
    margin-top: 20px;
  }
  .active{
    background: #e0e0e0;
  }
  .input1{
    width:80px;
  }
  .simple{
    padding:10px;
    height: 120px;
    width:80%;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #F7F9F9;
  }
  .complex{
    padding:10px;
    height: 120px;
    width:80%;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #F7F9F9;
  }
</style>
