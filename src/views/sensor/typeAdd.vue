<template>
  <div class="container form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属主体">
        <el-input v-model="form.main"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio label="0">启动</el-radio>
          <el-radio label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类型名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        main: "",
        status:"0",
        name:""
      }
    };
  },
  methods: {
    handleSubmit() {
      this.closeDialog();
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
</style>