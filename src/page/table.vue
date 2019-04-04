<template>
  <div>
    <el-button @click="add">添加一条</el-button>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      >
        <template slot-scope="scope">
          <el-date-picker
            v-if="scope.row.status"
            v-model="scope.row.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <span v-else>{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-input v-if="scope.row.status" v-model="scope.row.name"></el-input>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        :formatter="formatter">

        <template slot-scope="scope">
          <el-select  v-if="scope.row.status" v-model="scope.row.address" placeholder="请选择">
            <el-option
              v-for="item in cityList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <span v-else>{{scope.row.address}}</span>
        </template>
        
        
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="tagList"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-select  v-if="scope.row.status" v-model="scope.row.tag" placeholder="请选择">
            <el-option
              v-for="item in tagList"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
          <el-tag
            v-else
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tagList: [{ text: '家', value: '家' }, { text: '公司', value: '公司' }],
        cityList: ['北京', '深圳', '上海'],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }]
      }
    },
    methods: {
      add() {
        this.tableData.map(item=>{
          if(item.status){
            item.status = 0;
          }
          return item;
        })
        this.tableData.push({
          date: '2019-4-01',
          name: '默认数据',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司',
          status: 1
        });
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      formatter(row, column) {
        return row.address;
      }
    }
  }
</script>