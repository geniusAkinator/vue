<template>
  <div :id="id" class="echart"></div>
</template>
<script>
export default {
  data() {
    return {
      id:
        "egauge" +
        Math.random()
          .toString(36)
          .substr(-8),
      myCharts: {}
    };
  },
  methods: {},
  mounted() {
    this.myCharts = echarts.init(document.getElementById(`${this.id}`));
    var dataArr = [
      {
        value: 91,
        name: "本周隐患及时处理率"
      }
    ];
    var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      {
        offset: 0,
        color: "#5CF9FE" // 0% 处的颜色
      },
      {
        offset: 0.17,
        color: "#468EFD" // 100% 处的颜色
      },
      {
        offset: 0.9,
        color: "#468EFD" // 100% 处的颜色
      },
      {
        offset: 1,
        color: "#5CF9FE" // 100% 处的颜色
      }
    ]);
    var colorSet = [[0.91, color], [1, "#15337C"]];
    var rich = {
      white: {
        fontSize: 40,
        color: "#fff",
        fontWeight: "500",
        padding: [20, 0, 0, 0]
      },
      bule: {
        fontSize: 40,
        color: "#fff",
        fontWeight: "500",
        padding: [20, 0, 0, 0]
      },
      radius: {
        // lineHeight:80,
        borderWidth: 1,
        borderColor: "#0092F2",
        fontSize: 14,
        color: "#fff",
        backgroundColor: "#1B215B",
        borderRadius: 20,
        textAlign: "center",
        padding: [10, 10, 10, 10]
      },
      size: {
        height: 100,
        padding: [0, 0, 0, 0]
      }
    };
    let option = {
      backgroundColor: "rgba(0,0,0,0)",
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
      },
      series: [
        {
          //内圆
          type: "pie",
          radius: "85%",
          center: ["50%", "50%"],
          z: 0,
          itemStyle: {
            normal: {
              color: new echarts.graphic.RadialGradient(
                0.5,
                0.5,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(17,24,43,0)"
                  },
                  {
                    offset: 0.5,
                    // color: '#1E2B57'
                    color: "rgba(28,42,91,.6)"
                  },
                  {
                    offset: 1,
                    color: "#141C33"
                    // color:'rgba(17,24,43,0)'
                  }
                ],
                false
              ),
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          label: {
            show: false
          },
          tooltip: {
            show: false
          },
          data: [100]
        },
        {
          type: "gauge",
          name: "外层辅助",
          radius: "74%",
          startAngle: "225",
          endAngle: "-45",
          splitNumber: "100",
          pointer: {
            show: false
          },
          detail: {
            show: false
          },
          data: [
            {
              value: 1
            }
          ],
          // data: [{value: 1, name: 90}],
          title: {
            show: true,
            offsetCenter: [0, 30],
            textStyle: {
              color: "#fff",
              fontStyle: "normal",
              fontWeight: "normal",
              fontFamily: "微软雅黑",
              fontSize: 20
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: [[1, "#00FFFF"]],
              width: 2,
              opacity: 1
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            length: 20,
            lineStyle: {
              color: "#051932",
              width: 0,
              type: "solid"
            }
          },
          axisLabel: {
            show: false
          }
        },
        {
          type: "gauge",
          radius: "70%",
          startAngle: "225",
          endAngle: "-45",
          pointer: {
            show: false
          },
          detail: {
            formatter: function(value) {
              var num = Math.round(value);
              return (
                "{bule|" +
                num +
                "}{white|%}" +
                "{size|" +
                "}\n{radius|本周故障及时处理率}"
              );
            },
            rich: rich
          },
          data: dataArr,
          title: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: colorSet,
              width: 25,
              // shadowBlur: 15,
              // shadowColor: '#B0C4DE',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        {
          //内圆
          type: "pie",
          radius: "56%",
          center: ["50%", "50%"],
          z: 1,
          itemStyle: {
            normal: {
              color: new echarts.graphic.RadialGradient(
                0.5,
                0.5,
                0.8,
                [
                  {
                    offset: 0,
                    color: "#4978EC"
                  },
                  {
                    offset: 0.5,
                    color: "#1E2B57"
                  },
                  {
                    offset: 1,
                    color: "#141F3D"
                  }
                ],
                false
              ),
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          label: {
            show: false
          },
          tooltip: {
            show: false
          },
          data: [100]
        }
      ]
    };

    this.myCharts.setOption(option);
  }
};
</script>

<style>
.echart {
  width: 280px;
  height: 280px;
}
</style>