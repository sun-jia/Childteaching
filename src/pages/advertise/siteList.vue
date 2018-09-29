<template>
    <div>
      <el-table :data="site" style="width: 70%">
        <el-table-column label="网站名称" width="400%" type="index">
          <template slot-scope="scope">
            <i class="el-icon-time" v-if="scope.row.links == null"></i>
            <i class="el-icon-success" v-if="scope.row.links != null"></i>
            <span style="margin-left: 10px">{{ scope.row.siteName }}</span>
            <span v-if="scope.row.links != null">
              <i class="el-icon-share" @click="changeShow(scope.row.id)" style="cursor: pointer;"></i>
              <span v-show="scope.row.id == rowid && show" class="myspan">
                <a class='msb_network_button weixin' @click="shareTo(0, scope.row.links, scope.row.siteName)" target="_blank">微信</a>
                <a class='msb_network_button tQQ' @click="shareTo(1, scope.row.links, scope.row.siteName)" target="_blank">QQ</a>
                <a class='msb_network_button qZone' @click="shareTo(2, scope.row.links, scope.row.siteName)" target="_blank">QQ空间</a>
                <a class='msb_network_button sina' @click="shareTo(3, scope.row.links, scope.row.siteName)" target="_blank">微博</a>
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handlePreview(scope.row.id, scope.row.tempID)">预览</el-button>
            <el-button size="mini" type="warning" @click="handleEdit(scope.row.id, scope.row.tempID)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id, scope.row.tempID)">删除</el-button>
            <el-button size="mini" type="success" @click="handleRelease(scope.row.id, scope.row.tempID, scope.row.links)">发布</el-button>
            <el-button size="mini" type="info" @click="handleCancel(scope.row.id, scope.row.tempID, scope.row.links)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import $ from 'jquery'
    export default {
      name: 'siteList',
      data () {
          return {
            site: [],
            show: false,
            rowid: -1
          }
      },
      methods: {
        handlePreview (id, tempID) {
          if (tempID == 1) {
            this.$router.push({path: `/advertise/web/SiteTemp/Temp`, query: {id: id}})
          }
        },
        handleEdit (id, tempID) {
          if (tempID == 1) {
            this.$router.push({path: `/advertise/web/SiteTemp/MakeTemp`, query: {id: id, modify: 'true'}})
          }
        },
        handleDelete (id, tempID) {
          let that = this
          this.$http.post('/local/advertise/index/deletedata', {id: id}).then(function (res) {
            console.log(res.data)
            if (res.data == 1) {
              that.$message({
                message: '删除成功！',
                type: 'success'
              })
              window.location.reload()
            }
          })
        },
        handleRelease (id, tempID, links) {
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
              window.location.reload()
            })
          }
        },
        handleCancel (id, tempID, links) {
          if (links == null) {
            this.$message({
              message: '此会议未发布！',
              type: 'warning'
            })
          } else {
            let that = this
            this.$http.post('/local/meetlist/prepare/linkscancel', {id: id}).then(function (res) {
              console.log(res.data)
              if (res.data == 1) {
                that.$message({
                  message: '取消发布成功！',
                  type: 'success'
                })
              }
              window.location.reload()
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
    background: url(../../common/images/social.png) no-repeat -130px -87px;
  }
  .msb_network_button.tQQ {
    background: url(../../common/images/social.png) no-repeat -20px -20px;
  }
  .msb_network_button.qZone {
    background: url(../../common/images/social.png) no-repeat -73px -20px;
  }
  .msb_network_button.weixin {
    background: url(../../common/images/social.png) no-repeat -73px -87px;
  }
</style>
