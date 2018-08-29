<template>
  <div>
    <el-dialog title="填写广告信息" :visible.sync="AdvertiseVisible" :lock-scroll=false top="250px" :close-on-click-modal=false>
      <div class="a"><strong>每条信息之间以分号分割</strong></div>
      <quill-editor v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>

      <span slot="footer" class="dialog-footer">
        <el-button @click="nextSteps">取 消</el-button>
        <el-button type="primary" @click="nextSteps2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "GetAdvertise",
      props:['AdvertiseVisible'],
      methods:{
        nextSteps(){
          this.$emit('nextAdvertise',[{advertise:'无'},true])
        },
        nextSteps2(){
          // console.log(this.content)
          this.$emit('nextAdvertise',[{advertise:this.content},true])
        },
        onEditorBlur(quill) {
          console.log('editor blur!', quill)
        },
        onEditorFocus(quill) {
          console.log('editor focus!', quill)
        },
        onEditorReady(quill) {
          console.log('editor ready!', quill)
        },


      },
      data(){
        return{
          content: '<h2>I am Example</h2>',
          editorOption: {
            // some quill options
          },
          formLabelWidth: '120px'
        }
      },
      computed: {
        editor() {
          return this.$refs.myQuillEditor.quill
        }
      },
      mounted() {

      }
    }
</script>

<style scoped>
  .a{margin-bottom: 10px;padding-left: 5px;font-size: 1.1em;}
</style>
