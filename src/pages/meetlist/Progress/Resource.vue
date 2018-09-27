<template>
  <div id="fullHeight2" index="02" class="d_jump" title="会议资料">
    <div class="listname">会议资料<i class="el-icon-menu" style="padding-left:5px;"></i></div>
    <div width="100%">
      <el-table
        :data="material"
        style="width: 80%"
        height="280">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资料名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="introduction"
          label="简介"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          width="240">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button  type="text" size="small" v-on:click="pushMaterial(scope.row)">推送</el-button>
            <el-button type="text" size="small" v-on:click="deleteMaterial(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<el-button style="margin-top: 10px;" v-on:click="">上传资料</el-button>-->
      <!--上传-->
      <uploader :options="options" class="uploader-example" style="width:80%;margin-top: 5px;">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
          <p>拖拽文件到此处或者</p>
          <uploader-btn>选择文件 </uploader-btn>
          <uploader-btn :attrs="attrs">选择图片</uploader-btn>
          <uploader-btn :directory="true">选择文件夹</uploader-btn>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
    </div>
    <hr>
  </div>
</template>

<script>
    export default {
        name: "Resource",
      data(){
        return{
          material: [
            {
              ID: '1001',
              name: '资料一',
              introduction: '报告一资料',
              time: '2018-06-01 08:00:00'
            },
            {
              ID: '1002',
              name: '资料二',
              introduction: '报告二资料',
              time: '2018-06-02 08:00:00'
            },
            {
              ID: '1003',
              name: '资料三',
              introduction: '报告三资料',
              time: '2018-06-03 08:00:00'
            },
            {
              ID: '1002',
              name: '资料二',
              introduction: '报告二资料',
              time: '2018-06-02 08:00:00'
            },
            {
              ID: '1003',
              name: '资料三',
              introduction: '报告三资料',
              time: '2018-06-03 08:00:00'
            }
          ],
          options: {
            // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
            target: '/yii/upload', // 填服务器文件夹
            testChunks: false
          },

          attrs: {
            accept: 'image/*'
          },
        }
      },
      methods:{
        // 删除资料
        deleteMaterial: function (val) {

        },
        // 推送资料
        pushMaterial: function (val) {

        },
        //发布
        release: function (id) {
          console.log(id)// 输出所有信息

          // this.releaseShow=false;
          // this.editShow=false;
        },
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
</style>
