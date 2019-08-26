<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新疆巴州库尔勒市德邦物流分拨中心</span>
      </div>
      <div class="text item">
        <el-row>
          <el-col :span="8">
            <i class="el-icon-office-building"></i>
            项目识别号：201801110001
          </el-col>
          <el-col :span="8">
            <ul>
              <li>项目名称:</li>
              <li>项目识别号:</li>
              <li>所属客户:</li>
              <li>地址:</li>
              <li>建筑面积:</li>
              <li>消防设施:</li>
              <li>安全责任人:</li>
              <li>联系电话:</li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul>
              <li>设备数量:</li>
              <li>探测器数量:</li>
              <li>在线设备数量:</li>
              <li>失联设备数量::</li>
              <li>报警探测器数量:</li>
              <li>故障探测器数量:</li>
              <li>未处理隐患数量:</li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span>下属设备及探测器</span>
      </div>
      <div class="text item">
        <div class="tips">
          <div class="tips-item">
            <i class="circle success"></i>
            正常
          </div>
          <div class="tips-item">
            <i class="circle warning"></i>
            报警
          </div>
          <div class="tips-item">
            <i class="circle danger"></i>
            故障
          </div>
          <div class="tips-item">
            <i class="circle info"></i>
            通讯中断（失联）
          </div>
        </div>
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
          <el-table-column fixed type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="探测器ID	" width="150"></el-table-column>
          <el-table-column prop="name" label="探测器区域	"></el-table-column>
          <el-table-column prop="province" label="探测器位置	"></el-table-column>
          <el-table-column prop="city" label="探测器状态"></el-table-column>
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
    </el-card>
  </div>
</template>

<script>
import MyAddPage from "@/views/realtime/add";
export default {
  data() {
    return {
      tableData: [
        {
          id:1,
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          id:2,
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      isPaging: false,
      currentPage4: 1
    };
  },
  methods: {
    handleEdit(index, rows) {},
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    toAdd() {
      this.$layer.iframe({
        content: {
          content: MyAddPage, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        offset:['200,60'],
        area: ["800px", "600px"],
        title: "editForm",
        insertNode:".el-main"
      });
    }
  },
  components: {
    MyAddPage
  }
};
</script>

<style scoped>
</style>