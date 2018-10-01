
<!DOCTYPE html>
<html ng-app="myApp">

<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="css/bootstrap.css" />
  <link rel="stylesheet" href="css/common.css" />
  <link rel="stylesheet" href="css/PeoplePower.css" />
  <script src="js/common.js"></script>
  <style type="text/css">
    [ng\:cloak],
    [ng-cloak],
    [data-ng-cloak],
    [x-ng-cloak],
    .ng-cloak,
    .x-ng-cloak,
    .ng-hide {
      display: none !important;
    }

    ng\:form {
      display: block;
    }

    .ng-animate-start {
      clip: rect(0, auto, auto, 0);
      -ms-zoom: 1.0001;
    }

    .ng-animate-active {
      clip: rect(-1px, auto, auto, 0);
      -ms-zoom: 1;
    }
  </style>
</head>

<body ng-controller="myCtrl" ng-cloak>
<div id="loading">
  <div id="loading-center">
    <div id="loading-center-absolute">
      <div id="object"><img src="images/zhuanIn.png"></div>
    </div>
  </div>
</div>
<div ng-include="'include/header.html'"></div>
<div ng-include="'include/nav.html'"></div>

<div class="container">
  <div ng-if="mylistVar==1">
    <div style="float:right">
      <span data-toggle="modal" data-target="#addModal" ng-click="addinit()" class="myBtn">添加</span>
    </div>
    <div class="clean"></div>
    <div>
      <table>
        <thead>
        <tr>
          <th>序号</th>
          <th>
            <span>工号</span>
          </th>
          <th>姓名</th>
          <th>
            <span>超级管理员</span>
          </th>
          <th>
            <span>通知管理</span>
          </th>
          <th>
            <span>课程管理</span>
          </th>
          <th>
            <span>用户管理</span>
          </th>
          <th>
            <span>统计管理</span>
          </th>
          <th>
            <span>部门中心</span>
          </th>
          <th>
            <span>系统设置</span>
          </th>
          <th>
            <span>权限管理</span>
          </th>
          <th></th>
          <th ng-if="result.mypower=='super'"></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr ng-repeat="x in result.list">
          <td>{{(pagenow-1)*pre+$index+1}}</td>
          <td>{{x.user}}</td>
          <td>{{x.name}}</td>
          <td>
            <input type="checkbox" ng-model="x.super" ng-checked="x.super==1" ng-disabled="true">
          </td>
          <td>
            <input type="checkbox" ng-model="x.notice" ng-checked="x.notice==1" ng-disabled="true">
          </td>
          <td>
            <input type="checkbox" ng-model="x.lesson" ng-checked="x.lesson==1" ng-disabled="true">
          </td>
          <td>
            <input type="checkbox" ng-model="x.people" ng-checked="x.people==1" ng-disabled="true">
          </td>
          <td>
            <input type="checkbox" ng-model="x.statics" ng-checked="x.statics==1" ng-disabled="true">
          </td>
          <td>
            <input type="checkbox" ng-model="x.department" ng-checked="x.department==1" ng-disabled="true">
          </td>
          <td>
            <input type="checkbox" ng-model="x.config" ng-checked="x.config==1" ng-disabled="true">
          </td>
          <td>
            <input type="checkbox" ng-model="x.admin" ng-checked="x.admin==1" ng-disabled="true">
          </td>
          <td><span ng-click="modify(x)" data-toggle="modal" data-target="#modifyModal" class="myBtn">修改</span></td>
          <td ng-if="result.mypower=='super'"><span ng-click="changeready(x)" data-toggle="modal" data-target="#changeModel" class="myBtn">移交</span></td>
          <td><span ng-click="delete(x.user)" class="myBtn">删除</span></td>
        </tr>
        </tbody>
      </table>
      <ul class="pagination">
        <li ng-repeat="p in result.pageall" ng-class="{active:p==result.pagenow }"><a href="#" ng-click="gopage(p)">{{p}}</a></li>
      </ul>
    </div>
  </div>
  <div ng-if="mylistVar==2" ng-cloak>
    <div ng-model="errorinfo">
      {{errorinfo}}
    </div>
  </div>
</div>

<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="top:150px">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="closemodal()">
          &times;
        </button>
        <h4 class="modal-title" id="myModalLabel">添加管理员</h4>
      </div>
      <div class="modal-body">
        <div>
          <input type="text" ng-model="addkeyword">
          <input type="button" class="btn-primary" value="检索" ng-click="getpeople()" />
        </div>
        <div ng-if="myVar==3">
          <table>
            <thead>
            <tr>
              <th>序号</th>
              <th>
                <span>工号</span>
              </th>
              <th>姓名</th>
              <th>
                <span>部门</span>
              </th>
              <th>
                <span>职务</span>
              </th>
              <th>
                <span>行政级别</span>
              </th>
              <th>
                <span>是否党员</span>
              </th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="u in unadmin.list">
              <td>{{$index+1}}</td>
              <td>{{u.user}}</td>
              <td>{{u.name}}</td>
              <td>{{u.department}}</td>
              <td>{{u.job}}</td>
              <td>{{u.adminlevel}}</td>
              <td>{{u.isparty?'是':'否'}}</td>
              <td ng-click='checkunadmin(u.user,u.name)'>选择</td>
            </tr>
            </tbody>
          </table>
          <ul class="pagination">
            <li ng-repeat="p in unadmin.pageall" ng-class="{active:p==unadmin.pagenow }"><a href="#" ng-click="gopage_unadmin(p)">{{p}}</a></li>
          </ul>
        </div>
        <div ng-if="myVar==4">
          <div ng-model="errorinfo_gtunad">
            {{errorinfo_gtunad}}
          </div>
        </div>
        <div ng-if="myVar==5">
          <div ng-model="toadmin">
            <span>工号：{{toadmin.user}}</span>
            <span>姓名：{{toadmin.name}}</span>
          </div>
          <div>
            <table>
              <thead>
              <tr>
                <th>通知管理</th>
                <th>课程管理</th>
                <th>用户管理</th>
                <th>统计管理</th>
                <th>部门中心</th>
                <th>系统设置</th>
                <th ng-if="result.mypower=='super'">权限管理</th>
              </tr>
              <tr>
                <th>
                  <input type="checkbox" ng-click="checktf(1)">
                </th>
                <th>
                  <input type="checkbox" ng-click="checktf(2)">
                </th>
                <th>
                  <input type="checkbox" ng-click="checktf(3)">
                </th>
                <th>
                  <input type="checkbox" ng-click="checktf(4)">
                </th>
                <th>
                  <input type="checkbox" ng-click="checktf(5)">
                </th>
                <th>
                  <input type="checkbox" ng-click="checktf(7)">
                </th>
                <th ng-if="result.mypower=='super'">
                  <input type="checkbox" ng-click="checktf(6)">
                </th>
              </tr>
              </thead>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="closemodal()">取消
            </button>
            <button type="button" class="btn btn-primary" ng-click="goaddadmin()" data-dismiss="modal">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal -->
</div>

<!--权限修改-->
<div class="modal fade" id="modifyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="top:150px">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" v-on:click="closemodal()">
          &times;
        </button>
        <h4 class="modal-title" id="myModalLabel">
          修改权限
        </h4>
      </div>
      <div class="modal-body">
        <div ng-model="tomodify">
          <span>工号：{{tomodify.user}}</span>
          <span>姓名：{{tomodify.name}}</span>
        </div>
        <div>
          <table>
            <thead>
            <tr>
              <th>通知管理</th>
              <th>课程管理</th>
              <th>用户管理</th>
              <th>统计管理</th>
              <th>部门中心</th>
              <th>系统设置</th>
              <th ng-if="result.mypower=='super'">权限管理</th>
            </tr>
            <tr>
              <th>
                <input type="checkbox" ng-checked="tomodify.notice==1" ng-click="checktf_modify(1)">
              </th>
              <th>
                <input type="checkbox" ng-checked="tomodify.lesson==1" ng-click="checktf_modify(2)">
              </th>
              <th>
                <input type="checkbox" ng-checked="tomodify.people==1" ng-click="checktf_modify(3)">
              </th>
              <th>
                <input type="checkbox" ng-checked="tomodify.statics==1" ng-click="checktf_modify(4)">
              </th>
              <th>
                <input type="checkbox" ng-checked="tomodify.department==1" ng-click="checktf_modify(5)">
              </th>
              <th>
                <input type="checkbox" ng-checked="tomodify.config==1" ng-click="checktf_modify(7)">
              </th>
              <th ng-if="result.mypower=='super'">
                <input type="checkbox" ng-checked="tomodify.admin==1" ng-click="checktf_modify(6)">
              </th>
            </tr>
            </thead>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="closemodal()">关闭
        </button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="gomodify()">
          提交更改
        </button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal -->
</div>



<!--权限移交-->
<div class="modal fade" id="changeModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="top:150px">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
          &times;
        </button>
        <h4 class="modal-title" id="myModalLabel">移交权限</h4>
      </div>
      <div class="modal-body">
        <div>
          <input type="text" ng-model="addkeyword">
          <input type="button" class="btn-primary" value="检索" ng-click="getpeople()" />
        </div>
        <div ng-if="myVar==3">
          <table>
            <thead>
            <tr>
              <th>序号</th>
              <th>
                <span>工号</span>
              </th>
              <th>姓名</th>
              <th>
                <span>部门</span>
              </th>
              <th>
                <span>职务</span>
              </th>
              <th>
                <span>行政级别</span>
              </th>
              <th>
                <span>是否党员</span>
              </th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="u in unadmin.list">
              <td>{{$index+1}}</td>
              <td>{{u.user}}</td>
              <td>{{u.name}}</td>
              <td>{{u.department}}</td>
              <td>{{u.job}}</td>
              <td>{{u.adminlevel}}</td>
              <td>{{u.isparty?'是':'否'}}</td>
              <td ng-click='changeto(u)'>选择</td>
            </tr>
            </tbody>
          </table>
          <span ng-repeat="pa in unadmin.pageall">
                            <span ng-click="gopage_unadmin(pa)">&nbsp;{{pa}}&nbsp;</span>
                        </span>
        </div>
        <div ng-if="myVar==4">
          <div ng-model="errorinfo_gtunad">
            {{errorinfo_gtunad}}
          </div>
        </div>
        <div ng-if="myVar==6">
          <div>
            确定将{{changeadmin.fromname}}的权限转交给{{changeadmin.toname}}吗？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="closemodal()">取消
            </button>
            <button type="button" class="btn btn-primary" ng-click="change()" data-dismiss="modal">
              确定
            </button>
          </div>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal -->
  </div>
</div>
<div class="clean"></div>
<div ng-include="'include/fooster.html'" ng-cloak></div>
</body>

</html>
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/angular.min.js"></script>
<script>
  window.onload = function onload_handler() {
    $("#loading").remove();
  }
</script>
<script src="js/PeoplePower.js"></script>
<script src="plug-in/layer/layer.js"></script>
