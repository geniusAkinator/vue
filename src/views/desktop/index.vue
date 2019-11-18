<template>
  <div class="container">
    <el-row :gutter="10">
      <el-button>切换主体</el-button>
      <el-row :gutter="10" class="statistics">
        <el-col :sm="6">
          <div class="sta_item">
            <i class="el-icon-user"></i>
            <router-link class="item" :to="'factory'">
              <div>
                工厂总数:
                <span>{{sData.factoryTotal}}</span>
              </div>
            </router-link>
            <router-link class="item" :to="'member'">
              <div>
                人员总数:
                <span>55</span>
              </div>
            </router-link>
          </div>
        </el-col>
        <el-col :sm="6">
          <div class="sta_item">
            <i class="el-icon-link"></i>
            <router-link class="item" :to="'sensor'">
              <div>
                在线设备:
                <span>{{sData.inLine}}</span>
              </div>
            </router-link>
            <router-link class="item" :to="'sensor'">
              <div>
                离线设备:
                <span>{{sData.offLine}}</span>
              </div>
            </router-link>
          </div>
        </el-col>
        <el-col :sm="6">
          <div class="sta_item">
            <i class="el-icon-circle-close"></i>
            <router-link class="item" :to="''">
              <div>
                故障总数:
                <span>55</span>
              </div>
            </router-link>
            <router-link class="item" :to="''">
              <div>
                处理总数:
                <span>55</span>
              </div>
            </router-link>
          </div>
        </el-col>
        <el-col :sm="6">
          <div class="sta_item">
            <i class="el-icon-s-order"></i>
            <router-link class="item" :to="''">
              <div>
                任务总数:
                <span>55</span>
              </div>
            </router-link>
            <router-link class="item" :to="''">
              <div>
                完成总数:
                <span>55</span>
              </div>
            </router-link>
          </div>
        </el-col>
      </el-row>
      <el-col :md="16">
        <el-col :md="24">
          <el-card class="box-card" shadow="hover">
            <div class="text item" style="height:700px">
              <my-map :list.sync="geoList"></my-map>
            </div>
          </el-card>
        </el-col>
        <el-col :md="24" style="margin-top:10px">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <i class="el-icon-receiving"></i>
              <span>项目信息</span>
            </div>
            <div class="text">
              <my-factory-box></my-factory-box>
            </div>
          </el-card>
        </el-col>
      </el-col>
      <el-col :md="8">
        <el-col :md="24">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <i class="el-icon-s-promotion"></i>
              <span>历史</span>
            </div>
            <div class="text">
              <!-- <ul class="fast_box">
                <li>
                  <p>您有处隐患需要您去解决</p>
                  <router-link :to="'index'">查看</router-link>
                </li>
                <li>
                  <p>您有处隐患需要您去解决</p>
                  <router-link :to="'index'">查看</router-link>
                </li>
              </ul>-->
              <div class="tips">
                <div class="tips-item">
                  <i class="circle warning"></i>
                  报警
                </div>
                <div class="tips-item">
                  <i class="circle danger"></i>
                  故障
                </div>
                <div class="tips-item">
                  <i class="circle info"></i>
                  离线
                </div>
              </div>
              <my-calendar class="calendar" :list="calList"></my-calendar>
            </div>
          </el-card>
        </el-col>
        <el-col :md="24" style="margin-top:10px">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <i class="el-icon-data-line"></i>
              <span>本月隐患</span>
              <el-button class="header_right" type="text">
                <el-radio-group v-model="labelPos" size="small">
                  <el-radio-button label="monthly">月报</el-radio-button>
                  <el-radio-button label="weekly">周报</el-radio-button>
                </el-radio-group>
              </el-button>
            </div>
            <div class="text item">
              <!-- <my-echart-line :id="echart"></my-echart-line> -->
            </div>
          </el-card>
        </el-col>
        <el-col :md="24" style="margin-top:10px">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <i class="el-icon-edit-outline"></i>
              <span>操作日志</span>
            </div>
            <div class="text item" style="min-height:300px;height:auto">
              <div class="block">
                <el-timeline>
                  <el-timeline-item timestamp="2019/10/10" placement="top">
                    <el-card>
                      <h4>修改了什么什么页面</h4>
                      <p>admin 提交于 2019/10/10 20:46</p>
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2019/10/10" placement="top">
                    <el-card>
                      <h4>修改了什么什么页面</h4>
                      <p>admin 提交于 2019/10/10 20:46</p>
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2019/10/10" placement="top">
                    <el-card>
                      <h4>修改了什么什么页面</h4>
                      <p>admin 提交于 2019/10/10 20:46</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
    <el-backtop target=".el-main"></el-backtop>
  </div>
</template>
<script>
import MyMap from "@/components/map";
import MyCalendar from "@/components/calendar";
import MyFactoryBox from "@/components/factorybox";
import api from "@/api/index";
import utils from "@/utils/utils";
import MyEchartLine from "@/components/eline";

export default {
  data() {
    return {
      Listform: {
        pageNum: 1,
        pageSize: 0
      },
      sData: {
        //桌面数据统计
        factoryTotal: 0,
        inLine: 0,
        offLine: 0
      },
      test: "name",
      geoList: [],
      calList: [],
      labelPos: "weekly",
      echart: "sta"
    };
  },
  methods: {
    resizeChart() {
      this.myCharts.resize();
    }
  },
  created() {
    //数据统计
    api
      .getAllData()
      .then(res => {
        if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
          let _data = res.data;
          for (let key in _data) {
            this.sData[key] = _data[key];
          }
        }
      })
      .catch(_ => {});
  },
  mounted() {
    api
      .getFactoryData(this.Listform)
      .then(res => {
        if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
          let _data = res.data;
          console.log(_data);
          _data.content.map((item, i) => {
            item.show = false;
            this.geoList.push(item);
          });
        }
      })
      .catch(_ => {});
    let orgOptions = {
      xAxis: {
        type: "category",
        data: [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line"
        },
        {
          data: [111, 222, 22, 21, 121, 121, 1212],
          type: "line"
        }
      ]
    };
  },
  components: {
    MyMap,
    MyCalendar,
    MyFactoryBox,
    MyEchartLine
  }
};
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.text.item {
  width: 100%;
  height: 300px;
}
.fast_box li {
  list-style: none;
  display: flex;
  padding: 10px 0;
}
.fast_box p {
  margin: 0;
}
.fast_box a {
  margin-left: auto;
}
.fast_box {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.statistics {
  margin-bottom: 20px;
}
.sta_item {
  display: flex;
  align-items: center;
  height: 100px;
  background: #f2f6fc;
  border-radius: 10px;
  padding: 15px;
}
.sta_item i {
  font-size: 34px;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
}
.sta_item .item {
  text-align: center;
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  color: #606266;
}
.sta_item i {
  background-color: #409eff;
}
.statistics > div:nth-child(2) i {
  background-color: #67c23a;
}
.statistics > div:nth-child(3) i {
  background-color: #f56c6c;
}
.statistics > div:nth-child(4) i {
  background-color: #909399;
}
.sta_item .item:last-child {
  margin-left: auto;
}
.statistics > div {
  color: #909399;
}
.sta_item span {
  width: 100%;
  display: block;
  font-size: 26px !important;
  color: #606266;
}

@media screen and (max-width: 768px) {
  .sta_item {
    margin-bottom: 20px;
  }
}
</style>