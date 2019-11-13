<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="所属工厂" prop="factory.factoryId">
        <el-select v-model="form.factory.factoryId" placeholder="请选择所属工厂">
          <el-option
            v-for="item in coptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属楼宇" prop="building.buildingId">
        <el-select v-model="form.building.buildingId" placeholder="请选择所属楼宇">
          <el-option
            v-for="item in boptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属楼层" prop="floor.floorId">
        <el-select v-model="form.floor.floorId" placeholder="请选择所属楼层">
          <el-option
            v-for="item in foptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备编号" prop="deviceNumber">
        <el-input v-model="form.deviceNumber" placeholder="请输入设备编号"></el-input>
      </el-form-item>
      <el-form-item label="设备型号" prop="transducerType.ttId">
        <el-select v-model="form.transducerType.ttId" placeholder="请选择设备型号">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
      sform: {
        pageNum: 1,
        pageSize: 0
      },
      cform: {
        pageNum: 1,
        pageSize: 0
      },
      bform: {
        factoryId: 0,
        pageNum: 1,
        pageSize: 0
      },
      fform: {
        buildingId: 0,
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
        },
        factory: {
          factoryId: ""
        },
        building: {
          buildingId: ""
        },
        floor: {
          floorId: ""
        }
      },
      options: [],
      coptions: [],
      boptions: [],
      foptions: [],
      isShow: true,
      rules: {
        //表单验证规则
        "factory.factoryId": [
          { required: true, message: "请输入所属工厂", trigger: "change" }
        ],
        deviceNumber: [
          { required: true, message: "请输入设备编号", trigger: "blur" }
        ],
        expirationDate: [
          { required: true, message: "请选择日期时间", trigger: "change" }
        ],
        pos: [{ required: true, validator: validatePos, trigger: "change" }],
        "transducerType.ttId": [
          { required: true, message: "请输入设备型号", trigger: "change" }
        ],
        "building.buildingId": [
          { required: true, message: "请输入所属楼宇", trigger: "change" }
        ],
        "floor.floorId": [
          { required: true, message: "请输入所属楼层", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    "form.factory.factoryId": function(nVal, oVal) {
      this.bform.factoryId = nVal;
      this.form.building.buildingId = "";
      this.boptions = [];
      this.getBuildingList();
    },
    "form.building.buildingId": function(nVal, oVal) {
      this.fform.buildingId = nVal;
      this.form.floor.floorId = "";
      this.foptions = [];
      this.getFloorList();
    }
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
        .getSensorTypeData(_this.sform)
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
        .getFactoryData(_this.cform)
        .then(res => {
          if (res.code == _this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            console.log(_data);
            let content = _data.content;
            content.map((item, i) => {
              if (!item.state) {
                let temp = {};
                temp.label = item.factoryName;
                temp.value = item.factoryId;
                _this.coptions.push(temp);
              }
            });
          }
        })
        .catch(_ => {});
    },
    getBuildingList() {
      let _this = this;
      api
        .getBuildingData(_this.bform)
        .then(res => {
          if (res.code === _this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            let content = _data.content;
            console.log(_data);
            content.map((item, i) => {
              if (!item.state) {
                let temp = {};
                temp.label = item.name;
                temp.value = item.buildingId;
                this.boptions.push(temp);
              }
            });
          }
        })
        .catch(_ => {});
    },
    getFloorList() {
      let _this = this;
      api.getFloorData(_this.fform).then(res => {
        if (res.code === _this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
          let _data = res.data;
          let content = _data.content;
          content.map((item, i) => {
            if (!item.state) {
              let temp = {};
              temp.label = item.name;
              temp.value = item.floorId;
              this.foptions.push(temp);
            }
          });
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initForm();
    });
  },
  components: {
    MyMapPicker
  }
};
</script>

<style>
</style>