<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="90px">
      <el-form-item label="型号名称">
        <el-input v-model="form.name" placeholder="请输入型号名称"></el-input>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="form.type" placeholder="请选择设备类型">
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
          <el-radio label="0">启动</el-radio>
          <el-radio label="1">禁用</el-radio>
        </el-radio-group>
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
      form: {
        ttId: this.$parent.eid,
        state: "0",
        name: "",
        type: 0
      },
      options: [
        {
          value: 1,
          label: "温湿度"
        },
        {
          value: 2,
          label: "烟雾"
        },
        {
          value: 3,
          label: "二氧化碳"
        },
        {
          value: 4,
          label: "可燃气体"
        },
        {
          value: 5,
          label: "水压"
        },
        {
          value: 6,
          label: "水深"
        },
        {
          value: 7,
          label: "甲醛"
        }
      ],
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
      let options = {
        target: document.querySelector(`#${this.$parent.index}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      console.log(this.form.id);
      api
        .getSensorTypeDetail({ id: this.form.ttId })
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            this.form.state = _data.state + "";
            this.form.name = _data.name;
            this.form.type = _data.type;
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
  mounted() {},
  components: {}
};
</script>

<style>
</style>