<template>
  <el-container>
    <el-main>
      <el-form ref="form" :model="form" label-width="80px" class="login-container">
        <div class="title">用户登录</div>
        <el-form-item label="用户名">
          <el-input v-model="form.name" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pwd" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item style="width:100%">
          <el-button type="primary" @click.prevent="login" :loading="logining">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer>@copy-right</el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      logining: false,
      form: {},
      checked: false,
      user: {}
    };
  },
  methods: {
    login() {
      this.logining = true;
      setTimeout(() => {
        sessionStorage.setItem("user", JSON.stringify(this.user));
        this.$router.push("/", () => {});
      }, 1000);
    }
  },
  destroyed() {
    this.$store.dispatch("home/initTab");
    this.$store.dispatch("home/initBreadcrumb");
    this.$store.dispatch("home/initAside");
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.login-container {
  width: 350px;
}
.el-main {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 60px;
}
.el-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
}
.login-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-header {
  height: 30px;
}
.el-button {
  width: 100%;
}
.title {
  font-weight: bold;
  font-size: 32px;
  padding-left: 80px;
  height: 120px;
}
</style>