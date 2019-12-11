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
      <div class="platform-title">
        <span class="title">智慧消防平台</span>
        <span class="datetime">{{nowTime}}&nbsp;{{nowDate}}</span>
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
      <div class="parallelogram">
        <div class="parallelogram_item large"></div>
        <div class="parallelogram_item" v-for="i in 10" :key="i"></div>
        <div class="parallelogram_item middle"></div>
      </div>
      <div class="parallelogram right">
        <div class="parallelogram_item middle"></div>
        <div class="parallelogram_item" v-for="i in 10" :key="i"></div>
        <div class="parallelogram_item large"></div>
      </div>
    </div>
    <div class="welcome">
      <span>热烈欢迎领导</span>
    </div>
    <el-row :gutter="10" class="platform-box">
      <el-col :span="6" id="platform-left">
        <el-col
          :span="24"
          class="box-item"
          style="display: flex;justify-content: center;align-items: center"
        >
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div id="dashboard"></div>
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
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
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
            </ul>
          </el-col>
        </el-col>
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">本日设备正常运行统计</div>
          <div id="today_chart"></div>
        </el-col>
      </el-col>
      <el-col :span="12">
        <el-col :span="24" class="box-item middle" id="floorBox">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <my-floor :height="floorHeight"></my-floor>
        </el-col>
        <el-col :span="24" class="box-item" id="tableBox">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">事件实时管理</div>
          <el-table
            :data="tableData"
            class="platform-table"
            style="width: 100%"
            :max-height="tableHeight"
          >
            <el-table-column prop="datetime" label="时间"></el-table-column>
            <el-table-column prop="pos" label="传感器位置"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
          </el-table>
        </el-col>
      </el-col>
      <el-col :span="6" id="platform-right">
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">事件处理率</div>
          <el-col :span="12" style="height:100%">
            <my-echart-gauge :color="color1" :data="gauge1"></my-echart-gauge>
          </el-col>
          <el-col :span="12" style="height:100%">
            <my-echart-gauge :color="color2" :data="gauge2"></my-echart-gauge>
          </el-col>
        </el-col>
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
          <div class="box-item-title">监控在线统计</div>
          <div id="pie_chart"></div>
        </el-col>
        <el-col :span="24" class="box-item">
          <div class="hightlight_line top_left"></div>
          <div class="hightlight_line top_right"></div>
          <div class="hightlight_line bottom_left"></div>
          <div class="hightlight_line bottom_right"></div>
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
      tableData: [
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        },
        {
          datetime: "2019-12-06",
          pos: "苏州市振兴化工厂",
          type: "烟感",
          state: 0
        }
      ],
      tchart: {},
      bchart: {},
      rchart1: {},
      rchart2: {},
      rchart3: {},
      rchart4: {},
      pchart: {},
      chart1: "pechart",
      chart2: "pechart1",
      nowDate: "",
      nowTime: "",
      tableHeight: "200",
      floorHeight: "200",
      color1: {
        scolor: "#08BBB7",
        ecolor: "#91D86C",
        lcolor: "#05AAAD"
      },
      color2: {
        scolor: "#528CF3",
        ecolor: "#9A42DE",
        lcolor: "#3A72C0"
      },
      gauge1: {
        label: "本周隐患及时处理率",
        value: "70"
      },
      gauge2: {
        label: "本周故障及时处理率",
        value: "50"
      }
    };
  },
  methods: {
    resizeChart() {
      this.tchart.resize();
      this.pchart.resize();
      this.bchart.resize();
      this.resizeTable();
      this.resizeFloor();
    },
    resizeTable() {
      let box = document.querySelector("#tableBox");
      let _height = box.offsetHeight - 50;
      this.tableHeight = _height;
    },
    resizeFloor() {
      let floor = document.querySelector("#floorBox");
      let _height = floor.offsetHeight - 95;
      this.floorHeight = _height;
      console.log(this.floorHeight);
    },
    initTodayChart() {
      //今日传感器
      this.tchart = echarts.init(document.getElementById("today_chart"));
      let option = {
        radar: {
          center: ["50%", "70%"],
          radius: "80%",
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              color: "#fff",
              opacity: 0.2
            }
          },
          splitLine: {
            lineStyle: {
              color: "#fff",
              opacity: 0.2
            }
          },
          splitArea: {
            areaStyle: {
              color: "rgba(127,95,132,.3)",
              opacity: 1,
              shadowBlur: 45,
              shadowColor: "rgba(0,0,0,.5)",
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            {
              name: "气体传感器",
              max: 6000
            },
            {
              name: "温湿度",
              max: 16000
            },
            {
              name: "烟感传感器",
              max: 30000
            }
          ]
        },
        series: [
          {
            type: "radar",
            symbolSize: 0,
            areaStyle: {
              normal: {
                shadowBlur: 13,
                shadowColor: "rgba(0,0,0,.2)",
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1
              }
            },
            data: [
              {
                value: [2500, 12000, 8000]
              }
            ]
          }
        ],
        color: ["#ef4b4c", "#b1eadb"]
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
                color: [[0.2, "#ce244a"], [0.6, "#E6A23C"], [1, "#2deb69"]]
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
            color: ["#409EFF", "#F56C6C"],
            center: ["50%", "60%"],
            data: [{ value: 335, name: "在线" }, { value: 310, name: "离线" }],
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
    },
    initDateTime() {
      let date = new Date();
      let _day = date.getDate();
      let year = date.getFullYear();
      let _month = date.getMonth() + 1;
      let week = date.getDay();
      let w = "";
      switch (week) {
        case 0:
          w = "星期日";
          break;
        case 1:
          w = "星期一";
          break;
        case 2:
          w = "星期二";
          break;
        case 3:
          w = "星期三";
          break;
        case 4:
          w = "星期四";
          break;
        case 5:
          w = "星期五";
          break;
        case 6:
          w = "星期六";
          break;
      }
      _day > 10 ? (_day = _day) : (_day = "0" + _day);
      _month > 10 ? (_month = _month) : (_month = "0" + _month);
      this.nowDate = `${year}/${_month}/${_day}  ${w}`;
      setInterval(() => {
        this.updateTime();
      }, 1000);
    },
    updateTime() {
      let date = new Date();
      let _hour = date.getHours();
      let _min = date.getMinutes();
      // _hour > 10 ? (_hour = _hour) : (_hour = "0" + _hour);
      _min > 10 ? {} : _min = "0" + _min;
      this.nowTime = `${_hour}:${_min}`;
    }
  },
  mounted() {
    this.initTodayChart();
    this.initDashboard();
    this.initPieChart();
    this.initDateTime();
    this.resizeTable();
    this.resizeFloor();
    new Swiper("#platform-swiper", {
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
.container.dark {
  width: 100%;
  height: 100%;
  padding: 0;
  background: #081b53;
  overflow: hidden;
  color: #fff;
  min-width: 1500px;
  min-height: 800px;
}
.platform-box {
  height: 100%;
}
.platform-box > div {
  height: 100%;
}
.box-item {
  height: calc((100% - 140px) / 3);
  margin-top: 10px;
  box-shadow: inset 0px 0px 10px 2px #0942a1;
}
.box-item:first-child {
  margin-top: 120px;
}
.middle {
  height: calc((200% - 250px) / 3);
}
.platform-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.platform-item {
  display: flex;
  margin-bottom: 10px;
}
.platform-item.title {
  font-weight: bold;
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
  background: rgba(8, 27, 83, 0.2);
  position: relative;
}
.platform-list {
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  color: #fff;
  background: rgb(26, 36, 48, 0.7);
}
.platform-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #fff;
  line-height: 25px;
}
.platform-item i {
  margin-right: 10px;
  color: #fff;
}
.platform-item p {
  color: #fff;
  font-size: 12px;
}
.platform-item span {
  font-size: 18px;
  margin-right: 5px;
}
.platform-table {
  background: initial;
  margin-top: 50px;
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
  height: 40px;
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
  height: 40px;
  display: flex;
  z-index: 9999;
}
.platform-top::before {
  content: "";
  position: absolute;
  left: 0;
  height: 2px;
  bottom: 0;
  background: rgb(71, 221, 254);
  width: calc(50% - 240px);
}
.platform-top::after {
  content: "";
  position: absolute;
  right: 0;
  height: 2px;
  bottom: 0;
  background: rgb(71, 221, 254);
  width: calc(50% - 240px);
}
.total-box {
  margin-left: auto;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.total-item i {
  background: #ffa678;
  padding: 2px;
  border-radius: 4px;
}
.total-item {
  display: inline;
  margin-right: 20px;
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.admin-item i {
}
.admin-item {
  float: left;
  position: relative;
  padding: 0 10px;
}
.admin-item:last-child::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #efefef;
}
.box-item-title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: 16px;
  padding: 10px;
  padding-left: 20px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(to right, #0942a1, rgba(0, 0, 0, 0));
}
.box-item-title::before {
  content: "";
  display: block;
  position: absolute;
  width: 2px;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgb(71, 221, 254);
}
.hightlight_line.top_left {
  position: absolute;
  left: 0;
  top: 0;
}
.hightlight_line.top_right {
  position: absolute;
  right: 0;
  top: 0;
  transform: rotate(90deg);
}
.hightlight_line.bottom_left {
  position: absolute;
  left: 0;
  bottom: 0;
  transform: rotate(-90deg);
}
.hightlight_line.bottom_right {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: rotate(180deg);
}
.hightlight_line::before {
  content: "";
  width: 20px;
  height: 2px;
  background: rgb(58, 125, 255);
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.hightlight_line::after {
  content: "";
  height: 20px;
  width: 2px;
  background: rgb(58, 125, 255);
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.box-item:hover .hightlight_line::before,
.box-item:hover .hightlight_line::after {
  opacity: 1;
}
.platform-title {
  width: 400px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 0;
  height: 80px;
  margin-left: -200px;
  border-bottom: 2px solid rgb(71, 221, 254);
}
.platform-title::before {
  content: "";
  left: -50px;
  position: absolute;
  width: 60px;
  height: 2px;
  bottom: 19px;
  background: rgb(71, 221, 254);
  transform: rotate(45deg);
}
.platform-title::after {
  content: "";
  right: -50px;
  position: absolute;
  width: 60px;
  height: 2px;
  bottom: 19px;
  background: rgb(71, 221, 254);
  transform: rotate(-45deg);
}
.platform-title .title {
  font-size: 32px;
  color: #c3eafe;
  z-index: 999;
  font-weight: bold;
  display: block;
  margin-top: 3px;
}
.platform-title .datetime {
  display: block;
  width: 100%;
  text-align: center;
  color: rgb(71, 221, 254);
  font-weight: 400;
  font-size: 24px;
}

/* 跑马灯特效 */
@-webkit-keyframes marquee {
  0% {
    -webkit-transform: translate(0, 0);
  }
  100% {
    -webkit-transform: translate(-100%, 0);
  }
}
@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}

.welcome {
  position: absolute;
  left: 0;
  right: 0;
  top: 88px;
  color: #fff;
  z-index: 999;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  background: rgba(71, 221, 254, 0.5);
  font-size: 14px;
  padding: 4px 0;
}

.welcome span {
  display: inline-block;
  padding-left: 100%; /* 从右至左开始轮播 */
  animation: marquee 16s linear infinite;
}
.admin-box {
  position: absolute;
  top: 20px;
  right: 20px;
}
.parallelogram {
  position: absolute;
  top: 50px;
  left: 50%;
  overflow: hidden;
  padding: 0 10px;
  margin-left: -480px;
}
.parallelogram.right {
  position: absolute;
  top: 50px;
  right: 50%;
  overflow: hidden;
  padding: 0 10px;
  left: initial;
  margin-right: -480px;
}
.parallelogram_item {
  width: 5px;
  transform: skew(45deg);
  height: 15px;
  background: rgb(71, 221, 254);
  margin-right: 5px;
  float: left;
}
.parallelogram_item.large {
  width: 80px;
}
.parallelogram_item.middle {
  width: 20px;
}
.parallelogram.right .parallelogram_item {
  transform: skew(-45deg);
}
/* 动画 */
#platform-left {
  animation: fadeInLeft 2s ease 0s 1 both;
}
#platform-right {
  animation: fadeInRight 2s ease 0s 1 both;
}
#tableBox {
  animation: fadeInUp 2s ease 0s 1 both;
}
#floorBox {
  animation: fadeIn 2s ease 0s 1 both;
}
</style>