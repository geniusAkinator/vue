<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="90px">
      <el-form-item label="类型名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.state">
          <el-radio label="0">启动</el-radio>
          <el-radio label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="预警标准" v-for="(item,index) in form.standard" :key="index">
        <my-alarm :rule="item" :index="index" @getDelIndex="getDelIndex" @getNewItem="getNewItem"></my-alarm>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleAdd">添加标准</el-button>
      </el-form-item>-->
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import MyAlarm from "@/components/alarm";
import api from "@/api/index";
export default {
  data() {
    return {
      form: {
        ttId: this.$parent.eid,
        state: "0",
        name: ""
      },
      options: [],
      rules: {}
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
          api
            .updateSensorTypeData(this.form)
            .then(res => {
              if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
                //编辑成功
                this.$message({
                  showClose: true,
                  message: "编辑成功",
                  type: "success"
                });
                this.$parent.initTable();
                this.closeDialog();
              } else {
                //编辑失败
                this.$message({
                  showClose: true,
                  message: "编辑失败",
                  type: "warning"
                });
              }
            })
            .catch(_ => {});
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
    initForm() {
      console.log(this.form.id);
      api
        .getSensorTypeDetail({ id: this.form.ttId })
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            this.form.state = _data.state + "";
            this.form.name = _data.name;
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
    MyAlarm
  }
};
</script>

<style>
</style>