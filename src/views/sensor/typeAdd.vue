<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="90px">
      <el-form-item label="类型名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="预警标准" v-for="(item,index) in form.list" :key="index">
        <my-alarm :rule="item" :index="index" @getDelIndex="getDelIndex" @getNewItem="getNewItem"></my-alarm>
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
import MyAlarm from "@/components/alarm";
export default {
  data() {
    return {
      form: {
        status: "1",
        name: "",
        list: [
          {
            name: "",
            upperlimit: "",
            lowerlimit: "",
            unit:""
          }
        ]
      },
      options: [],
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
        upperlimit: "",
        lowerlimit: "",
        unit:""
      };
      this.form.list.push(temp);
    },
    getDelIndex(e) {
      console.log(e);
      this.form.list.splice(e, 1);
    },
    getNewItem(e) {
      for (var st in e.item) {
        this.$set(this.form.list[e.index], st, e.item[st]);
      }
    }
  },
  components: {
    MyAlarm
  }
};
</script>

<style>
</style>