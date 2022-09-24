//  获取组织架构数据
import request from '@/utils/request'
export function getDepartments() {
  return request({
    method: 'get',
    url: '/company/department'
  })
}
//  封装删除接口 根据id删除部门
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
//  封装添加接口 新增部门
export function addDepartments(data) {
  return request({
    url: `/company/department/`,
    method: 'post',
    data
  })
}
// 获取部门信息的模块
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'get'
  })
}
// 编辑部门信息的模块
export function editDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

