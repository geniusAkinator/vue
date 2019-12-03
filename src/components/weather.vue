<template>
  <div class="weather">
    <div class="weather_row">
      <template v-for="(item,index) in wdata">
        <div class="wea-item" :key="index" @mouseenter="handleHover(item)">
          <div class="wea_split"></div>
          <div class="wea_hover"></div>
          <!-- xue, lei, shachen, wu, bingbao, yun, yu, yin, qing -->
          <div
            v-if="item.wea_img == 'bingbao'"
            class="wea_icon"
            :style="{background:`url(${icon1}) no-repeat center`,backgroundSize:'cover'}"
          ></div>
          <div
            v-if="item.wea_img == 'shachen'"
            class="wea_icon"
            :style="{background:`url(${icon2}) no-repeat center`,backgroundSize:'cover'}"
          ></div>
          <div
            v-if="item.wea_img == 'wu'"
            class="wea_icon"
            :style="{background:`url(${icon3}) no-repeat center`,backgroundSize:'cover'}"
          ></div>
          <div
            v-if="item.wea_img == 'xue'"
            class="wea_icon"
            :style="{background:`url(${icon4}) no-repeat center`,backgroundSize:'cover'}"
          ></div>
          <i class="el-icon-lightning" v-if="item.wea_img == 'lei'"></i>
          <i class="el-icon-sunny" v-if="item.wea_img == 'qing'"></i>
          <i class="el-icon-light-rain" v-if="item.wea_img == 'yu'"></i>
          <i class="el-icon-cloudy" v-if="item.wea_img == 'yin'"></i>
          <i class="el-icon-cloudy-and-sunny" v-if="item.wea_img == 'yun'"></i>
          <span>{{item.week}}</span>
          <span>{{item.date}}</span>
          <span>{{item.tem}}</span>
          <span>{{item.tem2}}~{{item.tem1}}</span>
          <span class="wea">{{item.wea}}</span>
          <span>{{item.win[0]}}{{item.win_speed}}</span>
          <div class="quality" v-if="index == 0">{{item.air}}&nbsp;&nbsp;{{item.air_level}}</div>
        </div>
      </template>
    </div>
    <div :class="`wea_bg ${bg}`"></div>
    <div id="weatherChart"></div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      adcode: this.nowAdCode,
      wdata: {},
      icon1: require("@/assets/bingbao.png"),
      icon2: require("@/assets/shachen.png"),
      icon3: require("@/assets/wu.png"),
      icon4: require("@/assets/xue.png"),
      bg: "daytime",
      myCharts: {}
    };
  },
  watch: {
    nowAdCode: function() {
      return this.$store.getters["geo/nowAdCode"];
    }
  },
  methods: {
    initData() {
      //初始化天气数据
      api
        .getWeatherData({
          //获取一周天气
          cityid: this.adcode,
          appid: this.GLOBAL.WEATHER_APPID,
          appsecret: this.GLOBAL.WEATHER_APPSECRET,
          version: "v1"
        })
        .then(res => {
          this.wdata = res.data;
          this.initWeatherChart();
        })
        .catch(_ => {});
    },
    handleHover(item) {
      let nowWea = item.wea_img;
      if (nowWea == "yun" || nowWea == "yu") {
        this.bg = "cloudy";
      } else if (nowWea == "qing") {
        this.bg = "daytime";
      }
    },
    setWeatherBg() {
      // 设置背景
      let now = new Date();
      let nHour = now.getHours();
      if (nHour => 6 && nHour < 17) {
        this.bg = "daytime"; //白天
      } else {
        this.bg = "evening"; //夜晚
      }
    },
    resizeChart() {
      this.myCharts.resize();
    },
    initWeatherChart() {
      this.myCharts = echarts.init(document.getElementById("weatherChart"));
      let hours = this.wdata[0].hours;
      let data = [];
      let tdata = [];
      hours.map((item, i) => {
        data.push(item.day);
        tdata.push(item.tem.replace("℃", ""));
      });
      let option = {
        color: ["#fff"],
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#fff" //轴颜色
            }
          },
          data: data
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#fff" //轴颜色
            }
          },
          type: "value",
          axisLabel: { formatter: "{value}℃" }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        series: [
          {
            data: tdata,
            type: "line",
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
                      color: "rgba(255,255,255,0.5)"
                    },
                    {
                      offset: 1,
                      color: "rgba(255,255,255,0.1)"
                    }
                  ],
                  globalCoord: false
                }
              }
            }
          }
        ]
      };
      this.myCharts.setOption(option);
    }
  },
  mounted() {
    this.initData();
    this.setWeatherBg();
    window.addEventListener("resize", this.resizeChart);
  }
};
</script>

<style>
.weather {
  height: 500px;
}
.weather_row {
  display: flex;
  position: relative;
  color: #fff;
}
.wea_bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  transition: all 0.3s ease-in-out;
}
.wea_bg.daytime {
  background-image: -webkit-linear-gradient(
    top,
    rgb(13, 104, 188),
    rgb(114, 173, 224)
  );
}
.wea_bg.evening {
  background-image: -webkit-linear-gradient(
    top,
    rgb(57, 73, 132),
    rgb(204, 102, 110) 60%,
    rgb(238, 182, 109)
  );
}
.wea_bg.cloudy {
  background-image: -webkit-linear-gradient(
    top,
    rgb(72, 86, 99),
    rgb(161, 184, 202)
  );
}
.wea-item {
  position: relative;
  display: block;
  flex: 1;
  padding: 40px 0;
  padding-bottom: 0;
}
.wea-item span {
  display: block;
  text-align: center;
  font-size: 12px;
  text-shadow: 1px 1px 1px #555;
  line-height: 1em;
  margin-top: 10px;
}
.quality {
  display: block;
  min-width: 38px;
  border-radius: 3px;
  background-color: #82c91e;
  width: 55px;
  padding: 5px;
  margin: auto;
  margin-top: 12px;
  text-align: center;
  padding: 5px 6px;
  color: #fff;
  font-size: 12px;
}
.wea_split {
  position: absolute;
  left: 0px;
  top: 25px;
  width: 1px;
  height: 215px;
  background: #fff;
  filter: alpha(opacity=15);
  opacity: 0.15;
}
.wea-item i {
  width: 50px;
  height: 50px;
  display: block;
  margin: auto;
  font-size: 50px;
}
.wea_icon {
  width: 50px;
  height: 50px;
  display: block;
  margin: auto;
  background-position: 50px 50px;
}
.wea_hover {
  position: absolute;
  left: 0;
  top: 0;
  bottom: -30px;
  right: 0;
  z-index: 1;
}
.wea-item:hover .wea_hover {
  background-image: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0.015),
    rgba(255, 255, 255, 0.15)
  );
}
.wea-item {
  cursor: pointer;
}
#weatherChart {
  width: 100%;
  height: 200px;
}
</style>