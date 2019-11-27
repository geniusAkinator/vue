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
import { Loading } from "element-ui";
export default {
  data() {
    return {
      form: {
        name: "",
        description: "",
        systemId: this.$parent.eid
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
          console.log(this.form);
          api
            .updateSensorSysData(this.form)
            .then(res => {
              if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
                //编辑成功
                this.$message({
                  showClose: true,
                  message: "编辑成功",
                  type: "success"
                });
                this.$parent.init();
                this.closeDialog();
              } else {
                //编辑失败
                this.$message({
                  showClose: true,
                  message: "编辑失败",
                  type: "warning"
                });
              }
            })
            .catch(_ => {});
        } else {
          console.log("error submit!!");
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
      let options = {
        target: document.querySelector(`#${this.$parent.index}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      let _this = this;
      console.log(this.form.systemId);
      api
        .getSensorSysDetail({ id: this.form.systemId })
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            for (let key in _data) {
              this.form[key] = _data[key];
            }
          }
        })
        .catch(_ => {});
      setTimeout(() => {
        loadingInstance.close();
      }, 600);
    }
  },
  mounted() {
    this.initForm();
  }
};
</script>

<style>
.container {
  width: calc(100% - 40px);
}
</style>