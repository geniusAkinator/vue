<template>
  <div class="container dark">
    <div class="ehart-map-container">
      <my-echart-map></my-echart-map>
    </div>
    <div>
      <my-gauge :id="chart1"></my-gauge>
      <my-gauge :id="chart2"></my-gauge>
    </div>
  </div>
</template>

<script>
import MyEchartMap from "@/components/emap";
import MyGauge from "@/components/gauge";
export default {
  data() {
    return {
      chart1: "chart1",
      chart2: "chart2"
    };
  },
  methods: {},
  mounted() {},
  components: {
    MyEchartMap,
    MyGauge
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 0;
  background: url("../../../static/images/chart_bg.jpg");
}
.ehart-map-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>