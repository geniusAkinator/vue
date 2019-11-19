<template>
  <div class="container">
    <el-card class="state-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="8">
          <ul class="hazard-block">
            <li>
              <span class="info_name">实时待处理火警数</span>
              <div class="border-circle warning">0</div>
            </li>
            <li>
              <span class="info_name">累计火警数</span>
              <div class="border-circle danger">0</div>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul class="hazard-block">
            <li>
              <span class="info_name">火警最多防火分区</span>
              <span class="info_value">默认防火分区</span>
            </li>
            <li>
              <span class="info_name">超时率</span>
              <span class="info_value">20.16%</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul class="hazard-block">
            <li>
              <span class="info_name">火警误报最多设备类型</span>
              <span class="info_value">智能烟感</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
    <el-tabs class="table" type="border-card">
      <el-tab-pane label="待处理">
        <el-table
          stripe
          border
          :data="tableData"
          align="center"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="area" label="防火分区" width="80"></el-table-column>
          <el-table-column prop="device" label="报警设备"></el-table-column>
          <el-table-column prop="count" label="报警点位数"></el-table-column>
          <el-table-column label="操作" fixed="right" width="100px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
      </el-tab-pane>
      <el-tab-pane label="已处理">
        <el-table
          stripe
          border
          :data="tableData"
          align="center"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="area" label="防火分区" width="80"></el-table-column>
          <el-table-column prop="device" label="报警设备"></el-table-column>
          <el-table-column prop="count" label="报警点位数"></el-table-column>
          <el-table-column prop="handler" label="处理人"></el-table-column>
          <el-table-column prop="dateTime" label="处理时间"></el-table-column>
          <el-table-column label="操作" fixed="right" width="100px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{}],
      loading: false,
      Listform: {
        pageNum: 1,
        pageSize: 25
      },
      isPaging: false,
      currentPage: 1,
      total: 0
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    initTable() {},
    handleDetail() {
      this.$router.push({
        name: "火警详情"
      });
    }
  },
  mounted() {
    this.initTable();
  }
};
</script>

<style>
.table {
  margin-top: 20px;
}
.hazard-block {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.hazard-block {
  display: flex;
  justify-content: space-around;
}
.hazard-block li span {
  text-align: center;
  display: block;
}
.hazard-block .info_value {
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  width: 100%;
  padding: 50px 0;
}
.info_name + .border-circle {
  margin-top: 20px;
}
.border-circle {
  width: 100px;
  height: 100px;
  border: 2px solid #409eff;
  text-align: center;
  line-height: 100px;
  border-radius: 50%;
}
.border-circle.danger {
  border: 2px solid #f56c6c;
  background: #fff;
}
.border-circle.warning {
  border: 2px solid #e6a23c;
  background: #fff;
}
</style>