<template>
  <div class="container">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>工厂概况</span>
      </div>
      <div class="text item">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="factory_logo">
              <el-image>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <span class="factory_detail_name">xxxx有限公司</span>
            </div>
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
                <span>安装单位：</span>
              </li>
              <li>
                <span>安全监管人：</span>
              </li>
              <li>
                <span>设备数量：</span>
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
.factory_logo {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.factory_logo .el-image {
  border: 1px solid #999;
  display: flex;
  padding: 50px;
  background: #fff;
  font-size: 30px;
}
.factory_detail_name {
  width: 100%;
  text-align: center;
  display: block;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}
.detail_list li {
  margin-top: 10px;
}
.detail_list li span {
  font-weight: bold;
}
</style>