<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="type-item current">
          <div class="type-img"></div>
          <div class="type-content">
            <div class="type-title">
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
      </el-col>
      <el-col :span="8">
        <div class="type-item">
          <div class="type-img"></div>
          <div class="type-content">
            <div class="type-title">
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
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="type-item">
          <div class="type-img"></div>
          <div class="type-content">
            <div class="type-title">
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
          <el-col :span="6" v-for="index of 12" :key="index">
            <div class="display-item" @click="jump">
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
          <el-col :span="6" v-for="index of 12" :key="index">
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
        class="display-paging"
        background
        layout="prev, pager, next ,total"
        :total="1000"
      ></el-pagination>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        keyWord: ""
      }
    };
  },
  methods: {
    jump() {
      this.$router.push({
        name: "传感器详情",
        params: { sId: 19 }
      });
    }
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
  margin-top: 20px;
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
  padding: 20px;
  background: #efefef;
  display: flex;
  position: relative;
}
.type-item.current {
  border: 1px solid #efefef;
  cursor: pointer;
}
.type-item.current .type-title {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
  margin-top: 8px;
}
.type-img {
  display: block;
  width: 100px;
  height: 100px;
  background: green;
  margin-right: 10px;
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
}
.state-ul li .right {
  display: block;
}
.type-item.current {
  border: 1px solid #78839d;
}
.type-item {
  cursor: pointer;
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
</style>