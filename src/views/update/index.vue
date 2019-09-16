<template>
  <div class="container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="echart-tab">
      <el-tab-pane label="数据维护" name="first">
        <el-card shadow="never">
          数据库修复主要用于修复缺失字段。
          <br />菜单修复主要用于修复系统菜单配置，如使用了菜单自定义请勿修复。
          <br />系统恢复默认，保留系统配置、物业和小区信息，将清空系统所有数据，请谨慎操作！
          <br />系统初始化，保留房产信息，清除所有交易记录，请谨慎操作!
          <br />数据清理，可以指定清除相关记录，请谨慎操作!
          <br />数据备份直接使用系统后台备份数据库。
        </el-card>
        <div class="update">
          <el-button size="small" icon="el-icon-setting">数据库修复</el-button>
          <el-button size="small" icon="el-icon-s-operation">菜单修复</el-button>
          <el-button size="small" icon="el-icon-refresh-left">系统恢复默认</el-button>
          <el-button size="small" icon="el-icon-refresh">系统初始化</el-button>
          <el-button size="small" icon="el-icon-delete">数据清理</el-button>
          <el-button size="small" icon="el-icon-coin">数据备份</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>

<style scoped>
.update {
  margin-top: 20px;
}
.el-button+.el-button{
  margin-left: 0
}
</style>