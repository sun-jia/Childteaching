<template>
  <div>
    <el-dialog title="顶部多语言模块" :visible.sync="dialogFormVisible" :lock-scroll=false  :close-on-click-modal=false>
       <span>是否需要顶部多语言切换区域</span>
       <span slot="footer" class="dialog-footer">
        <el-button @click="nextSteps2">取 消</el-button>
        <el-button type="primary" @click="nextSteps">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    export default {
      data() {
        return {
          dialogVisible: false
        };
      },
      methods: {
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        nextSteps(){
          console.log(1)
          this.$emit('nextBanner',[{language:true},true])
        },
        nextSteps2(){
          this.dialogVisible = false
          this.$emit('nextBanner',[{language:false},true])
        }
      },
      props:['dialogFormVisible']
    }
</script>

<style scoped>

</style>
