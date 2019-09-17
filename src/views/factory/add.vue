<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="工厂名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="工厂类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择工厂类型">
          <el-option label="类型1" value="1"></el-option>
          <el-option label="类型2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省/市/区" prop="province">
        <el-cascader v-model="form.province" :options="options" @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item label="工厂地址" prop="address">
        <el-input v-model="form.address"></el-input>
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
      <el-form-item label="工厂电话">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="工厂图片">
        <el-input class="readonly" v-model="form.img" :readonly="true"></el-input>
        <my-upload :limited="limited"></my-upload>
      </el-form-item>
      <el-form-item label="工厂负责人">
        <el-input v-model="form.charger"></el-input>
      </el-form-item>
      <el-form-item label="工厂手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="办公电话">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="公司简介">
        <!-- <quill-editor
          v-model="form.content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor> -->
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
import MyUpload from "@/components/upload";
export default {
  data() {
    var validatePos = (rule, value, callback) => {
      if (this.form.lat === "" || this.form.lat === "") {
        callback(new Error("请选择经纬度"));
      } else {
        callback();
      }
    };
    return {
      limited:1,
      form: {
        name: "",
        type: "0",
        address: "",
        lat: "",
        lng: "",
        province: "",
        tel: "",
        img: ""
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
      editorOption: config.editorOption,
      isShow: false,
      rules: {
        name: [{ required: true, message: "请输入工厂名称", trigger: "blur" }],
        pos: [{ required: true, validator: validatePos, trigger: "change" }],
        type: [
          { required: true, message: "请选择工厂类型", trigger: "change" }
        ],
        province: [
          { required: true, message: "请选择省市区", trigger: "change" }
        ],
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
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {},
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
.readonly > input {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
</style>