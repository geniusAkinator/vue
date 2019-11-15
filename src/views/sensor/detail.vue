<template>
  <div class="container">
    <el-tabs type="border-card">
      <el-tab-pane label="传感器详情">
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
                  <span
                    class="info_value"
                  >{{sensor.floor.building.factory.factoryName}}---{{sensor.floor.building.name}}---{{sensor.floor.floorName}}</span>
                </li>
              </ul>
            </el-col>
            <el-col :span="8">
              <ul class="info_block">
                <li class="info_item">
                  <span class="info_name">设备型号</span>
                  <span class="info_value">{{sensor.transducerType.name}}</span>
                </li>
                <li class="info_item">
                  <span class="info_name">设备类型</span>
                  <span class="info_value">
                    <div v-for="(item,index) in options" :key="index">
                      <span v-if="item.value == sensor.transducerType.type">{{item.label}}</span>
                    </div>
                  </span>
                </li>
                <li class="info_item">
                  <span class="info_name">到期时间</span>
                  <span class="info_value">{{sensor.expirationDate}}</span>
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
                <el-pagination
                  class="state_paging"
                  background
                  layout="prev, pager, next"
                  :total="200"
                ></el-pagination>
              </div>
            </el-col>
            <el-col :span="12">
              <div ref="floorImg" class="detail_img_content" v-if="sensor.floor.picture!=''">
                <img class="floor_img" :src="imgUrl+sensor.floor.picture" />
                <img
                  ref="marker"
                  :style="{left:`${sensor.xaxis}%`,top:`${sensor.yaxis}%`}"
                  class="floor_img_marker"
                  :src="icon"
                  alt
                />
              </div>
              <div class="detail_img_content" v-if="sensor.floor.picture==''">
                <div class="not_found">暂无楼层图，请先到工厂管理中添加</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="故障详情">
        <el-card class="state-card" shadow="hover">
          <el-row :gutter="20" class="info-panel">
            <el-col :span="12">
              <ul class="info_block">
                <li class="info_item">
                  <span class="info_name">故障内容：</span>
                  <span class="info_value">XXXXXX</span>
                </li>
                <li class="info_item">
                  <span class="info_name">设备类型：</span>
                  <span class="info_value">AAAAAAA</span>
                </li>
                <li class="info_item">
                  <span class="info_name">位置描述：</span>
                  <span class="info_value">AAAAAAA</span>
                </li>
              </ul>
            </el-col>
            <el-col :span="12">
              <ul class="info_block">
                <li class="info_item">
                  <span class="info_name">首次上报时间：</span>
                  <span class="info_value">2019-11-08 00:00:00</span>
                </li>
                <li class="info_item">
                  <span class="info_name">最后一次上报时间：</span>
                  <span class="info_value">2019-11-08 00:00:00</span>
                </li>
                <li class="info_item">
                  <span class="info_name">上报次数：</span>
                  <span class="info_value">10</span>
                </li>
              </ul>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <ul class="action-list">
                <li class="action-item">
                  <span class="group-name">灭火组</span>
                  <ul class="action-detail-list">
                    <li>
                      <span>描述：</span>
                      <span>发生火灾时候负责调动资源应急指挥</span>
                    </li>
                    <li>
                      <span>人员：</span>
                      <span>王长贵</span>
                    </li>
                    <li>
                      <span>任务：</span>
                      <span>
                        1.迅速到达现场
                        <br />2.进行灭火扑救
                        <br />3.抢救被困人员
                      </span>
                    </li>
                  </ul>
                </li>
                <li class="action-item">
                  <span class="group-name">灭火组</span>
                  <ul class="action-detail-list">
                    <li>
                      <span>描述：</span>
                      <span>发生火灾时候负责调动资源应急指挥</span>
                    </li>
                    <li>
                      <span>人员：</span>
                      <span>王长贵</span>
                    </li>
                    <li>
                      <span>任务：</span>
                      <span>
                        1.迅速到达现场
                        <br />2.进行灭火扑救
                        <br />3.抢救被困人员
                      </span>
                    </li>
                  </ul>
                </li>
                <li class="action-item">
                  <span class="group-name">灭火组</span>
                  <ul class="action-detail-list">
                    <li>
                      <span>描述：</span>
                      <span>发生火灾时候负责调动资源应急指挥</span>
                    </li>
                    <li>
                      <span>人员：</span>
                      <span>王长贵</span>
                    </li>
                    <li>
                      <span>任务：</span>
                      <span>
                        1.迅速到达现场
                        <br />2.进行灭火扑救
                        <br />3.抢救被困人员
                      </span>
                    </li>
                  </ul>
                </li>
                <li class="action-item">
                  <span class="group-name">灭火组</span>
                  <ul class="action-detail-list">
                    <li>
                      <span>描述：</span>
                      <span>发生火灾时候负责调动资源应急指挥</span>
                    </li>
                    <li>
                      <span>人员：</span>
                      <span>王长贵</span>
                    </li>
                    <li>
                      <span>任务：</span>
                      <span>
                        1.迅速到达现场
                        <br />2.进行灭火扑救
                        <br />3.抢救被困人员
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </el-col>
            <el-col :span="16">
              <div class="res">
                <el-button type="primary" round>指派</el-button>
                <el-button round>忽略</el-button>
              </div>
              <div class="resolution">解决方法</div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from "@/api/index";
import { Loading } from "element-ui";
import baseURL from "@/utils/baseUrl";
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
      options: [
        {
          value: 1,
          label: "温湿度"
        },
        {
          value: 2,
          label: "烟雾"
        },
        {
          value: 3,
          label: "二氧化碳"
        },
        {
          value: 4,
          label: "可燃气体"
        },
        {
          value: 5,
          label: "水压"
        },
        {
          value: 6,
          label: "水深"
        },
        {
          value: 7,
          label: "甲醛"
        }
      ],
      sensor: {
        createDateTime: "",
        deviceNumber: "",
        deviceStatus: 0,
        expirationDate: "",
        factory: {
          address: "",
          createDateTime: "",
          description: "",
          factoryId: 0,
          factoryName: "",
          factoryType: 0,
          latitude: 0,
          leader: "",
          longitude: 0,
          phone: "",
          picture: "",
          province: "",
          tel: "",
          updateDateTime: ""
        },
        floor: {
          building: {
            area: 0,
            buildingId: 0,
            createtime: "",
            factory: {
              address: "",
              createDateTime: "",
              description: "",
              factoryId: 0,
              factoryName: "",
              factoryType: 0,
              latitude: 0,
              leader: "",
              longitude: 0,
              phone: "",
              picture: "",
              province: "",
              tel: "",
              updateDateTime: ""
            },
            name: "",
            picture: "",
            underLevel: 0,
            updatetime: "",
            upperLevel: 0
          },
          floorId: 0,
          floorName: "",
          picture: "",
          createtime: "",
          updatetime: ""
        },
        latitude: 0,
        longitude: 0,
        transducerId: 0,
        transducerType: { ttId: 0, name: "", state: 0, type: 0 },
        xaxis: 0,
        yaxis: 0
      },
      imgUrl: baseURL,
      icon: require("@/assets/map-marker.png")
    };
  },
  watch: {},
  methods: {
    init() {
      let sId = this.$route.params.sId;
      console.log(sId);
      api.getSensorDetail({ id: sId }).then(res => {
        if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
          let _data = res.data;
          let sensorInfo = _data.transducer;
          for (let key in sensorInfo) {
            this.sensor[key] = sensorInfo[key];
          }
          console.log("sensor", this.sensor);
        }
      });
    }
  },
  created() {
    console.log("create");
    this.init();
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy();
    next();
  },
  destroyed() {
    console.log("destroyed");
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
.resolution {
  background: #ebeef5;
  border-radius: 5px;
  padding: 20px;
  font-size: 14px;
  margin-top: 20px;
}
.res {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.res button {
  margin-right: 10px;
}
.info_name{
  font-weight: bold;
}
.info-panel{
  margin-bottom: 20px;
  background: #ebeef5;
  padding: 10px;
  border-radius: 5px;
}
</style>