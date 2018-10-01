<template>
  <div index="01" class="fullHeight d_jump" title="会议公告">
    <div class="listname">会议公告<i class="el-icon-menu" style="padding-left:5px;"></i></div>
    <div>
      <el-table
        :data="Announcement"
        style="width: 80%"
        height="280">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="公告名称">
                <span>{{ props.row.AnnouncementName }}</span>
              </el-form-item>
              <el-form-item label="公告时间">
                <span>{{ props.row.AnnouncementTime }}</span>
              </el-form-item>
              <el-form-item label="公告内容">
                <span>{{ props.row.AnnouncementContent }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="公告名称"
          prop="AnnouncementName">
        </el-table-column>
        <el-table-column
          label="时间"
          prop="AnnouncementTime">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button v-show="releaseShow" type="text" size="small" v-on:click="release(scope.row)">发布</el-button>
            <el-button v-show="editShow" type="text" size="small" v-on:click="edit(scope.row);newAnnouncement=true;">编辑</el-button>
            <el-button type="text" size="small" v-on:click="delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top: 10px;" v-on:click="newAnn();newAnnouncement=true;">新增公告</el-button>
    </div>
    <hr>
    <!--新增公告-->
    <el-dialog
      title="新增公告"
      :visible.sync="newAnnouncement"
      width="40%">
      <el-form ref="form" :model="newAnnouncementForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="newAnnouncementForm.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="newAnnouncementForm.content">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn3" type="info"  @click="newAnnouncement=false">取消</el-button>
        <el-button type="primary" v-on:click="reset" class="btn2 icon-huanyihuan">重置</el-button>
        <el-button type="primary" class="btn2 icon-baocun2" @click="save(newAnnouncementForm);newAnnouncement=false">保存</el-button>
        <el-button type="primary" class="btn2 icon-fabu1" @click="release(newAnnouncementForm);newAnnouncement=false">发布</el-button>
      </div>
    </el-dialog>
    <!--修改公告-->
    <el-dialog
      title="修改公告"
      :visible.sync="newAnnouncement"
      width="40%">
      <el-form ref="form" :model="newAnnouncementForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="newAnnouncementForm.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="newAnnouncementForm.content">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn3" type="info"  @click="newAnnouncement=false">取消</el-button>
        <el-button type="primary" v-on:click="reset" class="btn2 icon-huanyihuan">重置</el-button>
        <el-button type="primary" class="btn2 icon-baocun2" @click="save(newAnnouncementForm);newAnnouncement=false">保存</el-button>
        <el-button type="primary" class="btn2 icon-fabu1" @click="release(newAnnouncementForm);newAnnouncement=false">发布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Announcement",
      data(){
          return{
            Announcement: [
              {
                AnnouncementID: '1001',
                AnnouncementName: '公告一',
                AnnouncementContent: '内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一',
                AnnouncementTime: '2018-06-01 08:00:00'
              },
              {
                AnnouncementID: '1002',
                AnnouncementName: '公告二',
                AnnouncementContent: '内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二',
                AnnouncementTime: '2018-06-02 08:00:00'
              },
              {
                AnnouncementID: '1003',
                AnnouncementName: '公告三',
                AnnouncementContent: '内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三',
                AnnouncementTime: '2018-06-03 08:00:00'
              },
              {
                AnnouncementID: '1004',
                AnnouncementName: '公告一',
                AnnouncementContent: '内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一',
                AnnouncementTime: '2018-06-01 08:00:00'
              },
              {
                AnnouncementID: '1005',
                AnnouncementName: '公告二',
                AnnouncementContent: '内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二',
                AnnouncementTime: '2018-06-02 08:00:00'
              },
              {
                AnnouncementID: '1006',
                AnnouncementName: '公告三',
                AnnouncementContent: '内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三',
                AnnouncementTime: '2018-06-03 08:00:00'
              }
            ],
            newAnnouncement: false, // 新增公告
            releaseShow: true, // 发布按钮
            editShow: true, // 编辑按钮
            newAnnouncementForm: {
              name: '', // 标题
              content: '', // 内容
              time: ''// 时间
            }, // 新增公告表单
          }
      },
      methods:{
        // 删除公告
        delete: function (form) {
          console.log(form)
        },
        // 编辑公告
        edit: function (form) {
          console.log(form)
          this.newAnnouncementForm.name = form.AnnouncementName
          this.newAnnouncementForm.content = form.AnnouncementContent
        },
        // 新增公告
        newAnn: function () {
          this.newAnnouncementForm.name = ''
          this.newAnnouncementForm.content = ''
          this.newAnnouncementForm.time = ''
        },
        // 重置
        reset: function () {
          this.newAnnouncementForm.name = ''
          this.newAnnouncementForm.content = ''
        },
        //推送
        release:function(){

       }
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
