<template>
  <div class="container form">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="权限" prop="peimissions">
        <ul class="plist">
          <li
            v-for="(item,index) in plist"
            :key="index"
            @click="togglePermission(index,item)"
            :class="item.checked?'actived':'' "
          >{{item.label}}:{{item.value}}</li>
        </ul>
        <span class="help-block">高亮为已分配权限</span>
      </el-form-item>
    </el-form>
    <div class="add-footer">
      <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
    </div>
  </div>
</template>
<script>
import api from "@/api/index";
export default {
  data() {
    return {
      form: {
        pId: this.$parent.eid,
        name: "",
        peimissions: ""
      },
      Listform: {
        //表格请求params
        pId: this.$parent.eid,
        pageNum: 1,
        pageSize: 0
      },
      path: this.$parent.path,
      plist: [
        {
          id: 0,
          label: "添加",
          value: "add",
          checked: false
        },
        {
          id: 0,
          label: "编辑",
          value: "edit",
          checked: false
        },
        {
          id: 0,
          label: "删除",
          value: "del",
          checked: false
        },
        {
          id: 0,
          label: "浏览",
          value: "view",
          checked: false
        },
        {
          id: 0,
          label: "查询",
          value: "query",
          checked: false
        },
        {
          id: 0,
          label: "导出",
          value: "export",
          checked: false
        },
        {
          id: 0,
          label: "启用",
          value: "enable",
          checked: false
        },
        {
          id: 0,
          label: "审核",
          value: "audit",
          checked: false
        }
      ]
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.form);
    },
    togglePermission(index, item) {
      if (!item.checked) {
        this.form.name = item.label;
        this.form.peimissions = this.path + ":" + item.value;
        api
          .addMenuData(this.form)
          .then(res => {
            console.log(res);
            if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
              //添加成功
              this.$message({
                showClose: true,
                message: "添加权限成功",
                type: "success"
              });
              this.init();
            } else {
              //添加失败
              this.$message({
                showClose: true,
                message: "添加权限失败",
                type: "warning"
              });
            }
          })
          .catch(_ => {});
      } else {
        api.delMenuData({ pId: item.id }).then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            this.plist[index].checked = false;
          } else {
            this.$message({
              showClose: true,
              message: "删除失败",
              type: "warning"
            });
          }
        });
      }
    },
    init() {
      api.getMenuData(this.Listform).then(res => {
        if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
          let _content = res.data.content;
          console.log(_content);
          this.plist.map((item, i) => {
            _content.map((citem, j) => {
              if (citem.peimissions == this.path + ":" + item.value) {
                this.plist[i].checked = true;
                this.plist[i].id = citem.menuId;
              }
            });
          });
        }
      });
    },
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style >
.plist {
  list-style-type: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.plist li {
  float: left;
  cursor: pointer;
  padding: 7px 15px;
  border: 1px solid #dcdfe6;
  line-height: initial;
  border-radius: 4px;
  margin-right: 10px;
  margin-top: 10px;
}
.plist li.actived {
  background: #409eff;
  color: #fff;
}
</style>