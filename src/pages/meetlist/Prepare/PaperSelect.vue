<template>
  <div id="fullHeight4" index="05" class="d_jump" title="论文筛选">
    <div class="listname">论文筛选<i class="el-icon-menu" style="padding-left:5px;vertical-align: center"></i></div>
    <div class="col-md-12" style="margin-top: 10px;">
      <el-table
        ref="multipleTable"
        :data="paper"
        tooltip-effect="dark"
        style="width: 95%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="论文标题"
          width="400"
          prop='title'>
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          width="160">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系电话"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-on:click="agreen(scope.row)">接收</el-button>
            <el-button type="text" size="small" v-on:click="rejuct(scope.row)">拒绝</el-button>
            <el-button type="text" size="small" v-on:click="back(scope.row)">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="agreenAll()">全部接收</el-button>
        <el-button @click="backAll()">全部撤销</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "PaperSelect",
      data(){
          return{
            paper:[
              {
                title:'论文一',
                author:'小一',
                tel:'10086',
              },
              {
                title:'论文二',
                author:'小二',
                tel:'10086',
              },
              {
                title:'论文三',
                author:'小三',
                tel:'10086',
              },
              {
                title:'论文四',
                author:'小四',
                tel:'10086',
              },
              {
                title:'论文五',
                author:'小五',
                tel:'10086',
              },
            ],
            multipleSelection: [],
            totlepage: 28,//总页数
            visiblepage: 10,//可见页数
            logCurrentpage:1,//当前页
          }
      },
      methods:{
        toggleSelection() {
            this.$refs.multipleTable.clearSelection();
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //撤销
        back:function () {

        },
        //全部接收
        backAll:function(){

        },
        //接受
        agreen:function (val) {
          console.log(val)
       },
        //全部接受
        agreenAll:function (val) {
          console.log(val)
        },
        // 拒绝
        rejuct:function (val) {

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
  .page{
    text-align: center;
  }
</style>
