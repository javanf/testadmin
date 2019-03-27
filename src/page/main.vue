<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="16"><div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>标签云</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <word-cloud class="fans-line"></word-cloud>
        </el-card>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>环形图</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <one-circle class="fans-line"></one-circle>
        </el-card>
      </div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>雷达图</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <randar  class="fans-line"></randar>
        </el-card>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>标准柱形图</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <bar-xi-line  class="fans-line"></bar-xi-line>
        </el-card>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <bar-heng class="fans-line"></bar-heng>
        </el-card>
      </div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: '',
  data () {
    return {
      msg: '统计中心'
    }
  },
  components: {
    barHeng: Vue.extend(require('../components/bar-heng.vue').default),
    barXiLine: Vue.extend(require('../components/bar-xi-line.vue').default),
    wordCloud: Vue.extend(require('../components/word-cloud.vue').default),
    randar: Vue.extend(require('../components/randar.vue').default),
    oneCircle: Vue.extend(require('../components/one-circle.vue').default)
  }
}
</script>

<style scoped>
 .el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.fans-line{
  height: 300px;
}
</style>
