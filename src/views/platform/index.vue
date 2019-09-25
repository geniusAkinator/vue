<template>
  <div class="container dark">
    <div class="echart-top">
      <div class="top-left">
        <div class="top-item">
          <my-echart-gauge :id="chart1"></my-echart-gauge>
        </div>
        <div class="top-item">
          <my-echart-gauge :id="chart2"></my-echart-gauge>
        </div>
        <div class="top-item">
          <my-echart-gauge :id="chart3"></my-echart-gauge>
        </div>
        <div class="top-item">
          <my-echart-gauge :id="chart4"></my-echart-gauge>
        </div>
        <div class="top-item">
          <my-echart-gauge :id="chart5"></my-echart-gauge>
        </div>
      </div>
      <div class="top-center">
        <my-clock></my-clock>
      </div>
      <div class="top-right">
        <div class="top-item">
          <my-echart-gauge :id="chart6"></my-echart-gauge>
        </div>
        <div class="top-item middle">
          <my-echart-line :id="lchart"></my-echart-line>
        </div>
        <div class="top-item">
          <my-echart-radar :id="radarChart"></my-echart-radar>
        </div>
      </div>
    </div>
    <div class="ehart-map-container">
      <div class="border-top"></div>
      <div class="border-bottom"></div>
      <div class="map-item" v-if="isMap">
        <my-echart-map></my-echart-map>
      </div>
      <div class="map-item" v-if="!isMap">
        <my-echart-earth></my-echart-earth>
      </div>
      <div class="swiper-container" id="swiper">
        <div class="swiper-wrapper">
          <div v-for="(item,index) in swiper" :key="index" class="swiper-slide">
            <span>{{item.title}}</span>
            <p>{{item.des}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="platform-left">
      <div class="platform-box middle">
        <my-echart-pie :id="pieChart"></my-echart-pie>
      </div>
      <div class="platform-box middle">
        <my-echart-rose :id="roseChart"></my-echart-rose>
      </div>
      <div class="platform-box">
        <my-echart-line :id="lineChart"></my-echart-line>
      </div>
    </div>
    <div class="platform-right">
      <div class="platform-box middle">
        <my-echart-bar :id="barChart"></my-echart-bar>
      </div>
      <div class="platform-box middle">
        <my-horizontal-echart-bar :id="hbar"></my-horizontal-echart-bar>
      </div>
      <div class="platform-box"></div>
    </div>
    <div class="switch-map">
      <div :class="isMap?'current':''" @click="isMap=true">
        <i class="iconfont icon-diqu"></i>
      </div>
      <div :class="isMap?'':'current'" @click="isMap=false">
        <i class="iconfont icon-diqiu"></i>
      </div>
    </div>
    <div class="my-theme" v-drag>
      <my-echart-theme></my-echart-theme>
    </div>
  </div>
</template>

<script>
import MyEchartMap from "@/components/emap";
import MyEchartGauge from "@/components/egauge";
import MyEchartLine from "@/components/eline";
import MyEchartEarth from "@/components/earth";
import MyEchartPie from "@/components/epie";
import MyClock from "@/components/clock";
import MyEchartRadar from "@/components/eradar";
import MyEchartBar from "@/components/ebar";
import MyHorizontalEchartBar from "@/components/ehbar";
import MyEchartRose from "@/components/erose";
import Swiper from "swiper";
import MyEchartTheme from "@/components/etheme";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    return {
      chart1: "chart1",
      chart2: "chart2",
      chart3: "chart3",
      chart4: "chart4",
      chart5: "chart5",
      chart6: "chart6",
      lineChart: "lchart",
      pieChart: "pchart",
      radarChart: "rchart",
      barChart: "bchart",
      hbar: "hbar",
      sline: "sline",
      lchart: "chart",
      roseChart: "roseChart",
      swiper: [
        {
          title: "dsfasf",
          des: "afdafdsafdafds"
        },
        {
          title: "dsfasf",
          des: "afdafdsafdafds"
        }
      ],
      isMap: true
    };
  },
  methods: {},
  beforeCreate(){
    this.$store.dispatch("theme/initThemeList")
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      slidesPerView: 5,
      direction: "vertical",
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    });
  },
  components: {
    MyEchartMap,
    MyEchartGauge,
    MyEchartLine,
    MyEchartEarth,
    MyEchartPie,
    MyEchartRadar,
    MyEchartBar,
    MyHorizontalEchartBar,
    MyEchartRose,
    MyClock,
    MyEchartTheme
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 0;
  background: url("../../../static/images/chart_bg.jpg");
  overflow: hidden;
}
.ehart-map-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.gauge-content {
  width: 200px;
  height: 200px;
  overflow: hidden;
}
.platform-left {
  width: 300px;
  position: absolute;
  left: 20px;

  -webkit-animation: fadeInLeft 2s ease 0s 1 both;
}
.platform-right {
  width: 300px;
  position: absolute;
  right: 20px;

  -webkit-animation: fadeInRight 2s ease 0s 1 both;
}
.platform-left,
.platform-right {
  top: 150px;
  bottom: 40px;
}
#swiper {
  -webkit-animation: fadeInUp 2s ease 0s 1 both;
}
.platform-box {
  border: 1px solid #afafaf;
  height: calc((100% - 26px) / 5);
  background: rgba(0, 0, 0, 0.3);
}
.platform-box.middle {
  height: calc((100% - 26px) * 2 / 5);
}
.platform-box + .platform-box {
  margin-top: 10px;
}

.map-item {
  width: 100%;
  height: 100%;
}
.top-item {
  height: 100%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  height: 110px;
  overflow: hidden;
}
.echart-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  z-index: 11;
}
#swiper {
  position: absolute;
  left: 340px;
  bottom: 40px;
  color: #fff;
  overflow: hidden;
  width: 300px;
  height: 180px;
  color: #a5a5a5;
  background-image: linear-gradient(
    -180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
}
.top-left {
  float: left;
  width: 40%;
}
.top-right {
  width: 40%;
  float: left;
}
.top-item.middle {
  width: 60%;
}
.border-top {
  border-top: 1px solid #a5a5a5;
  position: absolute;
  left: 20px;
  top: 130px;
  right: 20px;
}
.border-bottom {
  border-bottom: 1px solid #a5a5a5;
  position: absolute;
  left: 20px;
  bottom: 20px;
  right: 20px;
  -webkit-animation: fadeInUp 2s ease 0s 1 both;
}
.border-top,
.border-bottom {
  height: 5px;
  border-left: 1px solid #a5a5a5;
  border-right: 1px solid #a5a5a5;
}
.top-left,
.top-right {
  padding-top: 0px;
  padding-bottom: 10px;
  background: #031637;
}

.top-left,
.top-right {
  position: relative;
}
.top-left::before,
.top-right::before {
  content: "";
  position: absolute;
  top: 0;
  left: -2px;
  right: -2px;
  bottom: -2px;
  z-index: -1;
  background: #1c2525;
}

.top-left::after,
.top-right::after {
  content: "";
  position: absolute;
  top: 0;
  left: -2px;
  right: -2px;
  bottom: -2px;
  z-index: -1;
  background: #1c2525;
}
.top-left::before,
.top-left::after {
  background: linear-gradient(187deg, #2da9ff, #060c21, #2da9ff);
}
.top-right::before,
.top-right::after {
  background: linear-gradient(-187deg, #2da9ff, #060c21, #2da9ff);
}
.top-left::before,
.top-left::after {
  left: 0;
}
.top-right::before,
.top-right::after {
  right: 0;
}
.top-right,
.top-right::before,
.top-right::after {
  border-bottom-left-radius: 30px;
}
.top-left,
.top-left::before,
.top-left::after {
  border-bottom-right-radius: 30px;
}
#swiper .swiper-slide {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
}
.swiper-slide p {
  padding: 0;
  margin: 0;
}
.switch-map {
  position: absolute;
  right: 360px;
  top: 150px;
  color: #a5a5a5;
}
.switch-map i {
  display: block;
  width: 38px;
  height: 38px;
  line-height: 38px;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #a5a5a5;
}
.switch-map > div {
  float: left;
}
.switch-map div + div {
  margin-left: 10px;
}
.switch-map > div.current i {
  color: #2da9ff;
  border: 1px solid #2da9ff;
}
.my-theme {
  position: fixed;
  bottom: 60px;
  left: 50%;
  z-index: 999;
  cursor: move;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
</style>