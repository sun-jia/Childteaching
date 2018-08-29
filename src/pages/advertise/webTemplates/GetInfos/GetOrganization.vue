<template>
  <div>
    <el-dialog title="填写组织机构信息" :visible.sync="OrganizationVisible" :lock-scroll=false top="300px" :close-on-click-modal=false>
      <div class="b"><strong>{{text[0]}}：</strong></div>

      <div class="a" v-for="(item,index) in items" :key="item">
        <el-input
          placeholder="请输入内容"
          v-model="text[index+1]"
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
        name: "GetOrganization",
      props:['OrganizationVisible'],
      methods:{
        nextSteps(){
          this.$emit('nextNav',[{banner:this.form},true])
        },
        nextSteps2(){
          console.log(this.text)
          this.$emit('nextConnect',[{organization:this.text},true])
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
          items:['0'],
          text:['主办单位'],
          formLabelWidth: '120px'
        }
      }
    }
</script>

<style scoped>
  .el-input{width: 60%}
  .a{margin-bottom: 10px;}
   .b{font-size: 1.2em;margin-bottom: 10px;}
</style>
