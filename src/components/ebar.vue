<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script>
import utils from "@/utils/utils"
export default {
  data() {
    return {
      myCharts: {}
    };
  },
  props: {
    id: ""
  },
  computed: {
    colors: function() {
      return this.$store.getters["theme/nowTheme"];
    }
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    }
  },
  mounted() {
    this.myCharts = echarts.init(document.getElementById(`${this.id}`));
    let option = {
      title: {
        text: "标题标题标题",
        show: true,
        x: "10px",
        y: "10px",
        textStyle: {
          //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
          fontFamily: "Arial, Verdana, sans...",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "normal",
          color: "#8b969c"
        }
      },
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["值1", "值1", "值1", "值1", "值1", "值1", "值1"],
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: "#a5a5a5" //轴颜色
            }
          },
          axisLabel: {
            interval: 0,
            rotate: 40, //倾斜度
            show: true,
            textStyle: {
              //轴上文字
              color: "#a5a5a5" //颜色
            }
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#a5a5a5" //轴颜色
            }
          },
          axisLabel: {
            interval: 0,
            show: true,
            textStyle: {
              //轴上文字
              color: "#a5a5a5" //颜色
            }
          }
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(0,244,255,1)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0,77,167,1)" // 100% 处的颜色
                  }
                ],
                false
              ),
              barBorderRadius: [20, 20, 20, 20],
              shadowBlur: 2
            }
          }
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