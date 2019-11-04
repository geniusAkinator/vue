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
        <el-dropdown @command="handleUpload" trigger="click">
          <el-button type="primary" size="small" icon="el-icon-document-add">
            导入
            <i class="el-icon-arrow-down"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="template">下载Excel模板</el-dropdown-item>
            <el-dropdown-item command="upload">上传Excel</el-dropdown-item>
            <input
              ref="file"
              type="file"
              name="file"
              hidden
              @change="handleImport"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </el-dropdown-menu>
        </el-dropdown>
      </el-button-group>
      <my-search-tool>
        <template slot="content">
          <el-form :label-position="labelPosition" ref="form" :model="Listform" label-width="80px">
            <el-form-item label="关键字" size="small">
              <el-input v-model="Listform.factoryName" placeholder="请输入关键字（列：工厂名称）"></el-input>
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
      <el-table-column fixed type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="图片">
              <img class="img" :src="imgUrl+props.row.picture" alt />
            </el-form-item>
            <el-form-item label="公司简介">
              <div v-html="props.row.description"></div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="factoryId" label="工厂ID" width="80"></el-table-column>
      <el-table-column prop="factoryName" label="工厂名称"></el-table-column>
      <el-table-column prop="address" label="工厂地址"></el-table-column>
      <el-table-column label="操作" fixed="right" width="260px">
        <template slot-scope="scope">
          <el-button size="mini">厂区</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
import MyFactoryAdd from "@/views/factory/add";
import MyFactoryEdit from "@/views/factory/edit";
import api from "@/api/index";
import http from "@/utils/http";
import MyCityPicker from "@/components/citypicker";
import baseURL from "@/utils/baseUrl";
export default {
  data() {
    return {
      loading: true,
      Listform: {
        //表格请求params
        pageNum: 1,
        pageSize: 25,
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
      imgUrl: baseURL
    };
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
          content: MyFactoryAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["1200px", "600px"],
        title: "新增工厂信息",
        target: ".el-main"
      });
      this.$layer.full(index);
    },
    handleEdit(idx, row) {
      this.eid = row.factoryId;
      let index = this.$layer.iframe({
        content: {
          content: MyFactoryEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["1200px", "600px"],
        title: "编辑工厂信息",
        target: ".el-main"
      });
      this.$layer.full(index);
      this.index = index;
    },
    handleExport() {},
    handleReset() {
      //重置查询表单
      this.Listform = {
        pageNum: 1,
        pageSize: 25,
        factoryName: ""
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
        did = did + item.factoryId + ",";
      });
      this.did = did.substr(0, did.length - 1);
    },
    handleDelete(index, row) {
      //删除单行
      this.did = row.factoryId + "";
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
          api.delFactoryData({ ids: _this.did }).then(res => {
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
        .getFactoryData(this.Listform)
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
    handleImport() {
      let _this = this;
      let fd = new FormData();
      let file = _this.$refs.file.files[0];
      console.log(file);
      fd.append("file", file);
      http
        .getRequestUpload("/factory/importFile", fd)
        .then(res => {
          // _this.isFail = false;
          // _this.isLoading = false;
          // console.log(res);
        })
        .catch(_ => {
          Message({
            showClose: true,
            message: "上传错误",
            type: "error"
          });
          // _this.isLoading = false;
          // _this.isFail = true;
        });
    },
    handleDetail(index, row) {
      this.$router.push({
        name: "工厂详情",
        params: { fId: row.factoryId }
      });
    }
  },
  created() {
    this.initTable();
  },
  mounted() {},
  beforeMount() {},
  components: {
    MySearchTool,
    MyCityPicker
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
.img {
  max-height: 100px;
}
</style>