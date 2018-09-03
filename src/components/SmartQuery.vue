<template>
  <div class="smart-query" v-bind:class="{'smart-active':showSmart,'smart-unactive':!showSmart}" >
    <div class="smart-query-title" @click="showSmarts()">智能问答^</div>
    <div class="smart-query-question">
      <input class="smart-query-question-in" type="text" name="smartIn" placeholder="请输入问题"/>
      <input class="smart-query-question-btn" type="button" name="smartBtn" value="提问" />
    </div>
    <div class="smart-query-answer">
      答案
      <p v-for="item in items">{{item.text}}</p>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
      name: "SmartQuery",
      data(){
        return {
          items:[
            { text: 1 },
            { text: 2 },
            { text: 3 }
          ]
        }
      },
      computed: {
        //映射
        ...mapGetters([
          'showSmart'
        ])
      },
      methods: {
        showSmarts () {
          console.log(this.showSmart)
          if(this.showSmart){
            this.$store.dispatch('hideSmart')
          }else{
            this.$store.dispatch('showSmart')
          }
          console.log(this.showSmart)
        }
      }
    }
</script>

<style scoped>
  .smart-query{
    position: fixed;
    height: 300px;
    width: 300px;
    right: 0;
    background-color: #fff;
    overflow: hidden;
  }
  .smart-active{
    bottom: 0px;
    transition:bottom 0.5s ease-in 0s ;
  }
  .smart-unactive{
    bottom:-270px;
    transition:bottom 0.5s ease-in 0s ;
  }
  .smart-query-title{
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    background-color: #0b97c4;
    color:#fff;
    text-align: right;
    padding-right: 30px;
  }
  .smart-query-question-in{
    display: inline-block;
    padding: 0;
    margin: 0;
    width: 75%;
  }
  .smart-query-question-btn{
    display: inline-block;
    padding: 0;
    margin: 0;
    width: 20%;
  }
  .smart-query-answer{
    padding: 10px;
  }
</style>
