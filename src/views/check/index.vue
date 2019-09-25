<template>
  <div class="container">
    <div class="check-cont">
      <el-row>
        <el-col :span="12">
          <div class="check-ball">
            <my-echart-ball :id="eball"></my-echart-ball>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="check-top">
            <span>您还没有体检，建议立即体检！</span>
            <span>系统可能存在风险，建议及时体检</span>
          </div>
        </el-col>
      </el-row>
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
  width: 300px;
  height: 300px;
}
.check-cont {
  margin: auto;
}

</style>