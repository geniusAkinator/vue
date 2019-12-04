<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="工厂名称" prop="factoryName">
        <el-input v-model="form.factoryName" placeholder="请输入工厂名称"></el-input>
      </el-form-item>
      <el-form-item label="工厂类型" prop="factoryType">
        <el-select v-model="form.factoryType" placeholder="请选择工厂类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省/市/区" prop="province">
        <keep-alive>
          <my-city-picker @sendPCD="getPCD"></my-city-picker>
        </keep-alive>
      </el-form-item>
      <el-form-item label="工厂地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入工厂地址"></el-input>
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
          <my-map-picker :region="nowRegion" v-show="isShow" @sendPoint="getPoint"></my-map-picker>
        </el-collapse-transition>
      </el-form-item>
      <el-form-item label="LOGO" prop="picture">
        <el-input class="readonly" v-model="form.picture" placeholder="请上传图片" :readonly="true"></el-input>
        <my-upload :limited="limited" @sendImage="getImage" @sendDelIndex="getDelIndex"></my-upload>
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-input v-model="form.leader" placeholder="请输入负责人名称"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" type="number" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="办公电话" prop="tel">
        <el-input v-model="form.tel" placeholder="请输入办公电话"></el-input>
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
import MyMapPicker from "@/components/picker/mappicker";
import MyUpload from "@/components/upload/imgupload";
import MyCityPicker from "@/components/picker/citypicker";
import api from "@/api/index";
export default {
  data() {
    let validatePos = (rule, value, callback) => {
      if (this.form.latitude === 0 || this.form.longitude === 0) {
        callback(new Error("请选择经纬度"));
      } else {
        callback();
      }
    };
    let validateProvince = (rule, value, callback) => {
      if (this.form.province === "") {
        callback(new Error("请选择省/市/区"));
      } else {
        callback();
      }
    };
    let validateTel = (rule, value, callback) => {
      if (this.form.tel === "") {
        callback(new Error("电话不能为空"));
      } else {
        if (!isTel(this.form.tel)) {
          callback(new Error("电话格式不正确"));
        } else {
          callback();
        }
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else {
        if (!isPhone(value)) {
          callback(new Error("手机号码格式不正确"));
        }
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
        phone: "",
        description: "",
        province: "",
        leader: "",
        picture: "",
        tel: ""
      },
      options: [
        {
          value: 1,
          label: "纺织类"
        },
        {
          value: 2,
          label: "制衣类"
        },
        {
          value: 3,
          label: "玩具类"
        },
        {
          value: 4,
          label: "制鞋类"
        },
        {
          value: 5,
          label: "塑料类"
        },
        {
          value: 6,
          label: "陶瓷类"
        },
        {
          value: 7,
          label: "印刷类"
        },
        {
          value: 8,
          label: "化工类"
        },
        {
          value: 9,
          label: "木材类"
        },
        {
          value: 10,
          label: "机械加工类"
        },
        {
          value: 11,
          label: "日用品类"
        },
        {
          value: 12,
          label: "百货类"
        },
        {
          value: 13,
          label: "食品类"
        },
        {
          value: 14,
          label: "电子类"
        }
      ],
      editorOption: config.editorOption,
      isShow: true,
      rules: {
        factoryName: [
          { required: true, message: "请输入工厂名称", trigger: "blur" }
        ],
        pos: [{ required: true, validator: validatePos, trigger: "change" }],
        factoryType: [
          { required: true, message: "请选择工厂类型", trigger: "change" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        province: [
          { required: true, validator: validateProvince, trigger: "change" }
        ],
        picture: [{ required: true, message: "请上传LOGO", trigger: "change" }],
        leader: [
          { required: true, message: "请输入负责人名称", trigger: "blur" }
        ],
        tel: [{ required: true, validator: validateTel, trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }]
      },
      nowRegion: "江苏"
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
    getPCD(e) {
      this.form.province = e;
      this.nowRegion = e.split(",")[0];
    },
    getImage(e) {
      this.form.picture = e;
    },
    getDelIndex(e) {
      let picString = this.form.picture;
      let picList = picString.split(",");
      picList.splice(e, 1);
      picString = "";
      picList.map((item, i) => {
        picString = picString + item + ",";
      });
      this.form.picture = picString
        .substr(0, picString.length - 1)
        .replace(/^\s+|\s+$/g, "");
    }
  },
  created() {
    api
      .getPCD({ pId: 0 })
      .then(res => {})
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