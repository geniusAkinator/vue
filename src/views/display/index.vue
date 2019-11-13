<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="display-item">
          <div class="item-title">风控系统</div>
          <div class="item-content">
            <ul class="state-list">
              <li class="state-item">
                <span class="state-name">正常</span>
                <span class="state-value">10</span>
              </li>
              <li class="state-item">
                <span class="state-name">异常</span>
                <span class="state-value">10</span>
              </li>
            </ul>
            <el-carousel :interval="5000" arrow="never">
              <el-carousel-item>
                <my-echart-line :id="echart"></my-echart-line>
                <ul class="echart-list">
                  <li>
                    <span class>异常</span>
                    <span class>10</span>
                  </li>
                </ul>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="display-item">
          <div class="item-title">水控系统</div>
          <div class="item-content">
            <div></div>
            <el-carousel :interval="5000" arrow="never">
              <el-carousel-item></el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="display-item">
          <div class="item-title">温控系统</div>
          <div class="item-content">
            <div></div>
            <el-carousel :interval="5000" arrow="never">
              <el-carousel-item></el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyEchartLine from "@/components/eline";
export default {
  data() {
    return {
      echart: "el"
    };
  },
  components: {
    MyEchartLine
  }
};
</script>

<style>
.display-item {
  border: 1px solid #efefef;
}
.item-title {
  padding: 10px 20px;
  border-bottom: 1px solid #efefef;
}
.state-list {
  list-style: none;
  margin: 0;
  padding: 0;
  padding: 20px;
}
.state-list li {
  display: flex;
  justify-content: space-between;
}
.state-value {
  font-size: 24px;
  font-weight: bold;
}
.state-name {
  font-size: 24px;
}
</style>