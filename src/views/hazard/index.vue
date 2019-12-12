<template>
  <div class="container">
    <el-card class="state-card">
      <el-row :gutter="20">
        <el-col :span="12">
          <ul class="state_block">
            <li class="state_item">
              <span>待处理统计</span>
              <div class="border-circle warning">0</div>
            </li>
            <li class="state_item">
              <span>累计处理统计</span>
              <div class="border-circle danger">0</div>
            </li>
          </ul>
        </el-col>
        <el-col :span="12">
          <ul class="info_block">
            <li class="info_item">
              <span class="info_name">最常见隐患类型</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
    <div class="table-tool">
      <my-search-tool>
        <template slot="content">
          <el-form :label-position="labelPosition" ref="form" :model="Listform" label-width="80px">
            <el-form-item label="关键字" size="small">
              <el-date-picker
                v-model="sform.datetimerange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="所属代理" size="small">
              <el-select v-model="sform.mainId" placeholder="请选择所属代理">
                <el-option
                  v-for="item in moptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属工厂" size="small">
              <el-select v-model="sform.mainId" placeholder="请选择所属工厂">
                <el-option
                  v-for="item in foptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
    <el-table
      stripe
      border
      :data="tableData"
      align="center"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column prop="hdId" label="隐患ID" width="80"></el-table-column>
      <el-table-column prop="content" label="隐患内容"></el-table-column>
      <el-table-column prop="type" label="隐患类型"></el-table-column>
      <el-table-column prop="currdate" label="上报时间"></el-table-column>
      <el-table-column prop="factory.factoryName" label="工厂名称"></el-table-column>
      <el-table-column prop="transducer.deviceNumber" label="设备编号"></el-table-column>
      <el-table-column label="操作" fixed="right" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" @click="handleNotice(scope.$index, scope.row)">通知</el-button>
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
import MySearchTool from "@/components/common/searchtool";
import api from "@/api/index";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: [],
      loading: false,
      Listform: {
        pageNum: 1,
        pageSize: 25
      },
      sform: {
        datetimerange: "",
        mainId: ""
      },
      moptions: [],
      foptions: [],
      labelPosition: "left",
      isPaging: false,
      currentPage: 1,
      total: 0
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    initTable() {
      api
        .getHazardData(this.Listform)
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            this.tableData = _data.content;
            this.total = _data.total;
            console.log(this.tableData);
          }
        })
        .catch(_ => {});
    },
    handleDetail() {
      this.$router.push({
        name: "隐患详情"
      });
    },
    handleNotice() {},
    handleReset() {},
    handleSearch() {}
  },
  mounted() {
    this.initTable();
  },
  components: {
    MySearchTool
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