<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 放置内容 -->
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 左侧内容 -->
            <el-row>
              <el-button icon="el-icon-edit" size="small" type="primary" @click="showDialog=true">新增角色</el-button>
              <el-table border="" :data="list">
                <el-table-column type="index" align="center" label="序号" width="120" />
                <el-table-column prop="name" align="center" label="角色" width="240" />
                <el-table-column prop="description" align="center" label="描述" />
                <el-table-column prop="companyId" label="操作" align="center">
                  <!-- 作用域插槽 -->
                  <template slot-scope="{row}">
                    <el-button type="success" size="small">分配权限</el-button>
                    <el-button type="primary" size="small" @click="getRoleDetail(row.id)">编辑</el-button>
                    <el-button type="danger" size="small" @click="deleteRole(row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 放置分页组件 -->
              <el-row
                type="flex"
                justify="center"
                style="height: 60px;"
                align="middle"
              >
                <el-pagination
                  :page-size="page.pagesize"
                  :current-page="page.page"
                  layout="prev, pager, next"
                  :total="page.total"
                  @current-change="changePage"
                />
              </el-row>

            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <!-- 右侧内容 -->
            <el-alert
              title="对公司名称，公司地址，营业执照，公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon:closable="false"
            />
            <!-- 不是所有的表单都修要校验 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item
                label="企业名称"
              >
                <el-input v-model="company.name" placeholder="扬州大学广陵学院学工处" disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item
                label="公司地址"
              >
                <el-input v-model="company.companyAddress" placeholder="扬州市邗江区邗江南路199号" disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item
                label="公司电话"
              >
                <el-input v-model="company.mailbox" placeholder="19895328987" disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="company.remarks" placeholder="10102327882qq.com" disabled style="width: 400px;" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input placeholder="扬州大学广陵学院---吊" type="textarea" :rows="3" disabled style="width: 400px;" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- close事件在点击确定时会触发 -->
    <el-dialog title="编辑部门" :visible="showDialog" @close="btnCancel">
      <el-form ref="roleForm" label-width="120px" :model="roleForm" :rules="rules">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button size="small" type="primary" @click="btnOk">完成</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, updateRole, addRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      showDialog: false,
      company: {},
      list: [], // 承接数组
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 5,
        total: 0 // 记录总数
      },
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请您填入角色名', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList() // 获取角色列表
    this.getCompanyInfo() // 获取公司信息
  },
  methods: {
    async  getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    changePage(newpage) {
      // newpage 是当前点击的页码
      this.page.page = newpage // 当前页码赋值给当前的最新页码
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.company = await getCompanyInfo(this.company)
    },
    async deleteRole(id) {
      try {
        await this.$confirm('确认删除该角色吗？')
        await deleteRole(id)
        this.getRoleList()
        this.$message('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    async getRoleDetail(id) {
      this.showDialog = true
      this.roleForm = await getRoleDetail(id)
    },
    async btnOk() {
      try {
        await this.$refs.roleForm.validate()
        // 校验通过才会往下执行，返回的是一个promise对象
        if (this.roleForm.id) {
          // 有id是编辑
          await updateRole(this.roleForm)
        } else {
          // 没 id 是新增
          await addRole(this.roleForm)
        }
        this.getRoleList()
        this.showDialog = false
        this.$message.success('编辑成功')
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.roleForm = {
        name: '',
        description: ''
      }
      // 移除校验规则
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    }
  }
}
</script>

<style>

</style>
