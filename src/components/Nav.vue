<template>
  <!-- LEFT SIDEBAR -->
  <div id="sidebar-nav" class="sidebar">
    <div class="sidebar-scroll">
      <nav>
        <ul class="nav">
            <li v-for="meau in meauList">
              <template v-if="meau.list.length==1">
                <router-link :to="{ path:meau.list[0].url, query:{ name:meau.list[0].name }}">
                  <i v-bind:class=" meau.icon "></i>
                  <span>{{ meau.list[0].name }}</span>
                </router-link>
              </template>
              <template v-if="meau.list.length>1">
                <a v-bind:href="'#'+meau.url" data-toggle="collapse" class="collapsed">
                  <!--<router-link :to="{ path:'/'+meau.url, query:{ name:meau.name }}">-->
                  <i v-bind:class=" meau.icon "></i>
                  <span>{{ meau.name }}</span>
                  <!--</router-link>-->
                  <i class="lnr lnr-chevron-right" v-if="meau.list.length!=0"></i>
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
              </template>

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
              this.meauList=res.data.data;
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

