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
  methods: {
    resizeChart() {
      this.myCharts.resize();
    }
  },
  mounted() {
    let _this = this;
    _this.myCharts = echarts.init(document.getElementById(`${_this.id}`));
    _this.option = {
      color: _this.colors,
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