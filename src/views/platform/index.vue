<template>
  <div class="container dark">
    <my-echart-map></my-echart-map>
  </div>
</template>

<script>
import MyEchartMap from "@/components/emap";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  components: {
    MyEchartMap
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
</style>