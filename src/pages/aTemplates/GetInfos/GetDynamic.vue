<template>
  <div>
    <el-dialog title="填写会议动态信息" :visible.sync="DynamicVisible" :lock-scroll=false top="300px" :close-on-click-modal=false>
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

      <el-upload
        class="upload-demo"
        action="http://127.0.0.1:8081/clubApi/backend/web/index.php/advertise/files/files"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        multiple
        :file-list="fileList"
        :http-request="uploadfile"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="nextSteps">取 消</el-button>-->
        <el-button type="primary" @click="nextSteps2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "GetDynamic",
      props:['DynamicVisible'],
      methods:{
        nextSteps(){
          this.$emit('nextNav',[{banner:this.form},true])
        },
        nextSteps2(){
          let _this=this
           var dynamic=[]
          if(this.datalist.length>0){
            this.datalist.forEach(function (element,index , array) {
              dynamic[index]={};
              dynamic[index].path=element;
              dynamic[index].text=_this.text[index];
            })
          }else{
            this.text.forEach(function (element,index , array) {
              dynamic[index]={};
              dynamic[index].text=element
            })
          }

          // console.log(dynamic)
          this.$emit('nextLink',[{dynamic:dynamic},true])
        },
        add(e){
          // console.log(e)
          // let oBox = this.$refs.one.cloneNode(true);
          // e.target.parentNode.appendChild(oBox)
          // console.log(this.$refs.one)
          this.items.push(this.items[this.items.length-1]+1)
          // console.log(this.text)
        },
        deletes(e,item){
          // console.log(item)
          this.items.splice(item,1)
          this.text.splice(item,1)
        },
        handleRemove(file, fileList) {
          // console.log(file, fileList);
        },
        handlePreview(file) {
          // console.log(file);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleSuccess(response, file, fileList){
          // console.log(response)
        },
        beforeUpload(file){
          let fd = new FormData();
          let that=this
          fd.append('file',file);//传文件
          this.$http.post('http://127.0.0.1:8081/clubApi/backend/web/index.php/advertise/files/files',fd)
            .then(function(res){
            // console.log(res.data.path);
            that.$message("文件上传完成")
            that.datalist.push(res.data.path)
            // console.log(that.datalist)
          })
        },
        //覆盖默认的提交动作
        uploadfile(){
          // console.log(this.$refs.a)
        }

      },
      data(){
        return{
          input1:'',
          fileList:[],
          formLabelWidth: '120px',
          datalist:[],
          items:['0'],
          text:[]
        }
      }
    }
</script>

<style scoped>
  .el-input{width: 50%}
  .a{margin-bottom: 10px;}
</style>
