<template>
    <div>
      <el-row>
        <el-col :span="24">
          <div>
            <el-menu :default-active="activeIndex" class="el-menu-demo fontSize mg" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1" class="icon-wenzi"> 文字</el-menu-item>
              <el-menu-item index="2" class="icon-tupian"> 图片</el-menu-item>
              <el-menu-item index="3" class="icon-757bianjiqi_beijing"> 背景</el-menu-item>
              <el-menu-item index="4" class="icon-xiaoguo"> 音乐</el-menu-item>
              <el-button type="info" class="float-r">退出</el-button>
              <el-button type="primary" class="float-r">保存</el-button>
            </el-menu>
          </div>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="5" ><div class="">1</div></el-col>
        <el-col :span="14" class="col-height">
          <div class="main_content" >
             <div v-for="(item,index) in textList">
                 <!--<div class="out">-->
                   <div class="inner"  :class="{isEdit:isEdit}" :id="index" @dblclick="moveElem" @blur="cancelElem" contenteditable="true" >
                     {{item}}
                   </div>
                 <!--</div>-->
             </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div>
          <el-tabs type="border-card" :stretch="true">
          <el-tab-pane label="图层管理" class="t-right">图层管理</el-tab-pane>
          <el-tab-pane label="页面管理" class="t-right">页面管理</el-tab-pane>
          </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import {Drag} from '../../../common/js/drag'
  export default {
    data () {
      return {
        activeIndex: '1',
        textList: [],
        isEdit: false
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        if (key == 1) {
            this.textList.push('输入文字')
        } else if (key === 2) {

        } else if (key == 3) {

        } else {

        }
      },
      moveElem (e) {
        console.log(e.currentTarget.id)
         new Drag(e.currentTarget.id)
      },
      cancelElem (e) {
        console.log('3333')
        // e.currentTarget.removeEventListener('mousedown', start, false);
      }
    }
  }

</script>

<style scoped>
  .fontSize{font-size: 16px;}
  .mg{padding: 0 5% 0 25%;}
  .float-r{float: right;margin-top: 10px;margin-right: 10px;}

  .grid-content {
    /*border-bottom: 1px solid silver;*/

  }
   el-row{position: relative;overflow: hidden;}
   el-col{padding-bottom: -2000px;margin-bottom: 2000px;}
  .col-height{min-height: 500px; border-right: 1px solid silver;border-left: 1px solid silver;}
  .main_content{width: 400px;height: 600px;background-color: white;margin: 100px auto;position: relative;}
  .t-right{height: 800px;}
  .wenben{position: absolute;z-index: 1;width: 100%;}
  .inner{border:1px solid yellow;text-align: center;resize: both;overflow: auto;}
  .inner:hover{cursor: default;}
  .isEdit{border: 1px yellow solid;}
  .out{border:2px solid blue;}
</style>
