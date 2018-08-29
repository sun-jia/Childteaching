<template>
    <div>
        <div class="a">{{name}}</div>
        <div class="b">{{time}}</div>
        <div class="c">{{address}}</div>
    </div>
</template>

<script>
    export default {
        name: "Banner",
        props:{
          banner:{
            type:Object,

          }
        },
        data(){
          return{
            name:'第十一届亚太临床营养大会暨中国营养学会第十四届全国营养科学大会',
            time:'2019年09月19日-09月22日',
            address:'南京国际博览中心'
          }

        },
        methods:{
          //  getdata(){
          //   if(Object.values(this.banner).length!=0){
          //     console.log(this.banner)
          //     this.name=this.banner.name
          //     this.address=this.banner.address
          //     this.time=this.banner.time
          //   }
          // }
        },
        mounted(){
           // console.log(this.banner.name)
           // this.getdata()

        },
        watch:{
          banner:{
             handler(newValue, oldValue){
                // console.log(newValue)
               this.name=newValue.name
               this.address=newValue.address
               this.time=newValue.time
             },
             deep:true
          }
        }

    }
</script>

<style scoped>
   .a{font-size: 2.2em;padding: 10px 0px}
   .b{margin-top:10px;font-size: 1.3em;padding: 0px 0px 0px 30px;background: url(../../../../common/img/address.png) left center no-repeat;}
   .c{margin-top:10px;font-size: 1.3em;padding: 0px 0px 0px 30px;background: url(../../../../common/img/time.png) left center no-repeat;}
</style>
