<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>

<script>
export default {
  data() {
    return {
      myChart: {}
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
    var base = +new Date(2019, 7, 28, 0, 0, 0);
    var onMin = 1000 * 60; //一分钟刷新一次
    var date = [];
    var date2 = [];
    var data = [Math.random() * 300];
    for (var i = 1; i < 1440; i++) {
      var now = new Date((base += onMin));
      date.push(
        [
          now.getHours(),
          now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(),
          now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()
        ].join(":")
      );
      data.push(Math.round(Math.random() * 20 + 10));
    }
    for (var i = 1; i < 1000; i++) {
      var now = new Date((base += onMin));
      date2.push(Math.round(Math.random() * 20 + 10));
    }
    let option = {
      tooltip: {
        trigger: "axis",
        position: function(pt) {
          return [pt[0], "10%"];
        }
      },
      legend: {
        data: ["昨日剩余电流", "今日剩余电流"]
      },
      title: {
        left: "left",
        text: "今日数据"
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none"
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: date
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"]
      },
      dataZoom: [
        {
          type: "inside",
          start: 40,
          end: 60
        },
        {
          start: 0,
          end: 10,
          handleIcon:
            "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          handleSize: "80%",
          handleStyle: {
            color: "#fff",
            shadowBlur: 3,
            shadowColor: "rgba(0, 0, 0, 0.6)",
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }
      ],
      series: [
        {
          name: "昨日剩余电流",
          type: "line",
          smooth: true,
          symbol: "none",
          sampling: "average",
          itemStyle: {
            color: "rgb(255, 70, 131)"
          },
          data: data
        },
        {
          name: "今日剩余电流",
          type: "line",
          smooth: true,
          symbol: "none",
          sampling: "average",
          itemStyle: {
            color: "rgb(23, 135, 221)"
          },
          data: date2
        }
      ]
    };
    this.myCharts.setOption(option);
    window.addEventListener("resize", this.resizeChart);
  },
  destroyed() {
    this.myCharts.clear();
  }
};
</script>

<style>
</style>