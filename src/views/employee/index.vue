<template>
  <div class="container">
    <!-- 表格操作 -->
    <div class="table-tool">
      <el-button-group>
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          :disabled="did==''"
          @click="handleDeleteMore"
        >批量删除</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加</el-button>
      </el-button-group>
      <my-search-tool>
        <template slot="content">
          <el-form :label-position="labelPosition" ref="form" :model="Listform" label-width="80px">
            <el-form-item label="关键字" size="small">
              <el-input v-model="Listform.factoryName" placeholder="请输入关键字（列：人员名称）"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template slot="end">
          <el-dropdown size="small" split-button @command="handleClick">
            导出
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="csv">导出到 Csv 文件</el-dropdown-item>
              <el-dropdown-item command="excel">导出到 Excel 文件</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="small" @click="handleReset">重置</el-button>
          <el-button size="small" type="primary" @click="handleSearch">查询</el-button>
        </template>
      </my-search-tool>
      <div class="table-tool-others"></div>
    </div>
    <!-- 表格 -->
    <el-table
      stripe
      border
      :data="tableData"
      align="center"
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="employeeId" label="ID" width="150"></el-table-column>
      <el-table-column prop="department.departmentName" label="部门名称" width="150"></el-table-column>
      <el-table-column prop="name" label="名称" width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>
              身份证:
              <span :title="scope.row.idCard">{{ idCardEncrypt(scope.row.idCard) }}</span>
            </p>
            <p>
              手机号:
              <span :title="scope.row.phone">{{ mobileEncrypt(scope.row.phone) }}</span>
            </p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="duty" label="职务"></el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">{{ !scope.row.sex ? '男' : '女' }}</template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">{{ !scope.row.state ? '在职' : '离职' }}</template>
      </el-table-column>
      <el-table-column prop="joinTime" label="入职时间" width="180px"></el-table-column>
      <el-table-column label="操作" fixed="right" width="140px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="isPaging"
        :current-page="currentPage"
        :page-sizes="[25, 50, 75, 100]"
        :page-size="Listform.pageSize"
        layout="prev,pager,next,jumper,total,sizes"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import MySearchTool from "@/components/searchtool";
import MyEmployeeAdd from "@/views/employee/add";
import MyEmployeeEdit from "@/views/employee/edit";
import api from "@/api/index";
import utils from "@/utils/utils";
export default {
  data() {
    return {
      loading: true,
      Listform: {
        //表格请求params
        pageNum: 1,
        pageSize: 25
      },
      dform:{
        pageNum: 1,
        pageSize: 0,
        factoryName: ""
      },
      total: 0,
      tableData: [],
      isPaging: false,
      currentPage: 1,
      // searchForm: {},
      labelPosition: "left",
      did: "",
      eid: 0,
      index: "",
      layerInitWidth: 0,
      layerInitHeight: 0
    };
  },
  watch: {
    index: function(newVal, oldVal) {
      let layer = document.querySelector("#" + newVal);
      if (layer != null) {
        this.layerInitWidth = layer.offsetWidth;
        this.layerInitHeight = layer.offsetHeight;
      }
    }
  },
  methods: {
    handleSizeChange(e) {
      //分页大小改变
      this.Listform.pageSize = e;
      //重载表格
      this.initTable();
    },
    handleCurrentChange(e) {
      //分页切换
      this.Listform.pageNum = e;
      //重载表格
      this.initTable();
    },
    handleAdd() {
      var index = this.$layer.iframe({
        content: {
          content: MyEmployeeAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["500px", "500px"],
        title: "新增人员信息",
        target: ".el-main"
      });
      this.index = index;
    },
    handleEdit(idx, row) {
      this.eid = row.employeeId;
      let index = this.$layer.iframe({
        content: {
          content: MyEmployeeEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["500px", "500px"],
        title: "编辑人员信息",
        target: ".el-main"
      });
      this.index = index;
    },
    handleExport() {},
    handleReset() {
      //重置查询表单
      this.Listform = {
        pageNum: 1,
        pageSize: 25
      };
    },
    handleSearch() {
      //查询
      this.initTable();
    },
    handleClick(command) {
      if (command == "csv") {
      } else if (command == "excel") {
      }
    },
    handleUpload(command) {
      console.log("上传");
      if (command == "template") {
        //下载模板
      } else if (command == "upload") {
        console.log("上传");
        this.$refs.file.click();
      }
    },
    handleSelectionChange(e) {
      let did = "";
      e.forEach(function(item) {
        did = did + item.employeeId + ",";
      });
      this.did = did.substr(0, did.length - 1);
    },
    handleDelete(index, row) {
      //删除单行
      this.did = row.employeeId + "";
      this.delRow();
    },
    handleDeleteMore() {
      //删除多行
      this.delRow();
    },
    delRow() {
      let _this = this;
      _this
        .$confirm("确认删除")
        .then(_ => {
          api.delEmployeeData({ ids: _this.did }).then(res => {
            if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
              _this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
              _this.initTable(); //重新加载表格
              this.did = "";
            }
          });
        })
        .catch(_ => {
          this.did = "";
        });
    },
    initTable() {
      //初始化表格数据
      api
        .getEmployeeData(this.dform)
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            console.log(_data);
            this.tableData = _data.content;
            this.total = _data.total;
          }
        })
        .catch(_ => {});
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    mobileEncrypt(str) {
      return mobileEncrypt(str);
    },
    idCardEncrypt(str) {
      return idCardEncrypt(str);
    }
  },
  created() {
    this.initTable();
  },
  mounted() {
    window.addEventListener("resize", () => {
      if (this.index == "") {
        return;
      }
      let layer = document.querySelector("#" + this.index);
      if (layer != null) {
        utils.resizeLayer(
          this.index,
          this.layerInitWidth,
          this.layerInitHeight
        );
      }
    });
  },
  beforeMount() {},
  components: {
    MySearchTool
  }
};
</script>
<style scoped>
.table-expand {
  font-size: 0;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>