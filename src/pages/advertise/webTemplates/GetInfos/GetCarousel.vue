<template>
  <div>
    <el-dialog title="填写轮播图信息" :visible.sync="CarouselVisible" :lock-scroll=false top="300px"  :close-on-click-modal=false>
       <span>请把图片的名字设置为轮播图显示的文字信息</span>
      <el-upload
        class="upload-demo"
        action="http://127.0.0.1:8081/clubApi/backend/web/index.php/advertise/index"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
         multiple
        :file-list="fileList"
        :http-request="uploadfile"
        >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
        name: "GetCarousel",
      props:['CarouselVisible'],
      methods:{
        nextSteps(){
          this.$emit('nextInformation',[{carousel:this.form},true])
        },
        nextSteps2(){
          console.log(this.datalist)
          this.$emit('nextInformation',[{carousel:this.datalist},true])
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleSuccess(response, file, fileList){
           console.log(response)
        },
        beforeUpload(file){
          let fd = new FormData();
          let that=this
          fd.append('file',file);//传文件
          this.$http.post('http://127.0.0.1:8081/clubApi/backend/web/index.php/advertise/index',fd).then(function(res){
              console.log(res);
              that.datalist.push(res.data)
              console.log(that.datalist)
          })
        },
        //覆盖默认的提交动作
        uploadfile(){
          console.log(this.$refs.a)
        }
      },
      data(){
        return{
          fileList:[],
          formLabelWidth: '120px',
          datalist:[]
        }
      }
    }
</script>

<style scoped>
  .el-upload__input{
     display: none;
  }
</style>
