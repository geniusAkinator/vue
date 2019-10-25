<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="账号名称">
        <el-input v-model="form.account" class="readonly" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="所属角色">
        <el-select v-model="form.roleId" placeholder="请选择所属角色">
          <el-option
            v-for="item in roptions"
            :key="item.roleId"
            :label="item.name"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属工厂">
        <el-select v-model="form.factoryId" placeholder="请选择所属工厂" disabled>
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
      <el-form-item label="姓名">
        <el-input v-model="form.trueName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
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
import { Loading } from "element-ui";
export default {
  data() {
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.cpwd !== "") {
          this.$refs.form.validateField("cpwd");
        }
        callback();
      }
    };
    var validateCPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // var validateAccount = (rule, value, callback) => {
    //   api
    //     .getAccountIsExist({ account: value })
    //     .then(res => {
    //       console.log(res);
    //       if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
    //         this.isFound = res.data.isFound;
    //         if (!res.data.isFound) {
    //           callback();
    //         } else {
    //           callback(new Error("此账号名已被占用"));
    //         }
    //       }
    //     })
    //     .catch(_ => {});
    // };
    return {
      form: {
        userId: this.$parent.eid,
        account: "",
        state: "1",
        roleId: 0,
        trueName: "",
        mobilePhone: "",
        remark: "",
        factoryId: 0
      },
      coptions: [],
      roptions: [],
      rules: {
        // account: [
        //   { required: true, message: "请输入账户名称", trigger: "blur" },
        //   { required: true, validator: validateAccount, trigger: "blur" }
        // ],
        password: [{ required: true, validator: validatePwd, trigger: "blur" }],
        cpwd: [{ required: true, validator: validateCPwd, trigger: "blur" }]
        // roleId: [
        //   { required: true, message: "请选择所属角色", trigger: "change" }
        // ],
      }
    };
  },

  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
          api
            .updateUserData(this.form)
            .then(res => {
              if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
                //添加成功
                this.$message({
                  showClose: true,
                  message: "编辑成功",
                  type: "success"
                });
                this.$parent.initTable();
                this.closeDialog();
              } else {
                //添加失败
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
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.index}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      let _this = this;
      //表单回显
      api
        .getUserDetail({ userId: this.form.userId })
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            // for (let key in _data) {
            //   this.form[key] = _data[key];
            // }
            console.log(_data);
            this.form.account = _data.userInfo.account;
            this.form.state = _data.userInfo.state + "";
            this.form.trueName = _data.userInfo.trueName;
            this.form.mobilePhone = _data.userInfo.mobilePhone;
            this.form.remark = _data.userInfo.remark;
            this.form.roleId = _data.userInfo.role.roleId;
            this.form.factoryId = _data.factory.factoryId;
            console.log(this.form);
          } else {
          }
        })
        .catch(_ => {});
      //获取所有属性
      api
        .getAllRoleData()
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            this.roptions = _data;
            console.log(_data);
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
      setTimeout(() => {
        loadingInstance.close();
      }, 600);
    }
  },
  mounted() {
    this.initForm();
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