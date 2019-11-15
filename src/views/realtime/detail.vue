<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="realtime-aside">
          <ul class="info_list">
            <li>
              <span>点位置</span>
            </li>
            <li>
              <span>位置描述</span>
            </li>
            <li>
              <span>设备类型</span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="monitor"></div>
      </el-col>
    </el-row>
  </div>
</template>
       

<script>
import api from "@/api/index";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  components: {}
};
</script>

<style>
.realtime-aside {
  background: #f5f7fa;
  overflow: hidden;
  padding: 20px;
  margin-right: 20px;
}
.info_list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.info_list li {
  margin-bottom: 20px;
}
.monitor{
  border:1px solid #efefef;
  height: 600px;
}
</style>