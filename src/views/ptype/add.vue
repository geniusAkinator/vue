<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="所属工厂" prop="factory">
        <el-select v-model="form.factory" placeholder="请选择">
          <el-option label="工厂1" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入类型名称"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-input class="readonly" v-model="form.pic" :readonly="true"></el-input>
        <my-upload :limited="limited"></my-upload>
        <span class="help-block"></span>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">禁用</el-radio>
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
import MyUpload from "@/components/imgupload";
export default {
  data() {
    return {
      limited: 1,
      form: {
        factory: "",
        main: "",
        name: "",
        status: 0,
        pic: ""
      },
      isShow: false,
      rules: {
        factory: [
          { required: true, message: "请选择所属工厂", trigger: "change" }
        ],
        name: [{ required: true, message: "请选择类型名称", trigger: "blur" }]
      }
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
    }
  },
  components: {
    MyUpload
  }
};
</script>

 <style>
</style>