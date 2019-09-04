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
                <!-- <chart ref="chart" :options="orgOptions" :auto-resize="true"></chart> -->
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
          <template slot="content">ddddddddd</template>
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
// import echarts from "echarts";
import moment from "moment";
import utils from "@/utils/utils";
export default {
  data() {
    return {
      statusList: {},
      orgOptions: {},
      activeName: "first",
      tableData: []
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
    api.getRealtimeStatus().then(res => {
      if (res.code === 0) {
        this.statusList = res.data;
      }
    });
    var base = +new Date(2019, 7, 28, 0, 0, 0);
    var onMin = 1000 * 60; //一分钟刷新一次
    var date = [];
    var date2 = [];
    var data = [Math.random() * 300];
    for (var i = 1; i < 1440; i++) {
      var now = new Date((base += onMin));
      date.push(
        [
          now.getHours(),
          now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(),
          now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()
        ].join(":")
      );
      data.push(Math.round(Math.random() * 20 + 10));
    }
    for (var i = 1; i < 1000; i++) {
      var now = new Date((base += onMin));
      date2.push(Math.round(Math.random() * 20 + 10));
    }
    this.orgOptions = {
      tooltip: {
        trigger: "axis",
        position: function(pt) {
          return [pt[0], "10%"];
        }
      },
      legend: {
        data: ["昨日剩余电流", "今日剩余电流"]
      },
      title: {
        left: "left",
        text: "今日数据"
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none"
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: date
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"]
      },
      dataZoom: [
        {
          type: "inside",
          start: 40,
          end: 60
        },
        {
          start: 0,
          end: 10,
          handleIcon:
            "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          handleSize: "80%",
          handleStyle: {
            color: "#fff",
            shadowBlur: 3,
            shadowColor: "rgba(0, 0, 0, 0.6)",
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }
      ],
      series: [
        {
          name: "昨日剩余电流",
          type: "line",
          smooth: true,
          symbol: "none",
          sampling: "average",
          itemStyle: {
            color: "rgb(255, 70, 131)"
          },
          data: data
        },
        {
          name: "今日剩余电流",
          type: "line",
          smooth: true,
          symbol: "none",
          sampling: "average",
          itemStyle: {
            color: "rgb(23, 135, 221)"
          },
          data: date2
        }
      ]
    };
    this.$nextTick(() => {
      window.addEventListener("resize", utils.decounce(this.resizeChart, 100)); // 调用decounce函数
    });
  },
  components: {
    MyCard
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