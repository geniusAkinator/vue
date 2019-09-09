<!-- 自定义侧边栏 -->
<template>
  <el-aside
    class="app-side app-side-left"
    :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'"
  >
    <div class="app-side-logo">
      <img src="@/assets/logo.png" :width="isCollapse ? '60' : '60'" height="60" />
    </div>
    <div class="app-side-menu">
      <!-- 菜单 -->
      <el-menu
        router
        unique-opened
        :default-active="this.$store.state.home.nowPath"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        :collapse="isCollapse"
        background-color="#314158"
        text-color="#BAC6D5"
        active-text-color="#0C9DFF"
      >
        <el-submenu :index="index+1+''" :key="index" v-for="(item,index) in menu">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="item.path"
              v-for="(item,index) in item.children"
              :key="index"
            >{{item.name}}</el-menu-item>
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
      isRouter: true,
      menu: this.$store.state.home.menu
    };
  },
  props: {
    isCollapse: false
  },
  methods: {
    handleOpen(key, keyPath) {}
  },
  mounted() {
    this.$nextTick(() => {
      // let el = document.querySelectorAll(".el-menu-item-group__title");
      // for (let i = 0; i < el.length; i++) {
      //   let pNode = el[i].parentNode;
      //   // pNode.remove(el[i])
      //   console.log(pNode, el[i]);
      //   pNode.remove(el[i]);
      // }
    });
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