<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构的内容 -->
      <!-- 头部 -->
      <el-card class="tree-card">
        <!-- 结构内容 -->
        <treeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 放置一个el-tree -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <treeTools slot-scope="{data}" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新增弹层组件 -->
    <addDept ref="addDept" :tree-node="node" :show-dialog.sync="showDialog" @addDepts="getDepartments" />
  </div>
</template>

<script>
import addDept from './components/add-dept.vue'
import { tranListToTreeData } from '@/utils'
import treeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments.js'
export default {
  components: {
    treeTools,
    addDept
  },
  data() {
    return {
      node: null,
      showDialog: false,
      company: { name: '扬州大学广陵学院', manager: '' },
      departs: [
        {
          name: '总裁办',
          manager: '张清',
          children: [{
            name: '董事会',
            manager: '魏承谟'
          }]
        },
        {
          name: '行政部',
          manager: '陈玉江'
        },
        {
          name: '人事部',
          manager: '陈伯'
        }
      ],
      defaultProps: {
        label: 'name'
      }
    }
  },

  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      try {
        const result = await getDepartments()
        this.company = { name: result.companyName, manager: '负责人', id: '' }
        this.departs = tranListToTreeData(result.depts, '')// 需要将其转为树形结构
      } catch (error) {
        console.loge(error)
      }
    }, // 监听tree-tools中触发的点击添加部门的事件
    addDepts(node) {
      this.showDialog = true
      this.node = node // 是我们当前点击的部门
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node // 是我们当前点击的部门
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
 .tree-card{
   padding: 30px 140px;
   font-size: 14px;
 }
</style>
