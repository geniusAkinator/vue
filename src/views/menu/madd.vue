<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="栏目标识">
        <el-input v-model="form.sys" class="readonly" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序">
        <el-input v-model="form.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch
          v-model="form.isShow"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="true"
          :inactive-value="false"
        ></el-switch>
      </el-form-item>
      <el-form-item label="操作权限">
        <el-checkbox
          v-for="(item,index) in form.permissions"
          :key="index"
          v-model="item.value"
          :label="item.label"
          border
        ></el-checkbox>
      </el-form-item>
      <el-form-item label="自定义权限"></el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import MyMapPicker from "@/components/mappicker";
import MyUpload from "@/components/upload";
export default {
  data() {
    return {
      form: {
        sys: "aaa",
        name: "",
        isShow: true,
        permissions: [
          {
            label: "新增",
            value: false
          },
          {
            label: "编辑",
            value: false
          },
          {
            label: "删除",
            value: false
          },
          {
            label: "查看",
            value: false
          },
          {
            label: "查询",
            value: false
          },
          {
            label: "导出",
            value: false
          },
          {
            label: "启用",
            value: false
          },
          {
            label: "审核",
            value: false
          }
        ]
      },
      rules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }]
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
    },
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {},
    getPoint(e) {
      this.form.lat = e.lat;
      this.form.lng = e.lng;
    },
    handleChange() {}
  },
  components: {
    MyMapPicker,
    MyUpload
  }
};
</script>

<style>
.readonly > input {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
.el-checkbox.is-bordered{
    margin-left: 0 !important;
    margin-bottom:5px
}
.el-checkbox{
  margin-right: 10px;
}
</style>