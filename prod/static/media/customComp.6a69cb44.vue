<template>
  <div>
    {{text}}
  </div>
</template>
<script>
export default {
  name: 'customComp',
  data() {
    return {
      text: '我是一个全局注册的组件，可以用在任何新创建的 Vue 根实例 (new Vue) 的模板中；记住全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生'
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
