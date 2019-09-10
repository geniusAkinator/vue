<template>
  <div id="echart" style="width:100%;height:100%"></div>
</template>

<script>
export default {
  data() {
    return {
      myCharts: {}
    };
  },
  methods: {
      resizeChart(){
          this.myCharts.resize()
      }
  },
  mounted() {
    this.myCharts = echarts.init(document.getElementById("echart"));
    var allData = {
      citys: [
        {
          name: "黑龙江",
          value: [126.661669, 45.742347, 2],
          symbolSize: 2, // 2,
          itemStyle: {
            normal: {
              color: "#ED7E41" //"#F58158"
            }
          }
        },
        {
          name: "昆山",
          value: [120.973653, 31.402452, 2],
          symbolSize: 2, // 2,
          itemStyle: {
            normal: {
              color: "#ED7E41" //"#F58158"
            }
          }
        },
        {
          name: "合肥",
          value: [117.165413,31.894283, 2],
          symbolSize: 2, // 2,
          itemStyle: {
            normal: {
              color: "#ED7E41" //"#F58158"
            }
          }
        },
      ],
      moveLines: [
        {
          fromName: "黑龙江",
          toName: "昆山",
          coords: [[126.661669, 45.742347], [120.973653, 31.402452]]
        },
        {
          fromName: "合肥",
          toName: "昆山",
          coords: [[117.165413,31.894283], [120.973653, 31.402452]]
        }
      ]
    };

    let option = {
      backgroundColor: "rgba(0,0,0,0)",
      geo: {
        map: "china",
        label: {
          emphasis: {
            show: false
          }
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: "#004981",
            borderColor: "#179ace"
          },
          emphasis: {
            areaColor: "#a5a5a5"
          }
        },
        bottom:"40px",
        top:"140px"
      },
      series: [
        {
          name: "地点",
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 2,
          rippleEffect: {
            brushType: "stroke"
          },
          label: {
            emphasis: {
              show: true,
              position: "right",
              formatter: "{b}"
            }
          },
          symbolSize: 0,
          showEffectOn: "render",
          itemStyle: {
            normal: {
              color: "#000000"
            }
          },
          data: allData.citys
        },
        {
          name: "线路",
          type: "lines",
          coordinateSystem: "geo",
          zlevel: 2,
          large: true,
          effect: {
            show: true,
            constantSpeed: 30,
            symbol: 'arrow',
            symbolSize: 3,
            trailLength: 0.02,
          },
          lineStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#FFCDB2"
                  },
                  {
                    offset: 1,
                    color: "#F15500"
                  }
                ],
                false
              ),
              width: 1,
              opacity: 0.2,
              curveness: 0.1
            }
          },
          data: allData.moveLines
        }
      ]
    };
    this.myCharts.setOption(option);
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    this.myCharts.clear();
  }
};
</script>

<style>
    
</style>