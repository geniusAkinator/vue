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
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加栏目</el-button>
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
      <el-table-column prop="menuId" label="菜单ID" width="150"></el-table-column>
      <el-table-column prop="name" label="栏目名称"></el-table-column>
      <el-table-column label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon" :title="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="orderNo" label="排序"></el-table-column>
      <el-table-column label="是否显示">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="220px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" @click="handleMenu(scope.$index, scope.row)">菜单</el-button>
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
import MyMenuAdd from "@/views/menu/add";
import MyMenuEdit from "@/views/menu/edit";
import api from "@/api/index";
import utils from "@/utils/utils";
export default {
  data() {
    return {
      Listform: {
        //表格请求params
        pId: "-1",
        pageNum: 1,
        pageSize: 25
      },
      total: 0, //总共条数
      tableData: [], //表格数据
      searchForm: {},
      labelPosition: "left",
      isPaging: false,
      currentPage: 1,
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
    }
  },
  methods: {
    handleEdit(index, row) {
      this.eid = row.menuId;
      let idx = this.$layer.iframe({
        content: {
          content: MyMenuEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "400px"],
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
          content: MyMenuAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "400px"],
        title: "新增栏目",
        target: ".el-main"
      });
      this.index = idx;
    },
    handleSelectionChange(e) {
      let did = "";
      e.forEach(function(item) {
        did = did + item.menuId + ",";
      });
      this.did = did.substr(0, did.length - 1);
      console.log(this.did);
    },
    handleDeleteMore() {
      this.delRow();
    },
    handleMenu(index, row) {
      // this.$router.push("menuSub", () => {});
      console.log(row);
      this.$router.push({
        name: "菜单管理",
        params: { pId: row.menuId, pName: row.name }
      });
    },
    initTable() {
      api.getMenuData(this.Listform).then(res => {
        console.log(res);
        if (res.code === 200) {
          let _data = res.data;
          console.log("data", res);
          this.total = _data.count; //显示数量
          this.tableData = _data.data; //表格数据
        } else {
        }
      });
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
  mounted() {
    this.initTable();
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