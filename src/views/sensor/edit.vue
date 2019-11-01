<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="所属工厂" prop="factory">
        <el-select v-model="form.factory.factoryId" placeholder="请选择所属工厂">
          <el-option
            v-for="item in coptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备编号" prop="deviceNumber">
        <el-input v-model="form.deviceNumber" placeholder="请输入设备编号"></el-input>
      </el-form-item>
      <el-form-item label="设备型号">
        <el-select v-model="form.transducerType.ttId" placeholder="请选择设备型号">
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
        <el-date-picker v-model="form.expirationDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
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
import { Loading } from "element-ui";
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
      sform: {
        pageNum: 1,
        pageSize: 0
      },
      cform: {
        pageNum: 1,
        pageSize: 0
      },
      form: {
        transducerId: this.$parent.eid,
        //提交数据
        deviceNumber: "",
        expirationDate: "",
        latitude: 0,
        longitude: 0,
        transducerType: {
          ttId: 0
        },
        factory: {
          factoryId: 0
        }
      },
      options: [],
      isShow: true,
      options: [],
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
            .updateSensorData(this.form)
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
      let options = {
        target: document.querySelector(`#${this.$parent.index}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      //option回显
      let _this = this;
      api
        .getSensorTypeData(this.sform)
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
      api
        .getFactoryData(this.cform)
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            console.log(_data);
            let content = _data.content;
            content.map((item, i) => {
              if (!item.state) {
                let temp = {};
                temp.label = item.factoryName;
                temp.value = item.factoryId;
                this.coptions.push(temp);
              }
            });
          }
        })
        .catch(_ => {});
      //表单回显
      api.getSensorDetail({ id: this.form.transducerId }).then(res => {
        if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
          let _data = res.data;
          console.log(_data);
          this.form.deviceNumber = _data.deviceNumber;
          this.form.expirationDate = _data.expirationDate;
          this.form.latitude = _data.latitude;
          this.form.longitude = _data.longitude;
          this.form.transducerType.ttId = _data.transducerType.ttId;
          // for (let key in _data) {
          //   this.form[key] = _data[key];
          // }
        }
      });
      setTimeout(() => {
        loadingInstance.close();
      }, 600);
    }
  },
  mounted() {
    this.initForm();
  },
  components: {
    MyMapPicker
  }
};
</script>

<style>
</style>