<template>
  <div class="display1">
    <button class="btn-header" v-bind:class="{ active: isActive }">成员添加</button>
    <router-link to="/member/list">
      <button class="btn1 ">成员信息列表</button>
    </router-link>
    <div class="display2">
      <div class="add-content">
        <div>
          <label> 姓名</label>
          <input class="inputdiv" type="text" placeholder="请输入姓名" v-model="addname">
        </div>
        <div>
          <label>用户</label>
          <input class="inputdiv" type="text" placeholder="请输入用户名" v-model="adduser">
        </div>
        <div>
          <label>职称</label>
          <input class="inputdiv" type="text" placeholder="请输入职称" v-model="addrank">
        </div>
        <div>
          <label>性别</label>
          <select class="inputdiv" v-model="addsex" style="font-size:16px;">
            <option disabled value="">选择</option>
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
        </div>
        <div>
          <label>是否党员</label>
          <select class="inputdiv" v-model="addparty" style="font-size:16px;">
            <option disabled value="">选择</option>
            <option value="1">是</option>
            <option value="2">否</option>
          </select>
        </div>
        <div>
          <label>部门</label>
          <input class="inputdiv" type="text" placeholder="请输入部门" v-model="adddepart">
        </div>
        <div>
          <label>职位</label>
          <input class="inputdiv" type="text" placeholder="请输入职位" v-model="addujob">
        </div>
        <div>
          <label>行政等级</label>
          <input class="inputdiv" type="text" placeholder="请输入权限" v-model="addlevel">
        </div>
      </div>
      <div class="add-btn">
        <button type="submit" class="btn btn-primary"
                v-on:click="addup(addname,adduser,addpass,addrank,addsex,addparty,adddepart,addujob,addlevel)">添加
        </button>
        <!--<button type="submit" class="btn btn-primary">批量添加</button>-->
      </div>

    </div>

  </div>

</template>

<script>
  export default {
    name: 'Addmem',
    data() {
      return {
        isActive: true,
        addrank: '',
        addsex: '',
        addparty: '',
      }
    },

    //这里可以对传过来的数据进行二次加工
    computed: {
      // getProp: function () {
      //   console.log(this.postItem);
      //   return this.postItem.get(0).name.trim().toLowerCase()
      // }
    },
    methods: {
      addup: function (a1, a2, a3, a4, a5, a6, a7, a8, a9) {//日期降序

        let fd = new FormData();
        fd.append('NAME', a1);//传姓名
        fd.append('USER', a2);//传用户名
        fd.append('password_hash', a3);//传密码
        fd.append('RANK', a4);//传等级
        fd.append('SEX', a5);//传性别
        fd.append('ISPARTY', a6);//传入党
        fd.append('DEPARTMENT', a7);//传部门
        fd.append('JOB', a8);//传工作
        fd.append('ADMINLEVEL', a9);//传权限
        this.$http.post('/yii/member/member/querydata', fd).then(body => {
          this.details = body.data.data;
        })
        this.$router.push({path: '/member/list'});
      },


    },
    components: {}
  }
</script>

<style scoped>
  label input select {
    float: left;

  }
  .add-content{
    padding: 30px;
    display: flex;
    flex-wrap:wrap;
    align-content: flex-start
  }
  .add-content>div{
    width: 30%;
    margin: 20px 20;
  }

  .inputdiv {
    margin-bottom: 25px;

  }

  .display1 {
    padding-left: 5px;
    padding-top: 10px;

  }

  .display2 {
    border: solid 2px #e0e0e0;
    height: 450px;
    /*text-align: center;*/
    width: 90%;
    padding-left: 200px;
    padding-right: 5px;

    background-color: #fff;
  }

  .btn-header {
    font-size: 18px;
    padding: 10px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;

    color: #000;
    width: 110px;
    /*margin-right: 0px;*/
  }

  .btn-header:hover {
    background: #e0e0e0;
  }

  .btn {
    margin-right: 30px;
  }

  .active {
    background: #e0e0e0;
  }

  .btn1 {
    font-size: 18px;
    padding: 10px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    color: #000;
    width: 150px;
    /*margin-right: 0px;*/
  }

  .btn1:hover {
    background: #e0e0e0;
  }

</style>
