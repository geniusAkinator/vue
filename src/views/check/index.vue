<template>
  <div>
    <div class="check-ball">
      <my-echart-ball :id="eball"></my-echart-ball>您还没有体检，建议立即体检！系统可能存在风险，建议及时体检
      立即体检
      共检测7项，以下 3 项有问题
      以下 4 项没有问题报警检测-共3 项
    </div>
  </div>
</template>

<script>
import MyEchartBall from "@/components/eball";
export default {
  data() {
    return {
      eball: "eball"
    };
  },
  components: {
    MyEchartBall
  }
};
</script>

<style>
.check-ball {
  width: 200px;
  height: 200px;
}
</style>