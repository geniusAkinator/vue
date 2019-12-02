<template>
  <div class="container form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属工厂">
        <el-input v-model="this.$parent.fName" class="readonly" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="楼宇名称">
        <el-input v-model="form.name" placeholder="请输入楼宇名称"></el-input>
      </el-form-item>
      <el-form-item label="建筑面积">
        <el-input v-model="form.area" type="number" placeholder="请输入楼宇名称">
          <template slot="append">
            m
            <sup>2</sup>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="楼上层数">
        <el-input v-model="form.upperLevel" type="number" placeholder="请输入楼上层数">
          <template slot="append">层</template>
        </el-input>
      </el-form-item>
      <el-form-item label="楼下层数">
        <el-input v-model="form.underLevel" type="number" placeholder="请输入楼下层数" min="0">
          <template slot="append">层</template>
        </el-input>
      </el-form-item>
      <el-form-item label="环境图片">
        <el-input class="readonly" v-model="form.picture" placeholder="请上传图片" :readonly="true"></el-input>
        <my-upload :limited="limited" @sendImage="getImage" @sendDelIndex="getDelIndex"></my-upload>
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

export default {
  data() {
    return {
      form: {
        //提交数据
        factory: {
          factoryId: this.$parent.fId
        },
        picture: "",
        area: 0,
        upperLevel: 0,
        underLevel: 0,
        name: ""
      },
      options: [],
      coptions: [],
      isShow: true,
      rules: {
        //表单验证规则
      },
      limited: 1
    };
  },
  methods: {
    handleSubmit(form) {
      //提交
      this.$refs[form].validate(valid => {
        if (valid) {
          api
            .addBuildingData(this.form)
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
    initForm() {}
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