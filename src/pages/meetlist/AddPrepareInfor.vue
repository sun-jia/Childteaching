<template>
  <div class="display  col-md-12">
    <!--顶部-->
    <div class="top col-md-12">
      <span>会议筹备信息填写</span>
      <el-dropdown size="medium" style="float:right;" split-button type="primary">
        <!--<span class="el-dropdown-link">-->
        <!--页面菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
        <!--</span>-->
        页面菜单
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><router-link to="/meetlist/AddInformation">会议准备</router-link></el-dropdown-item>
          <el-dropdown-item><router-link to="/meetlist/AddPrepareInfor">会议筹备</router-link></el-dropdown-item>
          <el-dropdown-item><router-link to="/meetlist/AddPrograssInfor">会议进行</router-link></el-dropdown-item>
          <el-dropdown-item>会议进行</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <hr>
    </div>
    <div class="left col-md-10">
      <!--模块负责人-->
      <div id="halfHeight1" index="01" class="d_jump" title="负责人信息">
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
      <hr>
      <!--财务管理-->
      <div id="fullHeight2" index="02" class="d_jump" title="财务管理信息填写">
        <div class="listname">财务管理<i class="el-icon-menu" style="padding-left:5px;"></i></div>
        <div class="meet">
          <!--<span>专家人数:<input class="input" v-model="expertFee" />人</span><br><br>-->
          <span>专家出场总费用预算:<input class="input" v-model="expertFee" />元</span>
          <button class="btn2" >确定</button>
          <button class="btn1" >取消</button><br><br>
          <el-table
            :data="expert"
            border
            style="width:80%"
            height="300">
            <el-table-column
              fixed
              prop="name"
              label="姓名"
              width="200">
            </el-table-column>
            <el-table-column
              prop="grade"
              label="职称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="company"
              label="单位"
              width="240">
            </el-table-column>
            <el-table-column
              prop="tel"
              label="联系电话"
              width="200">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              >
              <template slot-scope="scope">
                <el-button @click="deleteRow()" type="text" size="small">移除</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button class="icon-jiajianzujianjiahao"  style="margin-left:10px;font-size:14px;color:#2798FC;margin-top:20px;" @click="expertDialogVisible = true">新增</el-button>
        </div>
        <!--专家新增对话框-->
        <el-dialog
          title="填写专家信息"
          :visible.sync="expertDialogVisible"
          width="35%">
          <el-form :model="newExpertForm"  ref="form">
            <el-form-item label="姓名">
              <el-input v-model="newExpertForm.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="职称">
              <el-select v-model="newExpertForm.grade" placeholder="请选择职称">
                <el-option label="助教" value="1"></el-option>
                <el-option label="讲师" value="2"></el-option>
                <el-option label="副教授" value="3"></el-option>
                <el-option label="教授" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="newExpertForm.company" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="newExpertForm.tel" style="width:300px;"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="expertDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="expertDialogVisible = false">确 定</el-button>
          </span>
          {{newExpertForm}}
        </el-dialog>
      </div>
      <hr>
      <!--后勤管理-->
      <div id="fullHeight1" index="03" class="d_jump" title="后勤管理信息填写">
        <div class="listname">后勤管理<i class="el-icon-menu" style="padding-left:5px;"></i></div>
        <div class="logistic">
          <div class="col-md-1">
            <button class="btn4" v-on:click="hotelsShow" v-bind:class="{ active: isActiveOne }">住房安排</button><br>
            <button class="btn4" v-on:click="TransferLogShow" v-bind:class="{ active: isActiveTwo }">接送安排</button><br>
          </div>
          <div class="col-md-11">
            <!--住房安排-->
              <div class="add"  v-show="hotelShow">

              </div>
            <!--出行安排-->
              <div  class="add" v-show="transferShow">
                <el-form :model="transferForm">
                  <el-table
                    :data="transfer"
                    style="width: 98%"
                    height="350">
                    <el-table-column
                      prop="dirver"
                      label="司机"
                      width="120">
                    </el-table-column>
                    <!--<el-table-column-->
                      <!--prop="peopleNum"-->
                      <!--label="人数"-->
                      <!--width="120">-->
                    <!--</el-table-column>-->
                    <el-table-column
                      prop="startPosition"
                      label="出发点"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="endPosition"
                      label="终点"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="time"
                      label="时间"
                      width="200">
                    </el-table-column>
                    <!--<el-table-column-->
                      <!--prop="reason"-->
                      <!--label="原因">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                      <!--prop="plateNum"-->
                      <!--label="汽车"-->
                      <!--width="120">-->
                    <!--</el-table-column>-->
                    <el-table-column
                      label="操作"
                      width="">
                      <template slot-scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div style="margin-top: 20px">
                    <el-button class="icon-jiajianzujianjiahao"  style="margin-left:10px;margin-bottom:10px;font-size:14px;color:#2798FC;"  @click="transferDialogVisible = true">新增</el-button>
                  </div>
                </el-form>
                <!--<span>出行安排</span>-->
            </div>
            <!--<button class="btn2">确定</button>-->
            <!--<button class="btn1">取消</button>-->
            <!--新增出行记录-->
            <el-dialog
              title="填写出行记录"
              :visible.sync="transferDialogVisible"
              width="50%">
              <!--选择出行人-->
              <el-dialog
                width="25%"
                title="选择出行人"
                :visible.sync="innerVisible"
                append-to-body>
                <el-table
                  ref="peopleToggleSelection"
                  :data="expert"
                  tooltip-effect="dark"
                  style="width: 95%;text-align: center"
                  @selection-change="peopleHandleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="40">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="120" >
                  </el-table-column>
                  <!--<el-table-column-->
                  <!--prop="company"-->
                  <!--label="单位"-->
                  <!--width="120">-->
                  <!--</el-table-column>-->
                  <el-table-column
                    prop="tel"
                    label="电话"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
                <div style="margin-top: 10px;float:left;margin-bottom: 20px;">
                  <el-button @click="peopleToggleSelection()">取消选择</el-button>
                </div>
                <span slot="footer" class="dialog-footer">
                      <!--<el-button @click="innerVisible = false;"></el-button>-->
                      <el-button type="primary" @click="innerVisible = false">关闭</el-button>
                </span>
              </el-dialog>
              <!--选择司机-->
              <el-dialog
                width="25%"
                title="选择司机"
                :visible.sync="innerVisibleDirver"
                append-to-body>
                <el-table
                  ref="singleTable"
                  :data="dirvers"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="120" >
                  </el-table-column>
                  <el-table-column
                    prop="tel"
                    label="电话"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                  <el-button @click="setCurrent()">取消选择</el-button>
                </div>
                <span slot="footer" class="dialog-footer">
                      <!--<el-button @click="innerVisibleDirver = false">取 消</el-button>-->
                      <el-button type="primary" @click="innerVisibleDirver = false">关闭</el-button>
                </span>
              </el-dialog>
              <el-form :model="transferForm"  ref="form">
                <el-form-item label="出行人">
                  <input   @click="innerVisible = true;" v-model="peopleMultipleSelection.name"  style="width:50%;border:solid 1px #CECECE;border-radius: 4px;text-align: center;" placeholder="选择需要接送的人员"></input>
                  <span @click="innerVisible = true;" style="color:#00AAFF;"><i class="el-icon-circle-plus" ></i>点击选择</span>
                  <!--<span>{{transferForm.people.toString()}}</span>-->
                </el-form-item>
                <el-form-item label="人数">
                  <el-input v-model="transferForm.peopleNum" style="width:200px;" placeholder="填入需要接送的人员总数" ></el-input>
                </el-form-item>
                <el-form-item label="司机">
                  <input v-model="currentRow.name" style="width:30%;border:solid 1px #CECECE;border-radius: 4px;text-align: center;" placeholder="选择司机" @click="innerVisibleDirver = true">选择司机</input>
                  <span @click="innerVisibleDirver = true" style="color:#00AAFF;"><i class="el-icon-circle-plus" ></i>点击选择</span>
                </el-form-item>
                <el-form-item label="车辆">
                  <select id="carType" v-model="transferForm.busType" v-on:click="busPlateNumShow()" placeholder="请选择车型" style="width:100px;height:40px;font-size:14px;border-radius: 4px;">
                    <option label="轿车" value="1"></option>
                    <option label="越野" value="2"></option>
                    <option label="客车" value="3"></option>
                    <option label="其他" value="4"></option>
                    <option label="空" value=""></option>
                  </select>
                  <el-select id="carPlateNum"  placeholder="请选择车" v-model="transferForm.plateNum" v-show="busPlateNum">
                    <el-option v-for="item in cars"  :value="item.PLATENUM" >{{item.BUSNAME}}{{item.PLATENUM}}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="出发点">
                  <el-input v-model="transferForm.startPosition" style="width:300px;" placeholder="请填入出发位置"></el-input>
                </el-form-item>
                <el-form-item label="终点">
                  <el-input v-model="transferForm.endPosition" style="width:300px;" placeholder="请填入终点位置"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                  <el-date-picker
                    v-model="transferForm.time"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="原因">
                  <el-input v-model="transferForm.reason" style="width:80%;" placeholder="请填入出行原因"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="transferDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="transferDialogVisible = false">确 定</el-button>
              </span>
              <!--{{transferForm}}-->
            </el-dialog>
          </div>
        </div>
      </div>
      <hr>
      <!--会议行程-->
      <div id="fullHeight3" index="04" class="d_jump" title="会议进程信息填写">
        <div class="listname">会议宣传<i class="el-icon-menu" style="padding-left:5px;"></i></div>
        <div class="meeting">
          <el-form :model="registeredForm">
            <el-form-item label="会议注册" style="margin-top:10px;">
              <span>时间</span>
              <el-date-picker
              v-model="registeredForm.time"
              type="datetime"
              placeholder="选择日期时间">
              </el-date-picker>
              <span>地点</span><el-input  placeholder="请输入地点" v-model="registeredForm.position" style="width:200px;"></el-input>
              <br><span>备注</span><el-input type="textarea" :rows="2" placeholder="请输入备注信息" v-model="registeredForm.remarks" style="width:400px;margin-top: 10px;margin-left: 5px;"></el-input>
            </el-form-item>
            <el-button @click="registeredReset">重置</el-button>
            <el-button type="primary" @click="registeredSubmit">确定</el-button>
            <!--{{registeredForm}}-->
          </el-form>
          <el-form :model="reportForm" style="margin-top:20px;">
            <el-form-item label="会议报告">
              <span>报告数量</span><el-input placeholder="填入会议报告数量" v-model="reportForm.num" style="width:120px;"></el-input>
              <span class="el-icon-circle-plus" style="color:#00AAFF" v-on:click="reportAdd()">增加</span>
              <span class="el-icon-remove" style="color:#00AAFF" v-on:click="reportRemove()">减少</span>
            </el-form-item>
            <div style="padding-bottom:500px;">
              <el-form-item label="" v-for="key in parseInt(reportForm.num)">
                <span style="font-weight: bold;padding-right:10px;">报告{{key}}</span>
                <span>报告主题</span>&nbsp<el-input v-model="reportForm.report.topic[key-1]" style="width:200px;"></el-input>&nbsp&nbsp
                <span>报告时间</span>&nbsp
                <el-date-picker
                  v-model="reportForm.report.time[key-1]"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>&nbsp&nbsp
                <span>报告地点</span>&nbsp<el-input v-model="reportForm.report.position[key-1]" style="width:200px;"></el-input>&nbsp&nbsp
                <br><span style="padding-left:50px;">简介</span><el-input type="textarea" :rows="3" placeholder="请输入简介信息" v-model="reportForm.report.Introduction[key-1]" style="width:400px;margin-top: 10px;margin-left: 5px;"></el-input>
                <el-button @click="reportReset(key-1)">重置</el-button>
                <el-button type="primary" v-on:click="reportSubmit()">确定</el-button>
              </el-form-item>
            </div>
            <!--{{reportForm}}-->
         </el-form>
        </div>
      </div>
    </div>
    <div class="right col-md-2">
      <div class="ancherFixed">
        <div style="height:76px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher1}" v-on:click="isActiveAncher1=true;isActiveAncher2=false;isActiveAncher3=false;isActiveAncher4=false;jump(0)"></el-button>
          <span style="padding-top:0px;font-size: 16px;vertical-align:bottom;" v-bind:class="{textActive:isActiveAncher1 }">负责人信息</span><br>
          <div style="width: 3px; height: 50px; background-color: #DFDFDF;margin-left:11px;"></div>
        </div>
        <div style="height:86px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher2}" v-on:click="isActiveAncher1=false;isActiveAncher2=true;isActiveAncher3=false;isActiveAncher4=false;jump(1)"></el-button>
          <span style="font-size: 16px;vertical-align:bottom;" v-bind:class="{textActive:isActiveAncher2 }">填写财务管理信息</span><br>
          <div style="width: 3px; height: 60px; background-color: #DFDFDF;margin-left:11px;"></div>
        </div>
        <div style="height:106px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher3 }"  v-on:click="isActiveAncher1=false;isActiveAncher2=false;isActiveAncher3=true;isActiveAncher4=false;jump(2)"></el-button>
          <span style="padding-top:5px;font-size: 16px;vertical-align:bottom;" v-bind:class="{textActive:isActiveAncher3 }">填写后勤管理信息</span><br>
          <div style="width: 3px; height: 80px; background-color: #DFDFDF;margin-left:11px;"></div>
        </div>
        <div style="height:26px;">
          <el-button   circle  v-bind:class="{ anchor: isActiveAncher4 }"  v-on:click="isActiveAncher1=false;isActiveAncher2=false;isActiveAncher3=false;isActiveAncher4=true;jump(3)"></el-button>
          <span style="padding-top:5px;font-size: 16px;vertical-align:bottom;" v-bind:class="{textActive:isActiveAncher4}">填写会议进程信息</span><br>
        </div>
      </div>
    </div>
    <div class="bottom col-md-12">
      已到达底部<i class="icon-jiantoushang"></i>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AddMeetInfor",
    data(){
      return{
        cars:[
          {
            BUSNAME:'路虎',
            PLATENUM:'1001',
            BUSTYPE:'2',//汽车类型，1为轿车，2为越野车，3为客车，4为其他
            SEATNUM:'4',//座位数
          },
          {
            BUSNAME:'奔驰7座',
            PLATENUM:'1002',
            BUSTYPE:'2',//汽车类型，1为轿车，2为越野车，3为客车，4为其他
            SEATNUM:'7',//座位数
          },
          {
            BUSNAME:'宇通客车',
            PLATENUM:'1003',
            BUSTYPE:'3',//汽车类型，1为轿车，2为越野车，3为客车，4为其他
            SEATNUM:'20',//座位数
          }
        ],
        dirvers:[
          {
            id:'001',
            name:'张三',
            tel:'10086',
          },
          {
            id:'002',
            name:'李四',
            tel:'10086',
          },
          {
            id:'003',
            name:'王五',
            tel:'10086',
          }
        ],
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
        expert:[
          {
            id:'001',
            name:'专家一',
            grade:'助教',
            company:'华中师范大学',
            tel:'10086',
          },
          {
            id:'002',
            name:'专家二',
            grade:'助教',
            company:'北京师范大学',
            tel:'10086',
          },
          {
            id:'003',
            name:'专家三',
            grade:'讲师',
            company:'北大',
            tel:'10086',
          },
          {
            id:'004',
            name:'专家四',
            grade:'副教授',
            company:'清华',
            tel:'10086',
          },
          {
            id:'005',
            name:'专家五',
            grade:'教授',
            company:'中国传媒大学',
            tel:'10086',
          }
        ],//专家
        transfer:[
          {
            people:['小一'],//接的人
            peopleNum:'1',
            dirver:'赵云',
            plateNum:'1001',
            startPosition:'华中师范大学',
            endPosition:'武昌火车站',
            time:'2018-06-01 08:00:00',//时间
            reason:'接人',//原因
          },
          {
            people:['小二','小三'],//接的人
            peopleNum:'2',
            dirver:'关羽',
            plateNum:'1004',
            startPosition:'华中师范大学',
            endPosition:'武昌火车站',
            time:'2018-06-02 08:00:00',//时间
            reason:'接人',//原因
          },
          {
            people:['小四'],//接的人
            peopleNum:'1',
            dirver:'刘备',
            plateNum:'1005',
            startPosition:'华中师范大学',
            endPosition:'武昌火车站',
            time:'2018-06-01 08:00:00',//时间
            reason:'接人',//原因
          },
        ],//出行记录
        busPlateNum:false,//汽车选择显示
        currentRow: {
          id:'',
          name:'',
        },//司机单选
        expertFee:'',//专家费用
        expertDialogVisible:false,//专家新增对话框
        innerVisible: false,//内嵌对话框
        innerVisibleDirver:false,//司机对话框
        newExpertForm:{
          name:'',
          grade:'',//职称,1为助教、2为讲师、3为副教授、4为教授
          company:'',
          tel:'',
        },
        hotelShow:true,
        // dirverMultipleSelection:[],//司机全选
        peopleMultipleSelection:
          {
            id:[],
            name:[],
          },//出行人全选
        registeredForm:{
          time:'',
          position:'',
          remarks:'',//备注信息
        },//会议注册
        reportForm:{
          num:0,//报告数量
          report:{
            topic:[],//主题
            Introduction:[],//简介
            time:[],
            position:[],
          }
        },//报告信息
        transferShow:false,
        transferDialogVisible:false,//新增出行记录对话框
        transferForm:{
          people:[],//接的人
          peopleNum:'',
          dirver:'',
          busType:'',
          plateNum:'',
          time:'',//时间
          startPosition:'',
          endPosition:'',
          reason:'',//原因
        },
        isActiveOne: true,
        isActiveTwo: false,
        isActiveAncher1:true,//锚点
        isActiveAncher2:false,//锚点
        isActiveAncher3:false,//锚点
        isActiveAncher4:false,//锚点
        fullHeight: document.documentElement.clientHeight,//网页高度
      }
        },
      methods:{
          //汽车选择显示
        busPlateNumShow:function(){
          // console.log(document.getElementById("carType").value);
          if (document.getElementById("carType").value !== ""){
             this.busPlateNum=true;
          }else{
             this.busPlateNum=false;
             this.transferForm.plateNum= "";
          }
        },
          //移除
        // deleteRow():function () {
        // },
        //取消出行人全选
        peopleToggleSelection() {
            this.$refs.peopleToggleSelection.clearSelection();
        },
        //全选
        peopleHandleSelectionChange(val) {
          this.peopleMultipleSelection.id=[];
          this.peopleMultipleSelection.name=[];
          for(let i=0;i<val.length;i++){
            this.peopleMultipleSelection.id[i]=val[i].id;
            this.peopleMultipleSelection.name[i]=val[i].name;
          }
          this.transferForm.people =this.peopleMultipleSelection.id;
        },
        //单选
        setCurrent() {
          this.$refs.singleTable.setCurrentRow('');
        },
        handleCurrentChange(val) {
          this.currentRow.id=val.id;
          this.currentRow.name=val.name;
          this.transferForm.dirver = this.currentRow.id;
        },
        hotelsShow:function(){
          this.hotelShow=true;
          this.transferShow=false;
          this.isActiveOne= true;
          this.isActiveTwo= false;
          console.log(this.hotelShow);
          // console.log(this.isActiveTwo);
        },
        TransferLogShow:function(){
          this.hotelShow=false;
          this.transferShow=true;
          this.isActiveOne= false;
          this.isActiveTwo= true;
          console.log(this.transferShow);
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
        //会议注册重置
        registeredReset:function () {
          this.registeredForm.time='';
          this.registeredForm.position='';
          this.registeredForm.remarks='';
        },
        //会议注册信息提交
        registeredSubmit:function () {

        },
        //报告数量加一
        reportAdd:function(){
          this.reportForm.report.topic[this.reportForm.num]='';
          this.reportForm.report.Introduction[this.reportForm.num]='';
          this.reportForm.report.time[this.reportForm.num]='';
          this.reportForm.report.position[this.reportForm.num]='';
          console.log(this.reportForm.report.topic[this.reportForm.num]);
          console.log(this.reportForm.report.Introduction[this.reportForm.num]);
          console.log(this.reportForm.report.time[this.reportForm.num]);
          console.log(this.reportForm.num)
          this.reportForm.num++;
        },
        //报告数量减一
        reportRemove:function () {
          if(this. reportForm.num!=0){
            let a=[],b=[],c=[],d=[];
            a=this.reportForm.report.topic;
            b=this.reportForm.report.Introduction;
            c=this.reportForm.report.time;
            d=this.reportForm.report.position;
            //初始化
            this.reportForm.report.topic=[];
            this.reportForm.report.Introduction=[];
            this.reportForm.report.time=[];
            this.reportForm.report.position=[];
            this.reportForm.num--;
            for(let i=0;i<this.reportForm.num;i++){
              this.reportForm.report.topic[i]=a[i];
              this.reportForm.report.Introduction[i]=b[i];
              this.reportForm.report.time[i]=c[i];
              this.reportForm.report.position[i]=d[i];
            }
          }
        },
        //报告信息重置
        reportReset:function (val) {
          console.log(val);
          let that=this;
          this.$set(this.reportForm.report.topic,val,"");
          this.$set(this.reportForm.report.Introduction,val,"");
          this.$set(this.reportForm.report.time,val,"");
          this.$set(this.reportForm.report.position,val,"");
        },
        //报告信息提交
        reportSubmit:function () {

        }
      },
      mounted: function () {
        // console.log(this.fullHeight);
        //设置各部分的高度
        document.getElementById('halfHeight1').style.height=(this.fullHeight/3)+'px';
        // document.getElementById('halfHeight2').style.height=(this.fullHeight/3)+'px';
        document.getElementById('fullHeight1').style.height=(this.fullHeight)+'px';
        document.getElementById('fullHeight2').style.height=(this.fullHeight)+'px';
        // document.getElementById('fullHeight3').style.height=(this.fullHeight)+'px';
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
    width:80px;
    padding:5px;
    font-size: 16px;
    border-radius: 5px;
    border:1px solid #2789DF;
    color:white;
    background-color:#2789DF ;
    float: right;
    margin-right: 200px;
    margin-top:10px;
    margin-bottom:20px;
  }
  .btn2:hover{
    background-color:#5AA6E9;
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

</style>
