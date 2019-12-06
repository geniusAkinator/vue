<template>
  <div class="container dark">
    <div class="platform-top">
      <div class="swiper-container" id="platform-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">AAAAAA</div>
          <div class="swiper-slide">BBBBBB</div>
          <div class="swiper-slide">CCCCCC</div>
        </div>
      </div>
      <div class="total-box">
        <div class="total-item">
          <i class="el-icon-warning-outline"></i>
          <span>故障</span>
        </div>
        <div class="total-item">
          <i class="el-icon-warning-outline"></i>
          <span>隐患</span>
        </div>
      </div>
    </div>
    <el-row :gutter="10" class="platform-box">
      <el-col :span="6">
        <el-col :span="24" class="box-item">
          <el-col :span="12" class="flex-box">
            <div id="dashboard"></div>
          </el-col>
          <el-col :span="12" class="flex-box">
            <div class="admin-box">
              <div class="admin-item">
                <i class="el-icon-office-building"></i>
                <span>负责建筑</span>
              </div>
              <div class="admin-item">
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
                <i class="el-icon-time"></i>
                <p>
                  等待处理
                  <span>0</span>个
                </p>
              </li>
              <li class="platform-item">
                <i class="el-icon-time"></i>
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
                <i class="el-icon-time"></i>
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
          <div class="box-item-title">本日设备正常运行统计</div>
          <div id="today_chart"></div>
        </el-col>
      </el-col>
      <el-col :span="12">
        <el-col :span="24" class="box-item middle">
          <my-floor></my-floor>
        </el-col>
        <el-col :span="24" class="box-item">
          <div class="box-item-title">事件实时管理</div>
          <el-table :data="tableData" class="platform-table" style="width: 100%">
            <el-table-column prop="datetime" label="时间"></el-table-column>
            <el-table-column prop="pos" label="传感器位置"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="state" label="状态（故障描述）"></el-table-column>
          </el-table>
        </el-col>
      </el-col>
      <el-col :span="6">
        <el-col :span="24" class="box-item">
          <div class="box-item-title">事件处理率</div>
          <el-col :span="12" style="height:100%">
            <my-echart-gauge></my-echart-gauge>
          </el-col>
          <el-col :span="12" style="height:100%">
            <my-echart-gauge></my-echart-gauge>
          </el-col>
        </el-col>
        <el-col :span="24" class="box-item">
          <div class="box-item-title">监控在线统计</div>
          <div id="pie_chart"></div>
        </el-col>
        <el-col :span="24" class="box-item">
          <el-col :span="12" style="height:50%">
            <my-echart-line></my-echart-line>
          </el-col>
          <el-col :span="12" style="height:50%">
            <my-echart-line></my-echart-line>
          </el-col>
          <el-col :span="12" style="height:50%">
            <my-echart-line></my-echart-line>
          </el-col>
          <el-col :span="12" style="height:50%">
            <my-echart-line></my-echart-line>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyEchartGauge from "@/components/echart/egaugev2";
import MyEchartLine from "@/components/echart/elinev2";
import MyFloor from "@/components/common/floor";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
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
      this.pchart.resize();
      this.bchart.resize();
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
    initPieChart() {
      this.pchart = echarts.init(document.getElementById("pie_chart"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
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
    this.initPieChart();
    new Swiper(".swiper-container", {
      direction: "vertical",
      autoplay: {
        delay: 1200,
        disableOnInteraction: false
      }
    });
    window.addEventListener("resize", this.resizeChart);
  },
  components: {
    MyEchartGauge,
    MyEchartLine,
    MyFloor
  }
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
  height: calc((100% - 80px) / 3);
  margin-top: 10px;
}
.box-item:first-child {
  margin-top: 50px;
}
.middle {
  height: calc((200% - 130px) / 3);
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
/* .box-item {
  border: 1px solid #fff;
} */
.box-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
  background: rgba(33, 34, 52, 0.6);
  position: relative;
}
.platform-list {
  background: #fff;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
}
.platform-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: #999;
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
  width: 100%;
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
#platform-swiper {
  width: 300px;
  height: 30px;
  margin: 0;
}
#platform-swiper .swiper-slide {
  text-align: left;
  font-size: 18px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  background: initial;
  padding: 0 10px;
}

.platform-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
}
.total-box {
  margin-left: auto;
  padding-right: 10px;
  line-height: 30px;
}
.total-item i {
  background: #ffa678;
  padding: 2px;
  border-radius: 4px;
}
.total-item {
  display: inline;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.admin-item i {
  font-size: 30px;
}
.box-item-title {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;
  padding: 10px;
}
</style>