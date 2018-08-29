<template>
  <div>
  <el-row :gutter="25" class="mt30">
       <el-col :span="18" :offset="3">
         <router-link :to="{path:mypath}"><h3>制作网站</h3></router-link>
       </el-col>
  </el-row>
  <el-row :gutter="25" class="mt30">
    <el-col :span="18" :offset="3">
      <h3>我的网站</h3>
      <el-table
        :data="sitename"
        style="width: 70%">
        <el-table-column
          label="网站名称"
          width="300%">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.sitename }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">预览</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  </div>
</template>

<script>
    export default {
        name: "SelectTemp",
        data(){
           return{
               mypath:'/selectTemp',
               mysite:'/result',
               sitename:[]
           }
        },
        mounted(){

            var that=this
            this.$http.get('http://127.0.0.1:8081/clubApi/backend/web/index.php/advertise/templates/getmysite').then(function (res) {
                // console.log(res.data)
                that.sitename=res.data
            })
        },
        methods: {
          handleEdit(index, row) {

              this.$router.push({path:`/result`,query:{sitename:row.sitename}})
          },
          handleDelete(index, row) {
            // console.log(typeof  row.sitename);
            this.$http.get('http://127.0.0.1:8081/clubApi/backend/web/index.php/advertise/templates/delmysite', {
              params: {
                sitename:row.sitename
              }
            }).then(function (res) {
               // console.log(res.data)
               window.location.reload()
            })
          }
        }

    }
</script>

<style scoped>
  .mt30{margin-top: 30px;}

</style>
