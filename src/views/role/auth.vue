<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="权限" prop="name">
        <el-tree :data="data" show-checkbox node-key="id" @check-change="handleCheckChange"></el-tree>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import api from "@/api/index";
export default {
  data() {
    return {
      form: {},
      rules: {},
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
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
    initForm() {
      api
        .getAllMenuData()
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let content = res.data;
            let data = [];
            content.map((item, i) => {
              console.log(item);
              let temp = {};
              temp.id = item.menu.menuId;
              temp.label = item.menu.name;
              temp.disabled = item.menu.state ? false : true;
              let cdata = [];
              item.children.map((citem, j) => {
                let ctemp = {};
                ctemp.id = citem.menu.menuId;
                ctemp.label = citem.menu.name;
                ctemp.disabled = citem.menu.state ? false : true;
                cdata.push(ctemp);
              });
              temp.children = cdata;
              data.push(temp);
            });
            this.data = data;
          } else {
          }
        })
        .catch(_ => {});
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initForm();
    });
  }
};
</script>

<style>
</style>