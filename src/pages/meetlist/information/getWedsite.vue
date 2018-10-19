<template>
  <div>
    <el-dialog title="请选择网站" :visible.sync="webVisible" top="250px">
      <el-table :data="site" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="网站名称" width="200%" type="index">
          <template slot-scope="scope">
            <span>{{scope.row.siteName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handlePreview(scope.row.id, scope.row.tempID)">预览</el-button>
            <el-button size="mini" type="warning" @click="handleEdit(scope.row.id, scope.row.tempID)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button class="icon-jiajianzujianjiahao"  style="margin-left:10px;font-size:14px;color:#2798FC;" @click="make">制作</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['webVisible'],
    data () {
      return {
        radio: '',
        site: [],
        val: []
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.val = val
        console.log(val)
      },
      handlePreview (id, tempID) {
        if (tempID == 1) {
          window.open('/ConferenceSite?id=' + id)
        }
      },
      handleEdit (id, tempID) {
        if (tempID == 1) {
          window.open('/advertise/web/SiteTemp/MakeTemp?id=' + id + '&modify=true')
        }
      },
      sure () {
        console.log(this.val)
        this.$emit('selectDone', this.val)
      },
      make () {
        window.open('/advertise/web/SiteTemp')
      }
    },
    created () {
      let that = this
      this.$http.post('/local/advertise/index/getalldata').then(function (res) {
        console.log(res.data)
        that.site = res.data.data
      })
    }
  }
</script>

<style scoped>

</style>
