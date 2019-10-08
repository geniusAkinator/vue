<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="form.icon">
          <template slot="append">
            <span class="pointer" @click="handleSelect">选择图标</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="排序号" prop="orderNo">
        <el-input v-model="form.orderNo" type="number"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch
          v-model="form.state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
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
import MyIcon from "@/views/icon/index";
import api from "@/api/index";
export default {
  data() {
    return {
      form: {
        name: "",
        icon: "",
        state: 0,
        orderNo: 0,
        pId: -1,
        menuId: this.$parent.eid
      },
      rules: {
        sys: [{ required: true, message: "请输入栏目标识", trigger: "blur" }],
        name: [{ required: true, message: "请输入栏目名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
          api
            .updateMenuData(this.form)
            .then(res => {
              if (res.code == 200) {
                //编辑成功
                this.$message({
                  showClose: true,
                  message: "编辑成功",
                  type: "success"
                });
                this.$parent.initTable();
                this.closeDialog();
              } else {
                this.$message({
                  showClose: true,
                  message: "编辑失败",
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
      //关闭dialog
      this.$parent.$layer.closeAll();
    },
    getPoint(e) {
      this.form.lat = e.lat;
      this.form.lng = e.lng;
    },
    handleChange() {},
    handleSelect() {
      let idx = this.$layer.iframe({
        content: {
          content: MyIcon, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "400px"],
        title: "拾取图标",
        target: ".el-main"
      });
      this.index = idx;
    },
    initForm() {
      api
        .getMenuDetail({ menuId: this.form.menuId })
        .then(res => {
          if (res.code === 200) {
            let data = res.data;
            for (let key in data) {
              this.form[key] = data[key];
            }
          } else {
          }
        })
        .catch(_ => {});
    }
  },
  beforeCreate() {},
  created() {
    this.initForm();
  },
  mounted() {},
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