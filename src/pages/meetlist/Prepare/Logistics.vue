<template>
  <div id="fullHeight2" index="03" class="d_jump" title="后勤管理信息填写">
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
              style="width: 90%"
              height="350">
              <el-table-column
                prop="dirver"
                label="司机"
                width="120">
              </el-table-column>
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
                <input v-model="currentRow.name" style="width:30%;border:solid 1px #CECECE;border-radius: 4px;text-align: center;" placeholder="选择司机" @click="innerVisibleDirver = true">
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
  </div>
</template>

<script>
    export default {
        name: "Logistics",
        data(){
          return{
            isActiveOne: true,
            isActiveTwo: false,
            hotelShow:true,
            transferShow:false,
            fullHeight: document.documentElement.clientHeight,//网页高度
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
            innerVisible: false,//内嵌对话框
            innerVisibleDirver:false,//司机对话框
            transferDialogVisible:false,//新增出行记录对话框
            busPlateNum:false,//汽车选择显示
            hotelShow:true,
            transferShow:false,
            currentRow: {
              id:'',
              name:'',
            },//司机单选

            // dirverMultipleSelection:[],//司机全选
            peopleMultipleSelection:
              {
                id:[],
                name:[],
              },//出行人全选
          }
        },
      methods:{
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
      },
      mounted: function () {
        // console.log(this.fullHeight);
        //设置各部分的高度
        // document.getElementById('fullHeight1').style.height=(this.fullHeight)+'px';
      },
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
</style>
