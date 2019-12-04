<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="所属工厂" prop="factory">
        <el-select v-model="form.factory" placeholder="请选择">
          <el-option label="工厂1" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="巡检计划名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入巡检计划名称"></el-input>
        <el-transfer v-model="form.plist" :data="data"></el-transfer>
      </el-form-item>
      <el-form-item label="巡检周期">
        <my-cycle></my-cycle>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="form.startDate" type="date" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.mark" placeholder="请输入备注" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">禁用</el-radio>
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
import MyCycle from "@/components/form/cycle";
export default {
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `项目 ${i}`
        });
      }
      return data;
    };
    return {
      data: generateData(),
      form: {
        status: 0,
        isphoto: 0,
        plist: [1, 4],
        range: "",
        lng: 0,
        lat: 0,
        startDate: ""
      },
      isShow: false,
      rules: {
        factory: [
          { required: true, message: "请选择所属工厂", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入巡更计划名称", trigger: "blur" }
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
    getPoint(e) {
      console.log(e);
    }
  },
  components: {
    MyCycle
  }
};
</script>

 <style>
</style>