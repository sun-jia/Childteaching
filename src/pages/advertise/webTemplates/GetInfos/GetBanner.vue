<template>
  <div>
    <el-dialog title="填写顶部Banner信息" :visible.sync="BannerVisible" :lock-scroll=false top="300px" :close-on-click-modal=false>

      <el-form :model="form">
        <el-form-item label="会议名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议时间" :label-width="formLabelWidth">
          <el-input v-model="form.time" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会议地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="nextSteps">取 消</el-button>-->
        <el-button type="primary" @click="nextSteps2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "GetBanner",
        props:['BannerVisible'],
        methods:{
          nextSteps(){
            this.$emit('nextNav',[{banner:this.form},true])
          },
          nextSteps2(){
            // console.log(this.f)
            this.$emit('nextNav',[{banner:this.form},true])
          }
        },
        data(){
          return{
            form: {
              name: '',
              time: '',
              address: ''
            },
            formLabelWidth: '120px'
          }
        }
    }
</script>

<style scoped>

</style>
