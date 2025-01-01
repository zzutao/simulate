// api/chemical.js
import request from '@/utils/request'

export function queryChemicalData(data) {
  return request({
    url: 'http://127.0.0.1:5000/api/chemical', // 使用相对路径，确保与Flask后端API路由匹配
    method: 'post',
    data: data,
    timeout: 20000 // 将超时时间设置为10秒
  })
}
