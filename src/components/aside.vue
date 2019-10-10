<!-- 自定义侧边栏 -->
<template>
  <div class="my-aside">
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
                @click="jump(item)"
              >{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </el-aside>
    <div :class="isCollapse ? 'side_drawer isCollapse': 'side_drawer'" @click="isAsideCollapse=!isAsideCollapse">
      <i></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRouter: true,
      menu: this.$store.state.home.menu,
      isAsideCollapse: this.isCollapse
    };
  },
  props: {
    isCollapse: false
  },
  watch: {
    isAsideCollapse(newVal, oldVal) {
      this.$emit("parentCollapseChange", newVal);
    }
  },
  methods: {
    handleOpen(key, keyPath) {},
    jump(e){
      console.log(e);
      this.$router.push({"path":"/"+e.path})
    }
  },
  mounted() {
   
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
.my-aside {
  position: relative;
}
.side_drawer {
  position: absolute;
  top: 50%;
  right: -20px;
  z-index: 99;
}
.side_drawer i {
  background: url("../assets/icon_arrow.png") 0px 0px no-repeat;
  display: block;
  width: 20px;
  height: 60px;
  cursor: pointer;
}
.side_drawer.isCollapse i {
  background: url("../assets/icon_arrow.png") 0px -60px no-repeat;
}

</style>