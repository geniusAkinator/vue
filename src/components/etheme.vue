<template>
  <div id="theme">
    <span>主题:</span>
    <el-popover
      placement="top-start"
      width="176"
      trigger="hover"
      v-for="(item,index) in list"
      :key="index"
      transition="fade-in-linear"
      :open-delay="600"
    >
      <div class="theme-popover">
        <span class="theme-name">{{item.name}}</span>
        <ul class="color-list">
          <li
            :title="color"
            class="color-item"
            :style="{background:color}"
            v-for="(color,idx) in item.color"
            :key="idx"
          ></li>
        </ul>
      </div>
      <div
        class="theme"
        slot="reference"
        :class="nowIndex == index?'current':''"
        @click="handleClick(index)"
      >
        <span
          class="theme-item"
          :style="{background:`linear-gradient(135deg,${item.color[0]} 0%, ${item.color[0]} 50%,${item.color[item.color.length-1]} 51%,${item.color[item.color.length-1]} 100%)`}"
        ></span>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: this.$store.state.theme.themeList
    };
  },
  computed: {
    nowIndex: function() {
      return this.$store.state.theme.themeIndex;
    }
  },
  methods: {
    handleClick(index) {
      this.$store.dispatch("theme/updateIndex", index);
    }
  },
  mounted() {
    let a = "";
    let arr = a.replace(/\s+/g, "").split("-");
    let temp = arr.map((value, index, array) => {
      return (value = "#" + value);
    });
  }
};
</script>

<style>
#theme {
  padding: 4px 10px;
  background: #fff;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #aaa;
  height: 42px;
  line-height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#theme > span {
  font-weight: bold;
  color: #666;
}
.theme.current {
  border: 1px solid #e43c59;
}
.theme {
  width: 30px;
  height: 30px;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
}
.theme span {
  display: block;
  width: 26px;
  height: 26px;
}
.color-list {
  list-style-type: none;
  padding: 0;
  margin-top: 25px;
}
.color-item {
  width: 26px;
  height: 26px;
  float: left;
  margin: 0 4px 4px 0;
}
.theme-name {
  font-weight: bold;
  display: block;
  background: #f7f7f7;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  padding: 5px 10px;
  border-bottom: 1px solid #aaa;
}
.color-item:nth-child(6n) {
  margin-right: 0;
}
</style>