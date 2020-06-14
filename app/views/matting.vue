<template>
    <div>
      <!-- 1.0 引入npm包的方式 -->
      <!-- <matting-editor
          ref="mattingEditor"
          :options="mattingEditorOptions"
          @update="onMattingUpdate"
          @error="onMattingError"
      >
          <div slot="logo">logo 注入</div>
          <div class="user-tips">支持外部组件注入（需自定义 CSS）</div>
      </matting-editor> -->
      <!-- 2.0 引入本地脚本的方式 -->
      <input type="file" id="file">
      <button @click="matting">开始抠图</button>
    </div>
</template>
<script>
const Matting = require('../matting copy')
export default {
  name: 'matting',
  data: function (params) {
    return {
      mattingEditorOptions: {
      // 图片最大高度
      maxImageHeight: 1000,
  
      // 图片最大宽度
      maxImageWidth: 1000,
  
      maxFileSize: 9 * 1024 * 1024,
  
      // 画布背景色值
      canvasBackgroundColor: "#e6e6e6",
      }
    }
  },
  methods: {
    matting () {
      console.log('抠图')
      var file = document.getElementById('file').files[0];
      var mat = new Matting(file);
      mat.createStream();
    }
  }
}
</script>
<style lang="scss">

</style>