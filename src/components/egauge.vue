<template>
  <div>
    <div :id="id" class="chart"></div>
    <span class="others">未接入:200</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myCharts: {},
      angle: {
        startAngle: 225, //开始角度
        endAngle: -45 //结束角度
      }
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
        y:"30%",
        x:"14%",
        text: "接入主数站",
        textStyle: {
          fontWeight: "normal",
          fontSize: 10,
          color: "#fff"
        }
      },
      backgroundColor: "rgba(0,0,0,0)",
      grid: {
        top: 10
      },
      series: [
        {
          type: "gauge",
          startAngle: this.angle.startAngle,
          endAngle: this.angle.endAngle,
          radius: "100%",
          center: ["50%", "55%"],
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            //0-100数字样式
            show: false
          },
          detail: {
            offsetCenter: [0, 15], //文字
            textStyle: {
              fontSize: 18,
              fontWeight: "",
              color: "#ffffff"
            }
          },
          pointer: {
            show: false
          },
          itemStyle: {
            normal: {
              color: "#ffffff"
            }
          },
          min: 0,
          max: 100,
          axisLine: {
            lineStyle: {
              width: 10, //宽度
              color: [[0.8, "#2da9ff"], [1, "#4f6576"]]
            }
          },
          data: [
            {
              value: 600
            }
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
.others {
  border: 1px solid #a2adb3;
  border-radius: 20px;
  color: #a2adb3;
  font-size: 12px;
  text-align: center;
  display: block;
  margin: auto;
  margin-top: 3px;
  padding: 2px;
}
.chart {
  width: 80px;
  height: 80px;
  display: block;
  margin: auto;
}
</style>