<!-- 自定义头部 -->
<template>
  <el-header class="app-header">
    <!-- 头部菜单 -->
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/platform">平台看板</el-menu-item>
      <el-menu-item index="/main">切换主体</el-menu-item>
    </el-menu>
    <!-- 个人信息 -->
    <div class="app-header-userinfo">
      <!-- <el-dropdown trigger="hover" :hide-on-click="false">
        <span class="el-dropdown-link">
          <i class="el-icon-chat-dot-round el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>信息1</el-dropdown-item>
          <el-dropdown-item>信息2</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown trigger="hover" :hide-on-click="false">
        <span class="el-dropdown-link">
          <i class="el-icon-message el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>信息1</el-dropdown-item>
          <el-dropdown-item>信息2</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
      <span class="nav-item" @click="toMessage">
        <el-badge is-dot class="item">
          <i class="el-icon-message el-icon--right"></i>
        </el-badge>
      </span>
      <span class="nav-item" @click="handleFullScreen">
        <i class="el-icon-full-screen el-icon--right"></i>
      </span>
      <el-dropdown trigger="hover" :hide-on-click="false">
        <span class="el-dropdown-link">
          <span class="userName">您好,&nbsp;&nbsp;{{username}}</span>
          <el-avatar icon="el-icon-user-solid" :size="28" shape="square">user</el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toBasic">基本资料</el-dropdown-item>
          <el-dropdown-item @click.native="toSetting">系统配置</el-dropdown-item>
          <el-dropdown-item divided @click.native="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import api from "@/api/index";
import utils from "@/utils/utils";
export default {
  data() {
    return {
      username: this.$store.state.user.userInfo.account
    };
  },
  methods: {
    handleLogout: function() {
      var _this = this;
      this.$confirm("确认退出?", "提示", {})
        .then(() => {
          api
            .logout(this.form)
            .then(res => {
              if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
                sessionStorage.removeItem("token");
                _this.$router.push("/login", () => {});
              }
            })
            .catch(_ => {});
        })
        .catch(() => {});
    },
    handleClose(key, keyPath) {},
    handleSelect(key, keyPath) {
      var _this = this;
      // _this.$router.push("/Platform", () => {});
      if (key == "/platform") {
        const { href } = this.$router.resolve({
          name: "平台",
          params: {}
        });
        window.open(href, "_blank");
      } else if (key == "/main") {
        // this.$router.push({
        //   name: "主体选择"
        // });
        this.$emit("parentDrawerChange", "");
      }
    },
    toMessage() {
      this.$router.push("/message", () => {});
    },
    toBasic() {},
    toSetting() {
      this.$router.push("/sysset", () => {});
    },
    handleFullScreen() {
      //全屏操作
      if (!utils.isFullScreen()) {
        utils.fullScreen();
      } else {
        utils.exitFullScreen();
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.username = this.$store.state.user.userInfo.account;
    }, 600);
  }
};
</script>

<style scoped>
.app-header-userinfo {
  width: 60px;
  height: 60px;
  cursor: pointer;
}
.app-header-userinfo {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
}
.app-header {
  display: flex;
  border-bottom: solid 1px #e6e6e6;
  background: #314158;
}
.el-menu {
  flex: 1;
  background: #314158;
  color: rgba(255, 255, 255, 0.7);
}
.el-menu.el-menu--horizontal {
  border-bottom: 0 !important;
}
.el-dropdown span {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
}
.toggle-aside i {
  color: #fff;
  font-size: 14px;
  line-height: 60px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  width: 48px;
  text-align: center;
}
.app-header-userinfo {
  width: auto;
}
.userName {
  margin-right: 10px;
}
.app-header-userinfo i {
  font-size: 20px;
  margin-left: 20px;
}
.nav-item + .el-dropdown {
  margin-left: 20px;
}
</style>