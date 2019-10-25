<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="设备编号" prop="deviceNumber">
        <el-input v-model="form.deviceNumber" placeholder="请输入设备编号"></el-input>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="form.transducerType.ttId" placeholder="请选择设备类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- prop="pos" -->
      <el-form-item label="经纬度">
        <el-row class="form-map-picker">
          <el-col :span="10">
            <el-input
              placeholder
              v-model="form.latitude"
              type="number"
              oninput="value=value.replace(/[^\d.]/g,'')"
              :readonly="false"
            >
              <template slot="prepend">经度</template>
            </el-input>
          </el-col>
          <el-col :span="10">
            <el-input
              placeholder
              v-model="form.longitude"
              type="number"
              oninput="value=value.replace(/[^\d.]/g,'')"
              :readonly="false"
            >
              <template slot="prepend">纬度</template>
            </el-input>
          </el-col>
          <el-col :span="1">
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
      <el-form-item label="到期时间" prop="expirationDate">
        <el-date-picker
          v-model="form.expirationDate"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>
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
      Listform: {
        pageNum: 1,
        pageSize: 0
      },
      form: {
        //提交数据
        deviceNumber: "",
        expirationDate: "",
        latitude: 0,
        longitude: 0,
        transducerType: {
          ttId: ""
        }
      },
      options: [],
      isShow: true,
      rules: {
        //表单验证规则
        deviceNumber: [
          { required: true, message: "请输入设备编号", trigger: "blur" }
        ],
        expirationDate: [
          { required: true, message: "请选择日期时间", trigger: "change" }
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
      //退出
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
      let _this = this;
      api
        .getSensorTypeData(this.Listform)
        .then(res => {
          if (res.code === _this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            let content = _data.content;
            content.map((item, i) => {
              if (!item.state) {
                let temp = {};
                temp.label = item.name;
                temp.value = item.ttId;
                this.options.push(temp);
              }
            });
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