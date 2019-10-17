<template>
  <div class="container form">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="deviceNumber">
        <el-input v-model="form.deviceNumber" type="number"></el-input>
      </el-form-item>
      <el-form-item label="crc">
        <el-input v-model="form.crc"></el-input>
      </el-form-item>
      <el-form-item label="liquidLevel">
        <el-input v-model="form.liquidLevel" type="number"></el-input>
      </el-form-item>
      <el-form-item label="noisePower">
        <el-input v-model="form.noisePower" type="number"></el-input>
      </el-form-item>
      <el-form-item label="rxLev">
        <el-input v-model="form.rxLev" type="number"></el-input>
      </el-form-item>
      <el-form-item label="temp">
        <el-input v-model="form.temp" type="number"></el-input>
      </el-form-item>
      <el-form-item label="threshold">
        <el-input v-model="form.threshold" type="number"></el-input>
      </el-form-item>
      <el-form-item label="dataWarm">
        <el-input v-model="form.dataWarm" type="number"></el-input>
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
        id: this.$parent.eid,
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
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
          api
            .addSensorData(this.form)
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
      this.form.latitude = e.lat;
      this.form.longitude = e.lng;
    },
    initForm() {
      api
        .getSensorDetail({ id: this.form.id })
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            // for (let key in _data) {
            //   this.form[key] = _data[key];
            // }
          } else {
          }
        })
        .catch(_ => {});
    }
  },
  created() {
    this.initForm();
  },
  components: {
    MyMapPicker
  }
};
</script>

<style>
</style>