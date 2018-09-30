<template>
  <div id="fullHeight2" index="04" class="d_jump" title="会议宣传信息填写">
    <getWebsite :webVisible="webVisible" @selectDone="selectDone"></getWebsite>
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
              property="siteName"
              label="网站名称"
              width="200">
            </el-table-column>
            <el-table-column
              label="操作"
            >
              <template slot-scope="scope">
                <el-button size="mini" @click="handlePreview(scope.row.id, scope.row.tempID)">预览</el-button>
                <el-button size="mini" type="success" @click="handleRelease(scope.row.id, scope.row.tempID, scope.row.links)">发布</el-button>
                <span v-if="scope.row.links != null">
                  <i class="el-icon-share" @click="changeShow(scope.row.id)" style="cursor: pointer;"></i>
                  <div v-show="scope.row.id == rowid && show" class="myspan">
                    <a class='msb_network_button weixin' @click="shareTo(0, scope.row.links, scope.row.siteName)" target="_blank">微信</a>
                    <a class='msb_network_button tQQ' @click="shareTo(1, scope.row.links, scope.row.siteName)" target="_blank">QQ</a>
                    <a class='msb_network_button qZone' @click="shareTo(2, scope.row.links, scope.row.siteName)" target="_blank">QQ空间</a>
                    <a class='msb_network_button sina' @click="shareTo(3, scope.row.links, scope.row.siteName)" target="_blank">微博</a>
                  </div>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button class="icon-jiajianzujianjiahao"  style="margin-left:10px;font-size:14px;color:#2798FC;" @click="make">制作</el-button>
          </div>
          <div class="page">
            <ul class="pagination pagination-sm"><!--分页-->
              <li class="page-item" v-if="webCurrentpage!=1">
                <span class="page-link" href="#" v-on:click="prepageLog(webCurrentpage)">上一页</span>
              </li>
              <li class="page-item" v-for="item in pagenumsWeb" v-bind:class="{ active: webCurrentpage == item} ">
                <span class="page-link" href="#" v-on:click="pageChangeWeb(item)">{{item}}</span>
              </li>
              <li class="page-item" v-if="webCurrentpage!=totlepage">
                <span class="page-link"  href="#"  v-on:click="nextpageWeb(webCurrentpage)">下一页</span>
              </li>
              <li class="page-item">
                <span class="page-link"  href="#">共<i>{{totlepage}}</i>页</span>
              </li>
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
            style="width: 90%">
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
              label="操作"
            >
              <template slot-scope="scope">
                <el-button  type="text" size="small" v-on:click="review(scope.row)">预览</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button class="icon-jiajianzujianjiahao"  style="margin-left:10px;font-size:14px;color:#2798FC;">制作</el-button>
            <el-button @click="setCurrentTwo()">取消选择</el-button>
          </div>
          <div class="page">
            <ul class="pagination pagination-sm"><!--分页-->
              <li class="page-item" v-if="webCurrentpage!=1">
                <span class="page-link" href="#" v-on:click="prepageWeb(webCurrentpage)">上一页</span>
              </li>
              <li class="page-item" v-for="item in pagenumsWeb" v-bind:class="{ active: webCurrentpage == item} ">
                <span class="page-link" href="#" v-on:click="pageChangeWeb(item)">{{item}}</span>
              </li>
              <li class="page-item" v-if="webCurrentpage!=totlepage">
                <span class="page-link"  href="#"  v-on:click="nextpageWeb(webCurrentpage)">下一页</span>
              </li>
              <li class="page-item">
                <span class="page-link"  href="#">共<i>{{totlepage}}</i>页</span>
              </li>
            </ul>
          </div>
        </div>
        <button class="btn2">确定</button>
        <button class="btn1">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
  import getWebsite from './getWedsite'
  export default {
    name: 'infor-advertise',
    props: ['meetId'],
    components: {
      getWebsite
    },
    data () {
      return {
        isActiveWeb: true,
        isActiveH5: false,
        websShow: true,
        h5sShow: false,
        h5Infor: '', // h5搜索
        webInfor: '', // 网站模板搜索
        webCurrentpage: 1,
        totlepage: 28, // 总页数
        visiblepage: 10, // 可见页数
        advertise: {
          web: '',
          h5: ''
        },
        web: [],
        show: false,
        rowid: -1,
        webVisible: false,
        h5: [
          {
            id: '001',
            name: '模板一',
            link: '#'
          },
          {
            id: '002',
            name: '模板二',
            link: '#'
          },
          {
            id: '003',
            name: '模板三',
            link: '#'
          },
          {
            id: '004',
            name: '模板四',
            link: '#'
          },
          {
            id: '005',
            name: '模板五',
            link: '#'
          }
        ]
      }
    },
    methods: {
      webShow: function () {
        // let web=document.getElementById("web");
        this.isActiveWeb = true
        this.isActiveH5 = false
        this.websShow = true
        this.h5sShow = false
        console.log(this.websShow)
        console.log(this.h5sShow)
      },
      h5Show: function () {
        this.isActiveWeb = false
        this.isActiveH5 = true
        this.websShow = false
        this.h5sShow = true
        console.log(this.websShow)
        console.log(this.h5sShow)
      },
      handleCurrentChangeOne (val) {
        this.advertise.web = val
      },
      // 预览宣传
      review: function () {

      },
      pageChangeWeb: function (page) { // 分页
        if (this.webCurrentpage != page) {
          this.webCurrentpage = page
          // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
        }
        console.log(this.webCurrentpage)
      },
      prepageWeb: function (page) { // 上一页
        page--
        if (this.webCurrentpage != page) {
          this.webCurrentpage = page
          // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
        }
        console.log(page)
      },
      nextpageWeb: function (page) { // 下一页
        page++
        if (this.webCurrentpage != page) {
          this.webCurrentpage = page
          // this.$dispatch('page-change', page); //父子组件间的通信：==>子组件通过$diapatch(),分发事件，父组件冒泡通过v-on:page-change监听到相应的事件；
        }
        console.log(page)
      },
      setCurrentTwo (row) {
        this.$refs.singleTableTwo.setCurrentRow(row)
      },
      handleCurrentChangeTwo (val) {
        this.advertise.h5 = val
      },
      handleRelease (id, tempID, links) {
        console.log(id, tempID, links)
        if (links != null) {
          this.$message({
            message: '此会议已发布！',
            type: 'warning'
          })
        } else {
          let that = this
          let link = 'http://21398ts268.iask.in:20483/ConferenceSite?id=' + id
          this.$http.post('/local/meetlist/prepare/advertiseweb', {id: id, links: link}).then(function (res) {
            console.log(res.data)
            if (res.data == 1) {
              that.$message({
                message: '发布成功！',
                type: 'success'
              })
            }
            // window.location.reload()
          })
        }
      },
      shareTo (n, link, sitename) {
        switch (n) {
          case 0:
            $('.weixin').attr('href', 'http://qr.liantu.com/api.php?text=' + link)
            break
          case 1:
            $('.tQQ').attr('href', 'http://connect.qq.com/widget/shareqq/index.html?url=' + link + '&sharesource=qzone&title=' + sitename + '&pics=&summary=&desc=')
            break
          case 2:
            $('.qZone').attr('href', 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + link + '&title=' + sitename + '&pics=&summary=')
            break
          case 3:
            $('.sina').attr('href', 'http://service.weibo.com/share/share.php?url=' + link + '&title=' + sitename + '&pic=&searchPic=')
            break
          default:
        }
      },
      changeShow (id) {
        if (this.rowid == id) {
          this.show = !this.show
        } else if (this.rowid != id && this.show == false) {
          this.rowid = id
          this.show = true
        } else {
          this.rowid = id
        }
      },
      make () {
        this.webVisible = false
        this.webVisible = true
      },
      selectDone (param) {
        this.webVisible = false
        if (param.length != 0) {
          this.web = []
          this.web.push(param)
        }
      }
    },
    computed: {
      pagenumsWeb: function () { // 分页
        // 初始化前后页边界
        let lowPage = 1
        let highPage = this.totlepage
        let pageArr = []
        if (this.totlepage > this.visiblepage) { // 总页数超过可见页数时，进一步处理；
          let subVisiblePage = Math.ceil(this.visiblepage / 2)
          if (this.webCurrentpage > subVisiblePage && this.webCurrentpage < this.totlepage - subVisiblePage + 1) { // 处理正常的分页
            lowPage = this.webCurrentpage - subVisiblePage
            highPage = this.webCurrentpage + subVisiblePage - 1
          } else if (this.webCurrentpage <= subVisiblePage) { // 处理前几页的逻辑
            lowPage = 1
            highPage = this.visiblepage
          } else { // 处理后几页的逻辑
            lowPage = this.totlepage - this.visiblepage + 1
            highPage = this.totlepage
          }
        }
        // 确定了上下page边界后，要准备压入数组中了
        while (lowPage <= highPage) {
          pageArr.push(lowPage)
          lowPage++
        }
        return pageArr
      }
    },
    created () {
      let that = this
      this.$http.post('/local/meetlist/prepare/getlinks', {userId: this.$store.getters.getUser, meetId: this.meetId}).then(function (res) {
        that.web.push(res.data.data[0])
        console.log(res.data.data)
      })
    }
  }
</script>

<style lang="scss" scoped="scoped" type="text/css">
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
  .msb_network_button {
    display: inline-block;
    text-indent: -9999px;
    width: 45px;
    height: 45px;
    cursor: pointer;
    background: no-repeat;
    border: 6px solid #f5f5f5;
    border-radius: 50%;
  }
  .msb_network_button.sina {
    background: url(../../../common/images/social.png) no-repeat -130px -87px;
  }
  .msb_network_button.tQQ {
    background: url(../../../common/images/social.png) no-repeat -20px -20px;
  }
  .msb_network_button.qZone {
    background: url(../../../common/images/social.png) no-repeat -73px -20px;
  }
  .msb_network_button.weixin {
    background: url(../../../common/images/social.png) no-repeat -73px -87px;
  }
</style>
