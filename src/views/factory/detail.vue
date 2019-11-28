<template>
  <div class="container">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>工厂概况</span>
      </div>
      <div class="text item">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-image>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <span></span>
          </el-col>
          <el-col :span="8">
            <ul class="detail_list">
              <li>
                <span>所属代理商：</span>
              </li>
              <li>
                <span>工厂负责人：</span>
              </li>
              <li>
                <span>工厂标签：</span>
              </li>
              <li>
                <span>工厂设施：</span>
              </li>
              <li>
                <span>工厂地址：</span>
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="detail_list">
              <li>
                <span>安装单位</span>
              </li>
              <li>
                <span>安全监管人</span>
              </li>
              <li>
                <span>设备数量</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style >
.detail_list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>