<template>
  <div class="container form noSelect">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <div class="pCard" v-for="(item,index) in form.menu" :key="index">
        <el-card class="box-card" shadow="never" v-if="item.menu.state">
          <div slot="header" class="clearfix">
            <i :class="item.menu.icon"></i>
            {{item.menu.name}}
          </div>
          <div class="text item">
            <div class="crow" v-for="(citem,idx) in item.children" :key="idx">
              <div v-if="citem.menu.state">
                <span class="cmenu">{{citem.menu.name}}</span>
                <el-checkbox
                  v-model="citem.menu.creates"
                  v-if="isAssign(citem.menu.menuId,'creates')"
                  border
                  size="mini"
                >添加</el-checkbox>
                <el-checkbox
                  v-model="citem.menu.edit"
                  v-if="isAssign(citem.menu.menuId,'edit')"
                  border
                  size="mini"
                >编辑</el-checkbox>
                <el-checkbox
                  v-model="citem.menu.del"
                  v-if="isAssign(citem.menu.menuId,'del')"
                  border
                  size="mini"
                >删除</el-checkbox>
                <el-checkbox
                  v-model="citem.menu.view"
                  v-if="isAssign(citem.menu.menuId,'view')"
                  border
                  size="mini"
                >浏览</el-checkbox>
                <el-checkbox
                  v-model="citem.menu.query"
                  v-if="isAssign(citem.menu.menuId,'query')"
                  border
                  size="mini"
                >查询</el-checkbox>
                <el-checkbox
                  v-model="citem.menu.export"
                  v-if="isAssign(citem.menu.menuId,'export')"
                  border
                  size="mini"
                >导出</el-checkbox>
                <el-checkbox
                  v-model="citem.menu.enable"
                  v-if="isAssign(citem.menu.menuId,'enable')"
                  border
                  size="mini"
                >启用</el-checkbox>
                <el-checkbox
                  v-model="citem.menu.audit"
                  v-if="isAssign(citem.menu.menuId,'audit')"
                  border
                  size="mini"
                >审核</el-checkbox>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      form: {
        roleId: this.$parent.eid,
        menu: []
      },
      mdata: [],
      rules: {}
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let form = {};
          form.roleId = this.form.roleId;
          form.menu = JSON.stringify(this.form.menu);
          console.log(form.menu);
          api
            .updateCheckedMenuData(form)
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
    initForm() {
      //回显
      let options = {
        target: document.querySelector(`#${this.$parent.index}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);

      //获取当前角色地下所有menu对应的权限的值
      api
        .getCheckedMenuData({ menuId: this.form.roleId })
        .then(res => {
          if (res.code === 200) {
            console.log(res.data);
            let data = res.data;
            this.form.menu = data;
          } else {
          }
        })
        .catch(_ => {});
      //获取所有menu的权限
      api
        .getAllMenuData()
        .then(res => {
          if (res.code === 200) {
            let data = res.data;
            this.mdata = data;
          } else {
          }
        })
        .catch(_ => {});
      setTimeout(() => {
        loadingInstance.close();
      }, 600);
    },
    isAssign(mid, type) {
      let isShow = false;
      this.mdata.map((item, i) => {
        item.children.map((mitem, j) => {
          if (mitem.menu.menuId == mid) {
            isShow = mitem.menu[type];
          }
        });
      });
      return isShow;
    }
  },
  created() {
    this.initForm();
  },
  mounted() {},
  components: {}
};
</script>

<style>
.permission + .permission {
  margin-top: 20px;
}
.permission .clearfix {
  line-height: 20px;
}
.permission .el-card__header {
  border-bottom: 1px solid #e6e6e6;
  background: #f2f2f2;
}
.permission {
  border: 1px solid #e6e6e6;
}
.el-card + .el-card {
  margin-top: 20px;
}
.pCard + .pCard {
  margin-top: 10px;
}
.cmenu {
  width: 100px;
  display: inline-block;
  font-weight: bold;
}
.crow .el-checkbox {
  margin-right: 5px !important;
  line-height: 19px;
  margin-left: 0 !important;
}
.crow .el-checkbox .el-checkbox__input {
  margin-top: 1px;
}
.crow {
  margin-top: 10px;
}
.crow + .crow {
  padding-top: 10px;
  border-top: 1px solid #ebeef5;
}
</style>