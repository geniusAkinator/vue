<template>
  <div class="container">
    <!-- 表格操作 -->
    <div class="table-tool">
      <el-button-group>
        <el-button type="danger" size="small" icon="el-icon-delete">批量删除</el-button>
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
              <el-input v-model="searchForm.name" prefix-icon="el-icon-search"></el-input>
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
    <el-table stripe border :data="tableData" align="center" style="width: 100%">
      <el-table-column fixed type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="图片">
              <img :src="props.row.images" alt />
            </el-form-item>
            <el-form-item label="公司简介">
              <span>{{ props.row.introduction }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="传感器ID" width="150"></el-table-column>
      <el-table-column prop="name" label="传感器类型名称"></el-table-column>
      <el-table-column label="操作" fixed="right" width="180px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, tableData)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="isPaging"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="prev,pager,next,jumper,total,sizes"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import MySearchTool from "@/components/searchtool";
import MySensorAdd from "@/views/sensor/add";
import MySensorTypeAdd from "@/views/sensor/typeAdd";
import api from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      isPaging: false,
      currentPage4: 1,
      searchForm: {},
      labelPosition: "left",
      loading: true
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    handleEdit() {},
    handleExport() {},
    handleReset() {
      this.searchForm = {};
    },
    handleSearch() {},
    handleLoadingClose() {
      setTimeout(() => {
        this.loading = false;
      }, 900);
    },
    handleClick() {}
  },
  mounted() {
    const loading = this.$loading({
      target: document.querySelector(".el-main.app-body"),
      lock: true,
      text: "加载中...",
      spinner: "loading",
      background: "rgba(0, 0, 0, 0.7)",
      customClass: "el-loading"
    });
    setTimeout(() => {
      loading.close();
      api.getSensorData().then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
        }
      });
    }, 600);
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