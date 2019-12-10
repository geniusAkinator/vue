<template>
  <div :id="id" class="chart"></div>
</template>

<script>
export default {
  data() {
    return {
      id:
        "line" +
        Math.random()
          .toString(36)
          .substr(-8),
      myCharts: {}
    };
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    }
  },
  mounted() {
    this.myCharts = echarts.init(document.getElementById(`${this.id}`));
    let option = {
      color: ["#fff"],
      xAxis: {
        type: "category",
        axisLine: {
          lineStyle: {
            color: "#fff" //轴颜色
          }
        }
      },
      grid: {
        top: "20%",
        left: "3%",
        right: "3%",
        bottom: "10%",
        containLabel: true
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#fff" //轴颜色
          }
        },
        splitLine: { show: false } //隐藏网格
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
          lineStyle: {
            color: "#025BE1"
          },
          itemStyle: {
            normal: {
              color: "#025BE1"
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#468efd"
                  },
                  {
                    offset: 1,
                    color: "#B4D1FE"
                  }
                ],
                globalCoord: false
              }
            }
          }
        }
      ]
    };
    this.myCharts.setOption(option);
    window.addEventListener("resize", this.resizeChart);
  }
};
</script>

<style>
.chart {
  width: 100%;
  height: 100%;
}
</style>