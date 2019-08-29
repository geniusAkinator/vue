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
.my-tab .el-tabs__header {
  margin: 0;
}
.my-tab .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-top: 0;
  border-radius: 0;
}
.my-tab .el-tabs--card > .el-tabs__header .el-tabs__item .el-icon-close:hover {
  background: #ff0000;
}
.my-tab .el-tabs--card > .el-tabs__header .el-tabs__item .el-icon-close {
  line-height: 14px;
}
.el-breadcrumb {
  background-color: #f8f8f8;
  border-bottom: 1px solid #e7e7e7;
}
.my-tab .el-tabs__nav-wrap {
  margin-bottom: 0;
}
.table-tool {
  position: relative;
  z-index: 15;
  padding: 10px 15px;
  border-top: 1px solid #e7e7e7;
  background-color: #f8f8f8;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
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
.tips-item:last-child{
  margin-right: 0
}
.el-calendar__body {
  padding: 0;
}
.el-calendar-table .el-calendar-day {
  height: auto;
}
.el-main {
  position: relative;
  overflow: hidden;
  overflow-y: scroll;
  padding: 0;
}
.vl-notify,
.vl-notify-mask {
  position: absolute;
}
.vl-notify-mask {
  background-color: #000;
  opacity: 0.2;
  right: 0;
  height: auto;
  width: auto;
  left: 0;
  bottom: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.container {
  padding: 20px;
}

.el-card {
  overflow: unset;
}
.table-tool {
  display: flex;
}
.table-tool .el-button-group + .query {
  margin-left: 10px;
}
.table-tool .table-tool-others {
  margin-left: auto;
}
.table-tool .table-tool-others .el-inline {
  position: relative;
  width: 26px;
  height: 26px;
  padding: 2px;
  line-height: 26px;
  margin-right: 10px;
  text-align: center;
  color: #333;
  border: 1px solid #ccc;
  cursor: pointer;
  -webkit-transition: 0.5s all;
  transition: 0.5s all;
}
.add-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f8f8f8;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #eee;
}
.add-footer .el-button + .el-button {
  margin-left: 10px;
}
.el-button-group .el-dropdown + .el-dropdown button {
  margin-left: -10px;
}
.container.form {
  width: 100%;
}
.container.form .el-form{
  padding-bottom: 53px;
}
.el-loading-spinner i {
  font-size: 30px;
}
.el-loading .loading{
  width: 40px;
  height: 40px;
  position: relative;
  text-align: center;
  -webkit-animation: rotate 2s infinite linear;
  -moz-animation: rotate 2s infinite linear;
  -o-animation: rotate 2s infinite linear;
  animation: rotate 2s infinite linear;
  display: block;
  margin: auto;
}
.el-loading .loading::after,
.el-loading .loading::before {
  content: "";
  display: block;
  width: 50%;
  height: 50%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #ffffff;
  border-radius: 100%;
  -webkit-animation: bounce 2s infinite ease-in-out;
  -moz-animation: bounce 2s infinite ease-in-out;
  -o-animation: bounce 2s infinite ease-in-out;
  animation: bounce 2s infinite ease-in-out;
}
.el-loading .loading::after{
  top: auto;
  bottom: 0px;
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
.el-loading .el-loading-text{
  color: #fff;
  margin-top: 10px;
  font-size: 12px
}
@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes rotate {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-o-keyframes rotate {
  100% {
    -o-transform: rotate(360deg);
  }
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}
@-moz-keyframes bounce {
  0%,
  100% {
    -moz-transform: scale(0);
  }
  50% {
    -moz-transform: scale(1);
  }
}
@-o-keyframes bounce {
  0%,
  100% {
    -o-transform: scale(0);
  }
  50% {
    -o-transform: scale(1);
  }
}
@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
.el-tabs__item.is-active{
  background: #f8f8f8
}
.quill-editor{
  line-height: initial;
  position: relative;
}
.ql-snow .ql-picker-label{
  line-height:22px;
}
.ql-tooltip.ql-editing.ql-flip{
  right: 5px !important;
  left: initial !important;
  top: 12px !important;
}
.echart-tab .el-tabs__header.is-top{

}

</style>