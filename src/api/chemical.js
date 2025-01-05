// api/chemical.js
import request from '@/utils/request'

export function queryChemicalData(data) {
  return request({
    url: 'http://127.0.0.1:5000/api/chemical',
    method: 'post',
    data: data,
    timeout: 20000
  })
}
