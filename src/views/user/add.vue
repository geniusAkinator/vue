<template>
  <div class="container form">
      用户代号
      用户名称
      用户密码
      确认密码
      所属用户组 select
      所属角色 select
      所属工厂
      所属主体
      状态
      姓名
      手机号
      备注
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        
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