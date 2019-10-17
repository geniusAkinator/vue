<template>
  <div class="container form">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="工厂名称" prop="name">
        <el-input v-model="form.factoryName"></el-input>
      </el-form-item>
      <el-form-item label="工厂类型" prop="type">
        <el-select v-model="form.factoryType" placeholder="请选择工厂类型">
          <el-option label="类型1" value="1"></el-option>
          <el-option label="类型2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省/市/区">
        <my-city-picker @sendPCD="getPCD"></my-city-picker>
      </el-form-item>
      <el-form-item label="工厂地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="经纬度" prop="pos">
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
        <el-input v-model="form.phone" type="number"></el-input>
      </el-form-item>
      <el-form-item label="办公电话">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="公司简介">
        <quill-editor
          v-model="form.description"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
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
import MyCityPicker from "@/components/citypicker";
import api from "@/api/index";
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
      limited: 1,
      form: {
        factoryName: "",
        factoryType: "",
        address: "",
        latitude: 0,
        longitude: 0,
        phone: 0,
        description: "",
        province:""
      },
      editorOption: config.editorOption,
      isShow: false,
      rules: {
        name: [{ required: true, message: "请输入工厂名称", trigger: "blur" }],
        pos: [{ required: true, validator: validatePos, trigger: "change" }],
        type: [
          { required: true, message: "请选择工厂类型", trigger: "change" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        //表单验证
        if (valid) {
          //通过
          //ajax提交
          api
            .addFactoryData(this.form)
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
      //获取子组件$emit提交的经纬度
      this.form.latitude = e.lat;
      this.form.longitude = e.lng;
    },
    handleChange() {},
    getPCD(e){
      this.province = e
    }
  },
  created() {
    api
      .getPCD({ pId: 0 })
      .then(res => {
        console.log(res);
      })
      .catch(_ => {});
  },
  components: {
    MyMapPicker,
    MyUpload,
    MyCityPicker
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