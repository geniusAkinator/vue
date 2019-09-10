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
        x: 0,
        y: 60,
        x2: 0,
        y2: 2,
      },
      xAxis: {
        type: "category",
        show: false
      },
      yAxis: {
        show: false
      },
      series: [
        {
          data: [
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320
          ],
          type: "line",
          smooth: true,
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