<template>
  <div class="block">
    <el-carousel trigger="click" height="350px" indicator-position="outside">
      <el-carousel-item v-for="(item,index) in imgList" :key="index"  :label=item.text >
        <img :src="item.url"  style="width: inherit;height: inherit"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
    export default {
       name: "Carousel",
       mounted(){

       },
       data(){
          return{
            imgList:[
              {text:"图片介绍",url:require("../../../common/img/201872182738.jpg")}
            ,{text:"图片介绍2",url:require("../../../common/img/201872354475.png")}
            ,{text:"图片介绍3",url:require("../../../common/img/201872541290.jpg")}
            ]
          }

       },
       props:{
         carousel:{
            type:Array
         }
       },
      watch:{
        carousel:{
          handler(newValue, oldValue){
            // console.log(newValue)
            if(newValue.length>0){
               let _this=this
               this.imgList=[]
               newValue.forEach(function (elem,item,array) {
                   // console.log(elem)
                   let temp={}
                   temp.text=elem.text
                   temp.url='http://127.0.0.1:8081'+elem.path.match('/clubApi.*')[0]
                   _this.imgList.push(temp)
                   // console.log(temp.url)
               })
               console.log(this.imgList)
            }

          },
          deep:true
        }
      }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 24px;
    opacity: 0.75;
    line-height: 350px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
