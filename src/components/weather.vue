<template>
  <div class="weather">
    <div class="wea-item" v-for="(item,index) in wdata" :key="index">
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
      <div class="wea_bg daytime"></div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      adcode: this.$store.state.geo.geo.addressComponent.adcode,
      wdata: {},
      icon1: require("@/assets/bingbao.png"),
      icon2: require("@/assets/shachen.png"),
      icon3: require("@/assets/wu.png"),
      icon4: require("@/assets/xue.png")
    };
  },
  mounted() {
    api
      .getWeatherData({
        cityid: this.adcode,
        appid: this.GLOBAL.WEATHER_APPID,
        appsecret: this.GLOBAL.WEATHER_APPSECRET,
        version: "v1"
      })
      .then(res => {
        console.log(res.data);
        this.wdata = res.data;
      })
      .catch(_ => {});
    //https://www.tianqiapi.com/api/?version=v1&cityid=320508&appid=95978743&appsecret=iaQ5GuWK
  }
};
</script>

<style>
.weather {
  display: flex;
  position: relative;
  height: 100%;
  color: #fff;
}
.wea_bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
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
  padding: 60px 0;
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
  width: 45px;
  padding: 5px;
  margin: auto;
  margin-top: 12px;
  text-align: center;
  padding: 0 6px;
  color: #fff;
}
.wea_split {
  position: absolute;
  left: 0px;
  top: 42px;
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
  bottom: 0;
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
.wea-item{
    cursor: pointer;
}
</style>