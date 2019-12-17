<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="add_type_block" @click="handleAddType">
          <i class="el-icon-plus"></i>
        </div>
      </el-col>
      <el-col :span="8" v-for="(item,index) of tlist" :key="index">
        <div
          :class="item.checked?'type-item current':'type-item'"
          @click="handleClickSensor(index,item)"
        >
          <div class="type-op">
            <i class="el-icon-edit" @click.stop="handleEditType(index,item)"></i>
            <i class="el-icon-delete" @click.stop="handleDelType(index,item)"></i>
          </div>
          <el-image :src="imgUrl+item.img" fit="cover" class="type-img">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div class="type-content">
            <div class="type-title">
              <span>{{item.name}}</span>
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
            <!-- <div class="border-down-empty">
              <span></span>
            </div>-->
          </div>
        </div>
      </el-col>
    </el-row>
    <el-tabs type="border-card" class="display-card">
      <el-form class="display-search" ref="form" :model="searchForm" size="mini">
        <el-form-item>
          <el-input v-model="searchForm.keyWord" placeholder="请输入关键词"></el-input>
        </el-form-item>
      </el-form>
      <el-tab-pane label="全部">
        <div class="tips">
          <div class="tips-item">
            <i class="circle success"></i>
            正常
          </div>
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
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="add_senser_block" @click="handleAddSensor">
              <i class="el-icon-plus"></i>
            </div>
          </el-col>
          <el-col :span="6" v-for="(item,index) of list" :key="index">
            <div class="display-item" @click="jump(index,item)">
              <div class="sensor-op">
                <i class="el-icon-edit" @click.stop="handleEditSensor(index,item)"></i>
                <i class="el-icon-delete" @click.stop="handleDelSensor(index,item)"></i>
              </div>
              <span class="display-title">名字名字名字</span>
              <div class="display-light"></div>
              <ul class="info-list">
                <li>
                  <i class="el-icon-location"></i>
                  <span>{{item.factory.factoryName}}-{{item.floor.building.name}}-{{item.floor.floorName}}</span>
                </li>
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>{{item.name}}</span>
                </li>
                <li>
                  <i class="el-icon-time"></i>
                  <span>{{item.expirationDate}}</span>
                </li>
                <li>
                  <i class="el-icon-phone"></i>
                  <span>--</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="异常">
        <div class="tips">
          <div class="tips-item">
            <i class="circle success"></i>
            正常
          </div>
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
        <el-row :gutter="20">
          <el-col :span="6" v-for="index of 0" :key="index">
            <div class="display-item warning">
              <span class="display-title">智慧消防独立烟感</span>
              <div class="display-light"></div>
              <ul class="info-list">
                <li>
                  <i class="el-icon-location"></i>
                  <span>智能烟感</span>
                </li>
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>智能烟感</span>
                </li>
                <li>
                  <i class="el-icon-time"></i>
                  <span>2019-11-20 00:00:00</span>
                </li>
                <li>
                  <i class="el-icon-phone"></i>
                  <span>--</span>
                </li>
                <li class>
                  <i class="el-icon-s-flag"></i>
                  <span>指派中</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="display-paging"
        background
        layout="prev, pager, next ,total"
        :total="total"
      ></el-pagination>
    </el-tabs>
  </div>
</template>

<script>
import MySensorTypeAdd from "@/views/display/tadd";
import MySensorTypeEdit from "@/views/display/tedit";
import MySensorAdd from "@/views/sensor/add";
import MySensorEdit from "@/views/sensor/edit";
import api from "@/api/index";
import baseURL from "@/utils/baseUrl";
export default {
  data() {
    return {
      tform: {
        pageNum: 1,
        pageSize: 0,
      },
      sform: {
        pageNum: 0,
        pageSize: 25,
        transducerTypeId: 0
      },
      systemName: this.$route.params.sName,
      searchForm: {
        keyWord: ""
      },
      tlist: [],
      list: [],
      total: 0,
      eid: 0,
      index: "",
      imgUrl: baseURL
    };
  },
  methods: {
    jump(index, item) {
      this.$router.push({
        name: "传感器详情",
        params: { sId: item.transducerId }
      });
    },
    handleAddType() {
      let index = this.$layer.iframe({
        content: {
          content: MySensorTypeAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "500px"],
        title: "新增传感器类型",
        target: ".el-main"
      });
    },
    handleAddSensor() {
      let index = this.$layer.iframe({
        content: {
          content: MySensorAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "500px"],
        title: "新增传感器",
        target: ".el-main"
      });
      this.$layer.full(index);
    },
    handleClickSensor(index, row) {
      this.tlist.map((item, i) => {
        item.checked = false;
      });
      this.tlist[index].checked = true;
      this.sform.transducerTypeId = row.ttId;
      this.initSensor();
    },
    handleEditType(index, item) {
      let idx = this.$layer.iframe({
        content: {
          content: MySensorTypeEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "500px"],
        title: "编辑传感器类型",
        target: ".el-main"
      });
      this.index = idx;
      this.eid = item.ttId;
    },
    handleDelType(index, item) {
      let _this = this;
      _this
        .$confirm("确认删除")
        .then(_ => {
          api.delSensorTypeData({ ids: item.ttId }).then(res => {
            if (res.code === _this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
              _this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
              _this.initSensor();
              _this.did = "";
            }
          });
        })
        .catch(_ => {});
    },
    handleEditSensor(index, item) {
      let idx = this.$layer.iframe({
        content: {
          content: MySensorEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "500px"],
        title: "新增传感器",
        target: ".el-main"
      });
      this.eid = item.transducerId;
      this.index = idx;
      this.$layer.full(idx);
    },
    handleDelSensor(index, item) {
      let _this = this;
      _this
        .$confirm("确认删除")
        .then(_ => {
          api.delSensorData({ ids: item.transducerId }).then(res => {
            if (res.code === _this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
              _this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
              _this.initSensor();
              _this.did = "";
            }
          });
        })
        .catch(_ => {});
    },
    initSensorType() {
      api
        .getSensorTypeData(this.tform)
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            let list = _data.content;
            list.map((item, i) => {
              if (i == 0) {
                item.checked = true;
                this.sform.transducerTypeId = item.ttId;
              } else {
                item.checked = false;
              }
            });
            this.tlist = list;
          }
        })
        .catch(_ => {});
      setTimeout(() => {
        this.initSensor();
      }, 200);
    },
    initSensor() {
      api.getSensorData(this.sform).then(res => {
        if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
          let _data = res.data;
          let list = _data.content;
          let total = _data.total;
          this.list = list;
          console.log(list)
          this.total = total;
        }
      });
    },
    handleSizeChange(e) {
      //分页大小改变
      this.Listform.pageSize = e;
      //重载表格
      this.initSensor();
    },
    handleCurrentChange(e) {
      //分页切换
      this.Listform.pageNum = e;
      //重载表格
      this.initSensor();
    }
  },
  created() {
    this.initSensorType();
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    this.$destroy();
    next();
  }
};
</script>

<style>
.display-card {
  margin-top: 20px;
}
.display-item {
  background: #f0f0f0;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
}
.info-list {
  list-style-type: none;
  padding: 0;
}
.info-list li {
  margin-bottom: 5px;
}

.display-paging {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.display-title {
  font-weight: bold;
  font-size: 18px;
}
.display-state {
  position: absolute;
  right: 0;
  top: 0;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background: #67c23a;
  color: #fff;
  padding: 4px 15px;
  font-size: 12px;
}
.display-light {
  position: absolute;
  right: 20px;
  bottom: 12px;
  display: flex;
  align-items: center;
  font-size: 12px;
}
.display-light::before {
  content: "";
  display: block;
  background: #67c23a;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0 0 10px 2px #67c23a;
  margin-right: 5px;
}

.display-item.outline .display-state {
  background: #909399;
}
.display-item.outline .display-light::before {
  background: #909399;
  box-shadow: 0 0 10px 2px #909399;
}
.display-item.warning .display-light::before {
  background: #e6a23c;
  box-shadow: 0 0 10px 2px #e6a23c;
}
.display-item.error .display-light::before {
  background: #f56c6c;
  box-shadow: 0 0 10px 2px #f56c6c;
}
.display-search {
  width: 300px;
  position: absolute;
  top: 10px;
  left: 15px;
}
.type-item {
  height: 102px;
}
.type-item {
  padding: 20px;
  background: #efefef;
  display: flex;
  position: relative;
}
.type-item.current {
  border: 1px solid #efefef;
  cursor: pointer;
  height: 100px;
}
.type-item .type-title {
  margin-top: 8px;
}
.type-item.current .type-title {
  font-weight: bold;
  font-size: 14px;
}
.type-img {
  display: block;
  width: 100px;
  height: 100px;
  background: #fff;
  margin-right: 10px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
}
.type-content {
  flex: 1;
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
  width: 34px;
}
.state-ul li .right {
  display: block;
}
.type-item.current {
  border: 1px solid #78839d;
}
.type-item {
  cursor: pointer;
  margin-bottom: 20px;
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
.type-item.current .border-down-empty {
  display: block;
}
.border-down-empty {
  position: absolute;
  bottom: -10px;
  left: 50%;
  margin-left: -8px;
  content: "";
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #78839d;
  display: none;
}
.border-down-empty span {
  display: block;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #efefef;
  position: absolute;
  left: -8px;
  top: -10px;
}
.paging-total {
  position: absolute;
  top: 0;
  right: 0;
}
.add_type_block {
  width: 100%;
  height: 140px;
  border: 1px solid #999;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  cursor: pointer;
  margin-bottom: 20px;
  float: left;
}
.add_senser_block {
  width: 100%;
  height: 177px;
  border: 1px solid #999;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  cursor: pointer;
  margin-bottom: 20px;
  float: left;
}
.type-item {
  position: relative;
}
.type-op {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  display: none;
}
.type-item:hover .type-op {
  display: block;
}
.sensor-op {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  display: none;
}
.display-item:hover .sensor-op {
  display: block;
}
</style>