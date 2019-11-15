<template>
  <div class="container form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属楼宇">
        <el-input v-model="this.$parent.bName" class="readonly" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="楼层名称">
        <el-input v-model="form.floorName" placeholder="请输入楼宇名称"></el-input>
      </el-form-item>
      <el-form-item label="当前楼层">
        <el-input v-model="form.level" type="number" placeholder="请输入当前楼层">
          <template slot="prepend">F</template>
        </el-input>
      </el-form-item>
      <el-form-item label="平面图">
        <el-input class="readonly" v-model="form.picture" placeholder="请上传当前楼层结构图" :readonly="true"></el-input>
        <my-upload
          :limited="limited"
          :image="img"
          @sendImage="getImage"
          @sendDelIndex="getDelIndex"
        ></my-upload>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import api from "@/api/index";
import MyUpload from "@/components/imgupload";
import { Loading } from "element-ui";
import baseURL from "@/utils/baseUrl";
export default {
  data() {
    return {
      form: {
        //提交数据
        floorId: this.$parent.eid,
        building: {
          buildingId: this.$parent.fId
        },
        picture: "",
        floorName: "",
        level: 0
      },
      options: [],
      coptions: [],
      isShow: true,
      rules: {
        //表单验证规则
      },
      img: [],
      limited: 1
    };
  },
  watch: {
    "form.picture": {
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
      //提交
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
          api
            .updateFloorData(this.form)
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
    },
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.index}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      let _this = this;
      api
        .getFloorDetail({ id: this.form.floorId })
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data.floor;
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
  created() {
    this.initForm();
  },
  components: { MyUpload }
};
</script>

<style>
.readonly > input {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
</style>