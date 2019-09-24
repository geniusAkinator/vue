<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="所属工厂" prop="factory">
        <el-select v-model="form.factory" placeholder="请选择">
          <el-option label="类型1" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属主体" prop="main">
        <el-select v-model="form.main" placeholder="请选择">
          <el-option label="类型1" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="巡检路线名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入巡检路线名称"></el-input>
        <el-transfer v-model="form.point" :data="data"></el-transfer>
      </el-form-item>
      <el-form-item label="巡检时间">
        <el-time-picker
          is-range
          v-model="form.range"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
      <el-form-item label="是否拍照">
        <el-radio-group v-model="form.isphoto">
          <el-radio :label="0">必须拍照</el-radio>
          <el-radio :label="1">不需拍照</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.distance" placeholder="请输入备注" type="textarea"></el-input>
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
export default {
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `巡更点 ${i}`
        });
      }
      return data;
    };
    return {
      data: generateData(),
      form: {
        status: 0,
        isphoto: 0,
        point: [1, 4],
        range: ""
      },
      rules: {
        factory: [
          { required: true, message: "请选择所属工厂", trigger: "change" }
        ],
        main: [
          { required: true, message: "请选择所属主体", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入巡检路线名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.closeDialog();
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
    getPoint(e) {
      console.log(e);
    }
  },
  components: {}
};
</script>

 <style>
</style>