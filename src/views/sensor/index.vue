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
        <el-dropdown @command="handleCommand" trigger="click">
          <el-button type="primary" size="small" icon="el-icon-plus">
            添加传感器信息
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add">添加型号</el-dropdown-item>
            <el-dropdown-item command="list">型号列表</el-dropdown-item>
            <el-dropdown-item command="addSensor" divided>添加传感器</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleUpload" trigger="click">
          <el-button type="primary" size="small" icon="el-icon-document-add">
            导入
            <i class="el-icon-arrow-down"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="template">下载Excel模板</el-dropdown-item>
            <el-dropdown-item command="upload">上传Excel</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
      <el-table-column prop="transducerId" label="传感器ID" width="80"></el-table-column>
      <el-table-column label="安装位置">
        <el-table-column label="所属工厂">
          <template slot-scope="scope">{{scope.row.factory.factoryName}}</template>
        </el-table-column>
        <el-table-column label="所属楼宇">
          <template slot-scope="scope">{{scope.row.floor.building.name}}</template>
        </el-table-column>
        <el-table-column label="所属楼层">
          <template slot-scope="scope">{{scope.row.floor.floorName}}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="deviceNumber" label="设备编号"></el-table-column>
      <el-table-column label="设备类型">
        <template slot-scope="scope">
          <div v-for="(item,index) in options" :key="index">
            <span v-if="item.value == scope.row.transducerType.type">{{item.label}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="expirationDate" label="到期时间" width="150"></el-table-column>
      <el-table-column label="操作" fixed="right" width="200px">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleSet(scope.$index, scope.row)">配置</el-button> -->
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
        :page-size="Listform.pageSize"
        layout="prev,pager,next,jumper,total,sizes"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import MySearchTool from "@/components/searchtool";
import MySensorAdd from "@/views/sensor/add";
import MySensorEdit from "@/views/sensor/edit";
import MySensorTypeAdd from "@/views/sensor/typeAdd";
import api from "@/api/index";
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
      loading: true,
      did: "",
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
      this.eid = row.transducerId;
      //编辑数据
      let index = this.$layer.iframe({
        content: {
          content: MySensorEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "新增传感器",
        target: ".el-main"
      });
      this.$layer.full(index);
      this.index = index;
    },
    handleExport() {
      //导出数据
    },
    handleReset() {
      //重置搜索菜单
      this.searchForm = {};
    },
    handleSearch() {
      //搜索
    },
    handleAdd() {
      //新增
      let index = this.$layer.iframe({
        content: {
          content: MySensorAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "600px"],
        title: "新增传感器",
        target: ".el-main"
      });
      this.$layer.full(index);
    },
    handleCommand(command) {
      if (command == "add") {
        //添加传感器类型
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
      } else if (command == "list") {
        //查看传感器类型列表
        this.$router.push("sensorType", () => {});
      } else if (command == "addSensor") {
        this.handleAdd();
      }
    },
    handleClick(command) {
      if (command == "excel") {
        window.location.href = "http://192.168.1.99:8888/user/findall";
      }
    },
    handleUpload() {
      //上传
    },
    handleSet() {},
    initTable() {
      //加载表格数据
      let _this = this;
      api
        .getSensorData(this.Listform)
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
    handleSelectionChange(e) {
      let did = "";
      e.forEach(function(item) {
        did = did + item.transducerId + ",";
      });
      this.did = did.substr(0, did.length - 1);
    },
    handleDelete(index, row) {
      //删除单行
      this.did = row.transducerId + "";
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
          api.delSensorData({ ids: _this.did }).then(res => {
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
    handleDetail(index, row) {
      this.$router.push({
        name: "传感器详情",
        params: { sId: row.transducerId }
      });
    }
  },
  created() {
    this.initTable();
  },
  mounted() {},
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