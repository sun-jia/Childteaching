<template>
  <div id="display">
    <div>
       <button class="btn5" v-on:click="simple" v-bind:class="{ active: isActiveOne }" >简单统计</button>
       <button class="btn5" v-on:click="complex" v-bind:class="{ active: isActiveTwo }">复杂统计</button>
       <div class="simple" v-show="s">
         <span style="font-weight: bold;font-size: 18px;">统计对象选择</span><br>
         <button class="btn6" v-on:click="bymoney">金额</button>
         <button class="btn6" v-on:click="byway">支付方式</button>
       </div>
       <div class="complex" v-show="p">
         <span style="font-weight: bold;font-size: 18px;">统计对象选择</span><br>
         <span style="font-weight: bold;margin-top: 5px;">自变量X：</span>
         <select id="num_x" v-model="Arguments" v-on:click="x_control()"   style="font-size:14px;width:150px;">
           <option disabled value="">选择</option>
           <option value="ACCOUNT_MODE">支付方式</option>
           <option value="ACCOUNT_DATE">日期</option>
           <option value="CONFERENCEID">会议</option>
           <option value="">空</option>
         </select>
         <!--{{Arguments}}-->
         <span   style="font-weight:bold;margin-left:20px;">因变量Y：</span>
         <select id="num_y" v-model="Dvariable" v-on:click="y_control()"  style="font-size:14px;width:150px;">
           <option disabled value="">选择</option>
           <option value="MONEY" >金额</option>
           <option value="ACCOUNT_MODE1" >支付方式(单个会议)</option>
           <option value="ACCOUNT_MODE2" >支付方式(多个会议)</option>
           <option value="">空</option>
         </select>
         <!--{{Dvariable}}-->
         <br>
         <!--<input v-model="conferenceid" placeholder="输入会议ID">-->
         <el-select
           v-model="conferenceid"
           filterable
           remote
           multiple
           reserve-keyword
           size="small"
           placeholder="请输入会议关键词"
           :remote-method="remoteMethod"
           :loading="loading">
           <el-option
             v-for="item in options1"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
         <!--{{conferenceid}}-->
         <button class="btn7" v-on:click="statistics(Arguments,Dvariable,conferenceid)">开始统计</button>
       </div>
    </div>
    <div  v-show="visibled">
      <div class="left col-md-2" v-show="fix">
        <!--<button class="btn1" v-on:click="line()">折线图</button><br>-->
        <button class="btn2" v-on:click="bar()">柱状图</button><br>
        <button class="btn3" v-on:click="pie()">饼图</button><br>
        <!--&lt;!&ndash;<button class="btn4" v-on:click="ring()">环形图</button>&ndash;&gt;-->
      </div>
      <div class="right col-md-10">
        <!--<schart class="wrapper" :canvasId="canvasId" :type="type" :data="data" :options="options"></schart>-->
        <div id="myChart" v-show="barshow"  :type="chartType" :style="{width: '500px', height: '400px'}"></div>
        <div id="myChart_two" v-show="pieshow"  :type="chartType" :style="{width: '500px', height: '400px'}"></div>
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
          barshow:true,
          chartName:'',
          chartType: 'bar',
          conferenceid:'',
          data:'',
          Dvariable:'',
          fix:true,
          isActiveOne: true,
          isActiveTwo: false,
          list: [],
          loading: false,
          options1: [],
          p:false,
          returnData:[],
          s:true,
          states:["1001","会议2","会议3","会议4","会议5","会议6","会议7"],
          type:'',
          visibled:false,
          key:'',
          value:'',
          pieshow:false,
        }
      },
      mounted(){
        this.drawLine();
        this.list = this.states.map(item => {
          return { value: item, label: item };
        });
      },
      methods: {
        bar:function () {
          this.chartType='bar';
          this.pieshow=false;
          this.barshow=true;
          console.log(this.pieshow);
          // console.log(this.type);
        },
        pie:function () {
          var that=this;
          console.log(that.key);
          console.log(that.value);
          this.chartType='pie';
          this.barshow=false;
          this.pieshow=true;
          let myChart_two = this.$echarts.init(document.getElementById('myChart_two'));
          var option ={
            title : {
              text: this.chartName,
              // subtext: '金额分类',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: { //可视化的工具箱
              show: true,
              feature: {
                dataView: { //数据视图
                  show: true
                },
                restore: { //重置
                  show: true
                },
                saveAsImage: {//保存图片
                  show: true
                },
              }
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: that.key
            },
            series : [
              {
                name: '金额分布',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:(function(){
                  var res = [];
                  var len = that.key.length;
                  console.log(len);
                  for(var i in that.key) {
                    res.push({
                      //通过把result进行遍历循环来获取数据并放入Echarts中
                      name: that.key[i],
                      value: that.value[i]
                    });
                  }
                  return res;
                })()
              }
            ]
          };
          myChart_two.setOption(option);
        },
        simple: function () {
          this.s = true;
          this.p = false;
          this.fix=true;
          this.visibled=false;
          // this.barshow=true;
          this.pieshow=true;
          this.isActiveOne= true;
          this.isActiveTwo= false;
          console.log(this.isActiveOne);
          console.log(this.isActiveTwo);

        },
        complex: function () {
          this.s = false;
          this.p = true;
          this.visibled=false;
          this.barshow=true;
          this.pieshow=false;
          this.isActiveOne= false;
          this.isActiveTwo= true;
          console.log(this.isActiveOne);
          console.log(this.isActiveTwo);
        },
        bymoney: function () {
          this.chartName='金额分布统计';
          this.visibled = true;
          this.chartType = 'line';
          this.barshow=true;
          this.pieshow=false;
          this.axios.get("http://192.168.1.100/clubApi/backend/web/index.php/finance/finance?type=MONEY").then(body => {this.data= body.data.data;
            this.key=this.data.key;
            this.value=this.data.value;
            console.log(this.key);
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            myChart.setOption({
              title: {text: this.chartName},
              // legend: {
              //   data:['金额分布']
              // },
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
        byway: function () {
          this.chartName='支付方式统计'
          this.visibled = true;
          // this.type = 'line';
          this.barshow=true;
          this.pieshow=false;
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
              // console.log(this.key[i]);
            }
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            myChart.setOption({
              title: {text: this.chartName},
              // legend: {
              //   data:['支付方式']
              // },
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
        drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'));          // 绘制图表
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
              type: this.chartType,//this.type
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
        remoteMethod(query) {//远程搜索
          if (query !== '') {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options1 = this.list.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.options1 = [];
          }
        },
        statistics: function (a,b,c) {
          this.visibled = true;
          this.fix=false;
          console.log(a);
          console.log(b);
          if(c.length==0){
            c='';
          }
          if((b=='ACCOUNT_MODE1')||(b=='ACCOUNT_MODE2')){
            b='ACCOUNT_MODE';
          }
          console.log(c);
          this.axios.get("http://192.168.1.100/clubApi/backend/web/index.php/finance/finance/multigroup?first="+a+"&&second="+b+"&&CONFERENCEID="+c+"&&type=0").then(body => {
            console.log(body.data.data);
            // let that=this;
            this.returnData= body.data.data;
            console.log(this.returnData);
            this.key=this.returnData.data;
            // console.log(this.key);
            this.value=this.returnData.series.data;
            // console.log(this.value);
            if(this.returnData.series.name=='ACCOUNT_MODE1'){
              this.chartName='单个会议支付方式统计';
            }else if(this.returnData.series.name=='MONEY'){
              this.chartName='会议金额统计';
            } else if(this.returnData.series.name=='ACCOUNT_MODE2'){
              this.chartName='多个会议支付方式统计';
            }else if(this.returnData.series.name=='ACCOUNT_DATE'){
              this.chartName='单日金额统计';
            }
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
              // console.log(this.key[i]);
            }
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            myChart.setOption({
              color: ['#3398DB'],
              title:{text:this.chartName},
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis : [
                {
                  type : 'category',
                  data :this.key ,
                  // ['2018-02-01', '2018-02-02', '2018-02-03', '2018-02-04', '2018-02-05', '2018-02-06', '2018-02-07', '2018-02-08', '2018-02-9', '2018-02-10'],
                  // data:['会议1','会议2','会议3','会议4','会议5','会议6','会议7'],
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],
              yAxis : [
                {
                  type : 'value'
                }
              ],
              series:{
                name: '金额',
                type: 'bar',
                data:this.value
                // [1000,2000,2345,3456,2455,2356,457,4586,2657,1526],
              }
              // series : [
              //   {
              //     name: '支付宝',
              //     type: 'bar',
              //     data: [1000,2000,2345,3456,2455,2356,457],
              //   },
              //   {
              //     name:'微信',
              //     type:'bar',
              //     data:[566,548,452,688,698,1235,2564],
              //   },
              //   {
              //     name:'银联',
              //     type:'bar',
              //     data:[5236,589,689,523,4563,568,963],
              //   }
              // ]
            })
          });
        },
        x_control:function () {
          if (document.getElementById("num_x").value == 'ACCOUNT_MODE') {
            document.getElementById("num_y").options[2].disabled= true;
            document.getElementById("num_y").options[3].disabled= true;
            return;
          }else{
            document.getElementById("num_y").options[2].disabled= false;
            document.getElementById("num_y").options[3].disabled= false;
            return;
          }
        },
        y_control:function () {
          if ((document.getElementById("num_y").value == 'ACCOUNT_MODE1')||(document.getElementById("num_y").value == 'ACCOUNT_MODE2')) {
            document.getElementById("num_x").options[1].disabled= true;
            return;
          }else{
            document.getElementById("num_x").options[1].disabled= false;
            return;
          }
          if(document.getElementById("num_y").value == 'ACCOUNT_MODE1'){
            this.type=0;
          }
          if(document.getElementById("num_y").value == 'ACCOUNT_MODE2'){
            this.type=1;
          }
          console.log(this.type);
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
    height: 650px;
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
  #myChart_two{
    margin-top:20px;
  }
  #myChart{
    margin-top:20px;
  }
</style>
