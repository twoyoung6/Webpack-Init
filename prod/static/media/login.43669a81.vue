<template>
  <div>
    <div class="g-center login-page">
      <el-form class="login-form">
        <h1 class="main-title"><a href="https://twoyoung6.github.io/" target="_blank"><img src="../../image/panda.png" alt="logo">Webpack-Init</a></h1>
        <p class="des">
          <!-- Symbol 引用字体图标的方式 -->
          <!-- <svg class="icon myIconStyle" aria-hidden="true">
        　　<use xlink:href="#icon-xiongmao1"></use>
          </svg> -->
          <!-- font-class 引入字体图标库 -->
          <i class="iconFont iconfont icon-xiongmaojiaoyinyihuifu"></i>
          Frontend Webpack program based Vue</p>
        <el-form-item>
          <el-input
            :autofocus="true"
            placeholder="请输入账号"
            v-model="username">
            <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="password">
            <template slot="prepend"><i class="el-icon-info"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" :loading="isBtnLoading" @click="login">登录 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      isBtnLoading: false
    };
  },
  methods: {
    login () {
      console.log(this.username, this.password)
      this.$router.push('activeComp')
    }
  }
};
</script>
<style lang="scss" scoped>
  $font-Color: #67c23a;
  $gray: #c0c4cc;
  #webpack{display: table;width:100%;}
  .myIconStyle{
    width: 62px;
    height: 62px;
    vertical-align: -webkit-baseline-middle;
  }
  .iconFont {
    font-size: 24px;
    color: $gray;
    vertical-align: baseline;
  }
  .main-title{
    text-align: center;
    a {
      text-decoration: unset;
      color: $font-Color;
    }
    img {
      vertical-align: middle;
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
  }
  .des{
    text-align: center;
    color: $gray;
    margin-bottom: 2em;
  }
  .login-form{
    width: 400px;
    margin: 13% auto 0;
    /deep/ .el-button--primary {
      background-color: $font-Color;
      border-color: $font-Color;
    }
    /deep/ .el-input__inner {
      font-size: 13px;
      &:focus {
        border-color: $font-Color;
      }
    }
    /deep/ .el-icon-mobile-phone, .el-icon-info {
      color: $font-Color;
    }
  }
  .login-page {
    background:#fff;
  }
</style>
