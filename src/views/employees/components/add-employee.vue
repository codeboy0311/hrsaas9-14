<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <el-form ref="addEmployee" label-width="120px" :model="formData" :rules="rules">
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
          <el-option v-for="item in employees.hireType" :key="item.id" :value="item.value" />
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
        <el-button size="samll" @click="btnCancel">取消</el-button>
        <el-button size="samll" type="primary" @click="btnOk">添加</el-button>
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
    },
    async btnOk() {
      try {
        await this.$refs.addEmployee.validate() // 验证表单是否通过
        await addEmplotee(this.formData) // 新增员工
        // 调用父组件的实例，告诉父组件更新数据
        // this.$parent 可以直接访问父组件的实例，实际上就是父组件的this
        // this.$emit()
        this.$parent.getEmployeeList()
        this.$parent.showDialog = false
        // 这里不用重置数据，因为关闭弹层触发了close事件。close事件绑定了btncancel事件
      } catch (error) {
        this.message.fails('添加失败')
      }
    },
    btnCancel() {
      // 重置表单
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      // 重置表单验证
      this.$refs.addEmployee.resetFields()
      // 调用父组件关闭单层
      this.$emit('update:showDialog', false)
      // update:props名称 这么写的话 可以在父组件直接使用sync修饰符处理
    }
  }
}
</script>

<style>

</style>
