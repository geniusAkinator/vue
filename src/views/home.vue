<template>
  <div class="app">
    <el-container>
      <my-aside></my-aside>
      <el-container style="flex-direction:column">
        <my-header></my-header>
        <my-breadcrumb v-if="isShow"></my-breadcrumb>
        <el-main class="app-body">
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
import MyBreadcrumb from "@/components/breadcrumb";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      username: "",
      isCollapse: false,
      isUniqueOpen: true,
    };
  },
  computed: {
    isShow(){
      return this.$store.state.home.isBreadcumbShow
    }
  },
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
    console.log(to);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch("home/updateBreadcrumb", to.path);
    next();
  },
  components: {
    MyAside,
    MyHeader,
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