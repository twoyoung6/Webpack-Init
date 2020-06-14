<template>
  <!-- 直接引用 全局自定义组件 -->
  <!-- <selfComp></selfComp> -->
  <!-- 动态组件的方式引用全局自定义组件 -->
  <div>
    <el-button @click="change">返回 登录</el-button>
    <component :is="compName"></component>
  </div>
</template>
<script>
import login from "../views/login.vue";
export default {
  name: "activeComp",
  components: { login },
  data() {
    return {
      compName: 'customComp'
    };
  },
  methods: {
    change () {
      this.compName = 'login'
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
