<template>
  <div>
    <div class="filter">
      <el-popover
        class="filterPopup"
        placement="bottom"
        title=""
        width="200"
        trigger="manual"
        v-model="visible">
        <div class="popper__arrow"></div>
        <el-input v-model="filterKey" placeholder="搜索内容"></el-input>
        <el-checkbox :indeterminate="filterIndeter" v-model="checkFilterAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="filterValue" @change="handleCheckedCitiesChange">
          <div v-for="item in filterOptionsKeys">
            <el-checkbox :label="item.label" :key="item.value">{{item.label}}</el-checkbox>
          </div>
        </el-checkbox-group>
      </el-popover>
      <el-input @focus="visible = !visible" :value="filterText"></el-input>
    </div>

    <el-popover
      placement="bottom"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <el-button slot="reference">click 激活</el-button>
    </el-popover>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data(){
    return {
      visible: false,
      filterKey: '',
      filterIndeter: false,
      checkFilterAll: false,
      filterOptions: [{ // 数据源
        value: '1',
        label: '上海'
      },{
        value: '2',
        label: '北京'
      },{
        value: '3',
        label: '广州'
      }],
      filterOptionsKeys: [{ // 已经过滤的数据集合，初始化话的时候，和上面的一样
        value: '1',
        label: '上海'
      },{
        value: '2',
        label: '北京'
      },{
        value: '3',
        label: '广州'
      }],
      filterValue: [],
      filterText: ''
    }
  },
  watch: {
    filterKey(val) {
      this.filterOptionsKeys = this.filterOptions.filter(item=>{
        return (item.value + item.label).indexOf(val)>-1
      })
    },
    filterValue(data) {
      this.filterText = data.join(',');
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.filterValue = val ? this.filterOptions.map(item=>{
        return item.label;
      }) : [];
      this.filterIndeter = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkFilterAll = checkedCount === this.filterOptions.length;
      this.filterIndeter = checkedCount > 0 && checkedCount < this.filterOptions.length;
    }
  }
}
</script>

<style>
.filter{
  position: relative;
}
.filterPopup .el-popover{
  margin-top: 40px;
}
</style>