<template>
  <div class="clock-container">
    <div class="nowDate">{{nowDate}}</div>
    <div class="wraps">
      <div class="column" :style="{transform:hourTensTransform}">
        <div v-for="index of 6" :key="index">{{index-1}}</div>
      </div>
      <div class="column" :style="{transform:hourUnitsTransform}">
        <div v-for="index of 10" :key="index">{{index-1}}</div>
      </div>
      <div class="maohao">:</div>
      <div class="column" :style="{transform:minTensTransform}">
        <div v-for="index of 6" :key="index">{{index-1}}</div>
      </div>
      <div class="column" :style="{transform:minUnitsTransform}">
        <div v-for="index of 10" :key="index">{{index-1}}</div>
      </div>
      <div class="maohao">:</div>
      <div class="column" :style="{transform:secTensTransform}">
        <div v-for="index of 6" :key="index">{{index-1}}</div>
      </div>
      <div class="column" :style="{transform:secUnitsTransform}">
        <div v-for="index of 10" :key="index">{{index-1}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowDate: "星期日 1月1日",
      hourTensTransform: "",
      hourUnitsTransform: "",
      minTensTransform: "",
      minUnitsTransform: "",
      secTensTransform: "",
      secUnitsTransform: "",
      timer: ""
    };
  },
  methods: {
    updateClock() {
      let date = new Date();
      let hour = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();
      this.secUnitsTransform = `translateY(-${this.getUnits(sec) * 50}px)`;
      this.secTensTransform = `translateY(-${this.getTens(sec) * 50}px)`;
      this.minUnitsTransform = `translateY(-${this.getUnits(min) * 50}px)`;
      this.minTensTransform = `translateY(-${this.getTens(min) * 50}px)`;
      this.hourUnitsTransform = `translateY(-${this.getUnits(hour) * 50}px)`;
      this.hourTensTransform = `translateY(-${this.getTens(hour) * 50}px)`;
    },
    getDate() {
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let week = date.getDay();
      let w = "";
      switch (week) {
        case 0:
          w = "星期日";
          break;
        case 1:
          w = "星期一";
          break;
        case 2:
          w = "星期二";
          break;
        case 3:
          w = "星期三";
          break;
        case 4:
          w = "星期四";
          break;
        case 5:
          w = "星期五";
          break;
        case 6:
          w = "星期六";
          break;
      }
      this.nowDate = `${w}  ${month}月${day}日`;
    },
    getUnits(num) {
      return parseInt(num % 10);
    },
    getTens(num) {
      return parseInt((num % 100) / 10);
    }
  },
  mounted() {
    // this.updateClock()
    this.getDate();
    this.timer = setInterval(this.updateClock, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.clock-container {
  color: #fff;
  background: rgba(0, 0, 0, 0);
}
.column {
  transition: all 0.3s ease-in-out;
}
.wraps {
  overflow: hidden;
  height: 48px;
  display: flex;
  width: 100%;
  justify-content: center;
}
.column {
  font-size: 50px;
  display: block;
  height: 50px;
  text-shadow: 1px 1px 5px #369;
  line-height: 50px;
}
.maohao {
  font-size: 50px;
  display: block;
  line-height: 42px;
  text-shadow: 1px 1px 5px #369;
}
.nowDate {
  display: block;
  text-align: center;
  font-size: 30px;
  background: rgba(0, 0, 0, 0)
}
.clock-container{
  padding: 10px 0;
}
</style>