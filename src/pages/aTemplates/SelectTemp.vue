<template>
    <div>
      <el-row class="mt30 c">
         <el-col :span="24"><strong>选择模板</strong></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" class="grid-content" :offset="3">
          <img src="../../common/img/temp1.png" class="a">
          <el-button type="primary" class="b">模板一</el-button>
          <el-button type="success" @click="jump">预览</el-button>
        </el-col>
        <el-col :span="6" class="grid-content" :offset="3">
          <img src="../../common/img/temp1.png" class="a">
          <el-button type="primary" class="b">模板二</el-button>
          <el-button type="success" @click="jump">预览</el-button>
        </el-col>
      </el-row>

    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
      name: "SelectTemp",
      data() {
        return {

        }
      },
      methods: {
         jump(){
           this.$router.push('/templates')
         }

      },
      components:{

      }
    }
</script>

<style scoped>
  .bg-purple-dark {
    background: #99a9bf;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    border: 1px grey solid;
  }
  .mt30{margin-top: 30px;}
  .a{
    width: 100%;
    height: 250px;
  }
  .b{
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 10px;
  }
  img{margin-top: 10px;}
  strong{font-size: 1.2em;}
  .c{margin-left: 50px;}
</style>
