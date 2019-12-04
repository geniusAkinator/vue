<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script>
export default {
  data() {
    return {
      myCharts: {},
      option: {}
    };
  },
  props: {
    id: ""
  },
  mounted() {
    let _this = this;
    _this.myCharts = echarts.init(document.getElementById(`${_this.id}`));
    _this.option = {
      series: [
        {
          type: "liquidFill",
          radius: "50%",
          data: [0.6],
          color: "rgba(67,209,100,1)",
          label: {
            normal: {
              color: "#fff",
              insideColor: "transparent",
              textStyle: {
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "Microsoft YaHei"
              }
            }
          },
          outline: {
            show: true,
            borderDistance: 5,
            itemStyle: {
              borderColor: "rgba(67,209,100,1)",
              borderWidth: 2
            }
          },
          backgroundStyle: {
            color: "rgba(67,209,100,.3)"
          }
        }
      ]
    };
    _this.myCharts.setOption(_this.option);
    window.addEventListener("resize", _this.resizeChart);
  }
};
</script>
<style>
</style>