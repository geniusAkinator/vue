<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="14">
        <my-card>
          <template slot="title">
            <i class="el-icon-s-comment"></i>
            探测器基本信息
          </template>
          <template slot="content">
            <ul>
              <li>基本信息</li>
              <li>基本信息</li>
              <li>基本信息</li>
              <li>基本信息</li>
              <li>基本信息</li>
              <li>基本信息</li>
              <li>基本信息</li>
              <li>基本信息</li>
              <li>基本信息</li>
            </ul>
          </template>
        </my-card>
      </el-col>
      <el-col :span="10">
        <my-card>
          <template slot="title">
            <i class="el-icon-switch-button"></i>
            探测器基本信息
          </template>
          <template slot="content"></template>
        </my-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <my-card>
          <template slot="title">
            <i class="el-icon-s-operation"></i>
            数据监控
          </template>
          <template slot="content">
            <el-row :gutter="20">
              <el-col :span="4" :key="index" v-for="(item,index) in statusList">
                <div class="status-item">
                  <i class="el-icon-stopwatch"></i>
                  <div class="desc">
                    <span class="value">28mA</span>
                    <span>剩余电量</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </template>
        </my-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <my-card>
          <template slot="title">
            <i class="el-icon-data-line"></i>
            实时数据
          </template>
          <template slot="content">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="echart-tab">
              <el-tab-pane label="剩余电流" name="first">
                <div style="height:400px">
                  <my-echart-range :id="echart"></my-echart-range>
                </div>
              </el-tab-pane>
              <el-tab-pane label="温度1" name="second">温度1</el-tab-pane>
              <el-tab-pane label="温度2" name="third">温度2</el-tab-pane>
              <el-tab-pane label="温度3" name="fourth">温度3</el-tab-pane>
            </el-tabs>
          </template>
        </my-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="14">
        <my-card>
          <template slot="title">
            <i class="el-icon-s-operation"></i>
            报警信息
          </template>
          <template slot="content">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="time" label="时间"></el-table-column>
              <el-table-column prop="type" label="报警类型"></el-table-column>
              <el-table-column prop="remarks" label="备注"></el-table-column>
            </el-table>
          </template>
        </my-card>
      </el-col>
      <el-col :span="10">
        <my-card>
          <template slot="title">
            <i class="el-icon-s-operation"></i>
            历史参数
          </template>
          <template slot="content">
            <div style="height:300px">
              <my-echart-range :id="echart2"></my-echart-range>
            </div>
          </template>
        </my-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <my-card>
          <template slot="title">
            <i class="el-icon-setting"></i>
            参数设置
          </template>
          <template slot="content">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="name" label="参数名"></el-table-column>
              <el-table-column prop="delay" label="报警延时(s)	"></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </my-card>
      </el-col>
    </el-row>
  </div>
</template>
       

<script>
import MyCard from "@/components/card";
import api from "@/api/index";
import moment from "moment";
import utils from "@/utils/utils";
import MyEchartRange from "@/components/erange";
export default {
  data() {
    return {
      statusList: {},
      orgOptions: {},
      activeName: "first",
      tableData: [],
      echart: "rchart",
      echart2: "rchart2"
    };
  },
  methods: {
    handleClick() {},
    handleEdit() {},
    resizeChart() {
      this.$refs["chart"].resize();
    }
  },
  mounted() {
    api
      .getRealtimeStatus()
      .then(res => {
        if (res.code === 0) {
          this.statusList = res.data;
        }
      })
      .catch(_ => {});
  },
  components: {
    MyCard,
    MyEchartRange
  }
};
</script>

<style scoped>
.el-row + .el-row {
  margin-top: 20px;
}
.status-item {
  background: #e7f1f5;
  border-radius: 5px;
}
.status-item {
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
  display: flex;
  color: rgb(53, 152, 220);
  align-items: center;
}
.status-item .desc {
  margin-left: auto;
}
.status-item i {
  font-size: 34px;
}
.status-item .desc span {
  display: block;
  width: 100%;
}
.status-item .desc .value {
  font-size: 22px;
}
.echarts {
  width: 100%;
  padding: 20px;
}
</style>