<template>
  <div>
    <el-dialog title="填写右侧大会开幕倒计时时间" :visible.sync="DeadTimeVisible" :lock-scroll=false top="300px" :close-on-click-modal=false>

      <el-date-picker
        v-model="value"
        type="datetimerange"
        value-format="yyyy-MM-dd-HH-mm-ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="nextSteps">取 消</el-button>-->
        <el-button type="primary" @click="nextSteps2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "GetDeadTime",
      props:['DeadTimeVisible'],
      methods:{
        nextSteps(){
          this.$emit('nextTimeInfo',[{banner:this.form},true])
        },
        nextSteps2(){
          console.log(this.value)
          this.$emit('nextTimeInfo',[{deadtime:this.value},true])
        }
      },
      data(){
        return{
          value:[],
          formLabelWidth: '120px'
        }
      }
    }
</script>

<style scoped>

</style>
