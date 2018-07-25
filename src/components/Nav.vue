<template>
  <div class="nav">
    <ul>
      <router-link v-for="item in meauList" :to="{ path:item.path, query:{ name:item.name }}" tag="li"  :key="item.id">
        {{ item.name }}
      </router-link>
    </ul>
  </div>
</template>

<script>
    export default {
      name: "Nav",
      data(){
        return{
          meauList:[
            {
              name: '会议列表',
              path: '/meetList',
            },
            {
              name: '会议编辑',
              path: '/meetEdit',
            },
            {
              name: '会议财务',
              path: '/finance',
            },
            {
              name: '会议后勤',
              path: '/logistics',
            },
            {
              name: '会议宣传',
              path: '/advertise',
            },
            {
              name: '组织成员',
              path: '/member',
            },
            {
              name: '会议数据',
              path: '/statics',
            },
            {
              name: '系统管理',
              path: '/system',
            }
          ]
        }
      },
    }
</script>

<style scoped>
  .nav{
    width:10%;
    float: left;
    min-height: 500px;
    background: aqua;
  }
</style>
