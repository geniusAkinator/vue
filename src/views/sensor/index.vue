<template>
  <div class="container">
    <!-- 表格操作 -->
    <div class="table-tool">
      <el-button-group>
        <el-button type="danger" size="small" icon="el-icon-delete">批量删除</el-button>
        <el-button type="primary" size="small" icon="el-icon-document">导入</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="toAdd">添加</el-button>
      </el-button-group>
    </div>
    <!-- 表格 -->
    <el-table stripe border :data="tableData" align="center" style="width: 100%">
      <el-table-column fixed type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="图片">
              <img :src="props.row.images" alt />
            </el-form-item>
            <el-form-item label="公司简介">
              <span>{{ props.row.introduction }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="传感器ID" width="150"></el-table-column>
      <el-table-column prop="name" label="传感器名称"></el-table-column>
      <el-table-column prop="type" label="传感器类型"></el-table-column>
      <el-table-column label="操作" fixed="right" width="180px">
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
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="prev,pager,next,jumper,total,sizes"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import MyAddPage from "@/views/realtime/add";
import api from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      isPaging: false,
      currentPage4: 1
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    toAdd() {
      
    },
    handleEdit() {}
  },
  created() {
    console.log("dasfads");
    api.getSensorData().then(res => {
      if (res.code === 0) {
        this.tableData = res.data;
        console.log(this.tableData)
      }
    });
  },
  beforeMount() {},
  mounted() {}
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