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
    let option = {
      backgroundColor: "rgba(0,0,0,0)",
      color: ["#3D91F7", "#61BE67"],
      radar: {
        radius: "70%",
        triggerEvent: true,
        name: {
          textStyle: {
            color: "#fff",
            fontSize: "12",
            borderRadius: 3,
            padding: [0, 0]
          }
        },
        nameGap: "2",
        indicator: [
          {
            name: "资金周转",
            max: 6500
          },
          { name: "其他", max: 16000 },
          { name: "金融理财", max: 30000 },
          { name: "投资", max: 38000 }
        ],
        splitArea: {
          areaStyle: {
            color: [
              "rgba(222,134,85, 0.1)",
              "rgba(222,134,85, 0.2)",
              "rgba(222,134,85, 0.4)",
              "rgba(222,134,85, 0.6)",
              "rgba(222,134,85, 0.8)",
              "rgba(222,134,85, 1)"
            ].reverse()
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(0,0,0,0)"
          }
        },
        splitLine: {
          lineStyle: {
            width: 2,
            color: [
              "rgba(224,134,82, 0.1)",
              "rgba(224,134,82, 0.2)",
              "rgba(224,134,82, 0.4)",
              "rgba(224,134,82, 0.6)",
              "rgba(224,134,82, 0.8)",
              "rgba(224,134,82, 1)"
            ].reverse()
          }
        }
      },

      series: [
        {
          name: "一级权重分析",
          type: "radar",
          areaStyle: {
            normal: {
              color: "rgba(252,211,3, 0.3)"
            }
          },
          symbolSize: 0,
          lineStyle: {
            normal: {
              color: "rgba(252,211,3, 1)",
              width: 1
            }
          },
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000, 21000],
              name: "因素"
            }
          ]
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