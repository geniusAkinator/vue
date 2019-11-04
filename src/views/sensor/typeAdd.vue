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
import api from "@/api/index";
export default {
  data() {
    return {
      form: {
        state: "0",
        name: "",
        type: ""
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
            .addSensorTypeData(this.form)
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
          return false;
        }
      });
    },
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    }
  },
  components: {}
};
</script>

<style>
</style>