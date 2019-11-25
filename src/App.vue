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
  overflow: hidden;
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
  border-radius: 4px;
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
  padding-bottom: 10px;
}
.el-card__header .tips {
  padding: 18px 0;
}
.tips-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  line-height: 19px;
}
.tips-item:last-child {
  margin-right: 0;
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
  bottom: -9999px;
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
  border: 1px solid #dcdfe6;
  cursor: pointer;
  -webkit-transition: 0.5s all;
  transition: 0.5s all;
  background: #ccc;
  color: #fff;
}
.table-tool .table-tool-others .el-inline:hover {
  background: #909399;
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
  z-index: 99;
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
.container.form .el-form {
  padding-bottom: 83px;
}
.el-loading-spinner i {
  font-size: 30px;
}
.el-loading .loading {
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
.el-loading .loading::after {
  top: auto;
  bottom: 0px;
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.el-loading .el-loading-text {
  color: #fff;
  margin-top: 10px;
  font-size: 12px;
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
.el-tabs__item.is-active {
  background: #f8f8f8;
}
.quill-editor {
  line-height: initial;
  position: relative;
}
.ql-snow .ql-picker-label {
  line-height: 22px;
}
.ql-tooltip.ql-editing.ql-flip {
  right: 5px !important;
  left: initial !important;
  top: 12px !important;
}

@keyframes fadein {
  0% {
    opacity: 0;
    transform: scale(0.5) translate(-85%, -85%);
  }

  to {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
}
.toggleMap {
  position: relative;
  width: 38px;
  height: 38px;
  padding: 0;
  line-height: 38px;
  margin-right: 10px;
  text-align: center;
  color: #333;
  border: 1px solid #ccc;
  cursor: pointer;
  -webkit-transition: 0.5s all;
  transition: 0.5s all;
  font-size: 16px;
  margin-left: 20px;
  border-radius: 4px;
}
.toggleMap.active {
  color: #fff;
  background: #409eff;
  border: 1px solid #409eff;
}
.el-row + .map-picker {
  margin-top: 20px;
}
.form-map-picker .el-col:nth-child(2) {
  margin-left: 20px;
}
.noSelect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.form-map-picker input[readonly="readonly"] {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}

.el-tabs .el-tabs__nav-prev {
  border-right: 1px solid #e6e6e6;
  background: #fff;
  z-index: 10;
}
.el-tabs .el-tabs__nav-next {
  border-left: 1px solid #e6e6e6;
  background: #fff;
  z-index: 10;
}
.el-tabs .el-tabs__nav-wrap.is-scrollable.is-top .el-tabs__nav-scroll {
  margin-left: 20px !important;
  margin-right: 20px !important;
}
.el-tabs .el-tabs__nav-next,
.el-tabs .el-tabs__nav-prev {
  width: 40px;
  display: block;
  font-size: 18px;
  text-align: center;
}
.help-block {
  color: #999;
  margin-top: 0;
  margin-bottom: 0;
  display: block;
}
.el-aside::-webkit-scrollbar {
  width: 0 !important;
}
.el-aside {
  -ms-overflow-style: none;
  height: 100%;
}
.el-aside {
  overflow: -moz-scrollbars-none;
  position: relative;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow {
  height: 200px;
}
.pointer {
  cursor: pointer;
}
.el-header.app-header .el-menu-item {
  color: rgb(186, 198, 213) !important;
}
.el-header.app-header .el-menu-item:hover {
  background: #314158 !important;
  color: rgb(186, 198, 213) !important;
}
.el-menu--horizontal > .el-menu-item {
  height: 58px;
  border: 0 !important;
}
.el-input + .myUpload {
  margin-top: 10px;
}
.el-form-item.is-error.is-required .el-input > input {
  border-color: #ff5722;
  background: #ffe6dd;
}
.map-picker .el-autocomplete input {
  border: 1px solid #dcdfe6 !important;
  background-color: #fff !important;
}
input:focus,
textarea:focus {
  border-color: #1e9fff;
  background: #e8f0f8;
}

input:focus + .el-input__suffix {
  color: rgb(16, 16, 17) !important;
}
.el-input-group__prepend {
  background: #fff;
}
.el-menu-item-group__title {
  display: none !important;
}
.el-aside.app-side.app-side-left.app-side-collapsed .el-menu.el-menu--inline,
.el-aside.app-side.app-side-left.app-side-collapsed
  .el-submenu__icon-arrow.el-icon-arrow-right {
  display: none;
}
.el-menu--horizontal > .el-menu-item.is-active {
  background: #314158 !important;
}
.el-input + .el-transfer,
.el-select + .el-transfer {
  margin-top: 10px;
}
.el-submenu__title,
.el-menu-item,
.el-breadcrumb__item {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.calendar .el-calendar__header {
  position: absolute;
  top: 0;
  right: 0;
  padding: 13px 20px;
  border-bottom: 0;
}
.el-calendar__title {
  display: none;
}
.el-card {
  position: relative;
}
.header_right {
  position: absolute;
  right: 20px;
  top: 0;
}
.no-border-radius input {
  border-radius: 0;
}
.el-alert + .table-tool {
  margin-top: 20px;
}
.table-tool {
  z-index: 2001 !important;
}
.vl-notify-content {
  z-index: 2002 !important;
}
.vl-notify {
  z-index: 2003 !important;
}
.v-modal {
  z-index: 2002 !important;
}
.el-message-box__wrapper {
  z-index: 2003 !important;
}
.readonly > input {
  cursor: not-allowed;
}
.el-progress-bar {
  padding-right: 25px;
  margin-right: -30px;
}
.verity .el-form-item__content {
  display: flex;
}
.verity img {
  cursor: pointer;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.verity input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.el-table--border th,
.el-table__fixed-right-patch {
  border-bottom: 1px solid #ebeef5 !important;
}
.el-tree-node__label {
  margin-left: 10px;
}
.el-select-dropdown.el-popper {
  z-index: 9999 !important;
}

.my-aside {
  z-index: 1000;
}

.resolution {
  border-radius: 5px;
  padding: 20px;
  font-size: 14px;
  margin-top: 20px;
}
.solve {
  background: #ebeef5;
  padding: 20px;
}
.el-menu-item-group ul li {
  background: rgb(39, 52, 70) !important;
}
.el-submenu .el-menu-item:hover {
  color: #fff !important;
}
.el-submenu__title:hover {
  color: #fff !important;
  background-color: rgb(49, 65, 88) !important;
}
.box-card .el-carousel .el-carousel__indicators {
  position: absolute;
  top: 0;
  right: 0;
  left: auto;
  bottom: auto;
  padding: 13px 20px;
  border-bottom: 0;
}
.box-card .el-carousel {
  position: initial;
}
.box-card .el-carousel .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: block;
}
.box-card .el-carousel .el-carousel__button.is-active {
  background: #999;
}
.box-card.no-padding .el-card__body{
  padding: 0
}
</style>