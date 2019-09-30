<!-- 面包屑导航栏 -->
<template>
  <div class="my-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item,index) in list"
        :key="index"
      >{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="back" @click="handleBack" v-if="list.length>2">
      <i class="el-icon-close"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    list: {}
  },
  methods: {
    go() {
      this.$router.push({ name: "HelloWorld" });
    },
    handleBack() {
      history.back();
    }
  }
};
</script>
<style scpoed>
.el-breadcrumb {
  padding:15px 20px;
}
.back {
  position: absolute;
  display: block;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  right: 0;
  top: 9px;
  cursor: pointer;
}
.back i {
  font-size: 26px;
}
.my-breadcrumb {
  position: relative;
}
</style>