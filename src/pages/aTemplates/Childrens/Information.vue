<template>
    <div>
       <div class="a">会议简介</div>
       <p v-for="(item ,index) in datalist" :key="index">&nbsp;&nbsp;&nbsp;&nbsp;{{item}}</p>

    </div>
</template>

<script>
    export default {
        name: "Information",
        data(){
          return{
             datalist:["两年一度的全国营养科学大会是中国营养学会的重点学术活动，是营养界的科学盛会，" +
             "也是分享国内外营养学领域的最新研究进展,展示我国营养学及公共卫生领域最新研究成果、推动学科全面发展的一个重要平台。" +
             "亚太临床营养大会是由亚太临床营养学会每两年举办一届,关注于营养研究与临床营养实践应用的大型学术会议。" +
             "",
               "为了推进党的十九大明确提出的“实施健康中国”伟大战略，落实国民营养计划（2017-2030）健康目标，促进与亚太地区及国际营养科学的交流和发展，" +
               "中国营养学会定于2019年9月19日-22日在南京召开“第十一届亚太临床营养大会暨中国营养学会第十四届全国营养科学大会”",
             "会议将邀请国内外著名专家作专题报告和主题讲座，并开展论文交流、学术报告、研讨会等形式多样、内容丰富的学术活动。欢迎国内外营养、健康、" +
             "食品、农业等领域科技工作者以及产业界积极参与和交流。"]
          }
        },
        props:{
          information:{
             type:String
          }
        },
        watch:{
          information:{
            handler(newValue, oldValue){
              // console.log(newValue)
              this.datalist=newValue.split(/\n/)
            },
            deep:true
          }
        }
    }
</script>

<style scoped>
   .a{background: url(../../../common/img/panelt.png) left center no-repeat;padding-left: 10px;line-height: 48px;
     font-size: 18px;margin-top: 20px;color: #000;padding: 0px 15px}
</style>
