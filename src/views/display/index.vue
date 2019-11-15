<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8" v-for="index of 6" :key="index">
        <div class="sys-block" @click="jump">
          <div class="block-title">风控系统</div>
          <div class="block-content">
            <el-carousel :interval="5000">
              <el-carousel-item v-for="idx of 3" :key="idx">
                <div class="sys-item">
                  <div class="sys-img"></div>
                  <div class="sys-content">
                    <div class="sys-title">
                      <span>烟感</span>
                      <span>全部点位9</span>
                    </div>
                    <ul class="state-ul">
                      <li>
                        <span class="left">正常</span>
                        <div class="bar">
                          <div class="now-bar"></div>
                        </div>
                        <span class="right">3</span>
                      </li>
                      <li>
                        <span class="left">异常</span>
                        <div class="bar error">
                          <div class="now-bar"></div>
                        </div>
                        <span class="right">9</span>
                      </li>
                    </ul>
                    <div class="border-down-empty">
                      <span></span>
                    </div>
                  </div>
                </div>
              </el-carousel-item>
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
  methods: {
    jump() {
      this.$router.push({
        name: "传感器展示"
      });
    }
  },
  components: {
    MyEchartLine
  }
};
</script>

<style>
.sys-block {
  border: 1px solid #efefef;
  cursor: pointer;
  margin-top: 20px;
}
.block-title {
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
.sys-img {
  width: 100px;
  height: 100px;
  background: green;
  margin-right: 10px;
}
.sys-item {
  display: flex;
  padding: 20px;
  margin-top: 35px;
  background: #fff;
}
.sys-content {
  flex: 1;
}
.sys-title {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}
.el-carousel__container {
  height: 200px;
}
.bar {
  width: 80%;
  height: 5px;
}
.now-bar {
  background: #67c23a;
  width: 40%;
  height: 5px;
  border-radius: 5px;
}
.bar.error .now-bar {
  background: #f56c6c;
  width: 60%;
}
.realtime-aside {
  border-radius: 5px;
}
.state-ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.state-ul li {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
}
.state-ul li .left {
  display: block;
}
</style>