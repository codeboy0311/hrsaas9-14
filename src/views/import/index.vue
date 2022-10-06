<template>
  <UploadExcel
    :on-success="success"
  />
</template>

<script>
import { importEmplotee } from '@/api/employs'
export default {
  methods: {
    async success({ header, results }) {
      // header中的数据和results中的数据都是英文，需要将其转换成英文
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      // var arr = []
      // results.forEach(item => {
      //   var userInfo = {}
      //   Object.keys(item).forEach(key => {
      //     // 现在的key还是中文
      //     userInfo[userRelations[key]] = item[key]
      //   })
      //   arr.push(userInfo)
      // })
      var newArr = results.map(item => {
        var userInfo = {}
        Object.keys(item).forEach(key => {
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            // 后端接口限值了，不能是字符串， 要求转换时间类型
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/')) // 只有这样才能存入数组库
          } else {
            userInfo[userRelations[key]] = item[key]
          }
        })
        return userInfo
      })
      await importEmplotee(newArr) // 接受一个数组
      this.$message.success('导入excel表格成功')
      this.$router.back()
    }, // 转化时间格式
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
