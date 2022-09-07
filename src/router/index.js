import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//配置 跳转本页面不报错
const originPush = Router.prototype.push;
Router.prototype.push = function push(location){
  return originPush.call(this,location).catch(err => err)
};


export default new Router({
  routes: [

    {path:'/', redirect:'/index'},

    {path:'/login', component:()=>import("../views/Login"),name:'Login'}, // 懒加载组件，按需引入,用到的时候再去加载name:"Login"},

    {path:"/index", component:()=>import("../views/Index"),name:"Index",

      children:[

        {path:"emps",component:()=>import("../views/emp/List"),name:"Emps"}

      ]// 作为主页组件的子组件，子路由

    },

    {path:"*",component:()=>import("../views/NotFound"),name:""}// 匹配除上面以外的所有路由
  ]
})
