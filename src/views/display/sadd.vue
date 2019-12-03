<template>
  <div class="container">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="系统名称" prop="name">
        <el-input v-model="form.name" placeholder="系统名称"></el-input>
      </el-form-item>
      <el-form-item label="系统描述">
        <el-input v-model="form.description" type="textarea" placeholder="系统描述"></el-input>
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>
<script>
import api from "@/api/index";
export default {
  data() {
    return {
      form: {
        name: "",
        description: ""
      },
      rules: {
        name: [{ required: true, message: "请输入系统名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        //表单验证
        if (valid) {
          //通过
          //ajax提交
          api
            .addSensorSysData(this.form)
            .then(res => {
              if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
                //添加成功
                this.$message({
                  showClose: true,
                  message: "添加成功",
                  type: "success"
                });
                this.$parent.init();
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
    }
  }
};
</script>

<style>
.container {
  width: calc(100% - 40px);
}
</style>