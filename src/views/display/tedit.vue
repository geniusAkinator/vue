<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属系统">
        <el-input v-model="form.system.name" class="readonly" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="类型名称">
        <el-input v-model="form.name" placeholder="类型名称"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-input class="readonly" v-model="form.img" placeholder="请上传缩略图" :readonly="true"></el-input>
        <my-upload
          :limited="limited"
          :image="img"
          @sendImage="getImage"
          @sendDelIndex="getDelIndex"
        ></my-upload>
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import MyUpload from "@/components/upload/imgupload";
import { Loading } from "element-ui";
import api from "@/api/index";
import baseURL from "@/utils/baseUrl";
export default {
  data() {
    return {
      form: {
        ttId: this.$parent.eid,
        system: {
          name: this.$parent.systemName,
          systemId: this.$parent.sform.transducerTypeId
        },
        name: "",
        img: ""
      },
      limited: 1,
      img: []
    };
  },
  watch: {
    "form.img": {
      handler: function(newValue, oldValue) {
        if (newValue == "") {
          return;
        }
        let arr = newValue.split(",");
        let imgList = [];
        arr.map((item, i) => {
          let temp = {};
          temp.title = item.replace("/images/", "");
          temp.url = baseURL + item;
          imgList.push(temp);
        });
        this.img = imgList;
      },
      deep: true
    }
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        //表单验证
        if (valid) {
          //通过
          //ajax提交
          api
            .updateSensorTypeData(this.form)
            .then(res => {
              if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
                //编辑成功
                this.$message({
                  showClose: true,
                  message: "编辑成功",
                  type: "success"
                });
                this.$parent.initSensorType();
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
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    },
    getImage(e) {
      this.form.img = e;
    },
    getDelIndex(e) {
      let picString = this.form.img;
      let picList = picString.split(",");
      picList.splice(e, 1);
      picString = "";
      picList.map((item, i) => {
        picString = picString + item + ",";
      });
      this.form.img = picString
        .substr(0, picString.length - 1)
        .replace(/^\s+|\s+$/g, "");
    },
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.index}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      let _this = this;
      api
        .getSensorTypeDetail({ id: this.form.ttId })
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            for (let key in _data) {
              this.form[key] = _data[key];
            }
          }
        })
        .catch(_ => {});
      setTimeout(() => {
        loadingInstance.close();
      }, 600);
    }
  },
  mounted() {
    this.initForm();
  },
  components: {
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
.container {
  width: calc(100% - 40px);
}
</style>