<template>
  <div class="container">
    <!-- 表格操作 -->
    <div class="table-tool">
      <el-button-group>
        <el-button type="danger" size="small" icon="el-icon-delete">批量删除</el-button>
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
      <div class="table-tool-others"></div>
    </div>
    <!-- 表格 -->
    <el-table stripe border :data="tableData" align="center" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="150"></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="type" label="状态"></el-table-column>
      <el-table-column label="操作" fixed="right" width="180px">
        <template slot-scope="scope">
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
import MySearchTool from "@/components/common/searchtool";
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
    handleDelete() {},
    handleReset() {},
    handleSearch() {},
    handleClick() {},
    handleCurrentChange() {},
    handleSizeChange() {}
  },
  components: {
    MySearchTool
  }
};
</script>

<style scoped>
</style>