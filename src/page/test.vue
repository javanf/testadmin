<template>
  <div>
    <el-checkbox :indeterminate="isIndeterminateA" v-model="checkAllALL" @change="handleCheckAllChangeALL">全选所有</el-checkbox>
    <br>
    <br>
    <br>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>

    <br>
    <br>
    <br>
    <br>
    <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>

  </div>
</template>

<script>
import Vue from 'vue'
const cityOptions = ['上海', '北京', '广州', '深圳'];

export default {
  data(){
    return {
      checkAllALL: false,
      isIndeterminateA: true,

      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      checkAll: false,
      isIndeterminate: true,
      checkedCities2: ['上海', '北京'],
      checkAll2: false,
      isIndeterminate2: true
    }
  },
  methods: {
    checkIsAll() {
      console.log(this.checkedCities, this.checkedCities2);
      if(this.checkAll && this.checkAll2){
        this.checkAllALL = true;
        this.isIndeterminateA = false;
        return;
      } else {
        this.checkAllALL = false;
      }
      if(!this.checkAll && !this.checkAll2 && !this.isIndeterminate && !this.isIndeterminate2){
        this.checkAllALL = false;
        this.isIndeterminateA = false;
        return;
      }
      if(!this.isIndeterminate || !this.isIndeterminate2){
        this.isIndeterminateA = true;
      }
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;

      this.checkIsAll();
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;

      this.checkIsAll();
    },
    handleCheckAllChange2(val) {
      this.checkedCities2 = val ? cityOptions : [];
      this.isIndeterminate2 = false;

      this.checkIsAll();
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.cities.length;
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.cities.length;

      this.checkIsAll();
    },
    handleCheckAllChangeALL(val) {

      this.isIndeterminateA = false;

      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
      this.checkAll = val ? true : false;

      this.checkedCities2 = val ? cityOptions : [];
      this.isIndeterminate2 = false;
      this.checkAll2 = val ? true : false;

      this.checkIsAll();
    },
  }
}
</script>
