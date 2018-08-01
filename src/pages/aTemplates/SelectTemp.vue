<template>
    <div>
      <el-row>
         <el-col :span="24">选择模板</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" class="bg-purple-dark grid-content" >

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
  }

</style>
