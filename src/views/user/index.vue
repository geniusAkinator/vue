<template>
  <div class="container">
    <el-alert title="警告提示的文案" type="warning" show-icon :closable="false"></el-alert>
    <!-- 表格操作 -->
    <div class="table-tool">
      <el-button-group>
        <el-button type="danger" size="small" icon="el-icon-delete" :disabled="did==''">批量删除</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加</el-button>
      </el-button-group>
      <my-search-tool>
        <template slot="content">
          <el-form
            :label-position="labelPosition"
            ref="form"
            :model="searchForm"
            label-width="80px"
          >
            <el-form-item label="角色状态" size="small">
              <el-select v-model="searchForm.status" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色名称" size="small">
              <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template slot="end">
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="150"></el-table-column>
      <el-table-column prop="code" label="用户代码"></el-table-column>
      <el-table-column prop="name" label="用户名称"></el-table-column>
      <el-table-column prop="entryName" label="登录入口"></el-table-column>
      <el-table-column prop="role" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="username" label="用户名称"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" fixed="right" width="180px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index,  scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,  scope.row)">删除</el-button>
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
import MySearchTool from "@/components/searchtool";
import MyUserAdd from "@/views/user/add";
import api from "@/api/index";
export default {
  data() {
    return {
      Listform: {
        //表格请求params
        pageNum: 1,
        pageSize: 25
      },
      total: 0, //总共条数
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
      did: ""
    };
  },
  methods: {
    handleEdit() {},
    handleDelete(index, row) {
      //删除单行
      this.did = row.menuId + "";
      this.delRow();
    },
    handleAdd() {
      var index = this.$layer.iframe({
        content: {
          content: MyUserAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: false,
        area: ["1200px", "600px"],
        title: "新增用户",
        target: ".el-main"
      });
      this.$layer.full(index);
    },
    handleReset() {},
    handleSearch() {},
    handleClick() {},
    handleSizeChange(e) {
      this.Listform.pageSize = e;
      this.initTable();
    },
    handleCurrentChange(e) {
      console.log(e);
      this.Listform.pageNum = e;
      this.initTable();
    },
    handleSelectionChange(e) {
      let did = "";
      e.forEach(function(item) {
        did = did + item.menuId + ",";
      });
      this.did = did.substr(0, did.length - 1);
      console.log(this.did);
    },
    initTable() {
      api
        .getUserData(this.Listform)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            let _data = res.data;
            console.log("data", res);
            this.total = _data.count; //显示数量
            this.tableData = _data.data; //表格数据
          } else {
          }
        })
        .catch(_ => {});
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
    this.initTable();
  },
  components: {
    MySearchTool
  }
};
</script>

<style scoped>
</style>