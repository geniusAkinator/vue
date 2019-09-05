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
      grid: {
        x: 10,
        y: 10,
        x2: 10,
        y2: 25,
        borderWidth: 1
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["日", "一", "二", "三", "四", "五", "六"]
      },
      yAxis: {
        show: false
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth:true,
          areaStyle: {}
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