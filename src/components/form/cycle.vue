<template>
  <div class="my-row">
    <label class="my-label no-right-radius no-right-border" for>方式</label>
    <el-select v-model="tvalue" class="no-radius" @change="handleSelect">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <template v-if="tvalue == '2'">
      <label class="my-label no-radius no-both-border">星期几</label>
      <el-select v-model="wvalue" class="no-radius" @change="handleWeekSelect">
        <el-option
          v-for="item in WeekOpt"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </template>
    <template v-if="tvalue == '3'">
      <label class="my-label no-radius no-both-border">每</label>
      <el-select v-model="mvalue" class="no-radius" @change="handleMonthSelect">
        <el-option v-for="index in 12" :key="index" :label="index" :value="index"></el-option>
      </el-select>
      <label class="my-label no-radius no-both-border">月</label>
      <el-select v-model="dvalue" class="no-radius" @change="handleDaySelect">
        <el-option v-for="index in day" :key="index" :label="index" :value="index"></el-option>
      </el-select>
      <label class="my-label no-radius no-left-border">日</label>
    </template>
    <template v-if="tvalue == '4'">
      <label class="my-label no-radius no-both-border">每</label>
      <el-select v-model="mvalue" class="no-radius" @change="handleMonthSelect">
        <el-option v-for="index in 12" :key="index" :label="index" :value="index"></el-option>
      </el-select>
      <label class="my-label no-radius no-both-border">月</label>
      <el-select v-model="dvalue" class="no-radius" @change="handleDaySelect">
        <el-option v-for="index in day" :key="index" :label="index" :value="index"></el-option>
      </el-select>
      <label class="my-label no-radius no-left-border">日</label>
    </template>
    <label class="my-label no-radius no-both-border">方式</label>
    <el-time-picker
      class="no-left-radius"
      is-range
      v-model="range"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围"
    ></el-time-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "按天"
        },
        {
          value: "2",
          label: "按星期"
        },
        {
          value: "3",
          label: "按月"
        },
        {
          value: "4",
          label: "按年"
        }
      ],
      WeekOpt: [
        {
          value: "1",
          label: "星期一"
        },
        {
          value: "2",
          label: "星期二"
        },
        {
          value: "3",
          label: "星期三"
        },

        {
          value: "4",
          label: "星期四"
        },
        {
          value: "5",
          label: "星期五"
        },
        {
          value: "6",
          label: "星期六"
        },
        {
          value: "7",
          label: "星期日"
        }
      ],
      mvalue: "1",
      tvalue: "1",
      wvalue: "1",
      dvalue: "1",
      range: "",
      day: 30
    };
  },
  methods: {
    handleSelect() {},
    handleWeekSelect() {},
    handleMonthSelect() {
      this.getMonthDay(2019, this.mvalue);
      this.dvalue = "1";
    },
    getMonthDay(year, month) {
      let date = new Date();
      let d = new Date(date.getYear(), month, 0);
      this.day = d.getDate();
    },
    handleDaySelect() {}
  }
};
</script>

<style>
.my-row {
  display: flex;
}
.my-row .my-label {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  width: 1px;
  white-space: nowrap;
  height: 38px;
  text-align: center;
  flex: 1;
  min-width: 60px;
  max-width: 120px;
}
.my-label.no-right-radius {
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.el-select.no-radius input,
.my-label.no-radius {
  border-radius: 0 !important;
}
.el-select.no-left-radius input,
.no-left-radius {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}
.no-both-border {
  border-left: 0 !important;
  border-right: 0 !important;
}
.no-left-border {
  border-left: 0 !important;
}
.no-right-border {
  border-right: 0 !important;
}
</style>