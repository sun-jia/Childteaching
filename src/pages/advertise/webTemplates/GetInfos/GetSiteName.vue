<template>
  <div>
    <el-dialog title="填写网站名称" :visible.sync="SiteNameVisible" :lock-scroll=false top="300px" :close-on-click-modal=false>
        <el-input
          placeholder="请输入内容"
          v-model="text"
          clearable
           >
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
        name: "GetSiteName",
    props:['SiteNameVisible'],
      methods:{
      nextSteps(){
        this.$emit('nextLanguage',[{sitename:this.form},true])
      },
      nextSteps2(){
        // console.log(this.f)
        this.$emit('nextLanguage',[{sitename:this.text},true])
      }
    },
    data(){
      return{
        text:''
      }
    }
    }
</script>

<style scoped>

</style>
