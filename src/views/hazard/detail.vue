<template>
  <div class="container">
    <el-card class="state-card"   >
      <el-row :gutter="20">
        <el-col :span="12">
          <ul class="state_block">
            <li class="state_item">
              <div class="border-circle warning">0</div>
            </li>
            <li class="state_item">
              <div class="border-circle danger">0</div>
            </li>
          </ul>
        </el-col>
        <el-col :span="12">
          <ul class="info_block">
            <li class="info_item">
              <span class="info_name">隐患类型</span>
              <span class="info_value">未处理故障设备大于该设备总数的20%</span>
            </li>
            <li class="info_item">
              <span class="info_name">隐患位置</span>
              <span class="info_value">创建建筑虚拟点位</span>
            </li>
            <li class="info_item">
              <span class="info_name">上报时间</span>
              <span class="info_value">2019-11-16 13:59:24</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
    <div class="state_record">
      <el-row :gutter="20">
        <el-col :span="12">
          <span class="timeline_title">处理过程</span>
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >{{activity.content}}</el-timeline-item>
          </el-timeline>
        </el-col>
        <el-col :span="12">
          <div class="solve">
            <div class="assign">
              <el-button type="primary" size="mini">指派</el-button>
              <el-button size="mini">忽略</el-button>
            </div>
            <div class="resolution">解决方法</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      activities: [
        {
          content: "系统上报",
          timestamp: "2018-04-15"
        },
        {
          content: "系统上报",
          timestamp: "2018-04-13"
        },
        {
          content: "系统上报",
          timestamp: "2018-04-11"
        }
      ]
    };
  },
  watch: {},
  methods: {
    init() {}
  },
  created() {
    this.init();
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy();
    next();
  }
};
</script>

<style>
.detail_img_content {
  min-height: 100px;
  width: 100%;
  border: 1px solid #dcdfe6;
  overflow: hidden;
  cursor: crosshair;
  position: relative;
  line-height: 0;
}
.state_block {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}
.state_item {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.state_name {
  display: block;
  font-weight: bold;
  font-size: 22px;
}
.state_value {
  font-size: 22px;
}
.info_block {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  padding: 0 20px;
}
/* .info_block::before {
  position: absolute;
  left: 0;
  top: 5px;
  bottom: 5px;
  width: 1px;
  background: #000;
  display: block;
  content: "";
} */
.info_item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.info_item:last-child {
  margin-bottom: 0;
}
.state_record {
  margin-top: 20px;
}
.floor_img {
  width: 100%;
  border: 1px solid #ebeef5;
}
.not_found {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.state_paging {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.state_table .cell {
  text-align: center;
}
.floor_img_marker {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
}
.action-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 600px;
  padding: 10px;
  overflow: hidden;
  overflow-y: scroll;
  border: 1px solid #efefef;
}
.group-name {
  font-size: 22px;
  font-weight: bold;
  margin: 16px 0;
  display: block;
}
.action-detail-list {
  list-style-type: none;
  background: #ebeef5;
  padding: 20px;
  border-radius: 5px;
}
.action-detail-list li {
  margin-bottom: 10px;
}

.info-panel {
  margin-bottom: 20px;
  background: #ebeef5;
  padding: 10px;
  border-radius: 5px;
}
.not_found {
  height: 100%;
  line-height: 102px;
}
.border-circle {
  width: 100px;
  height: 100px;
  border: 2px solid #409eff;
  text-align: center;
  line-height: 100px;
  border-radius: 50%;
}
.border-circle.danger {
  border: 2px solid #f56c6c;
  background: #fff;
}
.border-circle.warning {
  border: 2px solid #e6a23c;
  background: #fff;
}
.timeline_title {
  padding: 10px 20px;
  display: block;
  font-weight: bold;
}
</style>