<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="权限" prop="name">
        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          show-checkbox
          @check-change="handleCheckChange"
        ></el-tree>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      rules: {},
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf"
      }
    };
  },
  methods: {
    handleSubmit() {},
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region1" }, { name: "region2" }]); //第一层
      }
      if (node.level > 1) return resolve([]); //无第三层

      let data = [ //第二层
        {
          name: "zone"
        },
        {
          name: "zone"
        }
      ];
      resolve(data);
    }
  }
};
</script>

<style>
</style>