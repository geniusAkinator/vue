<!-- 方案一(废弃) -->
<template>
  <div class="container form noSelect">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-if="form.menu.length">
      <div class="pCard" v-for="(item,index) in form.menu" :key="index">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <i :class="item.icon"></i>
            {{item.name}}
          </div>
          <div class="text item">
            <div class="crow" v-for="(citem,idx) in item.children" :key="idx">
              <div>
                <span class="cmenu">{{citem.name}}</span>
                <el-checkbox
                  border
                  size="mini"
                  v-for="(pitem,pidx) in citem.children"
                  :key="pidx"
                  @change="handleClick(pidx,pitem,item,citem,$event)"
                  :checked="isChecked(pidx,pitem)"
                >{{pitem.name}}</el-checkbox>
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
      pform: {
        //表格请求params
        pId: "-1",
        pageNum: 1,
        pageSize: 0
      },
      form: {
        roleId: this.$parent.eid,
        menu: []
      },
      sform: {
        roleId: this.$parent.aid,
        ids: ""
      },
      mdata: [],
      rules: {}
    };
  },
  methods: {
    handleSubmit(form) {
      api.updateRoleMenuData(this.sform).then(res => {
        if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
          //编辑成功
          this.$message({
            showClose: true,
            message: "编辑成功",
            type: "success"
          });
          this.$parent.initTable();
          this.closeDialog();
        }
      });
    },
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    },
    initForm() {
      let options = {
        target: document.querySelector(`#${this.$parent.index}`),
        text: "加载中"
      };
      let loadingInstance = Loading.service(options);
      //回显
      api
        .getRoleMenuData({ roleId: this.sform.roleId })
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let content = res.data;
            let ids = "";
            content.map((item, i) => {
              ids = ids + item.menu.menuId + ",";
            });
            this.sform.ids = ids.substr(0, ids.length - 1);
            return api.getMenuData(this.pform);
          }
        })
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            let _content = _data.content;
            _content.map((item, i) => {
              if (item.state) {
                let cform = {
                  pId: item.menuId,
                  pageNum: 1,
                  pageSize: 25
                };
                item.children = [];
                api.getMenuData(cform).then(res => {
                  if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
                    let _cont = res.data.content;
                    let _per = res.data.permissions;
                    _cont.map((citem, j) => {
                      citem.children = [];
                      _per.map((pitem, k) => {
                        if (citem.menuId == pitem.pId) {
                          citem.children = pitem.menus;
                        }
                      });
                    });
                    item.children = _cont;
                  }
                });
              }
            });
            this.form.menu = _content;
          } else {
          }
        })
        .catch(_ => {});

      setTimeout(() => {
        loadingInstance.close();
      }, 600);
    },
    handleClick(idx, pitem, item, citem, ev) {
      let ids = this.sform.ids;
      let grandMenuId = item.menuId.toString();
      let parentMenuId = citem.menuId.toString();
      let nowMenuId = pitem.menuId.toString();
      if (ev) {
        if (ids != "") {
          ids = ids + "," + nowMenuId;
        } else {
          ids = nowMenuId;
        }
        let temp = [];
        temp = ids.split(",");
        if (temp.indexOf(grandMenuId) == "-1") {
          ids = ids + "," + grandMenuId;
        }
        if (temp.indexOf(parentMenuId) == "-1") {
          ids = ids + "," + parentMenuId;
        }
        this.sform.ids = ids;
      } else {
        let temp1 = ids.split(",");
        let temp2 = [];

        ids = "";
        temp1.map((tItem, i) => {
          if (tItem != nowMenuId) {
            temp2.push(tItem);
          }
        });
        let count = 0;
        citem.children.map((item, j) => {
          temp2.map((citem, j) => {
            if (item.menuId == citem) {
              count = count + 1;
            }
          });
        });
        if (count > 0) {
          temp2.map((item, i) => {
            if (item != grandMenuId || item != parentMenuId) {
              ids = ids + item + ",";
            }
          });
        }
        this.sform.ids = ids.substr(0, ids.length - 1);
      }
    },
    isChecked(idx, item) {
      let ids = this.sform.ids;
      let nowMenuId = item.menuId.toString();
      let temp = ids.split(",");
      if (temp.indexOf(nowMenuId) != "-1") {
        return true;
      } else {
        return false;
      }
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