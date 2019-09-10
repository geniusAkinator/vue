<template>
  <div id="earth" style="width:100%;height:100%"></div>
</template>
<script>
export default {
  data() {
    return {
      myChart: {},
      myCharts: {}
    };
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    }
  },
  mounted() {
    let geoCoordMap = {
      南宁: [108.479, 23.1152],
      广州: [113.5107, 23.2196],
      重庆: [107.7539, 30.1904]
    };
    let data = [
      [{ name: "南宁" }, { name: "广州", value: 80 }],
      [{ name: "南宁" }, { name: "重庆", value: 100 }]
    ];
    let pointA = [];
    let pointB = [];
    let line = [];
    for (let i = 0; i < data.length; i++) {
      pointA.push({
        name: data[i][1].name,
        value: geoCoordMap[data[i][1].name],
        symbolSize: 2
      });
      pointB.push({
        name: data[i][0].name,
        value: geoCoordMap[data[i][0].name],
        symbolSize: 2,
        label: {
          normal: {
            position: "right"
          }
        }
      });
      line.push([geoCoordMap[data[i][1].name], geoCoordMap[data[i][0].name]]);
    }

    let canvas = document.createElement("canvas");
    this.myChart = echarts.init(canvas, null, {
      width: 1980,
      height: 1080,
      devicePixelRatio: 2.5
    });
    this.myChart.setOption({
      backgroundColor: "#161e27",
      title: {
        show: true
      },
      geo: {
        type: "map",
        map: "world",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        nameMap: config.nameMap,
        boundingCoords: [[-180, 90], [180, -90]],
        zoom: 0,
        roam: false,
        itemStyle: {
          borderColor: "#405062",
          normal: {
            areaColor: "#69798d",
            borderColor: "#405062"
          },
          emphasis: {
            areaColor: "#a5a5a5",
            color:"#fff",
          }
        },
        label: {
          fontSize: 16
        }
      },
      series: [
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 3,
          rippleEffect: {
            brushType: "stroke"
          },
          label: {
            show: false
          },
          itemStyle: {
            normal: {
              color: "#f5f802"
            }
          },
          data: pointA
        },
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 3,
          rippleEffect: {
            brushType: "stroke"
          },
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: "#ff0000"
            }
          },
          data: pointB
        }
      ]
    });
    let option = {
      backgroundColor: "rgba(0,0,0,0)", //canvas的背景颜色
      globe: {
        baseTexture: this.myChart,
        top: "0",
        left: "center",
        displacementScale: 0,
        environment: "none",
        shading: "color",
        viewControl: {
          distance: 240,
          autoRotate: false,
          targetCoord: [116.46, 39.92]
        }
      },
      series: [
        {
          type: "lines3D",
          effect: {
            show: true,
            period: 3,
            trailLength: 0.1
          },
          lineStyle: {
            color: "#FFCDB2",
            width: 1,
            opacity: 0.6
          },
          data: line
        }
      ]
    };
    this.myCharts = echarts.init(document.getElementById("earth"));
    this.myCharts.setOption(option, true);
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {}
};
</script>
<style scoped>
</style>