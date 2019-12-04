<template>
  <div class="container dark">
    <el-row :gutter="20" class="platform-box">
      <el-col :span="8">
        <el-col :span="24" class="box-item">
          <el-col :span="12">
            <div id="dashboard"></div>
          </el-col>
          <el-col :span="12">
            <div class>
              <div class>
                <i class="el-icon-office-building"></i>
                <span>负责建筑</span>
              </div>
              <div class>
                <i class="el-icon-user"></i>
                <span>管理员</span>
              </div>
            </div>
          </el-col>
        </el-col>
        <el-col :span="24" class="box-item">
          <el-col :span="8">
            <ul class="platform-list">
              <li class="platform-item">今日火警</li>
              <li class="platform-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="platform-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="platform-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="platform-list">
              <li class="platform-item title">今日火警</li>
              <li class="platform-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="platform-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="platform-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="platform-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="platform-list">
              <li class="platform-item">今日火警</li>
              <li class="platform-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="platform-item">
                <i class="el-icon-stopwatch"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
            </ul>
          </el-col>
        </el-col>
        <el-col :span="24" class="box-item">
          <div id="today_chart"></div>
        </el-col>
      </el-col>
      <el-col :span="8">
        <el-col :span="24" class="box-item middle">楼层预览</el-col>
        <el-col :span="24" class="box-item">
          <el-table :data="tableData" class="platform-table" style="width: 100%">
            <el-table-column prop="datetime" label="时间"></el-table-column>
            <el-table-column prop="pos" label="传感器位置"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="state" label="状态（故障描述）"></el-table-column>
          </el-table>
        </el-col>
      </el-col>
      <el-col :span="8">
        <el-col :span="24" class="box-item">
          <el-col :span="12"></el-col>
          <el-col :span="12"></el-col>
        </el-col>
        <el-col :span="24" class="box-item">
          <div id="pie_chart"></div>
        </el-col>
        <el-col :span="24" class="box-item">
          <el-col :span="12" style="height:50%">
            <div id="rchart1"></div>
          </el-col>
          <el-col :span="12" style="height:50%">
            <div id="rchart2"></div>
          </el-col>
          <el-col :span="12" style="height:50%">
            <div id="rchart3"></div>
          </el-col>
          <el-col :span="12" style="height:50%">
            <div id="rchart4"></div>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tchart: {},
      bchart: {},
      rchart1: {},
      rchart2: {},
      rchart3: {},
      rchart4: {},
      pchart: {},
      chart1: "pechart",
      chart2: "pechart1"
    };
  },
  methods: {
    resizeChart() {
      this.tchart.resize();
    },
    initTodayChart() {
      //今日传感器
      this.tchart = echarts.init(document.getElementById("today_chart"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["2019年"]
        },
        grid: {
          top: "6%",
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLine: {
            lineStyle: {
              color: "#fff" //轴颜色
            }
          },
          splitLine: { show: false } //隐藏网格
        },
        yAxis: {
          type: "category",
          data: ["气体传感器", "温湿度", "烟感传感器"],
          axisLine: {
            lineStyle: {
              color: "#fff" //轴颜色
            }
          }
        },
        series: [
          {
            name: "2011年",
            type: "bar",
            data: [18203, 23489, 29034],
            barWidth: 30, //柱图宽度
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "#6e7eff" },
                  { offset: 1, color: "#1fcbfc" }
                ])
              }
            }
          }
        ]
      };
      this.tchart.setOption(option);
      window.addEventListener("resize", this.resizeChart);
    },
    initDashboard() {
      //仪表盘
      this.bchart = echarts.init(document.getElementById("dashboard"));
      let option = {
        series: [
          {
            name: "高程",
            type: "gauge",
            center: ["50%", "75%"], // 默认全局居中
            radius: "140%", //仪表大小
            startAngle: 180, //开始角度
            endAngle: 0, //结束角度
            min: 0, //最小角度
            max: 100, //最小角度
            axisLine: {
              show: true,
              lineStyle: {
                width: 20, //颜色宽度
                shadowBlur: 0,
                color: [[0.2, "#E43F3D"], [0.6, "#E98E2C"], [1, "#7CBB55"]]
              }
            },
            axisTick: {
              show: true,
              splitNumber: 2 //刻度
            },
            splitLine: {
              show: true,
              length: 25, //最大刻度长度
              lineStyle: {
                //color:'black'
              }
            },
            axisLabel: {
              formatter: function(e) {
                switch (e + "") {
                  case "20":
                    return "报警";
                  case "60":
                    return "预警";
                  default:
                    return e;
                }
              },
              textStyle: {
                fontSize: 12,
                fontWeight: ""
              }
            },
            pointer: {
              show: true
            },
            detail: {
              //show:false,
              formatter: function(param) {
                var level = "";
                if (param < 60) {
                  level = "报警";
                } else if (param <= 80) {
                  level = "预警";
                } else if (param <= 100) {
                  level = "正常";
                }
                return level;
              },
              offsetCenter: [0, 30],
              textStyle: {
                fontSize: 16
              }
            },
            data: [
              {
                name: "",
                value: 50
              }
            ]
          }
        ]
      };
      this.bchart.setOption(option);
    },
    initRealtimeChart() {
      //
      this.rchart1 = echarts.init(document.getElementById("rchart1"));
      let option = {
        color: ["#fff"],
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#fff" //轴颜色
            }
          }
        },
        grid: {
          top: "15%",
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff" //轴颜色
            }
          },
          splitLine: { show: false } //隐藏网格
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            areaStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#4D96C2"
                    },
                    {
                      offset: 1,
                      color: "#085EAA"
                    }
                  ],
                  globalCoord: false
                }
              }
            }
          }
        ]
      };
      this.rchart1.setOption(option);
    },
    initRealtimeChart2() {
      this.rchart2 = echarts.init(document.getElementById("rchart2"));
      let option = {
        color: ["#fff"],
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#fff" //轴颜色
            }
          }
        },
        grid: {
          top: "15%",
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff" //轴颜色
            }
          },
          splitLine: { show: false } //隐藏网格
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            areaStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#4D96C2"
                    },
                    {
                      offset: 1,
                      color: "#085EAA"
                    }
                  ],
                  globalCoord: false
                }
              }
            }
          }
        ]
      };
      this.rchart2.setOption(option);
    },
    initPieChart() {
      this.pchart = echarts.init(document.getElementById("pie_chart"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            color: ["#33AB9F", "#DF9499", "#FFC799", "#7FC693", "#4BB2FF"],
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.pchart.setOption(option);
    }
  },
  mounted() {
    this.initTodayChart();
    this.initDashboard();
    this.initRealtimeChart();
    this.initRealtimeChart2();
    this.initPieChart();
  },
  components: {}
};
</script>

<style>
.container {
  width: 100%;
  height: 100%;
  padding: 0;
  background: url("../../../static/images/chart_bg.jpg");
  overflow: hidden;
  color: #fff;
}
.platform-box {
  height: 100%;
}
.platform-box > div {
  height: 100%;
}
.box-item {
  height: calc((100% - 40px) / 3);
  margin-bottom: 20px;
}
.box-item:last-child {
  margin-bottom: 0;
}
.middle {
  height: calc((200% - 20px) / 3);
}
.platform-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.platform-item {
  display: flex;
}
.platform-item p {
  margin: 0;
  padding: 0;
}
#today_chart {
  width: 100%;
  height: 100%;
}
.box-item {
  border: 1px solid #999;
}
.box-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.platform-list {
  background: #1a1f30;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
}
.platform-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.platform-item i {
  margin-right: 10px;
  color: #999;
}
.platform-item p {
  color: #999;
  font-size: 12px;
}
.platform-item span {
  color: #fff;
  font-size: 18px;
  margin-right: 5px;
}
.platform-table {
  background: initial;
}
.platform-table .platform-table {
  background-color: initial;
}
.platform-table .el-table th {
  padding: 0;
}
#dashboard {
  width: 250px;
  height: 150px;
}
div[id^="rchart"] {
  height: 100%;
  width: 100%;
}
#pie_chart {
  height: 100%;
  width: 100%;
}
</style>