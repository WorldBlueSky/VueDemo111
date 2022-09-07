import axios from 'axios'

// 创建默认实例
const instance = axios.create({
  baseURL:"http://localhost:8089",
  timeout:"5000"// 默认是ms为单位
})

// 请求拦截器
instance.interceptors.request.use(config=>{
  console.log("发送请求!");
  return config;
})

// 响应拦截器
instance.interceptors.response.use(response=>{
  console.log("返回响应!");
  return response;
},error => {
  console.log("响应错误进入该拦截器!")
  return error;
})

// 暴露instance实例
export default instance;
