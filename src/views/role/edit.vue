<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.state">
          <el-radio label="0">启动</el-radio>
          <el-radio label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.orderNo" type="number"></el-input>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import MyMapPicker from "@/components/mappicker";
import api from "@/api/index";
export default {
  data() {
    return {
      form: {
        name: "",
        state: "1",
        orderNo: "",
        roleId: this.$parent.eid
      },
      rules: {
        name: [{ required: true, message: "请输入用户名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
          api
            .updateRoleData(this.form)
            .then(res => {
              if (res.code == 200) {
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
      console.log("dd", this.form.roleId);
      api
        .getRoleDetail({ roleId: this.form.roleId })
        .then(res => {
          if (res.code === 200) {
            let data = res.data;
            console.log(data);
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