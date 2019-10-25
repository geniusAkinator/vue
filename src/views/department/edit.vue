<template>
  <div class="container form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属工厂">
        <el-select v-model="form.factory.factoryId" disabled>
          <el-option
            v-for="(item,index) in foption"
            :key="index"
            :label="item.factoryName"
            :value="item.factoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门名称" prop="departmentName">
        <el-input v-model="form.departmentName"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="form.leader"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="座机号码">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea"></el-input>
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
import { Loading } from "element-ui";
export default {
  data() {
    return {
      Listform: {
        //表格请求params
        pageNum: 1,
        pageSize: 0,
        factoryName: ""
      },
      foption: [],
      form: {
        departmentId: this.$parent.eid,
        factory: {
          factoryId: ""
        },
        departmentName: "",
        tel: "",
        remark: "",
        phone: "",
        leader: ""
      },
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
            .updateDepartmentData(this.form)
            .then(res => {
              if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
                // 编辑成功
                this.$message({
                  showClose: true,
                  message: "编辑成功",
                  type: "success"
                });
                this.$parent.initTable();
                this.closeDialog();
              } else {
                // 编辑失败
                this.$message({
                  showClose: true,
                  message: "编辑失败",
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
    handleChange() {},
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.index}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      api
        .getFactoryData(this.Listform)
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            this.foption = _data.content;
          }
        })
        .catch(_ => {});
      //表单回显
      api
        .getDepartmentDetail({ id: this.form.departmentId })
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            let department = _data.department;
            this.form.leader = department.leader;
            this.form.factory.factoryId = department.factory.factoryId;
            this.form.remark = department.remark;
            this.form.tel = department.tel;
            this.form.phone = department.phone;
            this.form.departmentName = department.departmentName;
          }
        })
        .catch(_ => {});
      setTimeout(() => {
        loadingInstance.close();
      }, 600);
    }
  },
  created() {
    this.initForm();
  },
  mounted() {}
};
</script>

<style>
.readonly > input {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
</style>