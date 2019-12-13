<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="权限" prop="name">
        <el-tree
          :default-checked-keys="aList"
          :data="data"
          show-checkbox
          node-key="id"
          ref="tree"
          default-expand-all
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
import api from "@/api/index";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      form: {
        roleId: this.$parent.aid,
        ids: ""
      },
      rules: {},
      data: [],
      aList: []
    };
  },
  methods: {
    handleSubmit() {
      let ids = "";
      let cnode = this.$refs.tree.getCheckedNodes();
      cnode.map(item => {
        ids = ids + item.id + ",";
      });
      this.form.ids = ids.substr(0, ids.length - 1);
      console.log(this.form);
      api.updateRoleMenuData(this.form).then(res => {
        if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
          //编辑成功
          this.$message({
            showClose: true,
            message: "编辑成功",
            type: "success"
          });
          this.$parent.initTable();
          this.closeDialog();
        }
      });
    },
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    },
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
    },
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.index}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      let aList = [];
      api
        .getRoleMenuData({ roleId: this.form.roleId })
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let content = res.data;
            content.map((item, i) => {
              aList.push(item.menu.menuId);
            });
            console.log(content);
            this.aList = aList;
          }
        })
        .catch(_ => {});
      api
        .getAllMenuData()
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let content = res.data;
            let data = [];
            console.log(content);
            content.map((item, i) => {
              let temp = {};
              temp.id = item.menu.menuId;
              temp.label = item.menu.name;
              temp.disabled = item.menu.state ? false : true;
              let cdata = [];
              item.children.map((citem, j) => {
                // aList.map((aitem,k)=>{
                //   if(aitem)
                // })
                let ctemp = {};
                ctemp.id = citem.menu.menuId;
                ctemp.label = citem.menu.name;
                if (temp.disabled) {
                  ctemp.disabled = true;
                } else {
                  ctemp.disabled = citem.menu.state ? false : true;
                }
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
      setTimeout(() => {
        loadingInstance.close();
      }, 600);
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