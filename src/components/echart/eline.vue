<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>
<script>
export default {
  data() {
    return {
      myCharts: {},
      option:{}
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
  computed: {
    colors: function() {
      return this.$store.getters["theme/nowTheme"];
    }
  },
  watch: {
    colors(newVal, oldVal) {
      let _this = this;
      let opt = _this.option;
      opt.color = newVal;
      _this.myCharts.clear();
      _this.myCharts.setOption(opt);
    }
  },
  mounted() {
    let _this = this;
    _this.myCharts = echarts.init(document.getElementById(`${this.id}`));
    _this.option = {
      // color: _this.colors,
      title: {
        text: "",
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
      grid: {
        x: 0,
        y: 60,
        x2: 0,
        y2: 2
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
        },
        {
          data: [
            24,
            2432,
            24,
            42,
            23,
            2423,
            234,
            224,
            242,
            234,
            2423,
            2423,
            2432,
            2423
          ],
          type: "line",
          smooth: true,
          areaStyle: {}
        }
      ]
    };
    _this.myCharts.setOption(_this.option);
    window.addEventListener("resize", _this.resizeChart);
  },
  beforeDestroy() {
    this.myCharts.clear();
  }
};
</script>
<style>
</style>