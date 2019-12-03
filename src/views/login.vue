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
        <el-form-item class="verity">
          <el-input v-model="form.vcode" placeholder="验证码" maxlength="4"></el-input>
          <my-verify-code @sendCode="getCode"></my-verify-code>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="logining">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="remember" class="remember">保持登录</el-checkbox>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer>&copy; COPYRIGHT AMHSZG.COM - ALL RIGHTS RESERVED.</el-footer>
  </el-container>
</template>
<script>
import api from "@/api/index";
import baseURL from "@/utils/baseUrl";
import MyVerifyCode from "@/components/verifyCode";
export default {
  data() {
    return {
      logining: false,
      form: {
        account: "",
        password: "",
        vcode: ""
      },
      remember: true,
      code: ""
    };
  },
  methods: {
    getCode(e) {
      this.code = e;
    },
    handleLogin() {
      this.verityForm();
    },
    verityForm() {
      if (this.form.account == "") {
        this.$message({
          showClose: true,
          message: "账号名不能为空",
          type: "error"
        });
        return;
      }
      if (this.form.password == "") {
        this.$message({
          showClose: true,
          message: "密码不能为空",
          type: "error"
        });
        return;
      }
      if (this.form.vcode == "") {
        this.$message({
          showClose: true,
          message: "验证码不能为空",
          type: "error"
        });
        return;
      }
      if (this.form.vcode != this.code) {
        this.$message({
          showClose: true,
          message: "验证码错误",
          type: "error"
        });
        return;
      }
      api
        .login(this.form)
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            let token = _data.token;
            let userInfo = _data.userInfo;
            this.logining = true;
            this.clearCookies();
            if (this.remember) {
              this.setCookies();
            }
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
            this.$store.dispatch("user/setUserInfo", userInfo);
            this.$router.push("/", () => {});
          } else if (res.code == this.AJAX_HELP.CODE_RESPONSE_FAILURE) {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error"
            });
          }
        })
        .catch(_ => {
          console.log(_);
        });
    },
    setCookies() {
      let exDays = 60; //60days
      let cipherAccount = this.CryptoJS.AES.encrypt(
        this.form.account + "",
        "secretKey"
      ).toString();
      let cipherPassword = this.CryptoJS.AES.encrypt(
        this.form.password + "",
        "secretKey"
      ).toString();
      let exDate = new Date(); // 获取时间
      exDate.setTime(exDate.getTime() + 24 * 60 * 60 * 1000 * exDays); // 保存的天数
      this.$cookies.config(exDate);
      this.$cookies.set("currentAccount", cipherAccount);
      this.$cookies.set("currentPassword", cipherPassword);
    },
    getCookies() {
      let cipherAccount = this.$cookies.get(`currentAccount`);
      let cipherPassword = this.$cookies.get(`currentPassword`);
      if (cipherAccount != null) {
        let decryptAccount = "";
        decryptAccount = this.CryptoJS.AES.decrypt(
          cipherAccount,
          `secretKey`
        ).toString(this.CryptoJS.enc.Utf8);
        this.form.account = decryptAccount;
      }
      if (cipherPassword != null) {
        let decryptPwd = this.CryptoJS.AES.decrypt(
          cipherPassword,
          `secretKey`
        ).toString(this.CryptoJS.enc.Utf8);
        this.form.password = decryptPwd;
      }
    },
    clearCookies() {
      this.$cookies.remove(`currentAccount`);
      this.$cookies.remove(`currentPassword`);
    }
  },
  destroyed() {},
  mounted() {
    this.$store.dispatch("home/clearAside");
    this.$nextTick(() => {
      this.getCookies();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("home/initTab");
    this.$store.dispatch("home/initBreadcrumb");
    this.$store.dispatch("home/initAside");
    next();
  },
  components: {
    MyVerifyCode
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