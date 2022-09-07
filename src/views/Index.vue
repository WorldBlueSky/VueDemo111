<template>

  <div>
    <div>
      <h1>欢迎进入员工管理系统首页
        <span v-show="isLogin">{{ user.username }}</span>
      </h1><br>
      <!--      当此时为登陆状态的时候，那么这个登陆标签就不显示了-->
      <router-link v-show="!isLogin" :to="{name:'Login'}">点我登陆</router-link>
      <!--      如果isLogin为非空，那么说明处于登陆状态，此时显示退出登陆-->
      <a v-show="isLogin" href="" @click.prevent="logout">退出登陆</a>
      <br>
    </div>

    <br>
    <hr>
    <br>

    <router-link :to="{name:'Emps'}">员工管理</router-link>
    <router-link to="/">用户管理</router-link>
    <router-link to="/">部门管理</router-link>
    <router-link to="/">订单管理</router-link>

    <br><br>
    <hr>
    <br>

    <!--  显示员工组件、用户组件、部门组件、订单组件-->
    <router-view></router-view>

  </div>


</template>

<script>
import instance from "../utils/request";
import router from "../router";

export default {
  name: "index",
  data() {
    return {
      user: {username:"",password:""}
    }
  }, methods: {
    logout() {
      console.log("执行注销的方法!")
      // 退出登陆就是删除 服务器端的redis中的token
      instance.delete("/token?token="+ localStorage.getItem("token")).then(resp => {
        // 服务器端删除之后，浏览器缓存也要进行删除
        localStorage.removeItem("token");
        this.user={};// 删除当前user信息
        this.$router.push({name: "Index"});// 相当于刷新了
      }).catch(error => {
        alert("退出登陆失败!");
      })
    }
  }, computed: {
    isLogin() {
      return this.user.username;
    }
  },
  created() {
    instance.get("/token?token=" + localStorage.getItem("token")).then(resp => {
      //console.log("使用本地缓存的token加载登陆人的信息!");
      this.user = resp.data;
      console.log(this.user.username)
    }).catch(err => {
      // 访问接口失败!
    })
  }

}
</script>

<style scoped>

</style>
