<!-- 自定义侧边栏 -->
<template>
  <el-aside
    class="app-side app-side-left"
    :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'"
  >
    <div class="app-side-logo">
      <img src="@/assets/logo.png" :width="isCollapse ? '60' : '60'" height="60" />
    </div>
    <div>
      <!-- 菜单 -->
      <el-menu
        router
        unique-opened
        class="el-menu-vertical-demo"
        @open="handleOpen"
        :collapse="isCollapse"
        background-color="#314158"
        text-color="#BAC6D5"
        active-text-color="#0C9DFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="desktop">首页</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-video-camera"></i>
            <span slot="title">实时监控</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="realtime">实时监控</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-video-camera"></i>
            <span slot="title">信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="factory">工厂信息管理</el-menu-item>
            <el-menu-item index="sensor">传感器信息管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-data-analysis"></i>
            <span slot="title">统计分析</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="statistic">统计分析</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      isRouter: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.el-menu {
  flex: 1;
}
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
.app-side-logo img {
  display: block;
  margin: auto;
}
.app-side-left.app-side-collapsed {
  width: 65px !important;
}
.app-side-left.app-side-collapsed span,
.app-side-left.app-side-collapsed .el-submenu__icon-arrow {
  color: rgb(49, 65, 88);
}
.el-aside {
  background: #314158;
}
.app-side-left {
  width: 200px !important;
}
.app-side-left .el-menu {
  border-right: solid 1px #314158;
}
</style>