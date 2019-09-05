<template>
  <div id="earth" style="width:100%;height:100%"></div>
</template>
<script>
export default {
  data() {
    return {
        myChart:{}
    };
  },
  methods: {},
  mounted() {
    var geoCoordMap = {
      南宁: [108.479, 23.1152],
      广州: [113.5107, 23.2196],
      重庆: [107.7539, 30.1904]
    };
    var data = [
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
        symbolSize: 4
      });
      pointB.push({
        name: data[i][0].name,
        value: geoCoordMap[data[i][0].name],
        symbolSize: 4,
        label: {
          normal: {
            position: "right"
          }
        }
      });
      line.push([geoCoordMap[data[i][0].name], geoCoordMap[data[i][1].name]]);
    }
    let point = [];
    point.push(
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 3,
        rippleEffect: {
          brushType: "stroke"
        },
        label: {
          fontSize: 24,
          show: true,
          position: "right",
          formatter: "{b}"
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
            show: true,
            position: "left",
            fontSize: 18,
            formatter: "{b}"
          }
        },
        itemStyle: {
          normal: {
            color: "#ff0000"
          }
        },
        data: pointB
      }
    );
    let series = [];
    series.push({
      type: "lines3D",
      effect: {
        show: true,
        period: 3,
        trailLength: 0.1
      },
      lineStyle: {
        color: "#9ae5fc",
        width: 1,
        opacity: 0.6
      },
      data: line
    });
    var canvas = document.createElement("canvas");
    this.myChart = echarts.init(canvas, null, {
      width: 4096,
      height: 2048
    });
    this.myChart.setOption({
      backgroundColor: "rgba(3,28,72,0.3)",
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
        boundingCoords: [[-180, 90], [180, -90]],
        zoom: 0,
        roam: false,
        itemStyle: {
          borderColor: "#000d2d",
          normal: {
            areaColor: "#2455ad",
            borderColor: "#000c2d"
          },
          emphasis: {
            areaColor: "#357cf8"
          }
        },
        label: {
          fontSize: 24
        }
      },
      series: point
    });
    var option = {
      backgroundColor: "rgba(0,0,0,0)", //canvas的背景颜色
      globe: {
        baseTexture: this.myChart,
        top: "middle",
        left: "center",
        displacementScale: 0,
        environment: "none",
        shading: "color",
        viewControl: {
          distance: 240,
          autoRotate: true
        }
      },
      series: series
    };
    echarts.init(document.getElementById("earth")).setOption(option, true);
    
  }
};
</script>
<style scoped>
</style>