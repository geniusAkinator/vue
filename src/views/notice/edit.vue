<template>
  <div class="container form">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="公告名称">
        <el-input v-model="form.noticeName" placeholder="请输入公告名称"></el-input>
      </el-form-item>
      <el-form-item label="公告类型">
        <el-select v-model="form.noticeType" placeholder="请选择内容类型">
          <el-option label="类型1" value="1"></el-option>
          <el-option label="类型2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公告内容">
        <quill-editor
          v-model="form.description"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      limited: 1,
      form: {},
      editorOption: config.editorOption,
      isShow: false,
      rules: {}
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
            .addNoticeData(this.form)
            .then(res => {
              if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
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
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {}
  },
  created() {},
  components: {}
};
</script>

<style>
.readonly > input {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
</style>