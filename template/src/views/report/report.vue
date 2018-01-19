<template>
  <div>
    <div style="border-top: 1px solid #dfdfdf;padding: 12px;margin-top: 15px">
      <py-select v-model="value"  placeholder="请选择">
        <py-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </py-option>
      </py-select>
      <py-button disabled>开启</py-button>
      <py-button disabled>关闭</py-button>
      <py-button disabled>删除</py-button>
      <py-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              table-search
              style="width: 100%;margin-top: 10px;"
              @selection-change="handleSelectionChange">
        <py-table-column
                type="selection"
               >
        </py-table-column>
        <py-table-column
                label="报表名称"
                >
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </py-table-column>
        <py-table-column
                prop="name"
                label="报表状态"
               >
        </py-table-column>
        <py-table-column
                prop="address"
                label="执行状态"
                show-overflow-tooltip>
        </py-table-column>
        <py-table-column
                prop="address"
                label="报表分类"
                show-overflow-tooltip>
        </py-table-column>
        <py-table-column
                prop="address"
                label="最近执行时间"
                show-overflow-tooltip>
        </py-table-column>
        <py-table-column
                prop="address"
                label="下次执行时间"
                show-overflow-tooltip>
        </py-table-column>
      </py-table>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                multipleSelection: [],
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        },
        methods: {
            handleSelectionChange() {
                // console.log('handleSelectionChange');
            },
        }
    }
</script>