<template>
  <div class="container dark">
    <div class="ehart-map-container">
      <div class=""> 
        <!-- <my-echart-map></my-echart-map> -->
      </div>
      <my-echart-earth></my-echart-earth>
    </div>
    <!-- <div>
      <div class="gauge-content">
        <my-gauge :id="chart1"></my-gauge>
      </div>
      <div class="gauge-content">
        <my-gauge :id="chart2"></my-gauge>
      </div>
    </div>-->

    <div class="platform-left">
      <div class="platform-box large"></div>
      <div class="platform-box large"></div>
      <div class="platform-box">
        <my-echart-line :id="lineChart"></my-echart-line>
      </div>
    </div>

    <div class="platform-right">
      <div class="platform-box large"></div>
      <div class="platform-box large"></div>
      <div class="platform-box"></div>
    </div>
  </div>
</template>

<script>
import MyEchartMap from "@/components/emap";
import MyGauge from "@/components/egauge";
import MyEchartLine from "@/components/eline";
import MyEchartEarth from "@/components/earth";
export default {
  data() {
    return {
      chart1: "chart1",
      chart2: "chart2",
      lineChart: "lchart"
    };
  },
  methods: {},
  mounted() {},
  components: {
    MyEchartMap,
    MyGauge,
    MyEchartLine,
    MyEchartEarth
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
  top: 200px;
  bottom: 0;
  -webkit-animation: bounceInLeft 2s ease 0s 1 both;
}
.platform-right {
  width: 300px;
  position: absolute;
  right: 20px;
  top: 200px;
  bottom: 0;
  -webkit-animation: bounceInRight 2s ease 0s 1 both;
}
.platform-box {
  border: 1px solid #afafaf;
  height: calc((100% - 46px) / 5);
}
.platform-box.large {
  height: calc((100% - 46px) * 2 / 5);
}
.platform-box + .platform-box {
  margin-top: 20px;
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
</style>