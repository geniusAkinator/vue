<template>
  <div class="container dark">
    <div class="echart-top">
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
        <my-clock></my-clock>
      </div>
      <div class="top-item">
        <my-echart-gauge :id="chart4"></my-echart-gauge>
      </div>
      <div class="top-item">
        <my-echart-gauge :id="chart5"></my-echart-gauge>
      </div>
      <div class="top-item">
        <my-echart-gauge :id="chart6"></my-echart-gauge>
      </div>
    </div>

    <div class="ehart-map-container">
      <div class="map-item">
        <my-echart-map></my-echart-map>
      </div>
      <!-- <my-echart-earth></my-echart-earth> -->
    </div>
    <div class="platform-left">
      <div class="platform-box large">
        <my-echart-pie :id="pieChart"></my-echart-pie>
      </div>
      <div class="platform-box large">
        <my-echart-radar :id="radarChart"></my-echart-radar>
      </div>
      <div class="platform-box">
        <my-echart-line :id="lineChart"></my-echart-line>
      </div>
    </div>

    <div class="platform-right">
      <div class="platform-box large">
        <my-echart-bar :id="barChart"></my-echart-bar>
      </div>
      <div class="platform-box large">
        <my-horizontal-echart-bar :id="hbar"></my-horizontal-echart-bar>
      </div>
      <div class="platform-box">
        <my-echart-smooth-line :id="sline"></my-echart-smooth-line>
      </div>
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
import MyEchartSmoothLine from "@/components/esline";
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
      hbar:"hbar",
      sline:"sline"
    };
  },
  methods: {},
  mounted() {},
  components: {
    MyEchartMap,
    MyEchartGauge,
    MyEchartLine,
    MyEchartEarth,
    MyEchartPie,
    MyEchartRadar,
    MyEchartBar,
    MyHorizontalEchartBar,
    MyEchartSmoothLine,
    MyClock
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
  top: 250px;
  bottom: 0;
  -webkit-animation: bounceInLeft 2s ease 0s 1 both;
}
.platform-right {
  width: 300px;
  position: absolute;
  right: 20px;
  top: 250px;
  bottom: 0;
  -webkit-animation: bounceInRight 2s ease 0s 1 both;
}
.platform-box {
  border: 1px solid #afafaf;
  height: calc((100% - 26px) / 5);
}
.platform-box.large {
  height: calc((100% - 26px) * 2 / 5);
}
.platform-box + .platform-box {
  margin-top: 10px;
}
@-webkit-keyframes bounceInLeft {
  0%,
  60%,
  75%,
  90%,
  100% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(-3000px, 0, 0);
    transform: translate3d(-3000px, 0, 0);
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(25px, 0, 0);
    transform: translate3d(25px, 0, 0);
  }
  75% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }
  100% {
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes bounceInLeft {
  0%,
  60%,
  75%,
  90%,
  100% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(-3000px, 0, 0);
    transform: translate3d(-3000px, 0, 0);
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(25px, 0, 0);
    transform: translate3d(25px, 0, 0);
  }
  75% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }
  100% {
    -webkit-transform: none;
    transform: none;
  }
}
.bounceInLeft {
  -webkit-animation-name: bounceInLeft;
  animation-name: bounceInLeft;
}

@-webkit-keyframes bounceInRight {
  0%,
  60%,
  75%,
  90%,
  100% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(3000px, 0, 0);
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(-25px, 0, 0);
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
  90% {
    -webkit-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0);
  }
  100% {
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes bounceInRight {
  0%,
  60%,
  75%,
  90%,
  100% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(3000px, 0, 0);
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(-25px, 0, 0);
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
  90% {
    -webkit-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0);
  }
  100% {
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
  }
}
.bounceInRight {
  -webkit-animation-name: bounceInRight;
  animation-name: bounceInRight;
}
.map-item {
  width: 100%;
  height: 100%;
}
.top-item {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.echart-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 220px;
  display: flex;
  justify-content: space-between;
  z-index: 11;
}
</style>