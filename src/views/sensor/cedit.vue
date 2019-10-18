<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="70px">
      <el-form-item label="预警标准" v-for="(item,index) in form.standard" :key="index">
        <my-alarm
          :rule.sync="item"
          :index="index"
          @getDelIndex="getDelIndex"
          @getNewItem="getNewItem"
        ></my-alarm>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleAdd">添加标准</el-button>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import MyAlarm from "@/components/alarm";
import api from "@/api/index";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      form: {
        ttId: this.$parent.cid,
        standard: [
          //   {
          //     name: "",
          //     upperlimit: 0,
          //     lowerlimit: 0,
          //     unit: ""
          //   }
        ]
      },
      options: [],
      rules: {}
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          api
            .updateStandardData(this.form)
            .then(res => {
              if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
                //修改成功
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: "success"
                });
                this.$parent.initTable();
                this.closeDialog();
              } else {
                //修改失败
                this.$message({
                  showClose: true,
                  message: "修改失败",
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
    handleAdd() {
      let temp = {
        name: "",
        upperlimit: 0,
        lowerlimit: 0,
        unit: ""
      };
      this.form.standard.push(temp);
    },
    getDelIndex(e) {
      console.log(this.form.standard[e].standardId);
      this.form.standard.splice(e, 1);
    },
    getNewItem(e) {
      console.log(e);
      for (var st in e.item) {
        this.$set(this.form.standard[e.index], st, e.item[st]);
      }
    },
    initForm() {
      //回显
      let options = {
        target: document.querySelector(`#${this.$parent.index}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);

      api
        .getStandardDetail({ id: this.form.ttId })
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data.content;
            _data.map((item, i) => {
              let temp = {};
              temp.standardId = item.standardId;
              temp.lowerlimit = item.lowerLimit;
              temp.upperlimit = item.upperLimit;
              temp.unit = item.unit;
              temp.name = item.name;
              //   console.log(temp);
              this.form.standard.push(temp);
            });
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
  components: {
    MyAlarm
  }
};
</script>

<style>
</style>