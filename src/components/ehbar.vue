<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script>
export default {
  data() {
    return {
      option:"",
      myCharts:{}
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
  watch:{
    colors(){
      this.myCharts.clear()
      this.myCharts.setOption(this.option);
    }
  },
  mounted() {
    let _this = this;
    _this.myCharts = echarts.init(document.getElementById(`${this.id}`));
    _this.option = {
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
      backgroundColor: "rgba(0,0,0,0)",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        left: "1%",
        right: "10%",
        bottom: "5%",
        top: "13%",
        containLabel: true
      },
      xAxis: {
        type: "value",
        position: "top",
        splitLine: { show: false },
        boundaryGap: [0, 0.01],
        axisLine: {
          lineStyle: {
            color: "#a5a5a5" //轴颜色
          }
        },
        axisLabel: {
          interval: 0,
          show: true,
          textStyle: {
            //轴上文字
            color: "#a5a5a5" //颜色
          }
        }
      },
      yAxis: {
        type: "category",
        data: [
          "崇左市",
          "来宾市",
          "河池市",
          "贺州市",
          "百色市",
          "玉林市",
          "贵港市",
          "钦州市",
          "防城港市",
          "北海市",
          "梧州市",
          "桂林市",
          "柳州市",
          "南宁市"
        ],
        axisLine: {
          lineStyle: {
            color: "#a5a5a5" //轴颜色
          }
        },
        axisLabel: {
          interval: 0,
          show: true,
          textStyle: {
            //轴上文字
            color: "#a5a5a5" //颜色
          }
        }
      },
      series: [
        {
          name: "办理事项数",
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList = _this.colors;
                return colorList[params.dataIndex];
              },
              shadowBlur: 20,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          type: "bar",
          data: [
            9263,
            13203,
            14203,
            18103,
            21203,
            28903,
            38203,
            41603,
            48203,
            53489,
            59034,
            64970,
            71744,
            80230
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