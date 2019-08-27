<template>
  <div class="container">
    <el-row :gutter="10">
      <el-row :gutter="10" class="statistics">
        <el-col :md="6">
          <div class="sta_item">
            <i class="el-icon-user"></i>
            <div>
              工厂总数:
              <span>55</span>
            </div>
            <div>
              人员总数:
              <span>55</span>
            </div>
          </div>
        </el-col>
        <el-col :md="6">
          <div class="sta_item">
            <i class="el-icon-link"></i>
            <div>
              在线设备:
              <span>55</span>
            </div>
            <div>
              离线设备:
              <span>55</span>
            </div>
          </div>
        </el-col>
        <el-col :md="6">
          <div class="sta_item">
            <i class="el-icon-circle-close"></i>
            <div>
              故障总数:
              <span>55</span>
            </div>
            <div>
              处理总数:
              <span>55</span>
            </div>
          </div>
        </el-col>
        <el-col :md="6">
          <div class="sta_item">
            <i class="el-icon-s-order"></i>
            <div>
              任务总数:
              <span>55</span>
            </div>
            <div>
              完成总数:
              <span>55</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-col :md="16">
        <el-col :md="24">
          <el-card class="box-card">
            <div class="text item" style="height:700px">
              <my-map :list.sync="geoList"></my-map>
            </div>
          </el-card>
        </el-col>
        <el-col :md="24" style="margin-top:10px">
          <el-card class="box-card">
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
          <el-card class="box-card">
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
                  通讯中断（失联）
                </div>
              </div>
              <my-calendar :list="calList"></my-calendar>
            </div>
          </el-card>
        </el-col>
        <el-col :md="24" style="margin-top:10px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <i class="el-icon-data-line"></i>
              <span>本月隐患</span>
            </div>
            <div class="text item">
              <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
            </div>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MyMap from "@/components/map";
import MyCalendar from "@/components/calendar";
import MyFactoryBox from "@/components/factorybox";
import api from "@/api/index";

export default {
  data() {
    return {
      orgOptions: {},
      test: "name",
      geoList: [],
      calList: [],
    };
  },
  methods: {
    openLayer() {},
    resizeChart() {
      this.$refs["chart1"].resize();
    }
  },
  beforeCreate() {},
  created() {
    api.getFactoryGeo().then(res => {
      if (res.code === 0) {
        this.geoList = res.data;
      }
    });
    api.getFactoryCal().then(res => {
      if (res.code === 0) {
        console.log(JSON.parse(JSON.stringify(res.data)));
        this.calList = res.data;
      }
    });
    this.openLayer();
  },
  mounted() {
    this.orgOptions = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true
        }
      ]
    };
    let decounce = function(fn, delay) {
      let timer = null;
      return function() {
        let _this = this;
        let args = arguments;
        clearTimeout(timer); // 每次调用debounce函数都会将前一次的timer清空，确保只执行一次
        timer = setTimeout(() => {
          fn.apply(_this, args);
        }, delay);
      };
    };
    window.addEventListener("resize", decounce(this.resizeChart, 100)); // 调用decounce函数
  },
  components: {
    MyMap,
    MyCalendar,
    MyFactoryBox
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
.sta_item div {
  text-align: center;
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
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
.sta_item div:last-child {
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

</style>