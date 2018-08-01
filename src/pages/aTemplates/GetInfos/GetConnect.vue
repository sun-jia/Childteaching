<template>
  <div>
    <el-dialog title="填写联系我们信息" :visible.sync="ConnectVisible" :lock-scroll=false top="300px" :close-on-click-modal=false>
      <div class="a"><strong>每条信息之间以分号分割</strong></div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 8}"
        placeholder="邮箱：XXX;电话:XXX;联系地址:XXX"
        v-model="textarea">
      </el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="nextSteps">取 消</el-button>
        <el-button type="primary" @click="nextSteps2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "GetConnect",
      props:['ConnectVisible'],
      methods:{
        nextSteps(){
          this.$emit('over',[{connect:'无'},true])
        },
        nextSteps2(){
          console.log(this.text)
          this.$emit('over',[{connect:this.textarea},true])
        }

      },
      data(){
        return{
          textarea:"",
          formLabelWidth: '120px'
        }
      }
    }
</script>

<style scoped>
   .a{margin-bottom: 10px;padding-left: 5px;font-size: 1.1em;}
</style>
