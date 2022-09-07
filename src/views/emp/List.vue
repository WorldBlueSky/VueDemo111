<template>
   <div class="emps">
     <button @click="emp={name:'',id:'',age:'',salary:''}">添加员工信息</button>
     <table border="1" style="width: 100%;text-align: center">
       <tr>
         <td>id</td>
         <td>name</td>
         <td>age</td>
         <td>salary</td>
         <td>编辑</td>
       </tr>

       <tr v-for="item in emps">
         <td>{{item.id}}</td>
         <td>{{item.name}}</td>
         <td>{{item.age}}</td>
         <td>{{item.salary}}</td>
         <td>
           <a href="" @click.prevent="deleteEmp(item.id)">删除</a>
           <a href="" @click.prevent="updateMess(item.id)">修改</a>
         </td>
       </tr>

       <br>

     </table>
     <br>
     <form action="" style="line-height: 50px">
       <div  v-show="emp.id">
         编号:<input type="text" v-model="emp.id" readonly> </input> <br>
       </div>

       姓名:<input type="text" v-model="emp.name"></input><br>
       年龄:<input type="text" v-model="emp.age"></input><br>
       薪水:<input type="text" v-model="emp.salary"></input><br>
       <input type="button" value="修改用户" @click="saveOrEdit"></input>
     </form>
     <br>

    </div>

</template>

<script>
import instance from "../../utils/request";

export default {
  data(){
    return{
      emps:[],
      emp:{name:"",age:"",id:"",salary:""}, // 这个是保存、修改 表单中绑定的信息
    }
  },
  methods:{
    // 这是增加、修改员工信息
    saveOrEdit(){
      //2、发送post请求完成增加或删除
      instance.post('/save',this.emp).then(resp=>{
          alert("保存成功!");
          this.findAll();
      }
      ).catch(err=>{
          alert("访问'/save'接口失败!");
      });
    },

    // 这是加载对应id的员工信息到文本框中
    updateMess(id){
      // 根据id查找数据库中对应的员工信息
       instance.get('/emp?id='+id).then(resp=>{
         const data = resp.data;
         this.emp.id=data.id;
          this.emp.name=data.name;
          this.emp.age=data.age;
          this.emp.salary=data.salary;
       }).catch(err=>{
          alert("访问'/emp'接口失败!")
       })
    },

    // 展示所有员工信息的方法
    findAll(){
      // 发送axios，查询数据库并加载
      instance.get("/emps").then(resp=>{
        this.emps=resp.data;
      }).catch(err=>{
        alert("访问'/emps'接口失败!")
      });
    },

    deleteEmp(id){
      if(window.confirm("您确定要删除吗?")){
        instance.delete("/delete?id="+id).then(resp=>{
          alert("该条记录已删除!");
          this.findAll();
        }).catch(err=>{
          alert("访问 '/delete'接口失败!")
        })
      }
    }
  },
  created() {
    this.findAll();
  },
  name: "list",//监听函数
}
</script>

<style scoped>

</style>
