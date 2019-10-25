<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="70px">
      <el-form-item label="技术参数" v-for="(item,index) in form.standard" :key="index">
        <my-tech-param
          :rule.sync="item"
          :index="index"
          @getDelIndex="getDelIndex"
          @getNewItem="getNewItem"
        ></my-tech-param>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleAdd">添加参数</el-button>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import MyTechParam from "@/components/techParam";
import api from "@/api/index";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      form: {
        ttId: this.$parent.cid,
        standard: []
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
      let sid = this.form.standard[e].standardId;
      if (sid == undefined) {
        this.form.standard.splice(e, 1);
        this.$message({
          message: "删除规则成功",
          type: "success"
        });
      } else {
        api
          .delStandardData({ ids: sid })
          .then(res => {
            if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
              this.form.standard.splice(e, 1);
              this.$message({
                message: "删除规则成功",
                type: "success"
              });
            }
          })
          .catch(_ => {});
      }
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
            console.log(_data)
            _data.map((item, i) => {
              let temp = {};
              temp.standardId = item.standardId;
              temp.lowerlimit = item.lowerLimit;
              temp.upperlimit = item.upperLimit;
              temp.unit = item.unit;
              temp.name = item.name;
              temp.type = item.type;
              temp.content = item.content;
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
    MyTechParam
  }
};
</script>

<style>
</style>