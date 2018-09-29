<template>
  <div class="sign-container">
    <div class="sign-meau">
      资料统计
    </div>
    <div class="sign-content">
      <div class="sign-content-btn">
        <select class="selectName">
          <option value="1">第一次会议</option>
          <option value="2">第二次会议</option>
          <option value="3">第三次会议</option>
        </select>
        <input class="sortName" type="text" value=""/>
        <button class="btn3 icon-sousuo" v-on:click="searchmem()">搜索</button>
        <button class="btn3">导出数据</button>
        <div class="clean"></div>
      </div>
      <hr>
      <table class="sign-content-list">
        <tr>
          <th>序号</th>
          <th>会议名称</th>
          <th>用户名称</th>
          <th>签到时间</th>
        </tr>
        <tr v-for="item in signList">
          <td>{{ item.id }}</td>
          <td>{{ item.meetName }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.time }}</td>
          <td>详情</td>
        </tr>
      </table>
      <div class="page">
        <ul class="pagination pagination-sm"><!--分页-->
          <li class="page-item" v-if="currentpage!=1">
            <span class="page-link"  v-on:click="prepage(currentpage)">上一页</span>
          </li>
          <li class="page-item" v-for="index in pagenums" v-bind:class="{ active: currentpage == index} ">
            <span class="page-link"  v-on:click="pageChange(index)">{{ index }}</span>
          </li>
          <li class="page-item" v-if="currentpage!=totalpage">
            <span class="page-link"  v-on:click="nextpage(currentpage)">下一页</span>
          </li>
          <li class="page-item">
            <span class="page-link">共<i>{{totalpage}}</i>页</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Staticssign",
    data(){
      return {
        currentpage: 1,
        totalpage: 3,
        visiblepage: 10,
        signList:[
          {
            "id":1,
            "meetId":1,
            "meetName":"第一次会议",
            "name":"实弹师范是否是否",
            "time":'1'
          },
          {
            "id":2,
            "meetId":1,
            "meetName":"第一次会议",
            "name":"动感地带轨顶风道",
            "time":'1'
          },
          {
            "id":3,
            "meetId":1,
            "meetName":"第一次会议",
            "name":"分手电筒个梵蒂冈的发生过",
            "time":'1'
          }
        ]
      }
    },
    computed: {
      //计算属性：返回页码数组，这里会自动进行脏检查，不用$watch();
      pagenums: function () {//分页
        //初始化前后页边界
        let lowPage = 1;
        let highPage = this.totalpage;
        let pageArr = [];
        if (this.totalpage > this.visiblepage) {//总页数超过可见页数时，进一步处理；
          let subVisiblePage = Math.ceil(this.visiblepage / 2);
          if (this.currentpage > subVisiblePage && this.currentpage < this.totalpage - subVisiblePage + 1) {//处理正常的分页
            lowPage = this.currentpage - subVisiblePage;
            highPage = this.currentpage + subVisiblePage - 1;
          } else if (this.currentpage <= subVisiblePage) {//处理前几页的逻辑
            lowPage = 1;
            highPage = this.visiblepage;
          } else {//处理后几页的逻辑
            lowPage = this.totalpage - this.visiblepage + 1;
            highPage = this.totalpage;
          }
        }
        //确定了上下page边界后，要准备压入数组中了
        while (lowPage <= highPage) {
          pageArr.push(lowPage);
          lowPage++;
        }
        return pageArr;
      }
    }
  }
</script>

<style lang="scss" scoped="scoped" type="text/css">
  .clean{
    clear:both
  }
  .sign-container{
    margin: 10px;
  }
  .sign-meau{
    height: 50px;
    line-height: 50px;
    width: 150px;
    background: #ddd;
    text-align: center;
    border-radius: 2px;
    border: 1px solid #ccc;
  }
  .sign-content{
    height: 500px;
    background: #fff;
    border: 1px solid #ccc;
  }

  .btn3 {
    width: 80px;
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: #338FFC;
    float: left;
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .btn3:hover {
    background-color: #5FA7FE;
  }
  .sortName{
    width: 200px;
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    float: left;
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .selectName{
    width: 200px;
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    float: left;
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  table {
    border-collapse: collapse;
    width: 98%;
    margin: 10px 1%;
  }

  th {
    font-size: 14px;
    border: solid 1px #ccc;
    font-weight: bold;
    padding: 5px;
    background-color: #F1F1F1;

  }

  table, td {
    border: solid 1px #ccc;
    padding: 5px;
    text-align: center;
    font-size: 14px;
  }
  .page {
    text-align: center;
  }
</style>
