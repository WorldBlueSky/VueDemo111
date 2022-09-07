<template>
  <div>
    <h1> 404 NOT FOUND!</h1><br>
    <router-link :to="{name:'Index'}">点我立即回到主页</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>

</style>
