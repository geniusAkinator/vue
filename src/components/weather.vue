<template>
  <div class="weather">
    <div class="wea-item" v-for="(item,index) in wdata" :key="index">
      <div class="wea_split"></div>

      <i class="el-icon-sunny"></i>
      <span>{{item.week}}</span>
      <span>{{item.date}}</span>
      <span>{{item.tem}}</span>
      <span>{{item.tem2}}~{{item.tem1}}</span>
      <span class="wea">{{item.wea}}</span>
      <span>{{item.win[0]}}{{item.win_speed}}</span>
      <div class="quality" v-if="index == 0">{{item.air}}{{item.air_level}}</div>
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
      wea_icon: [
        {
          icon: "el-icon-light-rain",
          wea_img: "yu"
        },
        {
          icon: "el-icon-lightning",
          wea_img: ""
        },
        {
          icon: "el-icon-heavy-rain",
          wea_img: "yu"
        },
        {
          icon: "el-icon-sunrise",
          wea_img: ""
        },
        {
          icon: "el-icon-sunrise-1",
          wea_img: ""
        },
        {
          icon: "el-icon-sunset",
          wea_img: ""
        },
        {
          icon: "el-icon-sunny",
          wea_img: ""
        },
        {
          icon: "el-icon-cloudy",
          wea_img: ""
        },
        {
          icon: "el-icon-partly-cloudy",
          wea_img: ""
        },
        {
          icon: "el-icon-cloudy-and-sunny",
          wea_img: ""
        },
        {
          icon: "el-icon-moon",
          wea_img: ""
        },
        {
          icon: "el-icon-moon-night",
          wea_img: ""
        }
      ]
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
  background-image: -webkit-linear-gradient(
    top,
    rgb(57, 73, 132),
    rgb(204, 102, 110) 60%,
    rgb(238, 182, 109)
  );
  color: #fff;
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
</style>