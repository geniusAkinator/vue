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
  methods: {},
  props: {
    id: ""
  },
  mounted() {
    this.myCharts = echarts.init(document.getElementById(`${this.id}`));
    let option = {
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
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    this.myCharts.setOption(option);
  }
};
</script>

<style>
</style>