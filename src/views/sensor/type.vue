<template>
  <div class="container">
    <!-- 表格操作 -->
    <div class="table-tool">
      <el-button-group>
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          @click="handleDeleteMore"
          :disabled="did==''"
        >批量删除</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加型号</el-button>
      </el-button-group>
      <my-search-tool>
        <template slot="content">
          <el-form
            :label-position="labelPosition"
            ref="form"
            :model="searchForm"
            label-width="80px"
          >
            <el-form-item label="名称" size="small">
              <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
            <el-form-item label="时间段" size="small">
              <el-date-picker
                v-model="searchForm.range"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :clearable="false"
              ></el-date-picker>
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
      <div class="table-tool-others">
        <div class="el-inline" title="打印">
          <i class="el-icon-printer"></i>
        </div>
      </div>
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
      <el-table-column prop="ttId" label="传感器ID" width="150"></el-table-column>
      <el-table-column prop="name" label="传感器型号"></el-table-column>
      <el-table-column label="设备类型">
        <template slot-scope="scope">
          <div v-for="(item,index) in options" :key="index">
            <span v-if="item.value == scope.row.type">{{item.label}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="250px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleConfig(scope.$index, scope.row)">技术参数</el-button>
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
        :current-page="currentPage4"
        :page-sizes="[25, 50, 75, 100]"
        :page-size="25"
        layout="prev,pager,next,jumper,total,sizes"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import MySearchTool from "@/components/common/searchtool";
import MySensorTypeAdd from "@/views/sensor/typeAdd";
import MySensorTypeEdit from "@/views/sensor/typeEdit";
import MySensorTypeConfig from "@/views/sensor/cedit";
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
      total: 0,
      tableData: [],
      isPaging: false,
      currentPage4: 1,
      searchForm: {},
      labelPosition: "left",
      did: "",
      cid: 0,
      eid: 0,
      index: "",
      options: [
        {
          value: 1,
          label: "温湿度"
        },
        {
          value: 2,
          label: "烟雾"
        },
        {
          value: 3,
          label: "二氧化碳"
        },
        {
          value: 4,
          label: "可燃气体"
        },
        {
          value: 5,
          label: "水压"
        },
        {
          value: 6,
          label: "水深"
        },
        {
          value: 7,
          label: "甲醛"
        }
      ]
    };
  },
  watch: {
    index: function(newVal, oldVal) {
      let layer = document.querySelector("#" + newVal);
      if (layer != null) {
        this.layerInitWidth = layer.offsetWidth;
        this.layerInitHeight = layer.offsetHeight;
      }
    },
    $route: function(newVal, oldVal) {
      this.initTable();
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
    handleEdit(idx, row) {
      this.eid = row.ttId;
      //修改型号
      let index = this.$layer.iframe({
        content: {
          content: MySensorTypeEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        shadeClose: false,
        area: ["400px", "400px"],
        title: "修改型号",
        target: ".el-main"
      });
      this.index = index;
    },
    handleExport() {},
    handleReset() {
      this.searchForm = {};
    },
    handleSearch() {},

    handleClick() {},
    handleAdd() {
      //添加型号
      let index = this.$layer.iframe({
        content: {
          content: MySensorTypeAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        shadeClose: false,
        area: ["400px", "400px"],
        title: "新增型号",
        target: ".el-main"
      });
      this.index = index;
    },
    initTable() {
      //加载表格数据
      let _this = this;
      api
        .getSensorTypeData(this.Listform)
        .then(res => {
          if (res.code === _this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            this.tableData = _data.content;
            this.total = _data.total;
          }
        })
        .catch(_ => {});
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    handleConfig(idx, row) {
      this.cid = row.ttId;
      let index = this.$layer.iframe({
        content: {
          content: MySensorTypeConfig, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "配置技术参数",
        target: ".el-main"
      });
      this.index = index;
    },
    handleDelete(index, row) {
      //删除单行
      this.did = row.ttId + "";
      this.delRow();
    },
    handleDeleteMore() {
      //删除多行
      this.delRow();
    },
    delRow() {
      //删除数据
      let _this = this;
      _this
        .$confirm("确认删除")
        .then(_ => {
          api.delSensorTypeData({ ids: _this.did }).then(res => {
            if (res.code === _this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
              _this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
              _this.initTable(); //重新加载表格
              _this.did = "";
            }
          });
        })
        .catch(_ => {});
    },
    handleSelectionChange(e) {
      let did = "";
      e.forEach(function(item) {
        did = did + item.ttId + ",";
      });
      this.did = did.substr(0, did.length - 1);
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