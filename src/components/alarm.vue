<template>
  <div class="my-rule">
    <div class="my-row">
      <label class="my-label no-right-radius no-right-border" for>名称</label>
      <el-input class="no-radius" v-model="nowRule.name" placeholder="请输入名称"></el-input>
      <label class="my-label no-radius no-both-border" for>上限</label>
      <el-input class="no-radius" v-model="nowRule.upperlimit" placeholder="请输入上限" type="number"></el-input>
      <label class="my-label no-radius no-both-border" for>下限</label>
      <el-input class="no-radius" v-model="nowRule.lowerlimit" placeholder="请输入上限" type="number"></el-input>
      <i class="el-icon-close btnDel" title="删除" @click="handleDel"></i>
    </div>
    <div class="my-row">
      <label class="my-label no-right-radius no-right-border" for>单位名称</label>
      <el-input class="no-radius" v-model="nowRule.unit" placeholder="请输入单位名称"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "1",
      nowRule: {
        name: "",
        upperlimit: "",
        lowerlimit: "",
        unit: ""
      }
    };
  },
  props: {
    index: "",
    rule: {}
  },
  watch: {
    nowRule: {
      handler: function(newValue, oldValue) {
        this.$emit("getNewItem", { item: newValue, index: this.index });
      },
      deep: true
    }
  },
  methods: {
    handleSelect() {},
    handleDel() {
      this.$emit("getDelIndex", this.index);
    }
  },
  mounted() {}
};
</script>
<style>
.my-row {
  display: flex;
}
.my-row .my-label {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  width: 1px;
  white-space: nowrap;
  height: 38px;
  text-align: center;
  flex: 1;
  min-width: 60px;
  max-width: 120px;
}
.no-radius input {
  border-radius: 0 !important;
}
.my-label.no-right-radius {
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.el-select.no-radius input,
.my-label.no-radius {
  border-radius: 0 !important;
}
.el-select.no-left-radius input,
.no-left-radius {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}
.no-both-border {
  border-left: 0 !important;
  border-right: 0 !important;
}
.no-left-border {
  border-left: 0 !important;
}
.no-right-border {
  border-right: 0 !important;
}
.btnDel {
  padding: 0 10px;
  height: 40px;
  display: block;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  background: #f56c6c;
  color: #fff;
}
</style>