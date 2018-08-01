<template>
  <div>
    <el-dialog title="填写会议简介信息" :visible.sync="InformationVisible" :lock-scroll=false top="300px" :close-on-click-modal=false>

      <el-input
        type="textarea"
        :autosize="{ minRows: 8}"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="nextSteps">取 消</el-button>-->
        <el-button type="primary" @click="nextSteps2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "GetInformation",
      props:['InformationVisible'],
      methods:{
        nextSteps(){
          this.$emit('nextDynamic',[{information:this.textarea},true])
        },
        nextSteps2(){
          this.$emit('nextDynamic',[{information:this.textarea},true])
        }
      },
      data(){
        return{
          textarea:'',
          formLabelWidth: '120px'
        }
      }

    }
</script>

<style scoped>

</style>
