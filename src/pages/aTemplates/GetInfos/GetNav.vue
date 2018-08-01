<template>
  <div>
    <el-dialog title="填写顶部导航信息" :visible.sync="NavVisible" :lock-scroll=false top="300px" :close-on-click-modal=false>

      <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
      <!--<div style="margin: 15px 0;"></div>-->
      <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
        <!--<el-checkbox v-for="city in items" :label="city" :key="city">{{city}}</el-checkbox>-->
      <!--</el-checkbox-group>-->
      <el-tree ref="SlotMenuList" class="expand-tree"
               v-if="isLoadingTree"
               show-checkbox
               :default-checked-keys="[1,2]"
               draggable
               check-on-click-node
               :allow-drop="allowDrop"
               :allow-drag="allowDrag"
               node-key="id"
               highlight-current
               :data="setTree"
               :props="defaultProps"
               :expand-on-click-node="false">
        	<span class="slot-t-node" slot-scope="{ node, data }">
        	<!-- 未编辑状态 -->
        		<span v-show="!node.isEdit">
        			<span :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{ node.label }}</span>
	        		<span class="slot-t-icons">
	        		<!-- 新增按钮 -->
	        			<el-button icon="el-icon-plus" circle :size="iconSize" type="success" @click="NodeAdd(node, data)"></el-button>
                <!-- 编辑按钮 -->
	        			<el-button icon="el-icon-edit" circle :size="iconSize" type="primary" @click="NodeEdit(node, data)"></el-button>
                <!-- 删除按钮 -->
	        			<el-button icon="el-icon-delete" circle :size="iconSize" type="warning" @click="NodeDel(node, data)"></el-button>
	        		</span>
        		</span>
            <!-- 编辑输入框 -->
        		<span v-show="node.isEdit">
        			<el-input class="slot-t-input" size="mini" autofocus
                        v-model="data.name"
                        :ref="'slotTreeInput'+data.id"
                        @blur.stop="NodeBlur(node, data)"
                        @keyup.enter.native="NodeBlur(node, data)"></el-input>
        		</span>
        	</span>
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="nextSteps">取 消</el-button>
        <el-button type="primary" @click="nextSteps2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

    // let id = 1000;
    // const cityOptions = ["首页","基本信息","征文投稿","学术日程","参会注册","酒店交通"];
    export default {
      name: "GetNav",
      props:['NavVisible'],
      methods:{
        nextSteps(){

        },
        nextSteps2(){
          console.log(this.$refs.SlotMenuList.getCurrentNode())
          this.$emit('nextCarousel',[{nav:this.$refs.SlotMenuList.getCheckedNodes()},true])
          console.log(this.$refs.SlotMenuList.getCheckedNodes())
        },
        allowDrop(draggingNode, dropNode, type) {
            return true
        },
        allowDrag(draggingNode) {
          return true
        },
        NodeBlur(n, d){//输入框失焦
          console.log(n, d)
          if(n.isEdit){
            this.$set(n, 'isEdit', false)
          }
          this.$nextTick(() => {
            this.$refs['slotTreeInput'+d.id].$refs.input.focus()
          })
        },
        NodeEdit(n, d){//编辑节点
          console.log(n, d)
          if(!n.isEdit){//检测isEdit是否存在or是否为false
            this.$set(n, 'isEdit', true)
          }
        },
        NodeDel(n, d){//删除节点
          console.log(n, d)
          let that = this;
          if(d.children && d.children.length !== 0){
            this.$message.error("此节点有子级，不可删除！")
            return false;
          }else{
            //新增节点可直接删除，已存在的节点要二次确认
            //删除操作
            let DelFun = () => {
              let _list = n.parent.data.children || n.parent.data;//节点同级数据
              let _index = _list.map((c) => c.id).indexOf(d.id);
              console.log(_index)
              _list.splice(_index, 1);
              this.$message.success("删除成功！")
            }
            //二次确认
            let ConfirmFun = () => {
                DelFun()
            }
            //判断是否是新增节点
            d.id > this.non_maxexpandId ? DelFun() : ConfirmFun()
          }
        },
        NodeAdd(n, d) {//新增节点
          console.log(n, d)
          //判断层级
          if (n.level >= 3) {
            this.$message.error("最多只支持三级！")
            return false;
          }
          //新增数据
          d.children.push({
            id: ++this.maxexpandId,
            name: '新增节点',
            children: []
          })
          //同时展开节点
          if (!n.expanded) {
            n.expanded = true
          }
        }

      },
      data(){
        return{
          maxexpandId: 100,//新增节点开始id
          non_maxexpandId: 100,//新增节点开始id(不更改)
          isLoadingTree: true,//是否加载节点树
          setTree: [{id:1,name:"首页",isEdit:false,children:[]},
            {id:2,name:"基本信息",isEdit:false,children:[]},
            {id:3,name:"征文投稿",isEdit:false,children:[]},
            {id:4,name:"学术日程",isEdit:false,children:[]},
            {id:5,name:"参会注册",isEdit:false,children:[]},
            {id:6,name:"酒店交通",isEdit:false,children:[]},
            {id:7,name:"往届回顾",isEdit:false,children:[
                {id:8,name:"第一届",isEdit:false,children:[]},
                {id:9,name:"第二届",isEdit:false,children:[]}
              ]},
          ],//节点树数据
          iconSize: 'mini',
          defaultProps: {
            children: 'children',
            label: 'name'
          }
        }
      }
    }
</script>

<style scoped>
  /*.slot-tree{*/
    /*width: 80%;*/
    /*height: 80%;*/
    /*margin: 0 auto;*/
    /*padding: 1em;*/
    /*max-width: 600px;*/
    /*overflow-y: auto;*/
  /*}*/
  /*顶部按钮*/
  .slot-tree .slot-t-top{
    margin-bottom: 15px;
  }
  .slot-tree .slot-t-node span{
    display: inline-block;
    padding-left: 15px;
  }
  /*节点*/
  .slot-tree .slot-t-node--label{
    font-weight: 600;
  }
  /*输入框*/
  .slot-tree .slot-t-input .el-input__inner{
    height: 26px;
    line-height: 26px;
  }
  /*按钮列表*/
  .slot-tree .slot-t-node .slot-t-icons{
    display: none;
    margin-left: 15px;
  }
  .slot-tree .slot-t-icons .el-button+.el-button{
    margin-left: 16px;
  }
  .slot-tree .el-tree-node__content:hover .slot-t-icons{
    display: inline-block;
  }
  .el-tree-node__content{
      margin-top: 5px;
  }
  .slot-t-icons{margin-left: 85px}
  .el-tree-node{margin-bottom: 15px;}
</style>
