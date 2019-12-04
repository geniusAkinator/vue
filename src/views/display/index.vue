<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="add_block" @click="handleAddSys">
          <i class="el-icon-plus"></i>
        </div>
      </el-col>
      <el-col :span="8" v-for="(item,index) of list" :key="index">
        <div class="sys-block" @click="jump(item)">
          <div class="block-title">
            {{item.name}}
            <el-button-group class="sys-op">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click.stop="handleEditSys(index,item)"
              ></el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click.stop="handleDelSys(index,item)"
              ></el-button>
            </el-button-group>
          </div>
          <div class="block-content">
            <el-carousel :interval="5000">
              <el-carousel-item v-for="idx of 3" :key="idx">
                <div class="sys-item">
                  <el-image class="type-img">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
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
import MyEchartLine from "@/components/echart/eline";
import MySensorSysAdd from "@/views/display/sadd";
import MySensorSysEdit from "@/views/display/sedit";
import utils from "@/utils/utils";
import api from "@/api/index";
export default {
  data() {
    return {
      echart: "el",
      index: "",
      list: [],
      eid: 0
    };
  },
  watch: {
    index: function(newVal, oldVal) {
      let layer = document.querySelector("#" + newVal);
      if (layer != null) {
        this.layerInitWidth = layer.offsetWidth;
        this.layerInitHeight = layer.offsetHeight;
      }
    }
  },
  methods: {
    jump(row) {
      this.$router.push({
        name: "传感器展示",
        params: { sId: row.systemId, sName: row.name }
      });
    },
    handleAddSys() {
      let index = this.$layer.iframe({
        content: {
          content: MySensorSysAdd, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "500px"],
        title: "新增传感器系统",
        target: ".el-main"
      });
      this.index = index;
    },
    handleEditSys(index, item) {
      let idx = this.$layer.iframe({
        content: {
          content: MySensorSysEdit, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        shade: true,
        area: ["600px", "500px"],
        title: "编辑传感器系统",
        target: ".el-main"
      });
      this.index = idx;
      this.eid = item.systemId;
    },
    handleDelSys(index, item) {
      let _this = this;
      _this
        .$confirm("确认删除")
        .then(_ => {
          api.delSensorSysData({ ids: item.systemId }).then(res => {
            if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
              _this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
              _this.init(); //重新加载
              this.did = "";
            }
          });
        })
        .catch(_ => {
          this.did = "";
        });
    },
    init() {
      api
        .getSensorSysData()
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            this.list = _data.content;
          }
        })
        .catch(_ => {});
    }
  },
  created() {
    this.init();
  },
  mounted() {
    window.addEventListener("resize", () => {
      if (this.index == "") {
        return;
      }
      let layer = document.querySelector("#" + this.index);
      if (layer != null) {
        utils.resizeLayer(
          this.index,
          this.layerInitWidth,
          this.layerInitHeight
        );
      }
    });
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
  margin-bottom: 20px;
}
.sys-block:hover .sys-op {
  display: block;
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
.type-img {
  display: block;
  width: 100px;
  height: 100px;
  background: #fff;
  margin-right: 10px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  border: 1px solid #999;
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
.add_block {
  width: 100%;
  height: 253px;
  border: 1px solid #999;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  cursor: pointer;
  margin-bottom: 20px;
}
.sys-op {
  float: right;
  padding: 0;
  margin: 0;
  display: none;
}
.block-title {
  overflow: hidden;
  line-height: 32px;
}
</style>