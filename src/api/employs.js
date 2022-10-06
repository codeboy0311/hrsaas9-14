import request from '@/utils/request'
// 获取员工的简单列表
export function getEmploySimple() {
  return request({
    url: '/sys/user/simple'
  })
}
// 获取员工的综合列表数据
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 删除员工的功能
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
// 新增员工接口

export function addEmplotee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

// 批量导入员工接口
export function importEmplotee(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}

