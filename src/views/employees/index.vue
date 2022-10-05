<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog=true">新增员工</el-button>
        </template>
      </pageTools>
      <el-card>
        <el-table v-loading="Loading" border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formDataEmployeeEnum" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="obj">
              {{ obj.row.timeOfEntry| formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="formOfEmployment">
            <template v-slot="{row}">
              <el-switch :value="row.formOfEmployment === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click=" delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="middle" style="height: 60px;">
          <el-pagination
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.page"
            :page-size="page.size"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <!--sync是子组件去改变父组件的数据的一个语法糖 -->
    <addEmployee :show-dialog.sync="showDialog" />
  </div>

</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employs'
import EmployeeEnum from '@/api/constant/employees' // 引入员工的枚举对象
import addEmployee from './components/add-employee.vue'
export default {
  components: {
    addEmployee
  },
  data() {
    return {
      showDialog: false,
      Loading: false, // 显示遮罩层
      list: [], // 接数据
      page: {
        page: 1, // 当前的页码
        size: 10,
        total: 0 // 总数
      }
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async  getEmployeeList() {
      this.Loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.Loading = false
    },
    async changePage(newPage) { // 最新的页码
      this.page.page = newPage
      this.getEmployeeList()
    },
    formDataEmployeeEnum(row, column, cellValue, index) {
      // 要去找1对应的值
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async  delEmployee(id) {
      try {
        await this.$confirm('确定删除该员工吗？')
        await delEmployee(id)
        this.$message('删除员工成功')
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>

<style>

</style>
