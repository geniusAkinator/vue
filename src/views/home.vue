<template>
  <div class="app">
    <el-container>
      <my-aside :isCollapse="isCollapse"></my-aside>
      <el-container style="flex-direction:column">
        <my-header :isCollapse.sync="isCollapse" @parentCollapseChange="collapseChange"></my-header>
        <my-tabs :tabList="tabList" :currentIndex="currentIndex"></my-tabs>
        <my-breadcrumb v-if="isShow" :list="breadcrumbList"></my-breadcrumb>
        <el-main class="app-body">
          <!-- <router-link :to="{ name: 'Test' }">Home</router-link> -->
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view v-if="isRouterAlive"></router-view>
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
import MyTabs from "@/components/Tabs";
import MyBreadcrumb from "@/components/breadcrumb";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      username: "",
      isCollapse: false,
      isUniqueOpen: true,
      isRouterAlive: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  computed: {
    isShow() {
      return this.$store.state.home.isBreadcrumbShow;
    },
    breadcrumbList() {
      return this.$store.state.home.breadcrumbList;
    },
    tabList() {
      return this.$store.state.home.tabList;
    },
    currentIndex() {
      return this.$store.state.home.tabIndex;
    }
  },
  watch: {
    $route: function(newVal, oldVal) {
      this.$store.dispatch("home/toggleBreadcrumb", newVal.path);
      this.$store.dispatch("home/updateBreadcrumb", { newVal, oldVal });
      this.$store.dispatch("home/addTab", { newVal, oldVal });
      if (newVal.path.toLowerCase() != oldVal.path.toLowerCase()) {
        this.$layer.closeAll();
      }
      this.$store.dispatch("home/activateTab", newVal.path);
    },
    "$store.state.home.tabIndex": function(newVal, oldVal) {
      let list = this.tabList;
      this.$router.push(list[newVal - 1].path, () => {});
    },
    "$store.state.home.tabList": function(newVal, oldVal) {
      let list = this.tabList;
      this.$router.push(list[this.currentIndex - 1].path, () => {});
      // this.$router.push(this.currentIndex,()=>{})
    }
  },
  methods: {
    loginOut() {},
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    collapseChange(val) {
      this.isCollapse = val;
    }
  },
  mounted: function() {
    let user = sessionStorage.getItem("user");
    if (user) {
      this.username = user;
    }
    // this.$message({ message: "欢迎回来", type: "success" });
  },
  components: {
    MyAside,
    MyHeader,
    MyTabs,
    MyBreadcrumb
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