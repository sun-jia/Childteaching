<template>
  <div id="display">
    <div class="list col-md-9">
      <div class="listname">会议编辑<i class="el-icon-menu" style="padding-left:5px;"></i></div>
      <div class="fold">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <p class="name">已发布<i class="name icon-weibofang-xue"></i></p>
            </template>
            <div class="meetDispaly" v-for="(item, index) in  release">
              {{item.conferenceName}}
              <span class="see"><button class="btn icon-changyonggoupiaorenshanchu" v-on:click="deleteMeet(item.conferenceNameid)">删除</button></span>
              <span class="see"><button class="btn icon-shouhuodizhiyebianji" v-on:click="editMeet(index,1)">编辑</button></span>
              <span class="see"><button class="btn icon-faxian" v-on:click="seeMeet(index)">查看</button></span>
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <p class="name">已保存<i class="name icon-baocun3 "></i></p>
            </template>
            <div class="meetDispaly" v-for="(item, index) in  save">
              {{item.conferenceName}}
              <span class="see"><button class="btn icon-changyonggoupiaorenshanchu" v-on:click="deleteMeet(item.conferenceNameid)">删除</button></span>
              <span class="see"><button class="btn icon-shouhuodizhiyebianji" v-on:click="editMeet(index,2)">编辑</button></span>
              <span class="see"><button class="btn icon-fabu" v-on:click="releaseMeet(item.conferenceNameid)">发布</button></span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

    </div>
    <div class="col-md-3">
      <el-button class="btn4 icon-jiajianzujianjiahao"  v-on:click="addMeet" > 新建会议</el-button>
      <el-dialog title="新建会议" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="会议名称" :label-width="formLabelWidth" prop="name">
            <el-input placeholder="输入会议名称" v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="会议时间" :label-width="formLabelWidth"  prop="conferenceData">
            <el-date-picker
              v-model="form.conferenceDate"
              type="datetimerange"
              @change="getSTime"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="需要启用的模块" :label-width="formLabelWidth">
            <el-checkbox :indeterminate="isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <!--<div style="margin: 15px 0;"></div>-->
            <el-checkbox-group v-model="form.checkedModels"  @change="handleCheckedModelChange">
              <el-checkbox   v-for="model in models" :label="model" :key="model">{{model}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div v-show="duty">
            <el-form-item  label="会议各项负责人" :label-width="formLabelWidth">
              <div v-for="item in form.checkedModels">{{item}}
                <el-select
                  v-if="item=='宣传管理'"
                  v-model="form.duty.propaganda"
                  filterable
                  multiple
                  remote
                  reserve-keyword
                  size="small"
                  placeholder="输入姓名"
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.NAME">
                  </el-option>
                </el-select>

                <el-select
                  v-if="item=='后勤管理'"
                  v-model="form.duty.logistics"
                  filterable
                  multiple
                  remote
                  reserve-keyword
                  size="small"
                  placeholder="输入姓名"
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.NAME">
                  </el-option>
                </el-select>


                <el-select
                  v-if="item=='缴费管理'"
                  v-model="form.duty.finance"
                  filterable
                  multiple
                  remote
                  reserve-keyword
                  size="small"
                  placeholder="输入姓名"
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.NAME">
                  </el-option>
                </el-select>

                <el-select
                  v-if="item=='现场管理'"
                  v-model="form.duty.Interaction"
                  filterable
                  multiple
                  remote
                  reserve-keyword
                  size="small"
                  placeholder="输入姓名"
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.NAME">
                  </el-option>
                </el-select>

                <el-select
                  v-if="item=='参会管理'"
                  v-model="form.duty.professor"
                  filterable
                  multiple
                  remote
                  reserve-keyword
                  size="small"
                  placeholder="输入姓名"
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.NAME">
                  </el-option>
                </el-select>

                <el-select
                  v-if="item=='投稿管理'"
                  v-model="form.duty.contribute"
                  filterable
                  multiple
                  remote
                  reserve-keyword
                  size="small"
                  placeholder="输入姓名"
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.NAME">
                  </el-option>
                </el-select>

              </div>
            </el-form-item>
          </div>
        </el-form>
        <!--{{form.checkedModels}}-->
        <!--{{form.duty}}-->
        <div slot="footer" class="dialog-footer">
          <el-button class="btn3" type="info"  @click="concel()">取消</el-button>
          <el-button type="primary" v-on:click="reset" class="btn2 icon-huanyihuan">重置</el-button>
          <el-button type="primary" class="btn2 icon-baocun2" v-on:click="saveMeet()">保存</el-button>
          <!--<el-button type="primary" class="btn2 icon-fabu1" v-on:click="releaseMeet(form)">发布</el-button>-->
        </div>
      </el-dialog>


      <el-dialog  title="修改会议" :visible.sync="dialogFormEditVisible">
        <el-form :model="form">
          <el-form-item label="会议名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" placeholder=""  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="会议时间" :label-width="formLabelWidth" prop="conferenceData">
            <el-date-picker
              v-model="form.conferenceDate"
              type="datetimerange"
              @change="getSTime"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="需要启用的模块" :label-width="formLabelWidth">
            <el-checkbox :indeterminate="isIndeterminate" v-model="form.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="form.checkedModels"  @change="handleCheckedModelChange">
              <el-checkbox   v-for="model in models" :label="model" :key="model">{{model}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div v-show="duty">
            <el-form-item  label="会议各项负责人" :label-width="formLabelWidth">
              <!--{{meeting}}-->
              <div v-for="item in form.checkedModels">{{item}}

                <el-select
                  v-if="item=='宣传管理'"
                  v-model="form.duty.propaganda"
                  filterable
                  multiple
                  remote
                  reserve-keyword
                  size="small"
                  placeholder="输入姓名"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  :value="form.duty.propaganda"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.NAME">
                  </el-option>
                </el-select>

                <el-select
                  v-if="item=='后勤管理'"
                  v-model="form.duty.logistics"
                  filterable
                  multiple
                  remote
                  reserve-keyword
                  size="small"
                  placeholder="输入姓名"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  :value="form.duty.logistics"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.NAME">
                  </el-option>
                </el-select>


                <el-select
                  v-if="item=='缴费管理'"
                  v-model="form.duty.finance"
                  filterable
                  multiple
                  remote
                  reserve-keyword
                  size="small"
                  placeholder="输入姓名"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  :value="form.duty.finance"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.NAME">
                  </el-option>
                </el-select>

                <el-select
                  v-if="item=='现场管理'"
                  v-model="form.duty.Interaction"
                  filterable
                  multiple
                  remote
                  reserve-keyword
                  size="small"
                  placeholder="输入姓名"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  :value="form.duty.Interaction"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.NAME">
                  </el-option>
                </el-select>

                <el-select
                  v-if="item=='参会管理'"
                  v-model="form.duty.professor"
                  filterable
                  multiple
                  remote
                  reserve-keyword
                  size="small"
                  placeholder="输入姓名"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  :value="form.duty.professor"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.NAME">
                  </el-option>
                </el-select>

                <el-select
                  v-if="item=='投稿管理'"
                  v-model="form.duty.contribute"
                  filterable
                  multiple
                  remote
                  reserve-keyword
                  size="small"
                  placeholder="输入姓名"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  :value="form.duty.contribute"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.NAME">
                  </el-option>
                </el-select>

              </div>
            </el-form-item>
          </div>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button class="btn3" type="info"  @click="cancel()">取消</el-button>
          <el-button type="primary" v-on:click="reset" class="btn2 icon-huanyihuan">重置</el-button>
          <el-button type="primary" class="btn2 icon-baocun2" @click="saveMeet()">保存</el-button>
          <!--<el-button type="primary" class="btn2 icon-fabu1" @click="releaseMeet(form)">发布</el-button>-->
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    const modelOptions = ['投稿管理','宣传管理','参会管理', '后勤管理', '缴费管理','现场管理'];
    export default {
      name: "Index",
      data() {
        return {
          list:[],//负责人列表
          options: [],//检索结果存放
          loading: false,//检索时候的等待状态

          release:[
            // {
            //   conferenceName:'会议5',
            //   conferenceNameid:'1005',
            //   conferenceDate:['2018-09-12','2018-09-13'],
            //   modelOptions:['宣传管理', '后勤管理', '缴费管理'],
            //   duty: {
            //     propaganda:['张三'],
            //     logistics:['李四'],
            //     finance:['赵六'],
            //     Interaction:[],
            //     professor:[],
            //     contribute:[]
            //   }
            // }
          ],
          save:[
            // {
            //   conferenceName:'会议6',
            //   conferenceNameid:'1006',
            //   modelOptions:['宣传管理', '后勤管理','缴费管理','现场管理'],
            //   conferenceDate:['2018-09-12','2018-09-13'],
            //   duty: {
            //     propaganda:['张三'],
            //     logistics:['李四'],
            //     finance:['王五'],
            //     Interaction:['赵六'],
            //     professor:[],
            //     contribute:[]
            //   }
            // }
          ],
          //多少个模块
          models: modelOptions,
          //全选相关
          isIndeterminate: true,
          //修改弹框显示控制
          dialogFormEditVisible:false,
          //新建弹框显示控制
          dialogFormVisible: false,
          //设置负责人一块的显示
          duty:false,
          //填写会议的信息
          form: {
            conferenceId: "",
            conferenceDate: [],
            name: '',
            checkAll: false,
            checkedModels: [],
            duty: {
              propaganda:[],
              logistics:[],
              finance:[],
              Interaction:[],
              professor:[],
              contribute:[]
            },
          },
          formLabelWidth: '120px',
          rules: {
            name: [
              { required: true, message: '请输入会议名称', trigger: 'blur' },
              // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            conferenceData: [
              { type: 'string', message: '请选择日期', trigger: 'change' }
            ],
          }
        }
      },
      methods:{
        getSTime(val) {
          console.log(val);
          let s = new Date(val[0]);
          val[0]=s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate();

          let e = new Date(val[1]);
          val[1]=e.getFullYear()+'-'+(e.getMonth()+1)+'-'+e.getDate();

          this.form.conferenceDate = val;
        },
        remoteMethod(query) {
          if (query !== '') {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options = this.list.filter(item => {
                return item.NAME.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });

            }, 200);
          } else {
            this.options = [];
          }
        },
        //新建会议
        addMeet(){
          this.dialogFormVisible = true;
          this.reset();
        },
        //取消编辑
        cancel(){
          this.dialogFormVisible = false;
          this.dialogFormEditVisible = false;
          this.reset();
          this.$message({
            showClose: true,
            message: '恭喜你，已取消成功',
            type: 'success'
          })
        },
        //编辑会议
        editMeet(index,kind){
          this.dialogFormEditVisible=true;
          if(kind==1){
            this.form.conferenceId=this.release[index].conferenceNameid;
            this.form.name=this.release[index].conferenceName;
            this.form.conferenceDate=this.release[index].conferenceDate?this.release[index].conferenceDate:[];
            this.form.duty.propaganda = this.release[index].duty.propaganda?this.release[index].duty.propaganda:[];
            this.form.duty.logistics = this.release[index].duty.logistics?this.release[index].duty.logistics:[];
            this.form.duty.finance = this.release[index].duty.finance?this.release[index].duty.finance:[];
            this.form.duty.Interaction = this.release[index].duty.Interaction?this.release[index].duty.Interaction:[];
            this.form.duty.contribute = this.release[index].duty.contribute?this.release[index].duty.contribute:[];
            this.form.duty.professor = this.release[index].duty.professor?this.release[index].duty.professor:[];
            this.form.checkedModels=this.release[index].modelOptions;
            //如果全选则显示负责人部分
            this.form.checkAll = (this.release[index].modelOptions.length==modelOptions.length) ? true : false;
            if(this.release[index].modelOptions.length!=0||this.form.checkAll){
              this.duty=true;
            }
          }else{
            this.form.conferenceId=this.save[index].conferenceNameid;
            this.form.name=this.save[index].conferenceName;
            this.form.conferenceDate=this.save[index].conferenceDate?this.save[index].conferenceDate:[];
            this.form.duty.propaganda = this.save[index].duty.propaganda?this.save[index].duty.propaganda:[];
            this.form.duty.logistics = this.save[index].duty.logistics?this.save[index].duty.logistics:[];
            this.form.duty.finance = this.save[index].duty.finance?this.save[index].duty.finance:[];
            this.form.duty.Interaction = this.save[index].duty.Interaction?this.save[index].duty.Interaction:[]
            this.form.duty.contribute = this.save[index].duty.contribute?this.save[index].duty.contribute:[];
            this.form.duty.professor = this.save[index].duty.professor?this.save[index].duty.professor:[];
            this.form.checkedModels=this.save[index].modelOptions;
            //如果全选则显示负责人部分
            this.form.checkAll = (this.save[index].modelOptions.length==modelOptions.length) ? true : false;
            if(this.save[index].modelOptions.length!=0||this.form.checkAll){
              this.duty=true;
            }
          }
        },
        //删除会议
        deleteMeet(meetId){
          this.deelMeet(meetId);
        },
        //保存编辑
        saveMeet(){
          this.saveMeetInfo(this);
          //这里要转换为数据库存储的格式
          this.dialogFormVisible = false;
          this.dialogFormEditVisible = false;

        },
        //查看会议
        seeMeet(index){
          let conferenceName=this.release[index].conferenceName;
          let conferenceDate=this.release[index].conferenceDate?this.release[index].conferenceDate:[];
          let propaganda = this.release[index].duty.propaganda?this.release[index].duty.propaganda:[];
          let logistics = this.release[index].duty.logistics?this.release[index].duty.logistics:[];
          let finance = this.release[index].duty.finance?this.release[index].duty.finance:[];
          let Interaction = this.release[index].duty.Interaction?this.release[index].duty.Interaction:[];
          let professor = this.release[index].duty.professor?this.release[index].duty.professor:[];
          let contribute = this.release[index].duty.contribute?this.release[index].duty.contribute:[];
          let tempH=[];

          const h = this.$createElement;

          if(conferenceName!=""){
            tempH.push(h('span', null, '会议名称：'));
            tempH.push(h('i', { style: 'color: teal;margin-left:10px;' }, conferenceName));
            tempH.push(h('br'));
          }
          if(conferenceDate.length!=0){
            tempH.push(h('span', null, '会议时间：'));
            tempH.push(h('i', { style: 'color: teal;margin-left:10px;' }, conferenceDate[0]+'—'+conferenceDate[1]));
            tempH.push(h('br'));
          }
          if(propaganda.length!=0){
            tempH.push(h('span', null, '宣传管理负责人：'));
            tempH.push(h('i', { style: 'color: teal;margin-left:10px;' }, propaganda.toString()));
            tempH.push(h('br'));
          }
          if(logistics.length!=0){
            tempH.push(h('span', null, '后勤管理负责人：'));
            tempH.push(h('i', { style: 'color: teal;margin-left:10px;' }, logistics.toString()));
            tempH.push(h('br'));
          }
          if(finance.length!=0){
            tempH.push(h('span', null, '缴费管理负责人：'));
            tempH.push(h('i', { style: 'color: teal;margin-left:10px;' }, finance.toString()));
            tempH.push(h('br'));
          }
          if(Interaction.length!=0){
            tempH.push(h('span', null, '现场管理负责人：'));
            tempH.push(h('i', { style: 'color: teal;margin-left:10px;' }, Interaction.toString()));
            tempH.push(h('br'));
          }
          if(professor.length!=0){
            tempH.push(h('span', null, '参会管理负责人：'));
            tempH.push(h('i', { style: 'color: teal;margin-left:10px;' }, professor.toString()));
            tempH.push(h('br'));
          }
          if(contribute.length!=0){
            tempH.push(h('span', null, '投稿管理负责人：'));
            tempH.push(h('i', { style: 'color: teal;margin-left:10px;' }, contribute.toString()));
            tempH.push(h('br'));
          }
          this.$msgbox({
            title: '会议详情',
            message: h('p', null, tempH),
            confirmButtonText: '返回',
          });
        },
        //发布会议
        releaseMeet(meetId){
          this.dialogFormVisible = false;
          this.dialogFormEditVisible = false;
          this.publishMeet(meetId);
        },
        reset(){
          this.form.checkAll= false;
          this.form.checkedModels=[];
          this.form.conferenceId="";
          this.form.name="";
          this.form.conferenceDate=[];
          this.form.duty.propaganda=[];
          this.form.duty.logistics=[];
          this.form.duty.finance=[];
          this.form.duty.Interaction=[];
          this.form.duty.professor=[];
          this.form.duty.contribute=[];
        },
        //全选
        handleCheckAllChange(val) {
          this.form.checkedModels=this.form.checkedModels = val ? modelOptions : [];
          this.isIndeterminate = false;
          let checkedCount = this.form.checkedModels.length;
          if( checkedCount == 0){
            this.duty=false;
          }else{
            this.duty=true;
          }
        },
        //单独选
        handleCheckedModelChange(value) {
          let checkedCount = value.length;
          this.form.checkAll = checkedCount === this.models.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.models.length;
          if( checkedCount == 0){
            this.duty=false;
          }else{
            this.duty=true;
          }
        },
        getMember(){
          this.$http.post('/yii/meetedit/meetprepare/get-administrators')
            .then((res) => {
              if(res.data.data!=null){
                this.list=res.data.data.data;
              }else{
                alert(res.data.message);
              }
            }, (err) => {
              console.log(err)
            })
        },
        saveMeetInfo(that){
          //处理数据
          let findIdByName=function(name){
            let result=[];
            for(let indexName in name){
              for(let index in that.list){
                if(that.list[index].NAME==name[indexName])
                  result.push(that.list[index].USER);
              }
            }
            return result;
          }
          let dDuty={};
          let dtemp=this.form.duty;
          console.log(dtemp);
          for(let index in dtemp){
            switch (index) {
              case 'propaganda':
                if(dtemp[index].length!=0)
                  dDuty["7"]=findIdByName(dtemp[index]);
                break;
              case 'logistics':
                if(dtemp[index].length!=0)
                  dDuty["5"]=findIdByName(dtemp[index]);
                break;
              case 'finance':
                if(dtemp[index].length!=0)
                  dDuty["3"]=findIdByName(dtemp[index]);
                break;
              case 'Interaction':
                if(dtemp[index].length!=0)
                  dDuty["6"]=findIdByName(dtemp[index]);
                break;
              case 'professor':
                if(dtemp[index].length!=0)
                  dDuty["4"]=findIdByName(dtemp[index]);
                break;
              case 'contribute':
                if(dtemp[index].length!=0)
                  dDuty["2"]=findIdByName(dtemp[index]);
                break;
              default:
                break;
            }
          }
          let data={
            "startDate": this.form.conferenceDate[0],
            "endDate": this.form.conferenceDate[1],
            "name": this.form.name,
            "checkedModels": this.form.checkedModels,
            "duty": dDuty
          }
          if(this.form.conferenceId!=""){
            data.meetId=this.form.conferenceId;
          }
          console.log(data);
          let fd = new FormData();
          fd.append('meetInfo',JSON.stringify(data))

          this.$http.post('/yii/meetedit/meetprepare/add-meet',fd)
            .then((res) => {
              if(res.data.data!=null){
                console.log(res.data.data);
                this.$message({
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
                });
                this.getMeetList();
              }else{
                alert(res.data.message);
              }
            }, (err) => {
              console.log(err)
            })
        },
        getMeetList(){
          this.$http.post('/yii/meetedit/meetprepare/get-meet-list')
            .then((res) => {
              if(res.data.data!=null){
                console.log(res.data.data)
                this.release= res.data.data.release
                this.save=res.data.data.save;
              }else{
                alert(res.data.message);
              }
            }, (err) => {
              console.log(err)
            })
        },
        publishMeet(meetId){
          this.$http.post('/yii/meetedit/meetprepare/publish-meet',{"meetId":meetId})
            .then((res) => {
              if(res.data.data!=200){
                console.log(res.data.data)
                this.$message({
                  showClose: true,
                  message: '发布成功',
                  type: 'success'
                });
                //这里要改
                this.getMeetList();
              }else{
                alert(res.data.message);
              }
            }, (err) => {
              console.log(err)
            })
        },
        deelMeet(meetId){
          this.$http.post('/yii/meetedit/meetprepare/delete-meet',{"meetId":meetId})
            .then((res) => {
              if(res.data.data!=200){
                console.log(res.data.data)
                this.$message({
                  showClose: true,
                  message: '删除成功',
                  type: 'success'
                });
                //这里要改
                this.getMeetList();
              }else{
                alert(res.data.message);
              }
            }, (err) => {
              console.log(err)
            })
        }
      },
      mounted(){
        this.getMember();
        this.getMeetList();
      }
    }
</script>

<style scoped>
 #display{
  margin-top:20px;
   border:solid 2px  #e0e0e0;
   height: 600px;
   /*text-align: center;*/
   width: 98%;
   padding-left:10px;
   padding-right:10px;
   background-color:  #fff;
 }
  .list{
    /*width:70%;*/
    padding-top:20px;
    padding-left:20px;
  }
  .listname{
    font-size:18px;
    font-wight:bold;
    color:#fff;
    background-color:#097FC7;
    width:100%;
    height:40px;
    border:solid 1px #097FC7;
    border-radius: 4px;
    padding-top:5px;
    padding-left:3px;
  }
  .name{
    font-size:16px;
    padding-left:8px;
  }
  .fold{
    /*border-left:solid 1px #EBECED;*/
    border:solid 1px #EBECED;
    /*padding-left:5px;*/
  }
  .meetDispaly{
    font-size:15px;
    padding-left:15px;
    border-bottom:solid 1px #fff;
    padding-top:5px;
    padding-bottom:5px;
    background-color:#F4F5F6;
  }
 .meetDispaly:hover{
   background-color:#EFEFEF;
 }
  .see{
    float:right;
    padding-right: 15px;
    font-size: 14px;
  }
  .btn{
    border:none;
    background-color:#F4F5F6;
    box-shadow: none;
    padding:0px 3px 0px 3px;
  }
 .btn:hover{
   background-color:#EFEFEF;
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
   width:90px;
   padding:10px;
   font-size: 14px;
   border-radius: 3px;
   border:none;
   color:white;
   background-color:#338FFC ;
   float: right;
   /*margin-left: 15px;*/
   margin-top: 20px;
   /*margin-bottom: 5px;*/
 }
 .btn4:hover{
   background-color:#5FA7FE;
 }



</style>
