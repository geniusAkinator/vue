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
  computed:{
    colors:function(){
      return this.$store.getters['theme/nowTheme']
    }
  },
  mounted() {
    let _this = this;
    _this.myCharts = echarts.init(document.getElementById(`${this.id}`));
    let i = 0;
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
          areaStyle: {},
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