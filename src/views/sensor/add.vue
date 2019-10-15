<template>
  <div class="container form">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="设备编号">
        <el-input v-model="form.deviceNumber"></el-input>
      </el-form-item>
      <el-form-item label="到期时间">
        <el-input v-model="form.expriationData"></el-input>
      </el-form-item>
      <!-- prop="pos" -->
      <el-form-item label="经纬度">
        <el-row class="form-map-picker">
          <el-col :span="6">
            <el-input
              placeholder
              v-model="form.latitude"
              type="number"
              oninput="value=value.replace(/[^\d.]/g,'')"
              :readonly="true"
            >
              <template slot="prepend">经度</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input
              placeholder
              v-model="form.longitude"
              type="number"
              oninput="value=value.replace(/[^\d.]/g,'')"
              :readonly="true"
            >
              <template slot="prepend">纬度</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <i
              :class="isShow ? 'el-icon-map-location toggleMap active' : 'el-icon-map-location toggleMap'"
              @click="isShow=!isShow"
            ></i>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <my-map-picker v-show="isShow" @sendPoint="getPoint"></my-map-picker>
        </el-collapse-transition>
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
    var validatePos = (rule, value, callback) => {
      if (this.form.latitude === "" || this.form.longitude === "") {
        callback(new Error("请选择经纬度"));
      } else {
        callback();
      }
    };
    return {
      form: {
        //提交数据
        deviceNumber: 0,
        crc: "",
        liquidLevel: 0,
        noisePower: 0,
        rxLev: 0,
        temp: 0,
        threshold: 0,
        dataWarm: 0,
        latitude: 0,
        longitude: 0
      },
      isShow: false,
      options: [],
      rules: {
        //表单验证规则
        name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
        number: [
          { required: true, message: "请输入设备编号", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择设备类型", trigger: "change" }
        ],
        pos: [{ required: true, validator: validatePos, trigger: "change" }]
      }
    };
  },
  methods: {
    handleSubmit(form) {
      //提交
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
          api
            .addSensorData(this.form)
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
          return false;
        }
      });
    },
    handleBack() {
      //退出
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    },
    getPoint(e) {
      this.form.latitude = e.lat;
      this.form.longitude = e.lng;
    }
  },
  components: {
    MyMapPicker
  }
};
</script>

<style>
</style>