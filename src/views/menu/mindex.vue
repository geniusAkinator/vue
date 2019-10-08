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
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加菜单</el-button>
      </el-button-group>
      <div class="table-tool-others"></div>
    </div>
    <!-- 表格 -->
    <el-table
      stripe
      border
      :data="tableData"
      align="center"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="menuId" label="ID"></el-table-column>
      <el-table-column prop="name" label="菜单名称"></el-table-column>
      <el-table-column prop="url" label="路径名称"></el-table-column>
      <el-table-column prop="orderNo" label="排序"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{scope.row.state?'显示':'不显示'}}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="220px">
        <template slot-scope="scope">
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
import MySubmenuAdd from "@/views/menu/madd";
import MySubmenuEdit from "@/views/menu/medit";
import api from "@/api/index";
import utils from "@/utils/utils";
export default {
  data() {
    return {
      Listform: {
        //表格请求params
        pId: 0,
        pageNum: 1,
        pageSize: 25
      },
      total: 0, //总条数
      tableData: [],
      searchForm: {},
      labelPosition: "left",
      isPaging: false,
      currentPage: 1,
      pId: 0,
      pName: "",
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
      index: "",
      did: "", //删除的id
      eid: 0 //编辑的id
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
      let name = newVal.name;
      if (name == "菜单管理") {
        this.Listform.pId = this.$route.params.pId;
        this.pId = this.$route.params.pId;
        this.pName = this.$route.params.pName;
        this.initTable();
      }
    }
  },
  methods: {
    handleReset() {},
    handleSearch() {},
    handleEdit(index, row) {
      this.eid = row.menuId;
      let idx = this.$layer.iframe({
        content: {
          content: MySubmenuEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "500px"],
        title: "编辑栏目",
        target: ".el-main"
      });
      this.index = idx;
    },
    handleDelete(index, row) {
      //删除单行
      this.did = row.menuId + "";
      this.delRow();
    },
    handleSizeChange(e) {
      this.Listform.pageSize = e;
      this.initTable();
    },
    handleCurrentChange(e) {
      console.log(e);
      this.Listform.pageNum = e;
      this.initTable();
    },
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
    handleDeleteMore() {
      this.delRow();
    },
    initTable() {
      this.Listform.pId = this.$route.params.pId;
      api
        .getMenuData(this.Listform)
        .then(res => {
          if (res.code === 200) {
            let _data = res.data;
            this.total = _data.count; //显示数量
            this.tableData = _data.data; //表格数据
          }
        })
        .catch(_ => {});
    },
    handleSelectionChange(e) {
      let did = "";
      e.forEach(function(item) {
        did = did + item.menuId + ",";
      });
      this.did = did.substr(0, did.length - 1);
    },
    delRow() {
      let _this = this;
      _this
        .$confirm("确认删除")
        .then(_ => {
          api.delMenuData({ pId: _this.did }).then(res => {
            if (res.code === 200) {
              _this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
              _this.initTable(); //重新 render 表格
            }
          });
        })
        .catch(_ => {});
    }
  },
  created() {
    this.pId = this.$route.params.pId;
    this.pName = this.$route.params.pName;
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
  components: {}
};
</script>
 <style>
</style>