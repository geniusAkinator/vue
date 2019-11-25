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
            <span class="tip big">您还没有体检，建议立即体检！</span>
            <span class="tip">系统可能存在风险，建议及时体检</span>
            <el-button type="success" round>开始检测</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="check_result warning">
      <span class="result_title">
        <i class="el-icon-info"></i>共检测7项，以下 3 项有问题
      </span>
      <ul class="check_ul">
        <li>
          <i class="el-icon-question"></i>
          <span>剩余电流</span>
          <el-button type="success" size="mini" round>修复</el-button>
        </li>
        <li>
          <i class="el-icon-question"></i>
          <span>电流</span>
          <el-button type="success" size="mini" round>修复</el-button>
        </li>
        <li>
          <i class="el-icon-question"></i>
          <span>温度</span>
          <el-button type="success" size="mini" round>修复</el-button>
        </li>
      </ul>
    </div>
    <div class="check_result success">
      <span class="result_title">
        <i class="el-icon-success"></i>以下 4 项没有问题
      </span>
      <ul class="check_ul">
        <li>
          <i class="el-icon-question"></i>
          <span>剩余电流</span>
        </li>
        <li>
          <i class="el-icon-question"></i>
          <span>电流</span>
        </li>
        <li>
          <i class="el-icon-question"></i>
          <span>温度</span>
        </li>
        <li>
          <i class="el-icon-question"></i>
          <span>温度</span>
        </li>
      </ul>
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
  margin: auto;
}
.check-cont {
  margin: auto;
}
.check-top {
  float: left;
  margin-top: 80px;
}
.tip {
  display: block;
  width: 100%;
}
.tip.big {
  font-size: 30px;
}
.check_ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
}
.check_ul li > span {
  text-align: center;
  display: block;
  width: 100%;
  padding: 10px 0;
}
.check_ul li {
  width: 200px;
}
.check_ul .el-button {
  margin: auto;
  display: block;
}
.check_ul i {
  display: block;
  margin: auto;
  text-align: center;
  font-size: 40px;
}
.check_result.warning i {
  color: #f56c6c;
}
.check_result.success i {
  color: #67c23a;
}
.result_title {
  font-size: 20px;
  padding: 0 60px;
  overflow: hidden;
}
.result_title i {
  margin-right: 10px;
}
</style>