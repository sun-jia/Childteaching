<template>

</template>

<script>
    export default {
      name: "advertise",
      mounted(){
        this.open()
      },
      methods: {
        open() {
          var _this=this;
          this.instance = this.$notify({
            title: 'gg',
            dangerouslyUseHTMLString: true,
            duration:0,
            width:200,
            offset: 200,
            message: _this.datalist
          });
        },
        close() {
          this.$notify.close()
        }
      },
      data(){
        return{
           datalist:'<strong>这是HTMLxin广告</strong>',
           instance
        }
      },
      props:{
        advertise:{
          type:String
        }
      },
      watch:{
        advertise:{
          handler(newValue, oldValue){
            // console.log(newValue)
            this.datalist=newValue
            this.instance.close();

            this.open();

          },
          deep:true
        }
      }
    }
</script>

<style scoped>

</style>
