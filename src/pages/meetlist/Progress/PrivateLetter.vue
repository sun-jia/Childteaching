<template>
  <div id="fullHeight2" index="02" class="d_jump" title="私信用户">
    <div class="listname">私信用户<i class="el-icon-menu" style="padding-left:5px;"></i></div>
    <el-table
      :data="private"
      style="width: 80%"
      height="280">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="发送时间">
              <span>{{ props.row.dataline }}</span>
            </el-form-item>
            <el-form-item label="接收者">
              <span>{{ props.row.author }}</span>
            </el-form-item>
            <el-form-item label="发送内容">
              <span>{{ props.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="标题"
        prop="title">
      </el-table-column>
      <el-table-column
        label="时间"
        prop="dataline">
      </el-table-column>
      <el-table-column
        label="接收者"
        prop="author">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button v-show="releaseShow" type="text" size="small" v-on:click="release(scope.row)">推送</el-button>
          <el-button v-show="editShow" type="text" size="small" v-on:click="edit(scope.row);newChartContent=true;">编辑</el-button>
          <el-button type="text" size="small" v-on:click="delete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin-top: 10px;" v-on:click="newChart();newChartContent=true;">新增信息</el-button>
    <!--新增信息-->
    <el-dialog
      title="新增信息"
      :visible.sync="newChartContent"
      width="40%">
      <el-form ref="form" :model="chartForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="chartForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="chartForm.content">
          </el-input>
        </el-form-item>
        <el-form-item label="接收人">
          <!--<el-input v-model="chartForm.name" placeholder="请输入人名"></el-input>-->
          <el-autocomplete
            v-model="chartForm.author"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入人名"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn3" type="info"  @click="newChartContent=false">取消</el-button>
        <el-button type="primary" v-on:click="reset" class="btn2 icon-huanyihuan">重置</el-button>
        <el-button type="primary" class="btn2 icon-baocun2" @click="save(chartForm);newChartContent=false">保存</el-button>
        <el-button type="primary" class="btn2 icon-fabu1" @click="release(chartForm);newChartContent=false">推送</el-button>
      </div>
    </el-dialog>
    <!--修改信息-->
    <el-dialog
      title="新增信息"
      :visible.sync="newChartContent"
      width="40%">
      <el-form ref="form" :model="chartForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="chartForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="chartForm.content">
          </el-input>
        </el-form-item>
        <el-form-item label="接收人">
          <el-autocomplete
            v-model="chartForm.author"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入人名"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn3" type="info"  @click="newChartContent=false">取消</el-button>
        <el-button type="primary" v-on:click="reset()" class="btn2 icon-huanyihuan">重置</el-button>
        <el-button type="primary" class="btn2 icon-baocun2" @click="save(chartForm);newChartContent=false">保存</el-button>
        <el-button type="primary" class="btn2 icon-fabu1" @click="release(chartForm);newChartContent=false">推送</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "privateLetter",
      data(){
          return{
            private:[
              {
              id:'1',
              title:'信息1',
              content:'信息1信息1信息1信息1信息1信息1',
              dataline:'2018-09-26 17:27:29',
              author:'小一',
            },
              {
                id:'1',
                title:'信息1',
                content:'信息1信息1信息1信息1信息1信息1',
                dataline:'2018-09-26 17:27:29',
                author:'小一',
              },
              {
                id:'1',
                title:'信息1',
                content:'信息1信息1信息1信息1信息1信息1',
                dataline:'2018-09-26 17:27:29',
                author:'小一',
              },
              {
                id:'1',
                title:'信息1',
                content:'信息1信息1信息1信息1信息1信息1',
                dataline:'2018-09-26 17:27:29',
                author:'小一',
              },
              {
                id:'1',
                title:'信息1',
                content:'信息1信息1信息1信息1信息1信息1',
                dataline:'2018-09-26 17:27:29',
                author:'小一',
              },
            ],
            releaseShow:true,
            editShow:true,
            newChartContent:false,
            chartForm:{
              title:'',
              content:'',
              // dataline:'',
              author:'',
            },
            timeout:  null,
            people:[],
          }
      },
      methods:{
        loadAll(){
            return[
              {
              "value":"小一","id":'1001'
              },
              {
                "value":"小二","id":'1001'
              },
              {
                "value":"小三","id":'1001'
              },
              {
                "value":"小四","id":'1001'
              },
              {
                "value":"小五","id":'1001'
              }

            ];
        },
          //新增
        newChart:function () {

        },
        // 删除
        delete: function (form) {
          console.log(form)
        },
        // 编辑
        edit: function (form) {
          console.log(form)

        },
        //推送
        release:function(){

        },
        //重置
        reset:function () {
          this.chartForm.title=''
          this.chartForm.content=''
          this.chartForm.author=''
        },
        //远程搜索
        querySearchAsync(queryString, cb) {
          var people = this.people;
          var results = queryString ? people.filter(this.createStateFilter(queryString)) : people;

          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          }, 3000 * Math.random());
        },
        createStateFilter(queryString) {
          return (state) => {
            return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
        },
        handleSelect(item) {
          console.log(item);
        }
      },
      mounted() {
        this.people = this.loadAll();
      }
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
  .btn2{
    width:60px;
    padding:8px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#338FFC ;
    /*float: right;*/
    /*margin-left: 15px;*/
    /*margin-top: 20px;*/
    /*margin-bottom: 5px;*/
  }
  .btn2:hover{
    background-color:#5FA7FE;
  }
  .btn3{
    width:60px;
    padding:8px;
    font-size: 14px;
    border-radius: 3px;
    border:none;
    color:white;
    background-color:#B9B9B9 ;
  }
  .btn3:hover{
    background-color:#CACACA;
  }
</style>
