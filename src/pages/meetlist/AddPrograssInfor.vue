<template>
  <div class="display  col-md-12">
    <!--顶部-->
    <div class="top col-md-12">
      <span>会议进行中</span>
      <el-dropdown size="medium" style="float:right;" split-button type="primary">
        <!--<span class="el-dropdown-link">-->
        <!--页面菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
        <!--</span>-->
        页面菜单
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><router-link to="/meetlist/AddInformation">会议准备</router-link></el-dropdown-item>
          <el-dropdown-item><router-link to="/meetlist/AddPrepareInfor">会议筹备</router-link></el-dropdown-item>
          <el-dropdown-item><router-link to="/meetlist/AddPrograssInfor">会议进行</router-link></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <hr>
    </div>
    <div class="left col-md-10">
      <div id="fullHeight1" index="01" class="d_jump" title="会议公告">
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
            <el-button type="primary" class="btn2 icon-baocun2" @click="save(newAnnouncementForm)">保存</el-button>
            <el-button type="primary" class="btn2 icon-fabu1" @click="release(newAnnouncementForm)">发布</el-button>
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
            <el-button type="primary" class="btn2 icon-baocun2" @click="save(newAnnouncementForm)">保存</el-button>
            <el-button type="primary" class="btn2 icon-fabu1" @click="release(newAnnouncementForm)">发布</el-button>
          </div>
        </el-dialog>
      </div>
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
      <div id="fullHeight3" index="03" class="d_jump" title="会议交互">
        <div class="listname">会议交互<i class="el-icon-menu" style="padding-left:5px;"></i></div>
        <div>
          <el-table
            :data="interaction"
            style="width: 80%"
            height="330">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="标题"
              width="200">
            </el-table-column>
            <!--<el-table-column-->
              <!--prop="introduction"-->
              <!--label="简介"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
              prop="time"
              label="时间"
              width="">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button  type="text" size="small" v-on:click="seeInteraction(scope.row)">查看</el-button>
                <el-button  type="text" size="small" v-on:click="pushInteraction(scope.row)">推送</el-button>
                <el-button type="text" size="small" v-on:click="stopInteraction(scope.row)">停止</el-button>
                <el-button type="text" size="small" v-on:click="deleteInteraction(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button style="margin-top: 10px;" v-on:click="newQuestion=true;">新增问题</el-button>
          <el-button style="margin-top: 10px;" v-on:click="">新增问卷</el-button>
          <el-button style="margin-top: 10px;" >新增交互</el-button>
        </div>
        <el-dialog
          title="新增问题"
          :visible.sync="newQuestion"
          width="50%">
          <el-form ref="form" :model="single" label-width="80px">
            <el-form-item label="单选">
                选项数：
                  <el-select v-model="singleOptionNum" style="width:100px;margin-left: 5px;margin-right: 5px;">
                    <el-option disabled value="">选择</el-option>
                    <el-option value="2">2</el-option>
                    <el-option value="3">3</el-option>
                    <el-option value="4">4</el-option>
                    <el-option value="5">5</el-option>
                    <el-option value="6">6</el-option>
                    <el-option value="7">7</el-option>
                    <el-option value="8">8</el-option>
                  </el-select>
                 <span class="el-icon-circle-plus" style="color:#00AAFF;margin-right: 20px;" v-on:click="singleSelectionAdd(singleOptionNum)">添加</span>
                  <!--题目数量:<el-input  v-model="questionForm.singleSelectionNum" style="width:50px;margin-left: 5px;margin-right: 5px;"></el-input>-->
            </el-form-item>
            <!--<el-form-item label="多选">-->
              <!--选项数：-->
              <!--<el-select v-model="multipleOptionNum" style="width:100px;margin-left: 5px;margin-right: 5px;">-->
                <!--<el-option disabled value="">选择</el-option>-->
                <!--<el-option value="2">2</el-option>-->
                <!--<el-option value="3">3</el-option>-->
                <!--<el-option value="4">4</el-option>-->
                <!--<el-option value="5">5</el-option>-->
                <!--<el-option value="6">6</el-option>-->
                <!--<el-option value="7">7</el-option>-->
                <!--<el-option value="8">8</el-option>-->
              <!--</el-select>-->
              <!--<span class="el-icon-circle-plus" style="color:#00AAFF;margin-right: 20px;" v-on:click="multipleSelectionAdd(questionForm.multipleSelectionOptionNum)">添加</span>-->
              <!--题目数量:<el-input :disabled="true" v-model="questionForm.multipleSelectionNum" style="width:50px;margin-left: 5px;margin-right: 5px;"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="填空">-->
              <!--题目数量:<el-input v-model="questionForm.inputQuestionNum" style="width:50px;margin-left: 5px;margin-right: 5px;"></el-input>-->
              <!--<span class="el-icon-circle-plus" style="color:#00AAFF" v-on:click="">添加</span>-->
            <!--</el-form-item>-->
            <hr>
            {{this.singleNum}}
            {{singleOptionNum}}
            {{singleOptionNumber}}
            <el-form-item label="单选" v-for="key in parseInt(singleNum)" style="margin-top: 10px;">
                问题：<el-input v-model="questionForm.singleSelection[key-1].singleSelectionTitle" placeholder="请输入问题" style="width:400px;"></el-input><br>
                <!--选项：-->
                <el-radio-group  v-for="index in parseInt(singleOptionNumber[key-1])"  style="margin-top: 5px;">
                    <!--{{this.chooseArr[key-1]}}-->
                    <el-radio :label="index" class="col-md-10" style="margin-top: 10px;margin-left: 50px;"><el-input v-model="questionForm.singleSelection[key-1].singleSelectionOption[index-1]"></el-input></el-radio>
                </el-radio-group><br>
                <!--<el-input v-model="questionSubmit(key)">确定</el-input>-->
                <!--<el-input v-model="questionConcel(key)">取消</el-input>-->
            </el-form-item>
            {{questionForm.singleSelection}}

            <!--<el-form-item label="问题">-->
              <!--<el-input v-model="newAnnouncementForm.name" placeholder="请输入问题"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="回答">-->
              <!--<el-input-->
                <!--type="textarea"-->
                <!--:rows="5"-->
                <!--placeholder="请输入回答"-->
                <!--v-model="newAnnouncementForm.content">-->
              <!--</el-input>-->
            <!--</el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="btn3" type="info"  @click="newQuestion=false">取消</el-button>
            <el-button type="primary" v-on:click="reset" class="btn2 icon-huanyihuan">重置</el-button>
            <el-button type="primary" class="btn2 icon-baocun2" @click="save(newAnnouncementForm)">保存</el-button>
            <el-button type="primary" class="btn2 icon-fabu1" @click="release(newAnnouncementForm)">发布</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div class="right col-md-2">
      <div class="ancherFixed">
        <div style="height:76px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher1}" v-on:click="isActiveAncher1=true;isActiveAncher2=false;isActiveAncher3=false;jump(0)"></el-button>
          <span style="padding-top:0px;font-size: 16px;vertical-align:bottom;" v-bind:class="{textActive:isActiveAncher1 }">会议公告</span><br>
          <div style="width: 3px; height: 50px; background-color: #DFDFDF;margin-left:11px;"></div>
        </div>
        <div style="height:86px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher2}" v-on:click="isActiveAncher1=false;isActiveAncher2=true;isActiveAncher3=false;jump(1)"></el-button>
          <span style="font-size: 16px;vertical-align:bottom;" v-bind:class="{textActive:isActiveAncher2 }">会议资料</span><br>
          <div style="width: 3px; height: 60px; background-color: #DFDFDF;margin-left:11px;"></div>
        </div>
        <div style="height:106px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher3 }"  v-on:click="isActiveAncher1=false;isActiveAncher2=false;isActiveAncher3=true;jump(2)"></el-button>
          <span style="padding-top:5px;font-size: 16px;vertical-align:bottom;" v-bind:class="{textActive:isActiveAncher3 }">会议交互</span><br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AddPrograssInfor.vue",
      data(){
         return{
           Announcement:[
             {
               AnnouncementID:'1001',
               AnnouncementName:'公告一',
               AnnouncementContent:'内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一',
               AnnouncementTime:'2018-06-01 08:00:00',
             },
             {
               AnnouncementID:'1002',
               AnnouncementName:'公告二',
               AnnouncementContent:'内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二',
               AnnouncementTime:'2018-06-02 08:00:00',
             },
             {
               AnnouncementID:'1003',
               AnnouncementName:'公告三',
               AnnouncementContent:'内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三',
               AnnouncementTime:'2018-06-03 08:00:00',
             },
             {
               AnnouncementID:'1004',
               AnnouncementName:'公告一',
               AnnouncementContent:'内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一内容一',
               AnnouncementTime:'2018-06-01 08:00:00',
             },
             {
               AnnouncementID:'1005',
               AnnouncementName:'公告二',
               AnnouncementContent:'内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二内容二',
               AnnouncementTime:'2018-06-02 08:00:00',
             },
             {
               AnnouncementID:'1006',
               AnnouncementName:'公告三',
               AnnouncementContent:'内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三内容三',
               AnnouncementTime:'2018-06-03 08:00:00',
             },
             ],
           material:[
             {
               ID:'1001',
               name:'资料一',
               introduction:'报告一资料',
               time:'2018-06-01 08:00:00',
             },
             {
               ID:'1002',
               name:'资料二',
               introduction:'报告二资料',
               time:'2018-06-02 08:00:00',
             },
             {
               ID:'1003',
               name:'资料三',
               introduction:'报告三资料',
               time:'2018-06-03 08:00:00',
             },
             {
               ID:'1002',
               name:'资料二',
               introduction:'报告二资料',
               time:'2018-06-02 08:00:00',
             },
             {
               ID:'1003',
               name:'资料三',
               introduction:'报告三资料',
               time:'2018-06-03 08:00:00',
             },
             ],
           interaction:[
             {
               name:'问题一',
               time:'2018-06-01 08:00:00',
             },
             {
               name:'问题二',
               time:'2018-06-01 08:00:00',
             },
             {
               name:'问题三',
               time:'2018-06-01 08:00:00',
             },
             {
               name:'问题四',
               time:'2018-06-01 08:00:00',
             },{
               name:'问题五',
               time:'2018-06-01 08:00:00',
             },
             ],
           options: {
             // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
             target: '/yii/upload',//填服务器文件夹
             testChunks: false
           },
           attrs: {
             accept: 'image/*'
           },
           addQuestion:true,//添加问题
           newAnnouncementForm:{
             name:'',//标题
             content:'',//内容
             time:'',//时间
           },//新增公告表单
           single:{
             singleSelectionTitle:"",
             singleSelectionOption:[],
           },//单选
           questionForm:{
             singleSelection:[]
               // {
               // singleSelectionTitle:"",
               // singleSelectionOptionNum:0,
               // // multipleSelectionOptionItem:[],
               // singleSelectionOption:[],
               // }
             ,
             multipleSelection:[
               // {
               // multipleSelectionTitle:'',
               // multipleSelectionOptionNum:0,
               // // multipleSelectionOptionItem:[],
               // multipleSelectionOption:[],
               // }
             ],
             inputQuestion:[
               // {
               // inputQuestionTitle:'',
               // inputQuestionNum:0,
               // inputQuestionContent:[],
               // }
             ]
           },//问题表单
           singleOptionNum:'2',//单选选项数量
           singleOptionNumber:[],//所有单选选项数量
           chooseArr:['A','B','C','D','E','F','G'],//选择项
           multipleOptionNum:3,//多选选项数量
           inputNum:0,//填空题数量
           singleNum:0,////单选题目数量
           multipleNum:0,//多选题目数量
           isActiveAncher1:true,//锚点
           isActiveAncher2:false,//锚点
           isActiveAncher3:false,//锚点
           newAnnouncement:false,//新增公告
           releaseShow:true,//发布按钮
           editShow:true,//编辑按钮
           newQuestion:false,//新增互动问题
           fullHeight: document.documentElement.clientHeight,//网页高度
         }
      },
      methods:{
          //删除公告
          delete:function(form){
            console.log(form);
          },
          //删除资料
          deleteMaterial:function(val){

          },
        // 编辑公告
          edit:function(form){
            console.log(form);
            this.newAnnouncementForm.name=form.AnnouncementName;
            this.newAnnouncementForm.content=form.AnnouncementContent;
          },
         // 新增公告
          newAnn:function(){
            this.newAnnouncementForm.name='';
            this.newAnnouncementForm.content='';
            this.newAnnouncementForm.time='';
          },
          jump (index) {
            // 用 class="d_jump" 添加锚点
            let jump = document.querySelectorAll('.d_jump');
            let total = jump[index].offsetTop
            let distance = document.documentElement.scrollTop || document.body.scrollTop;
            // 平滑滚动，时长500ms，每10ms一跳，共50跳
            let step = total / 50;
            if (total > distance) {
              smoothDown()
            } else {
              let newTotal = distance - total;
              step = newTotal / 50;
              smoothUp()
            }
            function smoothDown () {
              if (distance < total) {
                distance += step;
                document.body.scrollTop = distance;
                document.documentElement.scrollTop = distance;
                setTimeout(smoothDown, 10)
              } else {
                document.body.scrollTop = total;
                document.documentElement.scrollTop = total;
              }
            }
            function smoothUp () {
              if (distance > total) {
                distance -= step;
                document.body.scrollTop = distance;
                document.documentElement.scrollTop = distance;
                setTimeout(smoothUp, 10)
              } else {
                document.body.scrollTop = total;
                document.documentElement.scrollTop = total;
              }
            }
          },
        //推送资料
        pushMaterial:function(val){

        },
          release:function (id) {
            console.log(id);//输出所有信息

            // this.releaseShow=false;
            // this.editShow=false;
          },
          //重置
          reset:function () {
              this.newAnnouncementForm.name=''
              this.newAnnouncementForm.content=''
          },
          //保存
          save:function (form) {

          },
          //查看交互
          seeInteraction:function (val) {

          },
          //推送交互
          pushInteraction:function (val) {

          },
          //删除交互
          deleteInteraction:function (val) {

          },
        //添加单选
        singleSelectionAdd:function (val) {
          console.log(val);
          // this.singleOptionNum=val;
          this.singleOptionNumber[this.singleNum]=val
          this.singleNum++;
          this. questionForm.singleSelection.push({singleSelectionTitle:"",singleSelectionOption:[]})
          // this. questionForm.singleSelection[this.singleNum-1].singleSelectionTitle=this.single.singleSelectionTitle
          console.log(this.singleNum)
        },
        //添加多选
        multipleSelectionAdd:function (val) {
          console.log(val);
          this.multipleOptionNum=val;
          this.questionForm.multipleSelectionNum++;
          this.multipleNum=this.questionForm.multipleSelectionNum;
        },
        //提交
        questionSubmit:function (val) {
          this.addQuestion=true;
          this.questionForm.singleSelection.push({singleSelectionTitle:"",singleSelectionOption:[]})
        },
        //取消
        questionConcel:function () {
          this.singleNum--;
        }
      },
      mounted: function () {
        document.getElementById('fullHeight1').style.height=(this.fullHeight)+'px';
        document.getElementById('fullHeight2').style.height=(this.fullHeight)+'px';
        document.getElementById('fullHeight3').style.height=(this.fullHeight)+'px';
      },
    }
</script>

<style scoped>
  .add{
    border:1px solid #BFBFBF;
    border-radius: 8px;
    width:80%;
    padding-left:10px;
  }
  .anchor{
    background-color:#00AAFF;
    border-color:#00AAFF;
  }
  .anchor:hover{
    background-color:#00AAFF;
    border-color:#00AAFF;
  }
  .textActive{
    color:#00AAFF;
  }
  .ancherFixed{
    position: fixed;
  }
  .btn1{
    width:80px;
    padding:5px;
    font-size: 16px;
    border-radius: 5px;
    border:1px solid #A7A7A7;
    color:white;
    background-color:#A7A7A7 ;
    float: right;
    margin-right: 5px;
    margin-top:10px;
    margin-bottom:20px;
  }
  .btn1:hover{
    background-color:#BABABA;
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
  .btn4{
    width:80px;
    padding:5px;
    font-size: 16px;
    border-radius: 5px;
    border:1px solid #fff;
    color:white;
    background-color:#BABABA ;
    /*float: right;*/
    /*margin-left: 5px;*/
  }
  .btn4:hover{
    background-color:#1E7CCF;
  }
  .active{
    background-color: #1E7CCF;
  }
  .bottom{
    background-color: #0C8BFA;
    font-size:18px;
    text-align: center;
    color:#fff;
  }
  .display{
    background-color:#fff;
    margin-top:20px;

  }
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
  .left{
    background-color:#fff;
    padding-left: 10%;
  }
  .right{
    background-color:#fff;
  }
  .meet{
    margin-top:10px;
    margin-left:20px;
    margin-bottom:10px;
    height:100px;
  }
  .input{
    border:1px solid #338FFC;
    border-radius: 5px;
    color:#000;
    width:90px;
    margin-left:5px;
    margin-right:5px;
  }
  .logistic{
    margin-top:20px;
    /*margin-left:20px;*/
    margin-bottom:20px;
    height:550px;
  }
  .el-scrollbar__wrap {
    overflow-y: hidden;
  }
  .top{
    text-align: center;
    font-size: 22px;
    padding-top:20px;
    padding-bottom:20px;
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
  .el-table th{
    text-align: center;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    float:left;
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>

