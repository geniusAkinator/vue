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
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="栏目标题"></el-table-column>
      <el-table-column prop="op" label="操作方法"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column label="操作" fixed="right" width="220px">
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
import MySubmenuAdd from "@/views/menu/madd";
import api from "@/api/index";
import utils from "@/utils/utils";
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
      ],
      index:""
    };
  },
  watch: {
    index: function(newVal, oldVal) {
      let layer = document.querySelector("#" + newVal);
      if (layer != null) {
        this.layerInitWidth = layer.offsetWidth;
        this.layerInitHeight = layer.offsetHeight;
      }
    }
  },
  methods: {
    handleReset() {},
    handleSearch() {},
    handleEdit() {},
    handleDelete() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleAdd() {
      let idx = this.$layer.iframe({
        content: {
          content: MySubmenuAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "500px"],
        title: "新增栏目",
        target: ".el-main"
      });
      this.index = idx;
    },
    handleUpload() {},
    handleClick() {},
    handleRecord() {},
    handleMenu() {}
  },
  mounted() {
    api.getMenuData().then(res => {
      if (res.code === 0) {
        this.tableData = res.data;
      }
    });
    window.addEventListener("resize", () => {
      if(this.index==""){
        return
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
  components: {}
};
</script>
 <style>
</style>