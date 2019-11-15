<template>
  <div class="container">
    <el-card class="state-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="8">
          <ul class="state_block">
            <li class="state_item">
              <span class="state_name">温度</span>
              <span class="state_value">10</span>
            </li>
            <li class="state_item">
              <span class="state_name">报警状态</span>
              <span class="state_value">10</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul class="info_block">
            <li class="info_item">
              <span class="info_name">位置</span>
              <span class="info_value">AAA工厂-BBB楼宇-CCC楼层</span>
            </li>
            <li class="info_item">
              <span class="info_name">位置描述</span>
              <span class="info_value">智慧消防展厅独立烟感</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul class="info_block">
            <li class="info_item">
              <span class="info_name">设备型号</span>
              <span class="info_value">XXXXX</span>
            </li>
            <li class="info_item">
              <span class="info_name">更新时间</span>
              <span class="info_value">2019-11-06 02:20:57</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
    <div class="state_record">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <el-table class="state_table" :data="tableData" border stripe style="width: 100%">
              <el-table-column prop="state" label="状态"></el-table-column>
              <el-table-column prop="date" label="时间"></el-table-column>
            </el-table>
            <el-pagination class="state_paging" background layout="prev, pager, next" :total="200"></el-pagination>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="floor_img">
            <div class="not_found">暂无楼层图，请先到工厂管理中添加</div>
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
      tableData: [
        {
          state: 0,
          date: "2016-05-02 09:00"
        },
        {
          state: 0,
          date: "2016-05-02 09:00"
        },
        {
          state: 0,
          date: "2016-05-02 09:00"
        }
      ],
      sensor: {}
    };
  },
  watch: {
    $route: function(newVal, oldVal) {
      
    }
  },
  methods: {
    init() {
      let sId = this.$route.params.sId;
      api.getSensorDetail({ id: sId }).then(res => {
        if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
          let _data = res.data;
          let sensorInfo = _data.transducer;
          for (let key in sensorInfo) {
            this.sensor[key] = sensorInfo[key];
          }
          console.log(this.sensor);
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
.state_block {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}
.state_item {
  display: block;
  flex: 1;
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
.info_block::before {
  position: absolute;
  left: 0;
  top: 5px;
  bottom: 5px;
  width: 1px;
  background: #000;
  display: block;
  content: "";
}
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
  height: 400px;
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
</style>