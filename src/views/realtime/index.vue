<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新疆巴州库尔勒市德邦物流分拨中心</span>
      </div>
      <div class="text item">
        <el-row>
          <el-col :span="8">
            <i class="el-icon-office-building"></i>
            项目识别号：201801110001
          </el-col>
          <el-col :span="8">
            <ul>
              <li>项目名称:</li>
              <li>项目识别号:</li>
              <li>所属客户:</li>
              <li>地址:</li>
              <li>建筑面积:</li>
              <li>消防设施:</li>
              <li>安全责任人:</li>
              <li>联系电话:</li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul>
              <li>设备数量:</li>
              <li>探测器数量:</li>
              <li>在线设备数量:</li>
              <li>失联设备数量::</li>
              <li>报警探测器数量:</li>
              <li>故障探测器数量:</li>
              <li>未处理隐患数量:</li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span>下属设备及探测器</span>
      </div>
      <div class="text item">
        <div class="tips">
          <div class="tips-item">
            <i class="circle success"></i>
            正常
          </div>
          <div class="tips-item">
            <i class="circle warning"></i>
            报警
          </div>
          <div class="tips-item">
            <i class="circle danger"></i>
            故障
          </div>
          <div class="tips-item">
            <i class="circle info"></i>
            通讯中断（失联）
          </div>
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
          <el-table-column prop="id" label="探测器ID" width="150"></el-table-column>
          <el-table-column prop="name" label="探测器区域"></el-table-column>
          <el-table-column prop="province" label="探测器位置"></el-table-column>
          <el-table-column prop="status" label="探测器状态"></el-table-column>
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
    </el-card>
  </div>
</template>

<script>
import MySearchTool from "@/components/searchtool";
import api from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      isPaging: false,
      currentPage4: 1,
      searchForm: {},
      labelPosition: "left"
    };
  },
  methods: {
    handleClick(command) {
      if(command=='csv'){

      }else if(command=='excel'){
       
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleReset() {
      //重置
      this.searchForm = {};
    },
    handleSearch() {
      //查询
    },
    handleExport() {
      //导出
    }
  },
  created() {
    api.getRealtimeData().then(res => {
      if (res.code == 0) {
        this.tableData = res.data;
      }
    });
  },
  components: {
    MySearchTool
  }
};
</script>

<style scoped>
</style>