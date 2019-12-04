<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="分类名称">
        <el-input v-model="form.name" class="readonly" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="巡检标准" v-for="(item,index) in form.list" :key="index">
        <my-rule :rule="item" :index="index" @getDelIndex="getDelIndex" @getNewItem="getNewItem"></my-rule>
        <span class="help-block">单选、多选、下拉框请输入内容，多值请用“ | ”隔开，如：上 | 中 | 下，其它则为空或选择参考图片</span>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleAdd">添加标准</el-button>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import MyUpload from "@/components/upload/imgupload";
import MyRule from "@/components/form/rule";
export default {
  data() {
    return {
      form: {
        name: "",
        list: [
          {
            name: "",
            standard: "",
            type: "1",
            content: "",
            sort: ""
          }
        ]
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
    handleAdd() {
      let temp = {
        name: "",
        standard: "",
        type: "1",
        content: "",
        sort: ""
      };
      this.form.list.push(temp);
    },
    getDelIndex(e) {
      this.form.list.splice(e, 1);
    },
    getNewItem(e) {
      for (var st in e.item) {
        this.$set(this.form.list[e.index], st, e.item[st]);
      }
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