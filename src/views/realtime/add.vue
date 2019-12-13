<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="130px">
      <el-form-item label="所属工厂" prop="factory.factoryId">
        <el-select v-model="form.factory.factoryId">
          <el-option
            v-for="(item,index) in foption"
            :key="index"
            :label="item.factoryName"
            :value="item.factoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属楼宇">
        <el-select>
          <el-option
            v-for="(item,index) in foption"
            :key="index"
            :label="item.factoryName"
            :value="item.factoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属楼层">
        <el-select>
          <el-option
            v-for="(item,index) in foption"
            :key="index"
            :label="item.factoryName"
            :value="item.factoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="点位置">
        <my-pos-picker :img="floorImg" @sendPos="getPos"></my-pos-picker>
      </el-form-item>
      <el-form-item label="点位置描述">
        <el-input v-model="form.devicePos" placeholder="请输入点位置描述"></el-input>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input v-model="form.deviceNumber" placeholder="请输入设备名称"></el-input>
      </el-form-item>
      <el-form-item label="设备ID">
        <el-input v-model="form.deviceNumber" placeholder="请输入设备ID"></el-input>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-input v-model="form.deviceNumber" placeholder="请输入设备类型"></el-input>
      </el-form-item>
      <el-form-item label="设备描述">
        <el-input v-model="form.deviceNumber" placeholder="请输入设备描述"></el-input>
      </el-form-item>
      <el-form-item label="设备配置">
        <el-input v-model="form.deviceNumber" type="textarea" placeholder="请输入设备配置"></el-input>
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
import MyPosPicker from "@/components/picker/pospicker";
export default {
  data() {
    return {
      Listform: {
        //表格请求params
        pageNum: 1,
        pageSize: 0
      },
      foption: [],
      form: {},
      rules: {},
      form: {
        factory: {
          factoryId: ""
        },
        cameraType: 0
      },
      floorImg: ""
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
            .addDepartmentData(this.form)
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
    handleChange() {},
    initForm() {
      api
        .getFactoryData(this.Listform)
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            this.foption = _data.content;
          }
        })
        .catch(_ => {});
    },
    getPos() {}
  },
  created() {
    this.initForm();
  },
  mounted() {},
  components: {
    MyPosPicker
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