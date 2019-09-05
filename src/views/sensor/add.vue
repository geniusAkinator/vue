<template>
  <div class="container form">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="所属主体">
        <el-input v-model="form.main"></el-input>
      </el-form-item>
      <el-form-item label="设备编号">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="经纬度">
        <el-row class="form-map-picker">
          <el-col :span="6">
            <el-input
              placeholder
              v-model="form.lat"
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
              v-model="form.lng"
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
      <el-form-item label="备注">
        <el-input v-model="form.remarks" type="textarea"></el-input>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import MyMapPicker from "@/components/mappicker";
export default {
  data() {
    return {
      form: {
        id: "",
        main: "",
        name: "",
        lat: "",
        lng: "",
        status: "0",
        remarks:""
      },
      isShow: false
    };
  },
  methods: {
    handleSubmit() {
      this.closeDialog();
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
    }
  },
  components: {
    MyMapPicker
  }
};
</script>

<style>
</style>