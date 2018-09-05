<template>
  <div>
    <el-dialog title="选择右侧按钮" :visible.sync="ButtonVisible" :lock-scroll=false top="300px" :close-on-click-modal=false>

      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="nextSteps">取 消</el-button>-->
        <el-button type="primary" @click="nextSteps2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "GetButton",
      props:['ButtonVisible'],
      methods:{
        nextSteps(){
          this.$emit('nextTimeInfo',[{banner:this.form},true])
        },
        nextSteps2(){
          console.log(this.checkedCities)
          this.$emit('nextOrganization',[{button:this.checkedCities},true])
        },
        handleCheckAllChange(val) {
          this.checkedCities = val ? this.cities : [];
          this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.cities.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        }
      },
      data(){
        return{
          cities:["个人代表注册","团队代表注册","论文投稿通道"],
          formLabelWidth: '120px',
          isIndeterminate: true,
          checkAll: false,
          checkedCities:[]
        }
      }
    }
</script>

<style scoped>

</style>
