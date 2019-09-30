<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
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
        status: "1",
        orderNo: "",
        permission: false
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
          api.addRoleData(this.form).then(res => {
            console.log(res);
            if (res.code == 200) {
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
          });
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
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {},
    getPoint(e) {
      this.form.lat = e.lat;
      this.form.lng = e.lng;
    },
    initForm() {
      api.getMenuDetail({ menuId: this.form.menuId }).then(res => {
        if (res.code === 200) {
          let data = res.data;
          for (let key in data) {
            this.form[key] = data[key];
          }
        } else {
        }
      });
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