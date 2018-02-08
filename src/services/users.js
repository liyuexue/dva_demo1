import request from '../utils/request';

// 表格显示的数据
export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=5`);
}


export function create (values) {
  return request('/api/user',{
    method:'POST',
    body:JSON.stringify(values)
  })
}