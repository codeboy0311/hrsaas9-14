<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <pageTools :show-before="true">
      <span slot="before">我爱你们</span>
      <el-button slot="after" type="primary">导入EXCEL</el-button>
    </pageTools>
    <UploadExcel />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
