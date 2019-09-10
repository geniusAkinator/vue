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
      title: {
        text: "标题标题标题",
        show:true,
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
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
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