<!-- 自定义导航栏 -->
<template>
  <div class="my-tab">
    <div class="tab-prev">
      <i class="el-icon-d-arrow-left"></i>
    </div>
    <el-tabs v-model="nowTabIndex" type="card" @tab-remove="removeTab" @tab-click="clickTab">
      <el-tab-pane
        v-for="(item,index) in tabList"
        :key="item.name"
        :label="item.title"
        :closable="item.close"
        :name="item.name"
      >
        <span slot="label">
          <i class="el-icon-data-analysis" v-if="index==0"></i>
          {{item.title}}
        </span>
      </el-tab-pane>
    </el-tabs>
    <div class="tab-next">
      <i class="el-icon-d-arrow-right"></i>
    </div>
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
export default {
  data() {
    return {
      nowTabIndex: this.$store.state.home.tabIndex
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
      } else if (command == "closeCurrent") {
        this.$store.dispatch("home/removeTab", this.nowTabIndex);
      } else if (command == "closeNonCurrent") {
        this.$store.dispatch("home/closeNonCurrentTabs", this.nowTabIndex);
      } else if (command == "closeAll") {
        this.$store.dispatch("home/closeAllTabs");
      }
    }
  }
};
</script>

<style scoped>
.el-tabs__header {
  margin: 0;
}
.tab-prev,
.tab-next,
.tab-more {
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
}
.tab-next,
.tab-more {
  border-left: 1px solid #e6e6e6;
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
.my-tab {
  display: flex;
}
.el-tabs.el-tabs--card.el-tabs--top {
  flex: 1;
}
.el-tabs__item {
  outline: none;
}
</style>