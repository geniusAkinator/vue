<template>
  <div class="container form">
    权限
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio label="0">启动</el-radio>
          <el-radio label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remarks"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-card class="box-card permission" shadow="never">
          <div slot="header" class="clearfix">
            <el-checkbox v-model="form.permission">信息管理</el-checkbox>
          </div>
          <div class="text item">
            <div>
              <el-checkbox v-model="form.permission">工厂信息管理</el-checkbox>
              <el-checkbox v-model="form.permission">添加</el-checkbox>
              <el-checkbox v-model="form.permission">删除</el-checkbox>
              <el-checkbox v-model="form.permission">查询</el-checkbox>
              <el-checkbox v-model="form.permission">查询</el-checkbox>
              <el-checkbox v-model="form.permission">编辑</el-checkbox>
              <el-checkbox v-model="form.permission">导出</el-checkbox>
              <el-checkbox v-model="form.permission">打印</el-checkbox>
            </div>
            <div>
              <el-checkbox v-model="form.permission">传感器信息管理</el-checkbox>
              <el-checkbox v-model="form.permission">添加</el-checkbox>
              <el-checkbox v-model="form.permission">删除</el-checkbox>
              <el-checkbox v-model="form.permission">查询</el-checkbox>
              <el-checkbox v-model="form.permission">查询</el-checkbox>
              <el-checkbox v-model="form.permission">编辑</el-checkbox>
              <el-checkbox v-model="form.permission">导出</el-checkbox>
              <el-checkbox v-model="form.permission">打印</el-checkbox>
            </div>
          </div>
        </el-card>
        <el-card class="box-card permission" shadow="never">
          <div slot="header" class="clearfix">
            <el-checkbox v-model="form.permission">成员管理</el-checkbox>
          </div>
          <div class="text item">
            <div>
              <el-checkbox v-model="form.permission">成员管理</el-checkbox>
              <el-checkbox v-model="form.permission">删除</el-checkbox>
              <el-checkbox v-model="form.permission">查询</el-checkbox>
              <el-checkbox v-model="form.permission">查询</el-checkbox>
              <el-checkbox v-model="form.permission">导出</el-checkbox>
            </div>
            <div>
              <el-checkbox v-model="form.permission">绑定管理</el-checkbox>
              <el-checkbox v-model="form.permission">删除</el-checkbox>
              <el-checkbox v-model="form.permission">查询</el-checkbox>
              <el-checkbox v-model="form.permission">查询</el-checkbox>
              <el-checkbox v-model="form.permission">导出</el-checkbox>
            </div>
          </div>
        </el-card>
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
export default {
  data() {
    return {
      form: {
        name: "",
        status: "1",
        remarks: "",
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
    }
  },
  components: {
    MyMapPicker
  }
};
</script>

<style>
.permission+.permission{
  margin-top: 20px;
}
.permission .clearfix{
  line-height: 20px
}
.permission .el-card__header{
  border-bottom:1px solid #e6e6e6;
  background: #f2f2f2;
}
.permission{
  border:1px solid #e6e6e6
}
</style>