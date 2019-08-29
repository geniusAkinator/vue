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
    <el-dropdown class="tab-more" :hide-on-click="false">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>刷新当前页</el-dropdown-item>
        <el-dropdown-item>关闭当前页</el-dropdown-item>
        <el-dropdown-item>关闭非当前</el-dropdown-item>
        <el-dropdown-item>关闭非全部</el-dropdown-item>
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
  computed: {
    // nowTabIndex() {
    //   return this.$store.state.home.tabIndex;
    // }
  },
  watch: {
    currentIndex: function(newVal, oldVal) {
      //监听props中的属性
      this.nowTabIndex = newVal;
    }
  },
  methods: {
    removeTab(targetName) {
      // console.log(targetName);
      // let tabs = this.tabList;
      // let activeName = this.nowTabIndex;
      // if (activeName === targetName) {
      //   tabs.forEach((tab, index) => {
      //     if (tab.name === targetName) {
      //       let nextTab = tabs[index + 1] || tabs[index - 1];
      //       if (nextTab) {
      //         activeName = nextTab.name;
      //       }
      //     }
      //   });
      // }
      // this.nowTabIndex = activeName;
      // this.tabList = tabs.filter(tab => tab.name !== targetName);
      this.$store.dispatch("home/removeTab", targetName);
    },
    clickTab(tab, event) {
      this.$store.dispatch("home/updateIndex", this.nowTabIndex);
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
.el-tabs__item{
  outline: none
}

</style>