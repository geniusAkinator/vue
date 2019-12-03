<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="账号名称" prop="account">
        <el-input v-model="form.account">
          <i slot="suffix" class="el-input__icon el-icon-loading" v-if="loading"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="账号密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="cpwd">
        <el-input v-model="form.cpwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="所属角色" prop="roleId">
        <el-select v-model="form.roleId" placeholder="请选择所属角色">
          <el-option
            v-for="item in roptions"
            :key="item.roleId"
            :label="item.name"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属工厂" prop="factoryId">
        <el-select v-model="form.factoryId" placeholder="请选择所属工厂">
          <el-option
            v-for="item in coptions"
            :key="item.factoryId"
            :label="item.factoryName"
            :value="item.factoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.state">
          <el-radio label="1">启动</el-radio>
          <el-radio label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="姓名" prop="trueName">
        <el-input v-model="form.trueName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobilePhone">
        <el-input v-model="form.mobilePhone"></el-input>
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
    let validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.cpwd !== "") {
          this.$refs.form.validateField("cpwd");
        }
        callback();
      }
    };
    let validateCPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let validateAccount = (rule, value, callback) => {
      api
        .getAccountIsExist({ account: value })
        .then(res => {
          console.log(res);
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            this.isFound = res.data.isFound;
            this.loading = false;
            if (!res.data.isFound) {
              callback();
            } else {
              callback(new Error("此账号名已被占用"));
            }
          }
        })
        .catch(_ => {});
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
      loading: false,
      form: {
        account: "",
        state: "1",
        password: "",
        cpwd: "",
        roleId: "",
        trueName: "",
        mobilePhone: "",
        remark: "",
        factoryId: ""
      },
      coptions: [],
      roptions: [],
      rules: {
        account: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          { required: true, validator: validateAccount, trigger: "blur" }
        ],
        password: [{ required: true, validator: validatePwd, trigger: "blur" }],
        cpwd: [{ required: true, validator: validateCPwd, trigger: "blur" }],
        factoryId: [
          { required: true, message: "请选择所属工厂", trigger: "change" }
        ],
        roleId: [
          { required: true, message: "请选择所属角色", trigger: "change" }
        ],
        trueName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobilePhone: [
          { required: true, validator: validatePhone, trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    "form.account": function(val, oldVal) {
      this.loading = true;
    }
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          api
            .addUserData(this.form)
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
            .catch(_ => {
            });
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
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {},
    getPoint(e) {
      this.form.lat = e.lat;
      this.form.lng = e.lng;
    },
    initForm() {
      //初始化所属角色
      api
        .getAllRoleData()
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            this.roptions = _data;
          } else {
          }
        })
        .catch(_ => {});
      //初始化所属工厂
      api
        .getFactoryData({ pageNum: 1, pageSize: 0 })
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            this.coptions = _data.content;
          } else {
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
</style>