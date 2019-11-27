<template>
  <div class="app">
    <el-container>
      <my-aside :isCollapse="isCollapse" @parentCollapseChange="collapseChange"></my-aside>
      <el-container style="flex-direction:column">
        <my-header></my-header>
        <my-tabs :tabList="tabList" :currentIndex="currentIndex"></my-tabs>
        <my-breadcrumb v-if="isShow" :list="breadcrumbList"></my-breadcrumb>
        <el-main class="app-body">
          <transition name="myfade" mode="out-in">
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
import utils from "@/utils/utils";
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
    },
    autoChange() {
      let cwidth = document.body.clientWidth;
      if (cwidth < 1024) {
        this.isCollapse = true;
      } else {
        if (this.isCollapse) this.isCollapse = false;
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch("home/initAside");
  },
  mounted: function() {
    let _this = this;
    let user = sessionStorage.getItem("userInfo");
    if (user) {
      _this.username = user;
    }
    _this.autoChange();
    _this.$nextTick(() => {
      window.addEventListener("resize", utils.throttle(_this.autoChange, 100));
    });
    this.$store.dispatch("geo/initGeo");
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
.myfade-enter-active,
.myfade-leave-active {
  transition: all 0.3s ease-in-out;
}
.myfade-enter, .myfade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* transform: translateY(80px); */
}
</style>