<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.state">
          <el-radio :label="0">启动</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限级别">
        <el-radio-group v-model="form.level">
          <el-radio label="0">adminstator（超级管理员）</el-radio>
          <el-radio label="1">admin（代理商）</el-radio>
          <el-radio label="2">admin（工厂）</el-radio>
          <el-radio label="3">user（用户）</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import MyMapPicker from "@/components/picker/mappicker";
import api from "@/api/index";
export default {
  data() {
    return {
      form: {
        name: "",
        state: 1,
        roleId: this.$parent.eid,
        level: "0"
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          api
            .updateRoleData(this.form)
            .then(res => {
              if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
                //编辑成功
                this.$message({
                  showClose: true,
                  message: "编辑成功",
                  type: "success"
                });
                this.$parent.initTable();
                this.closeDialog();
              } else {
                this.$message({
                  showClose: true,
                  message: "编辑失败",
                  type: "warning"
                });
              }
            })
            .catch(_ => {});
        } else {
          return false;
        }
      });
    },
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    },
    initForm() {
      api
        .getAllMenuData()
        .then(res => {})
        .catch(_ => {});
      api
        .getRoleDetail({ roleId: this.form.roleId })
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let data = res.data;
            for (let key in data) {
              this.form[key] = data[key];
            }
          } else {
          }
        })
        .catch(_ => {});
    }
  },
  mounted() {
    this.initForm();
  },
  components: {
    MyMapPicker
  }
};
</script>

<style>
.permission + .permission {
  margin-top: 20px;
}
.permission .clearfix {
  line-height: 20px;
}
.permission .el-card__header {
  border-bottom: 1px solid #e6e6e6;
  background: #f2f2f2;
}
.permission {
  border: 1px solid #e6e6e6;
}
</style>