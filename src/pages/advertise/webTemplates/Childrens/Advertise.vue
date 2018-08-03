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
          this.$notify({
            title: 'gg',
            dangerouslyUseHTMLString: true,
            duration:0,
            width:200,
            offset: 200,
            message: '<strong>这是 <i>HTML</i> 广告</strong>'
          });
        }
      }
    }
</script>

<style scoped>

</style>
