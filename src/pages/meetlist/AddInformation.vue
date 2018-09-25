<template>
    <div class="display  col-md-12">
        <!--顶部-->
        <div class="top">
          <span>会议准备信息填写</span>
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
          <div id="halfHeight2" index="02" class="d_jump" title="财务管理信息填写">
            <div class="listname">财务管理<i class="el-icon-menu" style="padding-left:5px;"></i></div>
            <div class="meet">
              <span>会议注册费用:<input class="input" v-model="meetFee" />元</span>
              <!--<span>-->
              <button class="btn2">确定</button>
              <button class="btn1">取消</button>
              <!--</span>-->
            </div>
          </div>
          <hr>
          <!--后勤管理-->
          <div id="fullHeight1" index="03" class="d_jump" title="后勤管理信息填写">
            <div class="listname">后勤管理<i class="el-icon-menu" style="padding-left:5px;"></i></div>
            <div class="logistic">
              <div class="col-md-1">
                <button class="btn4" v-on:click="hotelsShow" v-bind:class="{ active: isActiveOne }">酒店</button><br>
                <button class="btn4" v-on:click="restaurantsShow" v-bind:class="{ active: isActiveTwo }">餐厅</button><br>
                <button class="btn4" v-on:click="dirversShow" v-bind:class="{ active: isActiveThree }">司机</button><br>
                <button class="btn4" v-on:click="carsShow" v-bind:class="{ active: isActiveFour }">车辆</button><br>
              </div>
              <div class="col-md-11">
                <el-form :model="logisticsForm">
                  <div  class="add" v-show="dirverShow">
                <span class="search icon-sousuo">
                  <input class="input2 " v-model="hotelInfor" placeholder="输入关键词" >
                 </span>
                    <br>
                    <el-table
                      ref="multipleTableOne"
                      :data="dirvers"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="dirverHandleSelectionChange">
                      <el-table-column
                        type="selection"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="tel"
                        label="联系方式"
                        show-overflow-tooltip>
                      </el-table-column>
                    </el-table>
                    <div style="margin-top: 20px">
                      <el-button class="icon-jiajianzujianjiahao"  style="margin-left:10px;font-size:14px;color:#2798FC;"  @click="dirverDialogVisible = true">新增</el-button>
                      <el-button @click="toggleSelectionOne()" style="margin-left:10px;">取消选择</el-button>
                    </div>
                    <div class="page">
                      <ul class="pagination pagination-sm"><!--分页-->
                        <li class="page-item" v-if="logCurrentpage!=1"><span class="page-link" href="#" v-on:click="prepageLog(logCurrentpage)">上一页</span></li>
                        <li class="page-item" v-for="index in pagenumsLog" v-bind:class="{ active: logCurrentpage == index} ">
                          <span class="page-link" href="#" v-on:click="pageChangeLog(index)">{{index}}</span>
                        </li>
                        <li class="page-item" v-if="logCurrentpage!=totlepage"><span class="page-link"  href="#"  v-on:click="nextpageLog(logCurrentpage)">下一页</span></li>
                        <li class="page-item"><span class="page-link"  href="#">共<i>{{totlepage}}</i>页</span></li>
                      </ul>
                    </div>
                  </div>
                  <div class="add" v-show="resShow">
                <span class="search icon-sousuo">
                  <input class="input2 " v-model="resInfor" placeholder="输入关键词" >
                 </span>
                    <br>
                    <el-table
                      ref="multipleTableTwo"
                      :data="restaurants"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="resHandleSelectionChange">
                      <el-table-column
                        type="selection"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="饭店名称"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="tel"
                        label="联系方式"
                        show-overflow-tooltip>
                      </el-table-column>
                    </el-table>
                    <div style="margin-top: 20px">
                      <el-button class="icon-jiajianzujianjiahao"  style="margin-left:10px;font-size:14px;color:#2798FC;" @click="resDialogVisible = true">新增</el-button>
                      <el-button @click="toggleSelectionTwo()" style="margin-left:10px;">取消选择</el-button>
                    </div>
                    <div class="page">
                      <ul class="pagination pagination-sm"><!--分页-->
                        <li class="page-item" v-if="logCurrentpage!=1"><span class="page-link" href="#" v-on:click="prepageLog(logCurrentpage)">上一页</span></li>
                        <li class="page-item" v-for="index in pagenumsLog" v-bind:class="{ active: logCurrentpage == index} ">
                          <span class="page-link" href="#" v-on:click="pageChangeLog(index)">{{index}}</span>
                        </li>
                        <li class="page-item" v-if="logCurrentpage!=totlepage"><span class="page-link"  href="#"  v-on:click="nextpageLog(logCurrentpage)">下一页</span></li>
                        <li class="page-item"><span class="page-link"  href="#">共<i>{{totlepage}}</i>页</span></li>
                      </ul>
                    </div>
                  </div>

                  <div class="add" v-show="hotelShow">
                <span class="search icon-sousuo">
                  <input class="input2 " v-model="hotelInfor" placeholder="输入关键词" >
                 </span>
                    <br>
                    <el-table
                      ref="multipleTableThree"
                      :data="hotels"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="hotelHandleSelectionChange">
                      <el-table-column
                        type="selection"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="酒店名称"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="tel"
                        label="联系方式"
                        show-overflow-tooltip>
                      </el-table-column>
                    </el-table>
                    <div style="margin-top: 20px">
                      <el-button class="icon-jiajianzujianjiahao"  style="margin-left:10px;font-size:14px;color:#2798FC;" @click="hotelDialogVisible = true">新增</el-button>
                      <el-button @click="toggleSelectionThree()" style="margin-left:10px;">取消选择</el-button>
                    </div>
                    <div class="page">
                      <ul class="pagination pagination-sm"><!--分页-->
                        <li class="page-item" v-if="logCurrentpage!=1"><span class="page-link" href="#" v-on:click="prepageLog(logCurrentpage)">上一页</span></li>
                        <li class="page-item" v-for="index in pagenumsLog" v-bind:class="{ active: logCurrentpage == index} ">
                          <span class="page-link" href="#" v-on:click="pageChangeLog(index)">{{index}}</span>
                        </li>
                        <li class="page-item" v-if="logCurrentpage!=totlepage"><span class="page-link"  href="#"  v-on:click="nextpageLog(logCurrentpage)">下一页</span></li>
                        <li class="page-item"><span class="page-link"  href="#">共<i>{{totlepage}}</i>页</span></li>
                      </ul>
                    </div>
                  </div>

                  <div class="add" v-show="carShow">
                <span class="search icon-sousuo">
                  <input class="input2 " v-model="carInfor" placeholder="输入关键词">
                 </span>
                    <br>
                    <el-table
                      ref="multipleTableFour"
                      :data="cars"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="carHandleSelectionChange">
                      <el-table-column
                        type="selection"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="车名"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="tel"
                        label="联系方式"
                        show-overflow-tooltip>
                      </el-table-column>
                    </el-table>
                    <div style="margin-top: 20px">
                      <el-button class="icon-jiajianzujianjiahao"  style="margin-left:10px;font-size:14px;color:#2798FC;" @click="carDialogVisible = true">新增</el-button>
                      <el-button @click="toggleSelectionFour()" style="margin-left:10px;">取消选择</el-button>
                    </div>
                    <div class="page">
                      <ul class="pagination pagination-sm"><!--分页-->
                        <li class="page-item" v-if="logCurrentpage!=1"><span class="page-link" href="#" v-on:click="prepageLog(logCurrentpage)">上一页</span></li>
                        <li class="page-item" v-for="index in pagenumsLog" v-bind:class="{ active: logCurrentpage == index} ">
                          <span class="page-link" href="#" v-on:click="pageChangeLog(index)">{{index}}</span>
                        </li>
                        <li class="page-item" v-if="logCurrentpage!=totlepage"><span class="page-link"  href="#"  v-on:click="nextpageLog(logCurrentpage)">下一页</span></li>
                        <li class="page-item"><span class="page-link"  href="#">共<i>{{totlepage}}</i>页</span></li>
                      </ul>
                    </div>
                  </div>
                  <!--{{this.logisticsForm}}-->
                </el-form>
                <button class="btn2">确定</button>
                <button class="btn1">取消</button>
              </div>
            </div>
          </div>
          <!--司机对话框-->
          <el-dialog
            title="填写司机信息"
            :visible.sync="dirverDialogVisible"
            width="35%">
            <el-form :model="newDirverForm"  ref="form">
              <el-form-item label="姓名">
                <el-input v-model="newDirverForm.DRIVERNAME" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item label="出生年月">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="newDirverForm.AGE" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="newDirverForm.SEX" placeholder="请选择性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="newDirverForm.TEL" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input v-model="newDirverForm.IDNUMBER" style="width:300px;"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dirverDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dirverDialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <!--汽车对话框-->
          <el-dialog
            title="填写汽车信息"
            :visible.sync="carDialogVisible"
            width="30%">
            <el-form :model="newCarForm"  ref="form">
              <el-form-item label="车名">
                <el-input v-model="newCarForm.BUSNAME" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item label="车牌号">
                <el-input v-model="newCarForm.PLATENUM" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item label="车型">
                <el-select v-model="newCarForm.BUSTYPE" placeholder="请选择车型">
                  <el-option label="轿车" value="1"></el-option>
                  <el-option label="越野" value="2"></el-option>
                  <el-option label="客车" value="3"></el-option>
                  <el-option label="其他" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="座位数">
                <el-input v-model="newCarForm.SEATNUM" style="width:120px;"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="carDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="carDialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <!--餐厅对话框-->
          <el-dialog
            title="填写餐厅信息"
            :visible.sync="resDialogVisible"
            width="40%">
            <el-form :model="newResForm"  ref="form">
              <el-form-item label="餐厅名称">
                <el-input v-model="newResForm.RESNAME" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item label="餐厅位置">
                <el-input v-model="newResForm.RESPOSITION" style="width:400px;"></el-input>
              </el-form-item>
              <el-form-item label="总计餐费">
                <el-input v-model="newResForm.RESMONEY" style="width:120px;"></el-input>&nbsp元/人
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="resDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="resDialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <!--酒店对话框-->
          <el-dialog
            title="填写酒店信息"
            :visible.sync="hotelDialogVisible"
            width="45%">
            <el-form :model="newHotelForm"  ref="form" >
              <el-form-item label="酒店名称">
                <el-input v-model="newHotelForm.HOTELNAME" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item label="酒店位置">
                <el-input v-model="newHotelForm.HOTELPOSITION" style="width:400px;"></el-input>
              </el-form-item>
              <el-form-item label="房间种类数目">
                <el-select v-model="newHotelForm.ROOMTYPENUM" placeholder="请选择房间类型数目">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="4" value="4"></el-option>
                  <el-option label="5" value="5"></el-option>
                  <el-option label="6" value="6"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="房间" v-for="key in parseInt(newHotelForm.ROOMTYPENUM)">
                <el-select id="roomType" v-model="newHotelForm.ROOM.ROOMTYPE[key-1]" placeholder="请选择房间类型" v-on:click="addRoomType()">
                  <el-option label="单人标间" value="1"></el-option>
                  <el-option label="双人标间" value="2"></el-option>
                  <el-option label="大床房" value="3"></el-option>
                  <el-option label="豪华单人间" value="4"></el-option>
                  <el-option label="豪华双人间" value="5"></el-option>
                  <el-option label="套房" value="6"></el-option>
                </el-select>&nbsp
                <span>房间价格</span>&nbsp<el-input v-model="newHotelForm.ROOM.ROOMPRICE[key-1]" style="width:80px;"></el-input>&nbsp元&nbsp
                <span>房间数量</span>&nbsp<el-input v-model="newHotelForm.ROOM.ROOMNUM[key-1]" style="width:80px;"></el-input>&nbsp间&nbsp&nbsp
                <span class="newRoom" v-on:click="add('form-newRoom')">
                  <!--<i class="el-icon-circle-plus" style="color:#00AAFF;"></i>添加-->
                </span>
              </el-form-item>
              <!--{{newHotelForm}}-->
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="hotelDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="hotelDialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <hr>
          <!--会议宣传-->
          <div id="fullHeight2" index="04" class="d_jump" title="会议宣传信息填写">
            <div class="listname">会议宣传<i class="el-icon-menu" style="padding-left:5px;"></i></div>
            <div class="advertise">
              <div class="col-md-1">
                <button class="btn4" id="web" v-on:click="webShow" v-bind:class="{ active: isActiveWeb }">网站</button><br>
                <button class="btn4" id="h5" v-on:click="h5Show" v-bind:class="{ active: isActiveH5 }">H5</button>
              </div>
              <div class="col-md-11">
                <div class="add" v-show="websShow">
               <span class="search icon-sousuo">
                  <input class="input2 " v-model="webInfor" placeholder="输入关键词" >
               </span>
                  <el-table
                    ref="singleTableOne"
                    :data="web"
                    highlight-current-row
                    @current-change="handleCurrentChangeOne"
                    style="width: 100%">
                    <el-table-column
                      type="index"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      property="name"
                      label="模板名称"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      property="link"
                      label="查看"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>
                  <div style="margin-top: 20px">
                    <!--<el-button class="icon-jiajianzujianjiahao"  style="margin-left:10px;font-size:14px;color:#2798FC;">新增</el-button>-->
                    <el-button @click="setCurrentOne()">取消选择</el-button>
                  </div>
                  <div class="page">
                    <ul class="pagination pagination-sm"><!--分页-->
                      <li class="page-item" v-if="webCurrentpage!=1"><span class="page-link" href="#" v-on:click="prepageLog(webCurrentpage)">上一页</span></li>
                      <li class="page-item" v-for="item in pagenumsWeb" v-bind:class="{ active: webCurrentpage == item} ">
                        <span class="page-link" href="#" v-on:click="pageChangeWeb(item)">{{item}}</span>
                      </li>
                      <li class="page-item" v-if="webCurrentpage!=totlepage"><span class="page-link"  href="#"  v-on:click="nextpageWeb(webCurrentpage)">下一页</span></li>
                      <li class="page-item"><span class="page-link"  href="#">共<i>{{totlepage}}</i>页</span></li>
                    </ul>
                  </div>
                </div>

                <div class="add" v-show="h5sShow">
              <span class="search icon-sousuo">
                  <input class="input2 " v-model="h5Infor" placeholder="输入关键词" >
              </span>
                  <br>
                  <el-table
                    ref="singleTableTwo"
                    :data="web"
                    highlight-current-row
                    @current-change="handleCurrentChangeTwo"
                    style="width: 100%">
                    <el-table-column
                      type="index"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      property="name"
                      label="样式名称"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      property="link"
                      label="查看"
                      show-overflow-tooltip
                    >
                    </el-table-column>
                  </el-table>
                  <div style="margin-top: 20px">
                    <!--<el-button class="icon-jiajianzujianjiahao"  style="margin-left:10px;font-size:14px;color:#2798FC;">新增</el-button>-->
                    <el-button @click="setCurrentTwo()">取消选择</el-button>
                  </div>
                  <div class="page">
                    <ul class="pagination pagination-sm"><!--分页-->
                      <li class="page-item" v-if="webCurrentpage!=1"><span class="page-link" href="#" v-on:click="prepageWeb(webCurrentpage)">上一页</span></li>
                      <li class="page-item" v-for="item in pagenumsWeb" v-bind:class="{ active: webCurrentpage == item} ">
                        <span class="page-link" href="#" v-on:click="pageChangeWeb(item)">{{item}}</span>
                      </li>
                      <li class="page-item" v-if="webCurrentpage!=totlepage"><span class="page-link"  href="#"  v-on:click="nextpageWeb(webCurrentpage)">下一页</span></li>
                      <li class="page-item"><span class="page-link"  href="#">共<i>{{totlepage}}</i>页</span></li>
                    </ul>
                  </div>
                </div>
                <button class="btn2">确定</button>
                <button class="btn1">取消</button>
              </div>
              <!--{{advertise}}-->
            </div>
            <hr>
          </div>
        </div>
        <div class="right col-md-2">
          <div class="ancherFixed">
            <div style="height:76px;">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher1}" v-on:click="isActiveAncher1=true;isActiveAncher2=false;isActiveAncher3=false;isActiveAncher4=false;jump(0)"></el-button>
              <span style="padding-top:0px;font-size: 16px;" v-bind:class="{textActive:isActiveAncher1 }">负责人信息</span><br>
              <div style="width: 3px; height: 50px; background-color: #DFDFDF;margin-left:11px;"></div>
            </div>
            <div style="height:86px;">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher2}" v-on:click="isActiveAncher1=false;isActiveAncher2=true;isActiveAncher3=false;isActiveAncher4=false;jump(1)"></el-button>
              <span style="font-size: 16px;" v-bind:class="{textActive:isActiveAncher2 }">填写财务管理信息</span><br>
              <div style="width: 3px; height: 60px; background-color: #DFDFDF;margin-left:11px;"></div>
            </div>
            <div style="height:106px;">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher3 }"  v-on:click="isActiveAncher1=false;isActiveAncher2=false;isActiveAncher3=true;isActiveAncher4=false;jump(2)"></el-button>
              <span style="padding-top:5px;font-size: 16px;" v-bind:class="{textActive:isActiveAncher3 }">填写后勤管理信息</span><br>
              <div style="width: 3px; height: 80px; background-color: #DFDFDF;margin-left:11px;"></div>
            </div>
            <div style="height:26px;">
              <el-button   circle  v-bind:class="{ anchor: isActiveAncher4 }"  v-on:click="isActiveAncher1=false;isActiveAncher2=false;isActiveAncher3=false;isActiveAncher4=true;jump(3)"></el-button>
              <span style="padding-top:5px;font-size: 16px;" v-bind:class="{textActive:isActiveAncher4}">填写宣传管理信息</span><br>
            </div>
          </div>
        </div>
        <div class="bottom col-md-12">
          已到达底部
        </div>
  </div>
</template>

        <script>
            export default {
              name: "AddInformation",
              //新建子组件
              components:{
                  newRoomForm:{
                    template:'',
                    // data(){
                    //   return 0
                    // }
                  }
              },
              data(){
                  return{
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
                    restaurants:[
                      {
                        id:'001',
                        name:'饭店一',
                        tel:'10086',
                      },
                      {
                        id:'002',
                        name:'饭店二',
                        tel:'10086',
                      },
                      {
                        id:'003',
                        name:'饭店三',
                        tel:'10086',
                      }
                    ],
                    hotels:[
                      {
                        id:'001',
                        name:'酒店一',
                        tel:'10086',
                      },
                      {
                        id:'002',
                        name:'酒店二',
                        tel:'10086',
                      },
                      {
                        id:'003',
                        name:'酒店三',
                        tel:'10086',
                      },
                      {
                        id:'004',
                        name:'酒店四',
                        tel:'10086',
                      },
                      {
                        id:'005',
                        name:'酒店五',
                        tel:'10086',
                      }
                    ],
                    cars:[
                      {
                        id:'001',
                        name:'汽车一',
                        tel:'10086',
                      },
                      {
                        id:'002',
                        name:'汽车二',
                        tel:'10086',
                      },
                      {
                        id:'003',
                        name:'汽车三',
                        tel:'10086',
                      }
                    ],
                    web:[
                      {
                        id:'001',
                        name:'样式一',
                        link:'#',
                      },
                      {
                        id:'002',
                        name:'样式二',
                        link:'#',
                      },
                      {
                        id:'003',
                        name:'样式三',
                        link:'#',
                      },
                      {
                        id:'004',
                        name:'样式四',
                        link:'#',
                      },
                      {
                        id:'005',
                        name:'样式五',
                        link:'#',
                      }
                    ],
                    h5:[
                      {
                        id:'001',
                        name:'模板一',
                        link:'#',
                      },
                      {
                        id:'002',
                        name:'模板二',
                        link:'#',
                      },
                      {
                        id:'003',
                        name:'模板三',
                        link:'#',
                      },
                      {
                        id:'004',
                        name:'模板四',
                        link:'#',
                      },
                      {
                        id:'005',
                        name:'模板五',
                        link:'#',
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
                    dirverDialogVisible:false,//新增司机对话框
                    resDialogVisible:false,//新增餐厅对话框
                    carDialogVisible:false,//新增汽车对话框
                    hotelDialogVisible:false,//新增酒店对话框
                    newDirverForm:{
                      DRIVERNAME:'',
                      AGE:'',
                      SEX:'1',//性别，1为男，2为女
                      TEL:'',
                      IDNUMBER:'',
                    },//新增司机
                    newCarForm:{
                      BUSNAME:'',
                      PLATENUM:'',
                      BUSTYPE:'',//汽车类型，1为轿车，2为越野车，3为客车，4为其他
                      SEATNUM:'',//座位数
                    },//新增汽车
                    newHotelForm:{
                      HOTELNAME:'',
                      HOTELPOSITION:'',//酒店位置
                      ROOMTYPENUM:3,//房间种类
                      ROOM:
                        {
                          ROOMTYPE:[],//房间类型,1为单人标间，2为双人标间，3为大床房，4豪华单人间，5豪华双人间，6套房
                          ROOMPRICE:[],//房间价格
                          ROOMNUM:[],//房间数量
                        }
                    },//新增酒店
                    newResForm:{
                      RESNAME:'',
                      RESPOSITION:'',//餐厅位置
                      RESMONEY:'',//餐费
                    },//新增餐厅
                    logCurrentpage:1,//当前页
                    logisticsForm: {
                      hotels:[],
                      restaurants:[],
                      cars:[],
                      dirvers:[],
                      // item:'',
                    },
                    advertise:{
                      web:'',
                      h5:'',
                    },
                    formLabelWidth: '120px',
                    hotelShow:true,
                    isActiveWeb: true,
                    isActiveH5: false,
                    isActiveOne: true,
                    isActiveTwo: false,
                    isActiveThree: false,
                    isActiveFour: false,
                    isActiveAncher1:true,//锚点
                    isActiveAncher2:false,//锚点
                    isActiveAncher3:false,//锚点
                    isActiveAncher4:false,//锚点
                    meetFee:'',//会议费用
                    resShow:false,
                    dirverShow:false,
                    carShow:false,
                    websShow:true,
                    h5sShow:false,
                    dirverInfor:'',//司机搜索
                    resInfor:'',//饭店搜索
                    hotelInfor:'',//酒店搜索
                    carInfor:'',//汽车搜索
                    h5Infor:'',//h5搜索
                    webInfor:'',//网站模板搜索
                    webCurrentpage:1,
                    totlepage: 28,//总页数
                    visiblepage: 10,//可见页数
                    fullHeight: document.documentElement.clientHeight,//网页高度
                  }
              },
              methods:{
                //控制房间类型选择
                addRoomType:function(){
                  console.log('12');
                  if (document.getElementById("roomType").value == '1') {
                    document.getElementById("roomType").options[1].disabled= true;
                    document.getElementById("roomType").options[2].disabled= true;
                    return;
                  }
                  // else{
                  //   document.getElementById("roomType").options[2].disabled= false;
                  //   document.getElementById("roomType").options[3].disabled= false;
                  //   return;
                  // }
                },
                hotelsShow:function(){
                  this.hotelShow=true;
                  this.resShow=false;
                  this.dirverShow=false;
                  this.carShow=false;
                  this.isActiveOne= true;
                  this.isActiveTwo= false;
                  this.isActiveThree= false;
                  this.isActiveFour= false;
                  console.log(this.hotelShow);
                  // console.log(this.isActiveTwo);
                },
                restaurantsShow:function(){
                  this.hotelShow=false;
                  this.resShow=true;
                  this.dirverShow=false;
                  this.carShow=false;
                  this.isActiveOne= false;
                  this.isActiveTwo= true;
                  this.isActiveThree= false;
                  this.isActiveFour= false;
                  console.log(this.isActiveOne);
                  console.log(this.isActiveTwo);
                },
                dirversShow:function(){
                  this.hotelShow=false;
                  this.resShow=false;
                  this.dirverShow=true;
                  this.carShow=false;
                  this.isActiveOne= false;
                  this.isActiveTwo= false;
                  this.isActiveThree= true;
                  this.isActiveFour= false;
                  console.log(this.isActiveOne);
                  console.log(this.isActiveTwo);
                },
                carsShow:function(){
                  this.hotelShow=false;
                  this.resShow=false;
                  this.dirverShow=false;
                  this.carShow=true;
                  this.isActiveOne= false;
                  this.isActiveTwo= false;
                  this.isActiveThree= false;
                  this.isActiveFour= true;
                  console.log(this.isActiveOne);
                  console.log(this.isActiveTwo);
                },
                webShow:function () {
                  // let web=document.getElementById("web");
                  this.isActiveWeb=true;
                  this.isActiveH5=false;
                  this.websShow=true;
                  this.h5sShow=false;
                  console.log( this.websShow);
                  console.log( this.h5sShow);
                },
                h5Show:function(){
                  this.isActiveWeb=false;
                  this.isActiveH5=true;
                  this.websShow=false;
                  this.h5sShow=true;
                  console.log( this.websShow);
                  console.log( this.h5sShow);
                },
                pageChangeLog: function(page){//分页
                  if (this.logCurrentpage != page) {
                    this.logCurrentpage = page;
                    // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
                  }
                  console.log(this.logCurrentpage );
                },
                prepageLog:function(page){//上一页
                  page--;
                  if (this.logCurrentpage != page) {
                    this.logCurrentpage = page;
                    // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
                  }
                  console.log(page);
                },
                nextpageLog:function(page){//下一页
                  page++;
                  if (this.logCurrentpage != page) {
                    this.logCurrentpage = page;
                    // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
                  }
                  console.log(page);
                },
                pageChangeWeb: function(page){//分页
                  if (this.webCurrentpage != page) {
                    this.webCurrentpage = page;
                    // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
                  }
                  console.log(this.webCurrentpage );
                },
                prepageWeb:function(page){//上一页
                  page--;
                  if (this.webCurrentpage != page) {
                    this.webCurrentpage = page;
                    // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
                  }
                  console.log(page);
                },
                nextpageWeb:function(page){//下一页
                  page++;
                  if (this.webCurrentpage != page) {
                    this.webCurrentpage = page;
                    // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
                  }
                  console.log(page);
                },
                //取消选中
                toggleSelectionOne(rows) {
                  if (rows) {
                    rows.forEach(row => {
                      this.$refs.multipleTableOne.toggleRowSelection(row);
                    });
                  } else {
                    this.$refs.multipleTableOne.clearSelection();
                  }
                },
                toggleSelectionTwo(rows) {
                  if (rows) {
                    rows.forEach(row => {
                      this.$refs.multipleTableTwo.toggleRowSelection(row);
                    });
                  } else {
                    this.$refs.multipleTableTwo.clearSelection();
                  }
                },
                toggleSelectionThree(rows) {
                  if (rows) {
                    rows.forEach(row => {
                      this.$refs.multipleTableThree.toggleRowSelection(row);
                    });
                  } else {
                    this.$refs.multipleTableThree.clearSelection();
                  }
                },
                toggleSelectionFour(rows) {
                  if (rows) {
                    rows.forEach(row => {
                      this.$refs.multipleTableFour.toggleRowSelection(row);
                    });
                  } else {
                    this.$refs.multipleTableFour.clearSelection();
                  }
                },
                //获得多选框选中的数据
                dirverHandleSelectionChange(val) {
                  this.logisticsForm.dirvers = val;
                  console.log(this.logisticsForm.dirvers);
                },
                resHandleSelectionChange(val) {
                  this.logisticsForm.restaurants = val;
                  console.log(this.logisticsForm.restaurants);
                },
                hotelHandleSelectionChange(val) {
                  this.logisticsForm.hotels = val;
                  console.log(this.logisticsForm.hotels);
                },
                carHandleSelectionChange(val) {
                  this.logisticsForm.cars = val;
                  console.log(this.logisticsForm.cars);
                },
                //单选
                setCurrentOne(row) {
                  this.$refs.singleTableOne.setCurrentRow(row);
                },
                handleCurrentChangeOne(val) {
                  this.advertise.web = val;
                },
                setCurrentTwo(row) {
                  this.$refs.singleTableTwo.setCurrentRow(row);
                },
                handleCurrentChangeTwo(val) {
                  this.advertise.h5 = val;
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
              },
              mounted: function () {
                // console.log(this.fullHeight);
                 //设置各部分的高度
                document.getElementById('halfHeight1').style.height=(this.fullHeight/3)+'px';
                document.getElementById('halfHeight2').style.height=(this.fullHeight/3)+'px';
                document.getElementById('fullHeight1').style.height=(this.fullHeight)+'px';
                document.getElementById('fullHeight2').style.height=(this.fullHeight)+'px';
                // console.log(document.getElementById('halfHeight1').style.height)
              },
              computed: {
                pagenumsLog: function(){//分页
                  //初始化前后页边界
                  let lowPage = 1;
                  let highPage = this.totlepage;
                  let pageArr = [];
                  if(this.totlepage > this.visiblepage){//总页数超过可见页数时，进一步处理；
                    let subVisiblePage = Math.ceil(this.visiblepage/2);
                    if(this.logCurrentpage > subVisiblePage && this.logCurrentpage < this.totlepage - subVisiblePage +1){//处理正常的分页
                      lowPage = this.logCurrentpage - subVisiblePage;
                      highPage = this.logCurrentpage + subVisiblePage -1;
                    }else if(this.logCurrentpage <= subVisiblePage){//处理前几页的逻辑
                      lowPage = 1;
                      highPage = this.visiblepage;
                    }else{//处理后几页的逻辑
                      lowPage = this.totlepage - this.visiblepage + 1;
                      highPage = this.totlepage;
                    }
                  }
                  //确定了上下page边界后，要准备压入数组中了
                  while(lowPage <= highPage){
                    pageArr.push(lowPage);
                    lowPage ++;
                  }
                  return pageArr;
                },
                pagenumsWeb: function(){//分页
                  //初始化前后页边界
                  let lowPage = 1;
                  let highPage = this.totlepage;
                  let pageArr = [];
                  if(this.totlepage > this.visiblepage){//总页数超过可见页数时，进一步处理；
                    let subVisiblePage = Math.ceil(this.visiblepage/2);
                    if(this.webCurrentpage > subVisiblePage && this.webCurrentpage < this.totlepage - subVisiblePage +1){//处理正常的分页
                      lowPage = this.webCurrentpage - subVisiblePage;
                      highPage = this.webCurrentpage + subVisiblePage -1;
                    }else if(this.webCurrentpage <= subVisiblePage){//处理前几页的逻辑
                      lowPage = 1;
                      highPage = this.visiblepage;
                    }else{//处理后几页的逻辑
                      lowPage = this.totlepage - this.visiblepage + 1;
                      highPage = this.totlepage;
                    }
                  }
                  //确定了上下page边界后，要准备压入数组中了
                  while(lowPage <= highPage){
                    pageArr.push(lowPage);
                    lowPage ++;
                  }
                  return pageArr;
                }
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
          .advertise{
            margin-top:20px;
            /*margin-left:20px;*/
            margin-bottom:20px;
            height:550px;
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
          .input2{
            float:right;
            border:1px solid #338FFC;
            border-radius: 5px;
            color:#000;
            width:200px;
            font-weight:lighter;
          }
          .page{
            text-align: center;
          }
          .logistic{
            margin-top:20px;
            /*margin-left:20px;*/
            margin-bottom:20px;
            height:550px;
          }
          .search{
            /*width:160px;*/
            background-color: #00AAFF;
            border-radius: 5px;
            width: 240px;
            padding:5px;
            color:#fff;
            font-weight:bold;
            font-size:14px;
            float:right;
            margin-right:10px;
            margin-bottom:10px;
            margin-top:10px;
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
          .newRoom:hover{
            color:#00AAFF;
          }
        </style>
