<template>
  <div class="display1">
   <button class="btn-header"  v-bind:class="{ active: isActive }">密码修改</button>
   <router-link to="/member/loginlist"><button class="btn1 btn2"  >成员登入列表</button></router-link>
   <div class="display2">
     <div class="diachange">
       <label>用户名&nbsp&nbsp&nbsp</label>
       <input class="diainput" type="text" name="passuser" id="passuser" placeholder="请输入用户" v-model="passuser">
       <span id="user-msg" class="error"></span>
       <label>密码&nbsp &nbsp &nbsp&nbsp&nbsp</label>
       <input class="diainput" type="password" name="passchange" id="passchange" placeholder="请输入新密码" v-model="passchange">
       <span id="pass-msg" class="error"></span>
       <label>密码确认</label>
       <input class="diainput" type="password" name="passconfirm" id="passconfirm" placeholder="请再次确认新密码 " v-model="passconfrim">
     </div>
     <div class="btnpass">
      <button type="submit" class="btn btn-primary" v-on:click="passup(passuser,passchange,passconfrim)">确认</button>

    </div>
  </div>

</div>

</template>

<script>
  import '../../common/js/passchange.js'

  export default {

    data(){
      return{
        isActive:true,
        passuser:"",
        passchange:"",
        passconfrim:"",
      }
    },
    methods:{

       getParams:function() {
        // 取到路由带过来的参数 
        let routerParams = this.$route.query.id
        // 将数据放在当前组件的数据内
        this.passuser = routerParams
      
    },
    

       passup:function (a1, a2, a3) {//日期降序


         var fd = {
          username: a1,
          newpwd: a2,
          conpwd: a3,
        };
        
        this.$http.post('/yii/member/querydata', fd).then(body => {
         this.details = body.data.data;
       })
        this.$router.push({path:'/member/loginlist'});
      },

    },

      //这里可以对传过来的数据进行二次加工
      computed: {
        // getProp: function () {
        //   console.log(this.postItem);
        //   return this.postItem.get(0).name.trim().toLowerCase()
        // }
      },
       watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': function (to,from) {
      if (from.path == '/member/loginlist') {
        getParams();

      }
    }

    }



    }
  </script>

  <style scoped>
   .display1{
    padding-left:5px;
    padding-top:10px;

  }
  .display2{
    border:solid 2px  #e0e0e0;
    height: 450px;
    /*text-align: center;*/
    width: 90%;
    padding-left:200px;
    padding-right:5px;
    
    background-color:  #fff;
  }
  .diachange{
   width: 450px;
   height: 300px;
   padding-top: 100px;
   float: left;
   padding-left: 200px;


 }
 .diainput{

  margin-bottom: 30px;

}
.btnpass{
  width: 40px;
  height: 20px;
  padding-left: 400px;
  padding-top: 300px;

}
.btn-header{
 font-size: 18px;
 padding: 10px 10px;
 border-top-left-radius: 3px;
 border-top-right-radius: 3px;
 border: 1px solid #ccc;
 cursor: pointer;
 background: #f0f0f0;

 color:#000;
 width: 110px;
 /*margin-right: 0px;*/
}
.btn-header:hover{
  background: #e0e0e0;
}
.btn{
  margin-right: 30px;
}
.btn1{
 font-size: 18px;
 padding: 10px 10px;
 border-top-left-radius: 3px;
 border-top-right-radius: 3px;
 border: 1px solid #ccc;
 cursor: pointer;
 background: #f0f0f0;
 margin-bottom: -1px;
 color:#000;
 width: 150px;
 /*margin-right: 0px;*/
}
.btn1:hover{
  background: #e0e0e0;
}
.active{
  background: #e0e0e0;
}
.btn2{
  margin-left: 0px;
}
.btn3{
  width:80px;
  padding:7px;
  font-size: 14px;
  border-radius: 3px;
  border:none;
  color:white;
  background-color:#338FFC ;
  float: left;
  margin-left: 5px;
  margin-top:10px;
  margin-bottom: 5px;
}
.error{
  color: #F00;
}
@media screen and (min-width: 640px) {
  .dispaly1{
    width: 60%;
  }
}

@media screen and (min-width: 900px) {
  .dispaly1{
    width: 50%;
  }
}

@media screen and (min-width: 1200px) {
  .dispaly1{
    width: 35%;
  }
}

@media screen and (min-width: 1400px) {
  .dispaly1{
    width: 30%;
  }
}

@media screen and (min-width: 1500px) {
  .dispaly1{
    width: 25%;
  }
}
</style>
