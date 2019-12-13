<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="栏目名称">
        <el-input v-model="this.$parent.pName" class="readonly" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="路径名称" prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="排序号">
        <el-input v-model="form.orderNo" type="number"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch
          v-model="form.state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <!-- <el-form-item label="操作权限">
        <el-checkbox v-model="form.creates" label="添加" border></el-checkbox>
        <el-checkbox v-model="form.edit" label="编辑" border></el-checkbox>
        <el-checkbox v-model="form.del" label="删除" border></el-checkbox>
        <el-checkbox v-model="form.view" label="浏览" border></el-checkbox>
        <el-checkbox v-model="form.query" label="查询" border></el-checkbox>
        <el-checkbox v-model="form.export" label="导出" border></el-checkbox>
        <el-checkbox v-model="form.enable" label="启用" border></el-checkbox>
        <el-checkbox v-model="form.audit" label="审核" border></el-checkbox>
      </el-form-item>-->
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
      form: {
        pId: this.$parent.pId,
        url: "",
        name: "",
        state: 1,
        orderNo: 0
        // creates: 0,
        // edit: 0,
        // del: 0,
        // view: 0,
        // query: 0,
        // export: 0,
        // enable: 0,
        // audit: 0
      },
      rules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        url: [{ required: true, message: "请输入路径名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        api
          .addMenuData(this.form)
          .then(res => {
            console.log(res);
            if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
              //添加成功
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.$parent.initTable();
              this.closeDialog();
            } else {
              //添加失败
              this.$message({
                showClose: true,
                message: "添加失败",
                type: "warning"
              });
            }
          })
          .catch(_ => {});
        console.log(this.form);
      });
    },
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    }
  }
};
</script>

<style>
.readonly > input {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
.el-checkbox.is-bordered {
  margin-left: 0 !important;
  margin-bottom: 5px;
}
.el-checkbox {
  margin-right: 10px;
}
.container.form {
  padding-bottom: 70px;
}
.others {
  margin-bottom: 10px;
}
</style>