<template>
  <el-dialog title="新增员工" :visible="showDialog">
    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择聘用形式">
          <el-option v-for="item in employees.hireType" :key="item.id">
            {{ item.value }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="getDepartments" />
        <el-tree v-if="showTree" v-loading="loading" :data="treeData" :props="{label:'name'}" :default-expand-all="true" @node-click="nodeClik" />

      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择输入事件" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="center">
      <el-col :span="6">
        <el-button size="samll">取消</el-button>
        <el-button size="samll" type="primary">添加</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import employees from '@/api/constant/employees'
import { addEmplotee } from '@/api/employs'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      employees,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }, { min: 1, max: 4, message: '用户姓名为1-4位' }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, { pattern: /^1[3-9]\d{9}$/, message: '手机格式不正确', trigger: 'blur' }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: 'true', message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }],
        correctionTime: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      treeData: [],
      showTree: false,
      loading: false // 加进度条
    }
  },
  methods: {
    async  getDepartments() {
      this.loading = true
      this.showTree = true
      const { depts } = await getDepartments() // depts是一个数组，需要转化成属性结构，才可以显示
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    nodeClik(node) {
      this.formData.departmentName = node.name
      this.showTree = false
    }
  }
}
</script>

<style>

</style>
