<template>
  <div>
    <form action="">
      用户名：<input type="text" v-model="user.username"/><br>
      密码： <input type="password" v-model="user.password"/><br>
      <input type="button" @click="login" value="登陆"/><br>
    </form>
  </div>
</template>

<script>
import instance from "../utils/request";

export default {
  name: "Login",

  data() {
    return {
      user:{
        username:"",
        password:""
      }
    };
  },
  methods:{
      login(){
           // 发送axios进行验证用户名密码
        instance.post("/login",this.user).then(resp=>{
          const data = resp.data;
          if(data.success){
            // 登陆成功!
            // 保存token到浏览器的本地缓存中
            localStorage.setItem("token",data.token)

            // 切换路由到主页当中
            this.$router.push({name:'Index'});

          }else{
            // service层出现异常返回
             alert("登陆失败!");
          }

        }).catch(error=>{
           // 访问后端接口响应失败!
          console.log("响应失败!")
        })

      }
  }


}
</script>



<style scoped>

</style>
