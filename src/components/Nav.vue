<template>
  <!-- LEFT SIDEBAR -->
  <div id="sidebar-nav" class="sidebar">
    <div class="sidebar-scroll">
      <nav>
        <ul class="nav">
            <li v-for="meau in meauList">
              <a v-bind:href="'#'+meau.url" data-toggle="collapse" class="collapsed">
                <!--<router-link :to="{ path:'/'+meau.url, query:{ name:meau.name }}">-->
                  <i v-bind:class=" meau.icon "></i>
                  <span>{{ meau.name }}</span>
                <!--</router-link>-->
                <i class="icon-submenu lnr lnr-chevron-left" v-if="meau.list.length!=0"></i>
              </a>
              <div v-bind:id="meau.url" class="collapse ">
                <ul class="nav">
                  <router-link v-for="item in meau.list" :to="{ path:item.url, query:{ name:item.name }}" tag="li" :key="item.funcId">
                    <a>
                      {{ item.name }}
                    </a>
                  </router-link>
                </ul>
              </div>
            </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
      name: "Nav",
      data(){
        return{
          meauList:[]
        }
      },
      methods: {
        getNavList () {
          this.$http.post('/yii/system/index/nav')
            .then((res) => {
              console.log(res.data);
              this.meauList=res.data.data;
              console.log('目录')
              console.log(this.meauList)
            }, (err) => {
              console.log(err)
            })
        }
      },
      created(){
        this.getNavList();
      }
    }
</script>

<style scoped>
</style>

