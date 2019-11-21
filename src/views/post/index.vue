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
              <el-input v-model="Listform.noticeName" placeholder="请输入关键字（列：公告名称）"></el-input>
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
      <el-table-column prop="noticeId" label="公告ID" width="80"></el-table-column>
      <el-table-column prop="factory.factoryName" label="所属工厂"></el-table-column>
      <el-table-column prop="noticeName" label="公告标题"></el-table-column>
      <el-table-column prop="type" label="公告类型">
        <template slot-scope="scope">
          <div v-for="(item,key) in options" :key="key">
            <span v-if="item.value==scope.row.type">
              {{item.label}}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <span
            :class="!scope.row.state ? 'danger' : 'success'"
          >{{ !scope.row.state ? '未通过' : '已通过' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="220px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="!scope.row.state"
            @click="handleCheck(scope.$index, scope.row)"
          >审核</el-button>
          <el-button
            size="mini"
            v-if="scope.row.state"
            @click="handleCheck(scope.$index, scope.row)"
          >反审</el-button>
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
import MyPostAdd from "@/views/post/add";
import MyPostEdit from "@/views/post/edit";
import api from "@/api/index";
import http from "@/utils/http";
import baseURL from "@/utils/baseUrl";
export default {
  data() {
    return {
      loading: true,
      Listform: {
        //表格请求params
        pageNum: 1,
        pageSize: 25,
        noticeName: ""
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
      options: [
        {
          value: "1",
          label: "通知公告"
        },
        {
          value: "2",
          label: "综合信息"
        }
      ]
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
          content: MyPostAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["1200px", "600px"],
        title: "新增公告信息",
        target: ".el-main"
      });
      this.$layer.full(index);
    },
    handleEdit(idx, row) {
      this.eid = row.noticeId;
      let index = this.$layer.iframe({
        content: {
          content: MyPostEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["1200px", "600px"],
        title: "编辑公告信息",
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
        noticeName: ""
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
        did = did + item.noticeId + ",";
      });
      this.did = did.substr(0, did.length - 1);
    },
    handleDelete(index, row) {
      //删除单行
      this.did = row.noticeId + "";
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
          api.delNoticeData({ ids: _this.did }).then(res => {
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
        .getNoticeData(this.Listform)
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
    handleCheck(index, row) {
      // console.log(row);
      let rform = {};
      rform.noticeId = row.noticeId;
      rform.content = row.content;
      rform.description = row.description;
      rform.type = row.type + "";
      rform.noticeName = row.noticeName;
      rform.keyword = row.keyword;
      rform.file = row.file;
      if (row.state) {
        rform.state = 0;
      } else {
        rform.state = 1;
      }
      api
        .updateNoticeData(rform)
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            this.$message({
              showClose: true,
              message: "编辑成功",
              type: "success"
            });
            this.initTable();
          } else {
            this.$message({
              showClose: true,
              message: "编辑失败",
              type: "warning"
            });
          }
        })
        .catch(_ => {});
    }
  },
  created() {
    this.initTable();
  },
  mounted() {},
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
.success {
  color: #67c23a;
}
.danger {
  color: #f56c6c;
}
</style>