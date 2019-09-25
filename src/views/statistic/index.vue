<template>
  <div class="container">
    <el-card class="box-card" shadow="hover" style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span>探测器状态分析报告</span>
        <el-button class="header_right" type="text">
          <el-radio-group v-model="labelPos" size="small">
            <el-radio-button label="monthly">月报</el-radio-button>
            <el-radio-button label="weekly">周报</el-radio-button>
          </el-radio-group>
        </el-button>
      </div>
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
              <el-form-item label="设备" size="small">
                <el-input v-model="searchForm.name"></el-input>
              </el-form-item>
              <el-form-item label="创建时间" size="small">
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
        @row-click="handleRowClick"
      >
        <el-table-column label="用电警告">
          <el-table-column prop="name" label="剩余电量(Max)"></el-table-column>
          <el-table-column prop="name" label="告警总次数"></el-table-column>
          <el-table-column prop="name" label="告警次数最多位置"></el-table-column>
          <el-table-column prop="name" label="告警最多位置告警次数"></el-table-column>
        </el-table-column>
        <el-table-column label="温度警告">
          <el-table-column prop="name" label="温度值(Max)"></el-table-column>
          <el-table-column prop="name" label="告警总次数"></el-table-column>
          <el-table-column prop="name" label="告警次数最多位置"></el-table-column>
          <el-table-column prop="name" label="告警最多位置告警次数"></el-table-column>
        </el-table-column>
        <el-table-column label="液位警告">
          <el-table-column prop="name" label="液位值(Max)"></el-table-column>
          <el-table-column prop="name" label="告警总次数"></el-table-column>
          <el-table-column prop="name" label="告警次数最多位置"></el-table-column>
          <el-table-column prop="name" label="告警最多位置告警次数"></el-table-column>
        </el-table-column>
        <el-table-column label="噪声强度">
          <el-table-column prop="name" label="噪声强度(Max)"></el-table-column>
          <el-table-column prop="name" label="告警总次数"></el-table-column>
          <el-table-column prop="name" label="告警次数最多位置"></el-table-column>
          <el-table-column prop="name" label="告警最多位置告警次数"></el-table-column>
        </el-table-column>
        <el-table-column label="通讯中断隐患">
          <el-table-column prop="name" label="告警总次数"></el-table-column>
          <el-table-column prop="name" label="告警次数最多位置"></el-table-column>
          <el-table-column prop="name" label="告警最多位置告警次数"></el-table-column>
        </el-table-column>
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

      <el-table
        stripe
        border
        :data="tableData2"
        align="center"
        style="width: 100%;margin-top:100px;"
        @row-click="handleRowClick"
      >
        <el-table-column prop="amount" label="设备总数"></el-table-column>
        <el-table-column prop="battery" label="剩余电流总报警"></el-table-column>
        <el-table-column prop="overheart" label="超温总报警"></el-table-column>
        <el-table-column prop="overpower" label="过流总报警"></el-table-column>
        <el-table-column prop="overvoltage" label="过压总报警"></el-table-column>
        <el-table-column prop="liquidlevel" label="液位总报警"></el-table-column>
        <el-table-column prop="name" label="欠压力总报警"></el-table-column>
        <el-table-column prop="shot" label="短路总报警"></el-table-column>
        <el-table-column prop="disconnection" label="断路总报警"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import MySearchTool from "@/components/searchtool";
export default {
  data() {
    return {
      tableData: [],
      isPaging: false,
      currentPage: 1,
      searchForm: {},
      labelPosition: "left",
      labelPos: "weekly",
      tableData2: []
    };
  },
  methods: {
    handleRowClick() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClick() {},
    handleReset() {
      this.searchForm = {};
    },
    handleSearch() {}
  },
  components: {
    MySearchTool
  }
};
</script>
<style>
/* .sta_header {
  display: flex;
  align-items: center;
}
.el-card__header {
  padding: 10px 20px;
} */
.el-table thead {
  background: #f5f7fa !important;
}
</style>