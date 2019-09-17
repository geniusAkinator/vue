<!-- 自定义导航栏 -->
<template>
  <div class="my-tab" ref="myTab">
    <dl
      class="rightMenu"
      v-clickoutside="hideRightMenu"
      v-show="isRightMenu"
      ref="rMenu"
      :style="{top:this.nowY,left:this.nowX}"
    >
      <dd @click="rightMenuCloseNowTab">关闭当前</dd>
      <dd @click="rightMenuCloseAllTab">关闭全部</dd>
    </dl>
    <el-tabs v-model="nowTabIndex" type="card" @tab-remove="removeTab" @tab-click="clickTab">
      <el-tab-pane
        v-for="(item,index) in tabList"
        :key="item.name"
        :label="item.title"
        :closable="item.close"
        :name="item.name"
        class="tab-item"
      >
        <span slot="label">
          <i class="el-icon-data-analysis" v-if="index==0"></i>
          {{item.title}}
        </span>
      </el-tab-pane>
    </el-tabs>
    <el-dropdown class="tab-more" :hide-on-click="false" @command="handleClick">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="reload">刷新当前页</el-dropdown-item>
        <el-dropdown-item command="closeCurrent">关闭当前页</el-dropdown-item>
        <el-dropdown-item command="closeNonCurrent">关闭非当前</el-dropdown-item>
        <el-dropdown-item command="closeAll">关闭全部页</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import utils from "@/utils/utils";
export default {
  data() {
    return {
      nowTabIndex: this.$store.state.home.tabIndex,
      isRightMenu: false,
      nowX: 0,
      nowY: 0,
      rightChooseIndex: 0
    };
  },
  props: {
    tabList: {},
    currentIndex: ""
  },
  computed: {},
  watch: {
    currentIndex: function(newVal, oldVal) {
      this.nowTabIndex = newVal;
    }
  },

  methods: {
    removeTab(targetName) {
      this.$store.dispatch("home/removeTab", targetName);
    },
    clickTab(tab, event) {
      this.$store.dispatch("home/updateIndex", this.nowTabIndex);
    },
    handleClick(command) {
      if (command == "reload") {
        this.reload();
      } else if (command == "closeCurrent") {
        this.$store.dispatch("home/removeTab", this.nowTabIndex);
      } else if (command == "closeNonCurrent") {
        this.$store.dispatch("home/closeNonCurrentTabs", this.nowTabIndex);
      } else if (command == "closeAll") {
        this.$store.dispatch("home/closeAllTabs");
      }
    },
    rightMenu() {
      let tab = this.$refs.myTab;
      let tabList = document.querySelector(".el-tabs__nav.is-top");
      tab.addEventListener("contextmenu", e => {
        e.preventDefault();
        if (tabList.contains(e.target)) {
          let nNode = utils.closest(e.target, ".el-tabs__item.is-top");
          if (nNode.getAttribute("id") != "tab-1") {
            let left = tab.getBoundingClientRect().left;
            let top = tab.getBoundingClientRect().top;
            let x = e.clientX;
            let y = e.clientY;
            this.nowX = x - left + "px";
            this.nowY = y - top + "px";
            let aNode = document.querySelectorAll(".el-tabs__item");
            aNode.forEach((currentValue, index, arr) => {
              if (currentValue == nNode) {
                this.rightChooseIndex = index + 1;
              }
            });
            this.showRightMenu();
          } else {
            this.hideRightMenu();
          }
        }
      });
    },
    showRightMenu() {
      this.isRightMenu = true;
    },
    hideRightMenu() {
      this.isRightMenu = false;
    },
    rightMenuCloseNowTab() {
      this.$store.dispatch("home/removeTab", this.rightChooseIndex);
      this.hideRightMenu();
    },
    rightMenuCloseAllTab() {
      this.$store.dispatch("home/closeAllTabs");
      this.hideRightMenu();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.rightMenu();
    });
  },
  inject: ["reload"]
};
</script>

<style scoped>
.my-tab {
  position: relative;
}
.el-tabs__header {
  margin: 0;
}

.tab-more {
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  border-left: 1px solid #e6e6e6;
  z-index: 10;
  background: #ffffff;
}

.tab-more span {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tab-more i {
  margin-left: 0;
}
.el-tabs.el-tabs--card.el-tabs--top {
  padding-right: 40px;
}
.el-tabs__item {
  outline: none;
}
.el-tabs {
  position: relative;
}
.rightMenu {
  position: absolute;
  left: 0;
  top: 0;
  padding: 0;
  margin: 0;
  background: #ffffff;
  z-index: 99;
  width: 120px;
  min-width: 120px;
  display: block;
  color: #333 !important;
  line-height: 36px;
  padding: 5px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border: 1px solid #d2d2d2;
  background-color: #fff;
  z-index: 100;
  border-radius: 2px;
  white-space: nowrap;
}
.rightMenu dd {
  background: #ffffff;
  display: block;
  color: #333 !important;
  font-size: 14px !important;
  text-align: center;
  cursor: pointer;
  padding: 0;
  margin: 0;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.rightMenu dd:hover {
  background: #efefef;
}
.el-tabs__item span {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.el-tabs__item.is-top.is-active.is-closable {
  outline-color: initial !important;
}
</style>