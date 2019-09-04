<template>
  <div class="container dark">
    <div id="echart" style="width:100%px;height:100%"></div>
  </div>
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
        }
      ],
      moveLines: [
        {
          fromName: "黑龙江",
          toName: "昆山",
          coords: [[126.661669, 45.742347], [120.973653, 31.402452]]
        }
      ]
    };

    let option = {
      backgroundColor: "#404a59",
      legend: {
        show: false,
        orient: "vertical",
        top: "bottom",
        left: "right",
        data: ["地点", "线路"],
        textStyle: {
          color: "#fff"
        }
      },
      geo: {
        map: "china",
        label: {
          emphasis: {
            show: false
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: "#323c48",
            borderColor: "#404a59"
          },
          emphasis: {
            areaColor: "#2a333d"
          }
        }
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
            symbol: "pin",
            symbolSize: 3,
            trailLength: 0
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
};
</script>

<style>
    
</style>