<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="厂商名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contacter">
        <el-input v-model="form.contacter"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-input class="readonly" v-model="form.pic" :readonly="true"></el-input>
        <my-upload :limited="limited"></my-upload>
        <span class="help-block"></span>
      </el-form-item>
      <el-form-item label="省/市/区" prop="province">
        <el-cascader v-model="form.province" :options="options" @change="handleChange"></el-cascader>
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
import MyMapPicker from "@/components/mappicker";
import MyUpload from "@/components/imgupload";
export default {
  data() {
    return {
      limited: 1,
      form: {
        name: "",
        contacter: "",
        tel: "",
        phone: "",
        lng: 0,
        lat: 0,
        pic: "",
        province: "",
        status: 1
      },
      options: [
        {
          value: "江苏省",
          label: "江苏省",
          children: [
            {
              value: "苏州市",
              label: "苏州市",
              children: [
                {
                  value: "昆山",
                  label: "昆山"
                },
                {
                  value: "吴县",
                  label: "吴县"
                }
              ]
            }
          ]
        }
      ],
      isShow: false,
      rules: {
        name: [{ required: true, message: "请输入厂商名称", trigger: "blur" }],
        contacter: [
          { required: true, message: "请输入联系人名称", trigger: "blur" }
        ],
        tel: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        province: [
          { required: true, message: "请选择省市区", trigger: "change" }
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
      this.form.lat = e.lat;
      this.form.lng = e.lng;
    },
    handleChange() {}
  },
  components: {
    MyMapPicker,
    MyUpload
  }
};
</script>

 <style>
</style>