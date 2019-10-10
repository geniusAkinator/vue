<!-- 自定义头部 -->
<template>
  <el-header class="app-header">
    <!-- 头部菜单 -->
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/">看板</el-menu-item>
    </el-menu>
    <!-- 个人信息 -->
    <div class="app-header-userinfo">
      <el-dropdown trigger="hover" :hide-on-click="false">
        <span class="el-dropdown-link">
          <span class="userName">您好,&nbsp;&nbsp;admin</span>
          <el-avatar icon="el-icon-user-solid" :size="28" shape="square">user</el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    logout: function() {
      var _this = this;
      this.$confirm("确认退出?", "提示", {})
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/Login", () => {});
        })
        .catch(() => {});
    },
    handleClose(key, keyPath) {},
    handleSelect(key, keyPath) {
      var _this = this;
      // _this.$router.push("/Platform", () => {});
      const { href } = this.$router.resolve({
        name: "平台",
        params: {}
      });
      window.open(href, "_blank");
    }
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
</style>