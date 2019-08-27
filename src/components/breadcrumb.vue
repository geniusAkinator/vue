<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    {{list}}
    <el-breadcrumb-item :to="{ path: '/' }" v-for="(item,index) in list" :key="index">{{item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  data() {
    return {};
  },
  props:{
    list:{}
  },
  methods: {
    go() {
      this.$router.push({ name: "HelloWorld" });
    }
  }
};
</script>
<style scpoed>
.el-breadcrumb {
  padding: 20px;
}
</style>