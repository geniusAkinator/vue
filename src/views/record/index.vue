<template>
  <div class="container">
    <!-- 表格操作 -->
    <div class="table-tool">
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
          <el-button size="small" @click="handleReset">重置</el-button>
          <el-button size="small" type="primary" @click="handleSearch">查询</el-button>
        </template>
      </my-search-tool>
      <div class="table-tool-others"></div>
    </div>
    <!-- 表格 -->
    <el-table stripe border :data="tableData" align="center" style="width: 100%">
      <el-table-column prop="id" label="ID" width="150"></el-table-column>
      <el-table-column prop="name" label="巡检计划"></el-table-column>
      <el-table-column prop="name" label="时间计划"></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="isPaging"
        :current-page="currentPage"
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
import MyFactoryAdd from "@/views/factory/add";
import api from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      isPaging: false,
      currentPage: 1,
      searchForm: {},
      labelPosition: "left"
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    handleReset() {
      this.searchForm = {};
    },
    handleSearch() {},
    handleClick(command) {
      if (command == "csv") {
      } else if (command == "excel") {
      }
    },
    handleUpload() {}
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
      api.getFactoyData().then(res => {
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