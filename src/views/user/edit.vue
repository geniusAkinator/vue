<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="账户名称" prop="account">
        <el-input v-model="form.account"></el-input>
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
      <el-form-item label="所属工厂" prop="factory">
        <el-select v-model="form.factory" placeholder="请选择所属工厂">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
import MyMapPicker from "@/components/mappicker";
import api from "@/api/index";
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
    return {
      form: {
        userId: this.$parent.eid,
        account: "",
        state: "1",
        password: "",
        cpwd: "",
        role: {
          roleId: 0
        },
        roleName: "",
        factory: "",
        trueName: "",
        mobilePhone: "",
        remark: ""
      },
      options: [
        {
          value: "选项1",
          label: "选项1"
        }
      ],
      roptions: [],
      rules: {
        account: [
          { required: true, message: "请输入账户名称", trigger: "blur" }
        ],
        password: [{ required: true, validator: validatePwd, trigger: "blur" }],
        cpwd: [{ required: true, validator: validateCPwd, trigger: "blur" }],
        // roleId: [
        //   { required: true, message: "请选择所属角色", trigger: "change" }
        // ],
        factory: [
          { required: true, message: "请选择所属工厂", trigger: "change" }
        ]
      }
    };
  },

  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
          api
            .addUserData(this.form)
            .then(res => {
              if (res.code == 200) {
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
    initForm() {
      api
        .getAllRoleData()
        .then(res => {
          if (res.code === 200) {
            let _data = res.data;
            this.roptions = _data;
            console.log(_data);
          } else {
          }
        })
        .catch(_ => {});
      api
        .getUserDetail({ userId: this.form.userId })
        .then(res => {
          if (res.code === 200) {
            let _data = res.data;
            console.log(_data)
            // for (let key in _data) {
            //   this.form[key] = _data[key];
            // };
            this.form.role.roleId = _data.role.roleId
            console.log(this.form)
          } else {
          }
        })
        .catch(_ => {});
    }
  },
  created() {
    this.initForm();
  },
  mounted() {},
  components: {
    MyMapPicker
  }
};
</script>

<style>
</style>