<template>
  <div class="container form">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户代号">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.cpwd"></el-input>
      </el-form-item>
      <el-form-item label="所属用户组">
        <el-select v-model="form.group" placeholder="请选择所属用户组">
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属角色">
        <el-select v-model="form.role" placeholder="请选择所属角色">
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属工厂">
        <el-select v-model="form.factory" placeholder="请选择所属工厂">
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属主体">
        <el-select v-model="form.main" placeholder="请选择所属主体">
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="form.status"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remarks" type="textarea"></el-input>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import MyMapPicker from "@/components/mappicker";
export default {
  data() {
    return {
      form: {}
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
    },
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {},
    getPoint(e) {
      this.form.lat = e.lat;
      this.form.lng = e.lng;
    }
  },
  components: {
    MyMapPicker
  }
};
</script>

<style>
</style>