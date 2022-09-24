<template>
  <!-- 放置弹层组件 -->
  <el-dialog
    :visible="showDialog"
    :title="title"
    @close="btnCancel"
  >
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%;" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%;" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%;" placeholder="请选择" @focus="getEmploySimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%;" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="samll" @click="btnCancel">取消</el-button>

        <el-button size="samll" type="primary" @click="btnOk">完成</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getEmploySimple } from '@/api/employs'
import { addDepartments, getDepartments, getDepartDetail, editDepartments } from '@/api/departments'
export default {
  props: {
    showDialog: {
      type: Boolean,
      require: true
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      // value 是部门名称，要去和同级部门下的部门去比较 有咩有相同的，有相同的不能过，不相同的可以过
      const { depts } = await getDepartments()
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
      } else {
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      //   去找同级部门下，有没有和value相同的数据
      // 找到所有的子部门

      // 如果isrepeat为true表示找到了一样的名字
      isRepeat ? callback(new Error(`同级部门下,已经存在${value}部门了`)) : callback()
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      // value 是部门名称，要去和同级部门下的部门去比较 有咩有相同的，有相同的不能过，不相同的可以过
      const { depts } = await getDepartments()
      // 要求编码和所有部门的编码都不能重复
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts.filter(item => item.id !== this.treeNode.id).some(item => item.code === value && value)
      } else {
        isRepeat = depts.some(item => item.code === value && value)
      }

      // 如果isrepeat为true表示找到了一样的名字
      isRepeat ? callback(new Error(`组织架构下,已经存在${value}编码了`)) : callback()
    }
    return {
      peoples: [],
      // 定义一个表单数据
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1-50个', trigger: 'blur' },
          { trigger: 'blur', validator: checkNameRepeat }], // 自定义函数的形式校验
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码长度为1-50个', trigger: 'blur' },
          { trigger: 'blur', validator: checkCodeRepeat }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍长度为1-50个', trigger: 'blur' }]
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async getEmploySimple() {
      const name = await getEmploySimple()
      this.peoples = name
    },
    btnOk() {
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
          if (this.formData.id) {
            // 编辑模式，调用编辑接口
            await editDepartments(this.formData)
          } else {
            // 可以提交了 新增模式
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }
          this.$emit('addDepts')// 触发一个自定义事件
          this.$emit('update:showDialog', false)
          // 关闭dialog的时候，会触发el-close的close事件
        }
      })
    },
    btnCancel() {
      // 重置数据，因为resetFields只能重置表单里面的数据，非表单的数据例如 id 就不能重置
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
      this.$emit('update:showDialog', false)
      this.$refs.deptForm.resetFields()
    },
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
      // 因为我们是通过父调用子组件的方法，先设置了node数据， 直接调用方法
      // props的传值是异步的
    }
  }

}
</script>

<style>

</style>
