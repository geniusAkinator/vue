<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="所属团队">
        <el-input v-model="this.$parent.dName" class="readonly" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard">
        <el-input v-model="form.idCard"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="职务" prop="duty">
        <el-input v-model="form.duty"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.sex" :label="0">男</el-radio>
        <el-radio v-model="form.sex" :label="1">女</el-radio>
      </el-form-item>
      <el-form-item label="入职时间" prop="joinTime">
        <el-date-picker
          v-model="form.joinTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="form.state" :label="0">在职</el-radio>
        <el-radio v-model="form.state" :label="1">离职</el-radio>
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
export default {
  data() {
    let validateIdCard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入身份证号"));
      } else {
        if (!isIdCard(value)) {
          callback(new Error("身份证号格式不正确"));
        }
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else {
        if (!isPhone(value)) {
          callback(new Error("手机号码格式不正确"));
        }
        callback();
      }
    };
    return {
      Listform: {
        //表格请求params
        pageNum: 1,
        pageSize: 0,
        factoryName: ""
      },
      doption: [],
      form: {
        name: "",
        department: {
          departmentId: this.$parent.dId
        },
        idCard: "",
        sex: 0,
        state: 0,
        remark: "",
        phone: "",
        duty: "",
        joinTime: ""
      },
      rules: {
        name: [{ required: true, message: "请输入人员名称", trigger: "blur" }],
        idCard: [
          { required: true, validator: validateIdCard, trigger: "blur" }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        duty: [{ required: true, message: "请输入职务", trigger: "blur" }],
        joinTime: [
          { required: true, message: "请选择入职时间", trigger: "change" }
        ]
      }
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
            .addEmployeeData(this.form)
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
    handleChange() {},
    initForm() {
      api
        .getDepartmentData(this.Listform)
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            this.doption = _data.content;
            console.log(this.doption);
          }
        })
        .catch(_ => {});
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