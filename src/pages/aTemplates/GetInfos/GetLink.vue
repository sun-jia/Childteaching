<template>
  <div>
    <el-dialog title="填写友情链接" :visible.sync="LinkVisible" :lock-scroll=false top="300px" :close-on-click-modal=false>

      <div class="a" v-for="(item,index) in items" :key="item">
        <el-input
          placeholder="请输入内容"
          v-model="text[index]"
          clearable
          ref="one" >
        </el-input>
        <el-button type="primary" @click="add($event)">添加</el-button>
        <el-button type="primary" @click="deletes($event,index)" v-show="index!=0">删除</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="nextSteps">取 消</el-button>-->
        <el-button type="primary" @click="nextSteps2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "GetLink",
      props:['LinkVisible'],
      methods:{
        nextSteps(){
          this.$emit('nextNav',[{banner:this.form},true])
        },
        nextSteps2(){
          // console.log(this.f)
          this.$emit('nextDeadTime',[{link:this.text},true])
        },
        add(e){
          // console.log(e)
          // let oBox = this.$refs.one.cloneNode(true);
          // e.target.parentNode.appendChild(oBox)
          // console.log(this.$refs.one)
          this.items.push(this.items[this.items.length-1]+1)
          console.log(this.text)
        },
        deletes(e,item){
          console.log(item)
          this.items.splice(item,1)
          this.text.splice(item,1)
        }
      },
      data(){
        return{

          formLabelWidth: '120px',
          items:['0'],
          text:[]
        }
      }
    }
</script>

<style scoped>
  .el-input{width: 60%}
  .a{margin-bottom: 10px;}
</style>
