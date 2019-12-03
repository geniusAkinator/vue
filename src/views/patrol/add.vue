<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="所属工厂" prop="factory">
        <el-select v-model="form.factory" placeholder="请选择">
          <el-option label="类型1" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="厂区" prop="parea">
        <el-select v-model="form.parea" placeholder="请选择">
          <el-option label="类型1" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车间" prop="workshop">
        <el-select v-model="form.workshop" placeholder="请选择">
          <el-option label="类型1" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经纬度" prop="pos">
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
      <el-form-item label="巡检点名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入巡检点名称"></el-input>
      </el-form-item>
      <el-form-item label="定位距离">
        <el-input v-model="form.distance" placeholder="请输入定位距离"></el-input>
      </el-form-item>
      <el-form-item label="拍照要求">
        <el-input v-model="form.requirement" placeholder="请输入拍照要求"></el-input>
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
export default {
  data() {
    return {
      form: {
        lat: 0,
        lng: 0,
        status: 0,
        workshop: "",
        parea: ""
      },
      isShow: false,
      rules: {
        factory: [
          { required: true, message: "请选择所属工厂", trigger: "change" }
        ],
        parea: [{ required: true, message: "请选择厂区", trigger: "change" }],
        workshop: [
          { required: true, message: "请选择车间", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入巡检点名称", trigger: "blur" }
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
      this.form.lat = e.lat;
      this.form.lng = e.lng
    }
  },
  components: {
    MyMapPicker
  }
};
</script>

 <style>
</style>