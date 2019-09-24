<template>
  <div class="container">
    <!-- 表格操作 -->
    <div class="table-tool">
      <el-button-group>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加栏目</el-button>
      </el-button-group>
      <div class="table-tool-others"></div>
    </div>
    <!-- 表格 -->
    <el-table stripe border :data="tableData" align="center" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="150"></el-table-column>
      <el-table-column prop="sys" label="栏目标识"></el-table-column>
      <el-table-column prop="name" label="栏目名称"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column label="操作" fixed="right" width="220px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, tableData)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData)">删除</el-button>
          <el-button size="mini" @click="handleMenu(scope.$index, tableData)">菜单</el-button>
        </template>
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
  </div>
</template>
<script>
import MyMenuAdd from "@/views/menu/add";
import api from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      labelPosition: "left",
      isPaging: false,
      currentPage: 1,
      options: [
        {
          value: "0",
          label: "不限"
        },
        {
          value: "1",
          label: "启用"
        },
        {
          value: "2",
          label: "禁用"
        }
      ]
    };
  },
  methods: {
    handleReset() {},
    handleSearch() {},
    handleEdit() {},
    handleDelete() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleAdd() {
      var index = this.$layer.iframe({
        content: {
          content: MyMenuAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "400px"],
        title: "新增栏目",
        target: ".el-main"
      });
    },
    handleUpload() {},
    handleClick() {},
    handleRecord() {},
    handleMenu() {
        this.$router.push("menuSub", () => {});
    }
  },
  mounted() {
    api.getMenuData().then(res => {
      if (res.code === 0) {
        this.tableData = res.data;
      }
    });
  },
  components: {}
};
</script>
 <style>
</style>