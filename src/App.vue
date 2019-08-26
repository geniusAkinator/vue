<template>
  <div class="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
html,
body {
  -webkit-text-size-adjust: none;
}
body {
  margin: 0px;
  padding: 0px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  height: 100%;
}
.app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.el-tabs__header {
  margin: 0;
}
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-top: 0;
  border-radius: 0;
}
.el-tabs--card > .el-tabs__header .el-tabs__item .el-icon-close:hover {
  background: #ff0000;
}
.el-tabs--card > .el-tabs__header .el-tabs__item .el-icon-close {
  line-height: 14px;
}
.el-breadcrumb {
  background-color: #f8f8f8;
  border-bottom: 1px solid #e7e7e7;
}
.el-tabs__nav-wrap {
  margin-bottom: 0;
}
.table-tool {
  position: relative;
  z-index: 10;
  padding: 10px 15px;
  border-top: 1px solid #e7e7e7;
  background-color: #f8f8f8;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
}
.container {
  margin: 10px 0;
}
.pagination {
  border-bottom: 1px solid #e7e7e7;
  position: relative;
  z-index: 10;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  padding: 5px 15px;
}
.el-pager li.active {
  color: #fff;
  background: #409eff;
  border-radius: 4px;
}
.el-pagination__total {
  margin-left: 10px;
}
.circle {
  width: 14px;
  height: 14px;
  display: block;
  border-radius: 50%;
  margin-right: 5px;
}
.circle.success {
  background: #67c23a;
}
.circle.warning {
  background: #e6a23c;
}
.circle.danger {
  background: #f56c6c;
}
.circle.info {
  background: #909399;
}
.tips {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
  padding-top: 0;
}
.tips-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.el-calendar__body {
  padding: 0;
}
.el-calendar-table .el-calendar-day {
  height: auto;
}
.el-main{
  position: relative;
}
.vl-notify,.vl-notify-mask{
  position: absolute
}
.vl-notify-mask{
  background-color: #000;
  opacity: 0.2;
}
</style>