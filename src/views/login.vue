<template>
  <el-container>
    <el-main>
      <el-form ref="form" :model="form" class="login-container">
        <div class="title">平台登录</div>
        <el-form-item>
          <el-input v-model="form.account" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.vcode" placeholder="验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="logining">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
        </el-form-item>
        <p style="color:#fff">测试账号：admin/admin</p>
      </el-form>
    </el-main>
    <!-- <el-footer>© COPYRIGHT AMHSZG.COM - ALL RIGHTS RESERVED.</el-footer> -->
  </el-container>
</template>
<script>
import api from "@/api/index";
export default {
  data() {
    return {
      logining: false,
      form: {
        account: "",
        password: ""
      },
      checked: false,
      user: {}
    };
  },
  methods: {
    handleLogin() {
      // console.log(this.form);
      api
        .login(this.form)
        .then(res => {
          console.log(res);
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            let token = _data.token;
            let userInfo = _data.userInfo;
            this.logining = true;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
            this.$router.push("/", () => {});
          }
        })
        .catch(_ => {});

      // setTimeout(() => {
      //   sessionStorage.setItem("user", JSON.stringify(this.user));
      //   this.$router.push("/", () => {});
      // }, 1000);
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
.el-footer {
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
  width: 320px;
}
.el-main {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("../assets/bg.jpg") no-repeat center;
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
  width: 100%;
  height: 80px;
  float: left;
  color: #fff;
  font-size: 26px;
  font-weight: bold;
  line-height: 60px;
}
.login-container {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 2px;
  padding: 20px;
}
.el-checkbox {
  color: #d3dce6 !important;
}
</style>