<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script>
export default {
  data() {
    return {
      myCharts: {}
    };
  },
  props: {
    id: ""
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    }
  },
  mounted() {
    this.myCharts = echarts.init(document.getElementById(`${this.id}`));
    var highlight = "#03b7c9";
    var demoData = {
      name: "电压",
      value: 220,
      unit: "V",
      range: [0, 400]
    };
    let option = {
      backgroundColor: "rgba(0,0,0,0)",
      series: [
        {
          type: "gauge",
          center: ["50%", "50%"],
          radius: "60%",
          splitNumber: demoData.splitNum || 10,
          min: demoData.range[0],
          max: demoData.range[1],
          startAngle: 225,
          endAngle: -45,
          axisLine: {
            show: true,
            lineStyle: {
              width: 2,
              shadowBlur: 0,
              color: [[1, highlight]]
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: highlight,
              width: 1
            },
            length: -5,
            splitNumber: 10
          },
          splitLine: {
            show: true,
            length: -14,
            lineStyle: {
              color: highlight
            }
          },
          axisLabel: {
            distance: -20,
            textStyle: {
              color: highlight,
              fontSize: "14",
              fontWeight: "bold"
            }
          },
          pointer: {
            show: 0
          },
          detail: {
            show: 0
          }
        },

        // 内侧指针、数值显示
        {
          name: demoData.name,
          type: "gauge",
          center: ["50%", "50%"],
          radius: "55%",
          startAngle: 225,
          endAngle: -45,
          min: demoData.range[0],
          max: demoData.range[1],
          axisLine: {
            show: true,
            lineStyle: {
              width: 16,
              color: [[1, "rgba(255,255,255,.1)"]]
            }
          },
          axisTick: {
            show: 0
          },
          splitLine: {
            show: 0
          },
          axisLabel: {
            show: 0
          },
          pointer: {
            show: true,
            length: "105%"
          },
          detail: {
            show: true,
            offsetCenter: [0, "100%"],
            textStyle: {
              fontSize: 16,
              color: "#fff"
            },
            formatter: [
              "{value} " + (demoData.unit || ""),
              "{name|" + demoData.name + "}"
            ].join("\n"),
            rich: {
              name: {
                fontSize: 14,
                lineHeight: 30,
                color: "#ddd"
              }
            }
          },
          itemStyle: {
            normal: {
              color: highlight
            }
          },
          data: [
            {
              value: demoData.value
            }
          ]
        }
      ]
    };

    this.myCharts.setOption(option);
    window.addEventListener("resize", this.resizeChart);
  }
};
</script>

<style>
</style>