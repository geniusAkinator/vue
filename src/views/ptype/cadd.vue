<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="分类名称">
        <el-input v-model="form.name" class="readonly"></el-input>
      </el-form-item>
      <el-form-item label="巡检标准">
        <my-rule></my-rule>
      </el-form-item>
      <el-form-item>
        <el-button type="success">添加标准</el-button>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import MyUpload from "@/components/upload";
import MyRule from "@/components/rule";
export default {
  data() {
    return {
      form: {
        name: ""
      },
      isShow: false,
      rules: {}
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.closeDialog();
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
    getPoint(e) {
      console.log(e);
    }
  },
  components: {
    MyUpload,
    MyRule
  }
};
</script>

 <style>
.readonly > input {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
</style>