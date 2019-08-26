<template>
  <div class="app">
    <el-container>
      <my-aside></my-aside>
      <el-container style="flex-direction:column">
        <my-header></my-header>
        <el-main class="app-body">
          <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb> -->
          <!-- <router-link :to="{ name: 'Test' }">Home</router-link> -->
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyAside from "@/components/Aside";
import MyHeader from "@/components/Header";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      username: "",
      isCollapse: false,
      isUniqueOpen: true
    };
  },
  computed: {},
  watch: {},
  methods: {
    loginOut() {}
  },
  mounted: function() {
    let user = sessionStorage.getItem("user");
    if (user) {
      this.username = user;
    }
    // this.$message({ message: "欢迎回来", type: "success" });
  },

  beforeRouteLeave(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  components: {
    MyAside,
    MyHeader
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.app {
  height: 100%;
}
.el-breadcrumb {
  padding: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>