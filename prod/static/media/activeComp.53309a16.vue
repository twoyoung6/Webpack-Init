<template>
  <!-- 直接引用 全局自定义组件 -->
  <!-- <selfComp></selfComp> -->
  <!-- 动态组件的方式引用全局自定义组件 -->
  <component :is="compName"></component>
</template>
<script>
export default {
  name: "activeComp",
  data() {
    return {
      compName: 'customComp'
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
