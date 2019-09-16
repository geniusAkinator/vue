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
      calculable: true,
      series: [
        {
          name: "",
          type: "pie",
          radius: [30, 80],
          center: ["50%", "50%"],
          roseType: "area",
          data: [
            { value: 10, name: "rose1" },
            { value: 5, name: "rose2" },
            { value: 15, name: "rose3" },
            { value: 25, name: "rose4" },
            { value: 20, name: "rose5" },
            { value: 35, name: "rose6" },
            { value: 30, name: "rose7" },
            { value: 40, name: "rose8" }
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