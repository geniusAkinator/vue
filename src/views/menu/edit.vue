<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="栏目标识" prop="sys">
        <el-input v-model="form.sys"></el-input>
      </el-form-item>
      <el-form-item label="栏目名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序">
        <el-input v-model="form.sort" type="number"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="form.icon">
          <template slot="append">
            <span class="pointer" @click="handleSelect">选择图标</span>
          </template>
        </el-input>
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
import MyIcon from "@/views/icon/index";
export default {
  data() {
    return {
      form: {
        sys: "",
        name: "",
        sort: "",
        isShow: true,
        index:"",
        icon:""
      },
      rules: {
        sys: [{ required: true, message: "请输入栏目标识", trigger: "blur" }],
        name: [{ required: true, message: "请输入栏目名称", trigger: "blur" }]
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
    handleChange() {},
    handleSelect() {
      let idx = this.$layer.iframe({
        content: {
          content: MyIcon, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "400px"],
        title: "拾取图标",
        target: ".el-main"
      });
      this.index = idx;
    }
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
</style>