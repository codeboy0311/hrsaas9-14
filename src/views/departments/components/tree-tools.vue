<template>
  <!-- 传入内容，插槽内容，插槽内容会循环多次，有多少节点就循环多少次 -->
  <!-- 作用域插槽，slot-scope='obj'，接受传递给插槽的数据，data每个节点上的数据对象 -->
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%;">
    <!-- 左侧内容 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <!-- 右侧内容 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="operateDepts">
            <!-- 内容 -->
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="delete">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments, addDepartments } from '@/api/departments'
export default {
  props: {
    // 定义传入属性
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //  点击，编辑，删除时触发
    operateDepts(type) {
      if (type === 'add') {
        this.$emit('addDepts', this.treeNode) // 为什么要穿treeNode,因为是添加子部门，需要当前部门的数据
        // 添加子部门
      } else if (type === 'edit') {
        // 编辑子部门
        this.$emit('editDepts', this.treeNode)
      } else {
        // 删除子部门
        this.$confirm('您确定要删除部门吗？').then(() => {
        // 如果点击确认了就会进入then
          return delDepartments(this.treeNode.id)
        }).then(() => {
          // 如果删除成功了就会进入这里
          // 已经成功删除了，按需要通知父组件去更新视图
          this.$emit('delDepts')
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>

<style>

</style>
