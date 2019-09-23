<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="所属工厂" prop="factory">
        <el-select v-model="form.factory" placeholder="请选择">
          <el-option label="工厂1" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属主体" prop="main">
        <el-select v-model="form.main" placeholder="请选择">
          <el-option label="主体1" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维保厂商" prop="firm">
        <el-select v-model="form.firm" placeholder="请选择">
          <el-option label="厂商1" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="巡检类别" prop="ptype">
        <el-select v-model="form.ptype" placeholder="请选择">
          <el-option label="类型1" value="1"></el-option>
        </el-select>
        <el-transfer v-model="form.typeList" :data="data"></el-transfer>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入地址"></el-input>
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
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `标准 ${i}`
        });
      }
      return data;
    };
    return {
      data: generateData(),
      form: {
        status: 0,
        isphoto: 0,
        typeList: [1, 4],
        range: "",
        lng: 0,
        lat: 0
      },
      isShow: false,
      rules: {
        factory: [
          { required: true, message: "请选择所属工厂", trigger: "change" }
        ],
        main: [
          { required: true, message: "请选择所属主体", trigger: "change" }
        ],
        firm: [
          { required: true, message: "请选择所属主体", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入巡更名称", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }]
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
  components: {
    MyMapPicker
  }
};
</script>

 <style>
</style>