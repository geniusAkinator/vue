<template>
  <div class="container">
    <el-tabs type="border-card">
      <el-tab-pane label="监控预览">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="realtime-aside">
              <el-select v-model="factoryId" size="mini">
                <el-option
                  v-for="(item,index) in foption"
                  :key="index"
                  :label="item.factoryName"
                  :value="item.factoryId"
                ></el-option>
              </el-select>
              <el-tree
                class="building-tree"
                :data="data"
                :props="defaultProps"
                default-expand-all
                ref="tree"
              ></el-tree>
            </div>
          </el-col>
          <el-col :span="16">
            <el-row :gutter="20" class="monitor-content">
              <el-col :span="8" v-for="index of 9" :key="index">
                <div class="monitor-item" @click="jump"></div>
              </el-col>
            </el-row>
            <el-pagination
              class="monitor-paing"
              background
              layout="prev, pager, next"
              :total="1000"
            ></el-pagination>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="监控列表">
        <!-- 表格操作 -->
        <div class="table-tool">
          <el-button-group>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              :disabled="did==''"
              @click="handleDeleteMore"
            >批量删除</el-button>
            <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加</el-button>
          </el-button-group>
          <my-search-tool>
            <template slot="content">
              <el-form
                :label-position="labelPosition"
                ref="form"
                :model="Listform"
                label-width="80px"
              >
                <el-form-item label="关键字" size="small">
                  <el-input v-model="Listform.factoryName" placeholder="请输入关键字"></el-input>
                </el-form-item>
              </el-form>
            </template>
            <template slot="end">
              <!-- <el-dropdown size="small" split-button @command="handleClick">
                导出
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="csv">导出到 Csv 文件</el-dropdown-item>
                  <el-dropdown-item command="excel">导出到 Excel 文件</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>-->
              <el-button size="small" @click="handleReset">重置</el-button>
              <el-button size="small" type="primary" @click="handleSearch">查询</el-button>
            </template>
          </my-search-tool>
          <div class="table-tool-others"></div>
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
          <el-table-column prop="name" label="通道国际编号"></el-table-column>
          <el-table-column prop="name" label="通道名称"></el-table-column>
          <el-table-column prop="state" label="状态"></el-table-column>
          <el-table-column prop="state" label="监视预览"></el-table-column>
          <el-table-column prop="state" label="在线人数"></el-table-column>
          <el-table-column prop="state" label="厂家"></el-table-column>
          <el-table-column label="操作" fixed="right" width="240px">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import api from "@/api/index";
import MySearchTool from "@/components/common/searchtool";
import MyCameraAdd from "@/views/realtime/add";
export default {
  data() {
    return {
      filterText: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1"
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      Listform: {
        //表格请求params
        pageNum: 1,
        pageSize: 25
      },
      loading: false,
      total: 0,
      tableData: [],
      isPaging: false,
      currentPage: 1,
      // searchForm: {},
      labelPosition: "left",
      did: "",
      eid: 0,
      options: [
        {
          value: "工厂1",
          label: "工厂1"
        },
        {
          value: "工厂2",
          label: "工厂2"
        }
      ],
      factoryId: "",
      foption: []
    };
  },
  watch: {},
  methods: {
    jump() {
      this.$router.push({
        name: "实时监控详情"
      });
    },
    handleDeleteMore() {},
    handleAdd() {
      var index = this.$layer.iframe({
        content: {
          content: MyCameraAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["500px", "500px"],
        title: "新增监控信息",
        target: ".el-main"
      });
      this.index = index;
      this.$layer.full(index);
    },
    handleReset() {},
    handleSearch() {},
    handleSelectionChange() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    init() {
      api
        .getFactoryData(this.Listform)
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            this.foption = _data.content;
          }
        })
        .catch(_ => {});
    }
  },
  mounted() {
    this.init();
  },
  components: {
    MySearchTool
  }
};
</script>

<style>
.monitor-item {
  width: 100%;
  height: 150px;
  border: 1px solid #efefef;
  margin-top: 20px;
  cursor: pointer;
}
.monitor-content > .el-col:nth-child(-n + 3) > .monitor-item {
  margin-top: 0;
}
.monitor-paing {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.realtime-aside {
  background: #f5f7fa;
  overflow: hidden;
  padding: 20px;
}
.building-tree {
  margin-top: 20px;
  background: #f5f7fa;
}
</style>